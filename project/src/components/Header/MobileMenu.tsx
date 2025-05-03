import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, categories, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300">
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {isAuthenticated ? (
            <div>
              <p className="font-medium">Hello, {user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          ) : (
            <div>
              <Link 
                to="/login" 
                className="text-pink-500 font-medium"
                onClick={onClose}
              >
                Login / Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto h-full">
          <ul className="py-2">
            {categories.map((category) => (
              <li key={category.id} className="border-b">
                <Link
                  to={`/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                  onClick={onClose}
                >
                  <span className="font-medium">{category.name}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Additional Links */}
          <div className="p-4 border-t">
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/orders" 
                  className="text-gray-700"
                  onClick={onClose}
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link 
                  to="/wishlist" 
                  className="text-gray-700"
                  onClick={onClose}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link 
                  to="/gift-cards" 
                  className="text-gray-700"
                  onClick={onClose}
                >
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-700"
                  onClick={onClose}
                >
                  Contact Us
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <button 
                    className="text-red-500"
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Close overlay when clicking outside */}
      <div 
        className="fixed inset-0 bg-transparent"
        onClick={onClose}
      />
    </div>
  );
};

export default MobileMenu;