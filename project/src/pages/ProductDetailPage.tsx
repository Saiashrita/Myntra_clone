import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import { getProductById } from '../data/products';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = getProductById(productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found, redirect to 404 or home
        navigate('/');
      }
      
      setLoading(false);
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for does not exist.</p>
        <button 
          className="bg-pink-500 text-white px-6 py-2 rounded-md font-medium hover:bg-pink-600 transition-colors"
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;