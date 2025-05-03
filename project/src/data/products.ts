import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Men Slim Fit Cotton Casual Shirt',
    brand: 'Roadster',
    price: 1999,
    discountPrice: 899,
    discountPercent: 55,
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Shirts',
    gender: 'Men',
    rating: 4.2,
    ratingCount: 1453,
  },
  {
    id: 2,
    name: 'Women Black Solid Lightweight Sweater',
    brand: 'H&M',
    price: 2499,
    discountPrice: 1499,
    discountPercent: 40,
    images: [
      'https://images.pexels.com/photos/2960604/pexels-photo-2960604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2960619/pexels-photo-2960619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Sweaters',
    gender: 'Women',
    rating: 4.5,
    ratingCount: 987,
  },
  {
    id: 3,
    name: 'Men Blue Regular Fit Jeans',
    brand: 'Levis',
    price: 3299,
    discountPrice: 1979,
    discountPercent: 40,
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1800059/pexels-photo-1800059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    sizes: ['30', '32', '34', '36'],
    category: 'Jeans',
    gender: 'Men',
    rating: 4.3,
    ratingCount: 2145,
  },
  {
    id: 4,
    name: 'Women Pink Floral Print Maxi Dress',
    brand: 'MANGO',
    price: 4999,
    discountPrice: 2999,
    discountPercent: 40,
    images: [
      'https://images.pexels.com/photos/2010812/pexels-photo-2010812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Dresses',
    gender: 'Women',
    rating: 4.6,
    ratingCount: 765,
  },
  {
    id: 5,
    name: 'Men White Sneakers',
    brand: 'Nike',
    price: 8999,
    discountPrice: 7199,
    discountPercent: 20,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    sizes: ['7', '8', '9', '10', '11'],
    category: 'Shoes',
    gender: 'Men',
    rating: 4.7,
    ratingCount: 3200,
  },
  {
    id: 6,
    name: 'Women Black Running Shoes',
    brand: 'Adidas',
    price: 7999,
    discountPrice: 5599,
    discountPercent: 30,
    images: [
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    sizes: ['4', '5', '6', '7', '8'],
    category: 'Shoes',
    gender: 'Women',
    rating: 4.5,
    ratingCount: 1890,
  },
  {
    id: 7,
    name: 'Kids Yellow Printed T-shirt',
    brand: 'GAP',
    price: 1299,
    discountPrice: 649,
    discountPercent: 50,
    images: [
      'https://images.pexels.com/photos/5905880/pexels-photo-5905880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5905884/pexels-photo-5905884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    category: 'T-shirts',
    gender: 'Kids',
    rating: 4.4,
    ratingCount: 456,
  },
  {
    id: 8,
    name: 'Beige Textured Cushion Cover Set',
    brand: 'HOME CENTRE',
    price: 1499,
    discountPrice: 899,
    discountPercent: 40,
    images: [
      'https://images.pexels.com/photos/6444260/pexels-photo-6444260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6444288/pexels-photo-6444288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    sizes: ['Standard'],
    category: 'Home Decor',
    gender: 'Home & Living',
    rating: 4.3,
    ratingCount: 320,
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByGender = (gender: string): Product[] => {
  return products.filter(product => product.gender === gender);
};

export const getFilteredProducts = (filters: { 
  gender?: string; 
  category?: string; 
  brand?: string;
  priceRange?: [number, number];
}): Product[] => {
  return products.filter(product => {
    let matches = true;
    
    if (filters.gender && product.gender !== filters.gender) {
      matches = false;
    }
    
    if (filters.category && product.category !== filters.category) {
      matches = false;
    }
    
    if (filters.brand && product.brand !== filters.brand) {
      matches = false;
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      const price = product.discountPrice || product.price;
      if (price < min || price > max) {
        matches = false;
      }
    }
    
    return matches;
  });
};