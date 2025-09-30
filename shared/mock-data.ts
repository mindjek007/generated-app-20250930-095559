import type { Stall } from './types';
export const MOCK_STALLS: Stall[] = [
  {
    id: '1',
    name: 'Taco Town',
    cuisine: 'Mexican',
    category: 'Street Food',
    description: 'Authentic street-style tacos with the freshest ingredients. A true taste of Mexico.',
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.5, count: 123 },
    menu: [
      {
        id: 'cat1',
        name: 'Tacos',
        items: [
          { id: 't1', name: 'Carne Asada Taco', description: 'Grilled steak, onions, cilantro, salsa.', price: 3.50, imageUrl: 'https://images.unsplash.com/photo-1599378104994-328f2a39e2a8?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.8, count: 45 } },
          { id: 't2', name: 'Al Pastor Taco', description: 'Marinated pork, pineapple, onions, cilantro.', price: 3.25, imageUrl: 'https://images.unsplash.com/photo-1624322399931-6f6f7b3c7b7e?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.7, count: 38 } },
          { id: 't3', name: 'Pollo Asado Taco', description: 'Grilled chicken, pico de gallo, cheese.', price: 3.25, imageUrl: 'https://images.unsplash.com/photo-1627907228175-2bf846a303b4?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.5, count: 29 } },
        ],
      },
      {
        id: 'cat2',
        name: 'Sides',
        items: [
          { id: 's1', name: 'Chips & Guacamole', description: 'Freshly made guacamole with crispy tortilla chips.', price: 5.00, imageUrl: 'https://images.unsplash.com/photo-1548483626-8e43f5d21f44?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.9, count: 55 } },
          { id: 's2', name: 'Elote', description: 'Grilled corn with mayo, cotija cheese, and chili powder.', price: 4.00, imageUrl: 'https://images.unsplash.com/photo-1625944022353-a29acedb84a2?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.6, count: 41 } },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    category: 'Comfort Food',
    description: 'Classic Italian pizzas with a crispy crust and generous toppings. A slice of heaven!',
    imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.8, count: 210 },
    menu: [
      {
        id: 'cat3',
        name: 'Pizzas',
        items: [
          { id: 'p1', name: 'Margherita Pizza', description: 'Tomato, mozzarella, basil.', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1598021680942-84f9362a4a0a?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.9, count: 88 } },
          { id: 'p2', name: 'Pepperoni Pizza', description: 'Classic pepperoni and cheese.', price: 14.00, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.8, count: 95 } },
          { id: 'p3', name: 'Veggie Supreme', description: 'Bell peppers, onions, olives, mushrooms.', price: 13.50, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.7, count: 60 } },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Burger Barn',
    cuisine: 'American',
    category: 'Fast Food',
    description: 'Juicy, handcrafted burgers made with 100% beef and served with crispy fries.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.3, count: 180 },
    menu: [
      {
        id: 'cat4',
        name: 'Burgers',
        items: [
          { id: 'b1', name: 'Classic Cheeseburger', description: 'Beef patty, cheese, lettuce, tomato, onion.', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.4, count: 102 } },
          { id: 'b2', name: 'Bacon Burger', description: 'Beef patty, bacon, cheese, BBQ sauce.', price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.6, count: 98 } },
        ],
      },
      {
        id: 'cat5',
        name: 'Fries',
        items: [
          { id: 'f1', name: 'French Fries', description: 'Crispy golden fries.', price: 3.00, imageUrl: 'https://images.unsplash.com/photo-1576107232684-827a33c872a9?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.2, count: 150 } },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Sushi Station',
    cuisine: 'Japanese',
    category: 'Healthy',
    description: 'Fresh and delicious sushi rolls, expertly prepared by our master chefs.',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.9, count: 250 },
    menu: [
      {
        id: 'cat6',
        name: 'Sushi Rolls',
        items: [
          { id: 'r1', name: 'California Roll', description: 'Crab, avocado, cucumber.', price: 7.00, imageUrl: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.9, count: 120 } },
          { id: 'r2', name: 'Spicy Tuna Roll', description: 'Tuna, spicy mayo, cucumber.', price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1611142037391-2a5a21294028?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.8, count: 115 } },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Noodle House',
    cuisine: 'Asian',
    category: 'Noodles',
    description: 'A variety of savory noodle dishes from across Asia, packed with flavor.',
    imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.6, count: 140 },
    menu: [],
  },
  {
    id: '6',
    name: 'The Sweet Spot',
    cuisine: 'Dessert',
    category: 'Sweets',
    description: 'Indulgent desserts, from creamy ice cream to freshly baked pastries.',
    imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.7, count: 95 },
    menu: [],
  },
  {
    id: '7',
    name: 'Coffee Corner',
    cuisine: 'Cafe',
    category: 'Beverages',
    description: 'Your daily dose of caffeine. Expertly brewed coffees, teas, and specialty drinks.',
    imageUrl: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.4, count: 88 },
    menu: [],
  },
  {
    id: '8',
    name: 'BBQ Pit',
    cuisine: 'American',
    category: 'Barbecue',
    description: 'Slow-smoked, fall-off-the-bone barbecue that will have you coming back for more.',
    imageUrl: 'https://images.unsplash.com/photo-1604329422938-04b5a45effc4?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.6, count: 162 },
    menu: [],
  },
  {
    id: '9',
    name: 'Grecian Grill',
    cuisine: 'Mediterranean',
    category: 'Healthy',
    description: 'Experience the vibrant flavors of the Mediterranean with our authentic gyros, fresh salads, and savory platters.',
    imageUrl: 'https://images.unsplash.com/photo-1625937329423-59a39351de29?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.7, count: 112 },
    menu: [
      {
        id: 'cat7',
        name: 'Platters',
        items: [
          { id: 'gg1', name: 'Chicken Gyro Platter', description: 'Served with pita, tzatziki, and a side salad.', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1631781118339-a42a60b9f0f7?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.8, count: 65 } },
          { id: 'gg2', name: 'Falafel Platter', description: 'Crispy falafel balls with hummus and Greek salad.', price: 12.50, imageUrl: 'https://images.unsplash.com/photo-1593558159518-535235d8487e?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.6, count: 47 } },
        ],
      },
    ],
  },
  {
    id: '10',
    name: 'Green Bites',
    cuisine: 'Vegan',
    category: 'Healthy',
    description: 'Delicious, wholesome, and 100% plant-based meals that nourish your body and delight your taste buds.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.8, count: 99 },
    menu: [
      {
        id: 'cat8',
        name: 'Bowls',
        items: [
          { id: 'gb1', name: 'Quinoa Power Bowl', description: 'Quinoa, roasted chickpeas, avocado, and mixed greens.', price: 13.00, imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.9, count: 54 } },
          { id: 'gb2', name: 'Buddha Bowl', description: 'A vibrant mix of fresh vegetables, tofu, and a peanut dressing.', price: 13.50, imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17025?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.7, count: 45 } },
        ],
      },
    ],
  },
  {
    id: '11',
    name: 'Curry Kingdom',
    cuisine: 'Indian',
    category: 'Comfort Food',
    description: 'A royal journey through the aromatic and flavorful world of Indian curries, breads, and tandoori specialties.',
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1200&auto=format&fit=crop',
    rating: { average: 4.6, count: 178 },
    menu: [
      {
        id: 'cat9',
        name: 'Curries',
        items: [
          { id: 'ck1', name: 'Chicken Tikka Masala', description: 'Creamy tomato-based curry with tender chicken pieces.', price: 15.00, imageUrl: 'https://images.unsplash.com/photo-1626501226363-41d85b54f9a8?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.7, count: 92 } },
          { id: 'ck2', name: 'Paneer Butter Masala', description: 'Soft paneer cubes in a rich and buttery gravy.', price: 14.00, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.6, count: 71 } },
        ],
      },
      {
        id: 'cat10',
        name: 'Breads',
        items: [
          { id: 'ck3', name: 'Garlic Naan', description: 'Soft, fluffy flatbread with garlic and butter.', price: 3.50, imageUrl: 'https://images.unsplash.com/photo-1631452180515-9a0a5b5175c3?q=80&w=1200&auto=format&fit=crop', rating: { average: 4.9, count: 110 } },
        ],
      },
    ],
  },
];