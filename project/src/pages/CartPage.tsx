import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Bag</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your bag is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any items to your bag yet.
            </p>
            <Link 
              to="/" 
              className="bg-pink-500 text-white px-6 py-2 rounded-md font-medium hover:bg-pink-600 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cart Items */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <h2 className="font-bold">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                  </h2>
                  <button 
                    className="text-sm text-pink-500 font-medium"
                    onClick={clearCart}
                  >
                    Clear All
                  </button>
                </div>
                
                <div>
                  {cart.map((item) => (
                    <CartItem key={`${item.product.id}-${item.size}`} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="md:w-1/3">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;