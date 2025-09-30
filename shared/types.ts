import { z } from 'zod';
export type ApiResponse<T = unknown> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};
// Zod Schemas for Validation
export const RatingSchema = z.object({
  average: z.number(),
  count: z.number(),
});
export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  imageUrl: z.string().url("Must be a valid URL"),
  rating: RatingSchema,
});
// New schema for the form data, omitting system-managed fields
export const MenuItemFormDataSchema = MenuItemSchema.omit({
  id: true,
  rating: true,
});
export const MenuCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Category name is required"),
  items: z.array(MenuItemSchema),
});
export const StallSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Stall name is required"),
  cuisine: z.string().min(1, "Cuisine type is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid image URL"),
  rating: RatingSchema,
  menu: z.array(MenuCategorySchema),
});
export const StallSummarySchema = StallSchema.omit({ menu: true }).extend({
  menuItemCount: z.number(),
});
export const SubmitRatingSchema = z.object({
  rating: z.number().min(1).max(5),
});
export const AdminUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});
export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
// TypeScript types inferred from Zod schemas
export type MenuItem = z.infer<typeof MenuItemSchema>;
export type MenuItemFormData = z.infer<typeof MenuItemFormDataSchema>;
export type MenuCategory = z.infer<typeof MenuCategorySchema>;
export type Stall = z.infer<typeof StallSchema>;
export type StallSummary = z.infer<typeof StallSummarySchema>;
export type Rating = z.infer<typeof RatingSchema>;
export type AdminUser = z.infer<typeof AdminUserSchema>;