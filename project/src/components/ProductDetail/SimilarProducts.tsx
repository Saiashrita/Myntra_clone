import React from 'react';
import ProductCard from '../Products/ProductCard';
import { Product } from '../../types';

interface SimilarProductsProps {
  products: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  if (products.length === 0) return null;
  
  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-6">Similar Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;