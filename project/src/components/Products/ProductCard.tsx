import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative">
      <div className="overflow-hidden rounded-md bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <div className="relative h-64 w-full overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>
        
        {/* Wishlist Button */}
        <button 
          className={`absolute top-2 right-2 p-1.5 rounded-full 
            ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>
      </div>
      
      <div className="mt-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors">
            {product.brand}
          </h3>
          <p className="mt-1 text-sm text-gray-500 truncate">{product.name}</p>
          <div className="mt-1 flex items-center">
            <span className="text-sm font-medium">₹{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <>
                <span className="ml-2 text-xs text-gray-500 line-through">₹{product.price}</span>
                <span className="ml-2 text-xs text-green-600">{product.discountPercent}% OFF</span>
              </>
            )}
          </div>
        </Link>
        
        {/* Ratings */}
        <div className="mt-1 flex items-center">
          <div className="flex items-center bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <span className="ml-0.5">★</span>
          </div>
          <span className="ml-1 text-xs text-gray-500">({product.ratingCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;