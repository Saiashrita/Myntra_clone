import React from 'react';
import { Link } from 'react-router-dom';
import { promotionBanners } from '../../data/banners';

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Shop By Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {promotionBanners.map((banner) => (
          <div key={banner.id} className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <Link to={banner.url} className="block relative group">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center text-white group-hover:bg-opacity-40 transition-all duration-300">
                <h3 className="text-lg md:text-xl font-bold">{banner.title}</h3>
                <p className="text-sm md:text-base">{banner.subtitle}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;