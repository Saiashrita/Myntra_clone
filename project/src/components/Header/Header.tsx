import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-pink-500">MYNTRA</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            <NavLinks categories={categories} />
          </div>

          {/* Search Bar - Hidden on small devices */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/outfit-suggestions" className="flex flex-col items-center text-xs">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
              <span className="hidden md:inline mt-1">AI Stylist</span>
            </Link>

            <Link to="/profile" className="flex flex-col items-center text-xs">
              <User className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
              <span className="hidden md:inline mt-1">
                {isAuthenticated ? 'Profile' : 'Login'}
              </span>
            </Link>
            
            <Link to="/wishlist" className="flex flex-col items-center text-xs relative">
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
              <span className="hidden md:inline mt-1">Wishlist</span>
            </Link>
            
            <Link to="/cart" className="flex flex-col items-center text-xs relative">
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden md:inline mt-1">Bag</span>
            </Link>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              className="md:hidden p-1"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Search - Visible only on mobile */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} categories={categories} onClose={toggleMobileMenu} />
    </header>
  );
};

export default Header;