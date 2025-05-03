import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartSummary: React.FC = () => {
  const { cart, totalPrice } = useCart();
  
  // Calculate values
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalMRP = cart.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  const totalDiscount = totalMRP - totalPrice;
  const deliveryCharge = totalPrice > 799 ? 0 : 99;
  const finalAmount = totalPrice + deliveryCharge;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 sticky top-20">
      <h2 className="font-bold text-lg border-b pb-3 mb-3">Price Details</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Price ({itemCount} items)</span>
          <span>₹{totalMRP}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-600">- ₹{totalDiscount}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          {deliveryCharge === 0 ? (
            <span className="text-green-600">FREE</span>
          ) : (
            <span>₹{deliveryCharge}</span>
          )}
        </div>
        
        <div className="flex justify-between font-bold text-lg border-t border-dashed pt-3 mt-3">
          <span>Total Amount</span>
          <span>₹{finalAmount}</span>
        </div>
        
        {totalDiscount > 0 && (
          <p className="text-green-600 text-sm">
            You will save ₹{totalDiscount} on this order
          </p>
        )}
        
        <button className="w-full bg-pink-500 text-white py-3 rounded-md font-medium hover:bg-pink-600 transition-colors mt-4">
          PLACE ORDER
        </button>
        
        <Link to="/" className="block text-center text-pink-500 mt-3 text-sm font-medium">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;