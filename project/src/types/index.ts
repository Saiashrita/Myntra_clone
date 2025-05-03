export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountPrice?: number;
  discountPercent?: number;
  images: string[];
  sizes: string[];
  category: string;
  gender: 'Men' | 'Women' | 'Kids' | 'Home & Living' | 'Beauty';
  rating: number;
  ratingCount: number;
}

export interface Category {
  id: number;
  name: string;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}