import { Hono } from "hono";
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import type { Env } from './core-utils';
import { StallEntity, AdminUserEntity } from "./entities";
import { ok, notFound, bad } from './core-utils';
import { StallSchema, Stall, SubmitRatingSchema, Rating, MenuCategory, LoginSchema } from "@shared/types";
const calculateNewRating = (currentRating: Rating, newRating: number): Rating => {
  const newCount = currentRating.count + 1;
  const newAverage = ((currentRating.average * currentRating.count) + newRating) / newCount;
  return {
    average: parseFloat(newAverage.toFixed(2)), // Round to 2 decimal places
    count: newCount,
  };
};
const ensureServerIds = (menu: MenuCategory[]): MenuCategory[] => {
  return menu.map(category => {
    const categoryId = category.id.startsWith('temp-cat-') ? crypto.randomUUID() : category.id;
    const items = category.items.map(item => ({
      ...item,
      id: item.id.startsWith('temp-') || !z.string().uuid().safeParse(item.id).success ? crypto.randomUUID() : item.id,
    }));
    return { ...category, id: categoryId, items };
  });
};
export function userRoutes(app: Hono<{Bindings: Env;}>) {
  // Auth Routes
  app.post('/api/auth/login', zValidator('json', LoginSchema), async (c) => {
    await AdminUserEntity.ensureSeed(c.env);
    const { username, password } = c.req.valid('json');
    const { items: users } = await AdminUserEntity.list(c.env);
    const user = users.find(u => u.username === username);
    if (!user || user.password !== password) {
      return bad(c, 'Invalid username or password');
    }
    return ok(c, { message: 'Login successful' });
  });
  // Stall Routes
  app.use('/api/stalls/*', async (c, next) => {
    await StallEntity.ensureSeed(c.env);
    await next();
  });
  app.get('/api/stalls', async (c) => {
    const { items } = await StallEntity.list(c.env);
    const stallSummaries = items.map(({ id, name, cuisine, category, imageUrl, rating, description, menu }) => ({
      id,
      name,
      cuisine,
      category,
      imageUrl,
      rating,
      description,
      menuItemCount: menu.reduce((acc, cat) => acc + cat.items.length, 0),
    }));
    return ok(c, stallSummaries);
  });
  app.get('/api/stalls/all-details', async (c) => {
    const { items } = await StallEntity.list(c.env);
    return ok(c, items);
  });
  app.get('/api/stalls/:id', async (c) => {
    const { id } = c.req.param();
    const stall = new StallEntity(c.env, id);
    if (!(await stall.exists())) {
      return notFound(c, 'Stall not found');
    }
    const stallData = await stall.getState();
    return ok(c, stallData);
  });
  app.post(
    '/api/stalls',
    zValidator('json', StallSchema.omit({ id: true, rating: true })),
    async (c) => {
      const newStallData = c.req.valid('json');
      const newStall: Stall = {
        ...newStallData,
        id: crypto.randomUUID(),
        rating: { average: 0, count: 0 },
        menu: ensureServerIds(newStallData.menu),
      };
      await StallEntity.create(c.env, newStall);
      return ok(c, newStall);
    }
  );
  app.put(
    '/api/stalls/:id',
    zValidator('json', StallSchema.omit({ id: true, rating: true })),
    async (c) => {
      const { id } = c.req.param();
      const stallData = c.req.valid('json');
      const stall = new StallEntity(c.env, id);
      if (!(await stall.exists())) {
        return notFound(c, 'Stall not found');
      }
      const currentState = await stall.getState();
      const updatedStall: Stall = {
        ...stallData,
        id: id,
        rating: currentState.rating,
        menu: ensureServerIds(stallData.menu),
      };
      await stall.save(updatedStall);
      return ok(c, updatedStall);
    }
  );
  app.delete('/api/stalls/:id', async (c) => {
    const { id } = c.req.param();
    const deleted = await StallEntity.delete(c.env, id);
    if (!deleted) {
      return notFound(c, 'Stall not found');
    }
    return ok(c, { id });
  });
  // Rating endpoints
  app.post(
    '/api/stalls/:id/rate',
    zValidator('json', SubmitRatingSchema),
    async (c) => {
      const { id } = c.req.param();
      const { rating } = c.req.valid('json');
      const stallEntity = new StallEntity(c.env, id);
      if (!(await stallEntity.exists())) {
        return notFound(c, 'Stall not found');
      }
      const updatedStall = await stallEntity.mutate(currentStall => {
        currentStall.rating = calculateNewRating(currentStall.rating, rating);
        return currentStall;
      });
      return ok(c, updatedStall);
    }
  );
  app.post(
    '/api/stalls/:stallId/menu-items/:itemId/rate',
    zValidator('json', SubmitRatingSchema),
    async (c) => {
      const { stallId, itemId } = c.req.param();
      const { rating } = c.req.valid('json');
      const stallEntity = new StallEntity(c.env, stallId);
      if (!(await stallEntity.exists())) {
        return notFound(c, 'Stall not found');
      }
      let itemFound = false;
      const updatedStall = await stallEntity.mutate(currentStall => {
        for (const category of currentStall.menu) {
          const item = category.items.find(i => i.id === itemId);
          if (item) {
            item.rating = calculateNewRating(item.rating, rating);
            itemFound = true;
            break;
          }
        }
        return currentStall;
      });
      if (!itemFound) {
        return notFound(c, 'Menu item not found');
      }
      return ok(c, updatedStall);
    }
  );
}