import React, { useState, useRef } from 'react';
import { Star, Heart, Package, TruckIcon, ShieldCheck, Camera } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SimilarProducts from './SimilarProducts';
import { products } from '../../data/products';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize || 'Standard', quantity);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryNow = () => {
    fileInputRef.current?.click();
  };

  // Get similar products (from same category and gender)
  const similarProducts = products.filter(p => 
    p.id !== product.id && 
    (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row -mx-4">
        {/* Product Images */}
        <div className="md:w-1/2 px-4 mb-6 md:mb-0">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 order-2 md:order-1">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-16 h-16 border rounded cursor-pointer ${
                    selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 order-1 md:order-2">
              <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
                {userPhoto ? (
                  <div className="relative">
                    <img 
                      src={userPhoto} 
                      alt="Your photo" 
                      className="w-full h-full object-cover object-center"
                    />
                    <button
                      onClick={() => setUserPhoto(null)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2 px-4">
          <h1 className="text-xl font-bold text-gray-800 mb-1">{product.brand}</h1>
          <h2 className="text-lg text-gray-600 mb-4">{product.name}</h2>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded">
              <span className="font-medium">{product.rating}</span>
              <Star className="w-4 h-4 ml-0.5 fill-current" />
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {product.ratingCount} Ratings
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center mb-6">
            <span className="text-2xl font-semibold">
              ₹{product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <>
                <span className="ml-3 text-lg text-gray-500 line-through">
                  ₹{product.price}
                </span>
                <span className="ml-3 text-green-600 font-medium">
                  {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>
          
          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                      selectedSize === size 
                        ? 'border-pink-500 text-pink-500' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Quantity
            </h3>
            <div className="flex items-center">
              <button 
                className="w-8 h-8 border border-gray-300 rounded-l flex items-center justify-center"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="w-12 h-8 border-t border-b border-gray-300 text-center"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button 
                className="w-8 h-8 border border-gray-300 rounded-r flex items-center justify-center"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-md font-medium hover:bg-pink-600 transition-colors"
              onClick={handleAddToCart}
            >
              ADD TO BAG
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            <button
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              onClick={handleTryNow}
            >
              <Camera size={20} />
              TRY NOW
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-md font-medium border flex items-center justify-center gap-2
                ${isWishlisted 
                  ? 'bg-pink-50 text-pink-500 border-pink-500' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              onClick={() => toggleWishlist(product)}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-500' : ''}`} />
              {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
            </button>
          </div>
          
          {/* Delivery & Services */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Delivery Options
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <TruckIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders above ₹799</p>
                </div>
              </div>
              <div className="flex items-start">
                <Package className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-500">30 day return policy</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">100% Original Products</p>
                  <p className="text-xs text-gray-500">Authentic brands and products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="text-lg font-medium mb-4">Product Details</h3>
        <div className="prose max-w-none">
          <p>This is a placeholder description for {product.name}. The actual product description would contain details about fabric, fit, care instructions, and other specific information about the product.</p>
          <ul className="mt-4">
            <li>Material: Premium quality fabric for comfort and durability</li>
            <li>Fit: {product.gender === 'Men' ? 'Regular fit' : 'Classic fit'}</li>
            <li>Care: Machine wash cold, gentle cycle</li>
            <li>Country of Origin: India</li>
          </ul>
        </div>
      </div>
      
      {/* Similar Products */}
      <SimilarProducts products={similarProducts} />
    </div>
  );
};

export default ProductDetail;