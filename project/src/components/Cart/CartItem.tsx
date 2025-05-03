import React from 'react';
import { X, MinusCircle, PlusCircle } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size } = item;
  
  const price = product.discountPrice || product.price;
  const totalPrice = price * quantity;

  return (
    <div className="flex py-4 border-b">
      {/* Product Image */}
      <div className="w-20 h-24 rounded overflow-hidden flex-shrink-0">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium">{product.brand}</h3>
            <p className="text-sm text-gray-500 mt-1">{product.name}</p>
            
            {/* Size */}
            {size && (
              <p className="text-xs text-gray-500 mt-1">Size: {size}</p>
            )}
            
            {/* Quantity Controls */}
            <div className="flex items-center mt-2">
              <button 
                className="text-gray-500 hover:text-pink-500 transition-colors"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
              >
                <MinusCircle size={18} />
              </button>
              <span className="mx-2 w-6 text-center">{quantity}</span>
              <button 
                className="text-gray-500 hover:text-pink-500 transition-colors"
                onClick={() => updateQuantity(product.id, quantity + 1)}
              >
                <PlusCircle size={18} />
              </button>
            </div>
          </div>
          
          {/* Price and Remove */}
          <div className="text-right">
            <div className="flex items-center">
              <span className="font-medium">₹{totalPrice}</span>
              <button 
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => removeFromCart(product.id)}
                aria-label="Remove item"
              >
                <X size={18} />
              </button>
            </div>
            
            {product.discountPrice && (
              <div className="mt-1">
                <span className="text-xs text-gray-500 line-through">₹{product.price * quantity}</span>
                <span className="text-xs text-green-600 ml-1">{product.discountPercent}% OFF</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;