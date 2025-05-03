import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductCard from '../components/Products/ProductCard';
import { useWishlist } from '../context/WishlistContext';

const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        {wishlist.length > 0 && (
          <button 
            className="text-sm text-pink-500 font-medium"
            onClick={() => alert('This would clear your wishlist')}
          >
            Clear All
          </button>
        )}
      </div>
      
      {wishlist.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">
            Save items you love to your wishlist and review them anytime.
          </p>
          <Link 
            to="/" 
            className="bg-pink-500 text-white px-6 py-2 rounded-md font-medium hover:bg-pink-600 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;