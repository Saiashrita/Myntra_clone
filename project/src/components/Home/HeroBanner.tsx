import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroBanners } from '../../data/banners';

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((current) => (current === heroBanners.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((current) => (current === 0 ? heroBanners.length - 1 : current - 1));
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroBanners.map((banner) => (
          <div 
            key={banner.id} 
            className="min-w-full relative h-[300px] md:h-[400px] lg:h-[500px]"
            style={{
              backgroundImage: `url(${banner.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white p-4">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center">{banner.title}</h2>
              <p className="text-lg md:text-xl mb-6 text-center">{banner.subtitle}</p>
              <Link 
                to={banner.url} 
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
              >
                {banner.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-gray-800" />
      </button>
      
      <button 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroBanners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;