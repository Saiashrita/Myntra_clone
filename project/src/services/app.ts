// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Change this to your backend's URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Optional: for cookies/auth sessions
});

// Products
export const getAllProducts = () => api.get('/products');
export const getProductById = (id: string) => api.get(`/products/${id}`);
export const fetchProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return await res.json();
};

// Auth
export const loginUser = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const signupUser = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/signup', data);

export const logoutUser = () => api.post('/auth/logout');

// Cart
export const getCart = (userId: string) => api.get(`/cart/${userId}`);
export const addToCart = (userId: string, productId: string) =>
  api.post(`/cart/${userId}/add`, { productId });

export const removeFromCart = (userId: string, productId: string) =>
  api.post(`/cart/${userId}/remove`, { productId });

// Wishlist
export const getWishlist = (userId: string) => api.get(`/wishlist/${userId}`);
export const toggleWishlist = (userId: string, productId: string) =>
  api.post(`/wishlist/${userId}/toggle`, { productId });

export default api;
