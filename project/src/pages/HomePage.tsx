import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import CategoryGrid from '../components/Home/CategoryGrid';
import ProductGrid from '../components/Products/ProductGrid';
import { products } from '../data/products';

const HomePage: React.FC = () => {
  // Get popular products (first 8)
  const popularProducts = products.slice(0, 8);
  
  // Get new arrivals (different set of products)
  const newArrivals = [...products].reverse().slice(0, 8);

  return (
    <div>
      <HeroBanner />
      
      <div className="container mx-auto px-4 py-8">
        <CategoryGrid />
        
        <ProductGrid 
          products={popularProducts} 
          title="Popular Products"
        />
        
        {/* Deal of the Day Banner */}
        <div className="my-10">
          <div className="rounded-lg overflow-hidden relative">
            <img 
              src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Deal of the Day" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
              <span className="text-sm md:text-base font-medium bg-red-500 px-3 py-1 rounded-full mb-3">
                Deal of the Day
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center">
                Upto 70% Off on Fashion
              </h2>
              <p className="text-lg md:text-xl mb-6 text-center">
                Limited time offer. Shop now!
              </p>
              <a 
                href="/sale" 
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-md transition-colors duration-300 font-medium"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
        
        <ProductGrid 
          products={newArrivals} 
          title="New Arrivals"
        />
      </div>
    </div>
  );
};

export default HomePage;