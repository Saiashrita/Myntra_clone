import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';
import { ChevronDown } from 'lucide-react';

interface NavLinksProps {
  categories: Category[];
}

const NavLinks: React.FC<NavLinksProps> = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <nav>
      <ul className="flex space-x-6">
        {categories.map((category) => (
          <li
            key={category.id}
            className="relative"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link
              to={`/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center text-gray-800 hover:text-pink-500 font-medium transition-colors duration-200"
            >
              {category.name}
              <ChevronDown size={16} className="ml-1" />
            </Link>

            {/* Mega Menu Dropdown */}
            {hoveredCategory === category.id && (
              <div className="absolute left-0 mt-2 w-56 md:w-64 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-200">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4">
                  {category.subcategories.map((subcategory, index) => (
                    <Link
                      key={index}
                      to={`/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-gray-700 hover:text-pink-500 hover:underline transition-colors duration-200"
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;