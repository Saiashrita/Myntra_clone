import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Men',
    subcategories: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Jeans', 'Trousers', 'Shorts', 'Suits', 'Jackets', 'Shoes', 'Accessories']
  },
  {
    id: 2,
    name: 'Women',
    subcategories: ['Kurtas & Suits', 'Dresses', 'Tops', 'Jeans', 'Trousers', 'Skirts', 'Sarees', 'Shirts', 'Shoes', 'Accessories']
  },
  {
    id: 3,
    name: 'Kids',
    subcategories: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Dresses', 'Clothing Sets', 'Footwear', 'Accessories']
  },
  {
    id: 4,
    name: 'Home & Living',
    subcategories: ['Bed Linen', 'Curtains', 'Cushions', 'Decor', 'Kitchen', 'Bath', 'Lamps & Lighting']
  },
  {
    id: 5,
    name: 'Beauty',
    subcategories: ['Makeup', 'Skincare', 'Haircare', 'Fragrances', 'Men\'s Grooming']
  }
];

export const getCategoryByName = (name: string): Category | undefined => {
  return categories.find(category => category.name === name);
};