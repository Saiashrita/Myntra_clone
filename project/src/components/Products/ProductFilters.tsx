import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterOptions {
  gender?: string;
  category?: string;
  brand?: string[];
  priceRange?: [number, number];
  discount?: number;
  sortBy?: string;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  onSortChange: (sortValue: string) => void;
  availableBrands: string[];
  totalProducts: number;
  mobileFilter?: boolean;
  onCloseMobileFilter?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  filters, 
  onFilterChange, 
  onSortChange,
  availableBrands,
  totalProducts,
  mobileFilter = false,
  onCloseMobileFilter
}) => {
  const [openSections, setOpenSections] = useState({
    gender: true,
    categories: true,
    brands: true,
    price: true,
    discount: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const priceRanges = [
    { label: 'Below ₹500', value: [0, 500] },
    { label: '₹500 - ₹1000', value: [500, 1000] },
    { label: '₹1000 - ₹2000', value: [1000, 2000] },
    { label: 'Above ₹2000', value: [2000, 100000] }
  ];

  const discountRanges = [
    { label: '10% and above', value: 10 },
    { label: '20% and above', value: 20 },
    { label: '30% and above', value: 30 },
    { label: '40% and above', value: 40 },
    { label: '50% and above', value: 50 },
  ];

  const handleBrandChange = (brand: string, checked: boolean) => {
    const updatedBrands = checked
      ? [...(filters.brand || []), brand]
      : (filters.brand || []).filter(b => b !== brand);
    
    onFilterChange({ ...filters, brand: updatedBrands });
  };

  const clearFilters = () => {
    onFilterChange({});
    onSortChange('');
  };

  const filterContent = (
    <div className={`${mobileFilter ? 'bg-white h-full overflow-y-auto' : ''}`}>
      {mobileFilter && (
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Filters</h2>
          <button onClick={onCloseMobileFilter}>
            <X size={20} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <span className="font-medium">{totalProducts}</span> items found
        </div>
        <button
          className="text-pink-500 text-sm font-medium"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>

      {/* Sort */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Sort By</h3>
        </div>
        <div className="mt-3">
          <select
            className="w-full p-2 border rounded"
            value={filters.sortBy || ''}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Customer Rating</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Gender Filter */}
      <div className="p-4 border-b">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('gender')}
        >
          <h3 className="font-medium">Gender</h3>
          {openSections.gender ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {openSections.gender && (
          <div className="mt-3 space-y-2">
            {['Men', 'Women', 'Kids', 'Home & Living', 'Beauty'].map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  type="radio"
                  id={`gender-${gender}`}
                  name="gender"
                  checked={filters.gender === gender}
                  onChange={() => onFilterChange({ ...filters, gender })}
                  className="mr-2"
                />
                <label htmlFor={`gender-${gender}`} className="text-sm">{gender}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="p-4 border-b">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('brands')}
        >
          <h3 className="font-medium">Brands</h3>
          {openSections.brands ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {openSections.brands && (
          <div className="mt-3 space-y-2">
            {availableBrands.map((brand) => (
              <div key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={(filters.brand || []).includes(brand)}
                  onChange={(e) => handleBrandChange(brand, e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`brand-${brand}`} className="text-sm">{brand}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="p-4 border-b">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-medium">Price Range</h3>
          {openSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {openSections.price && (
          <div className="mt-3 space-y-2">
            {priceRanges.map((range, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`price-${index}`}
                  name="price"
                  checked={
                    filters.priceRange?.[0] === range.value[0] && 
                    filters.priceRange?.[1] === range.value[1]
                  }
                  onChange={() => onFilterChange({ ...filters, priceRange: range.value as [number, number] })}
                  className="mr-2"
                />
                <label htmlFor={`price-${index}`} className="text-sm">{range.label}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discount Filter */}
      <div className="p-4 border-b">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('discount')}
        >
          <h3 className="font-medium">Discount Range</h3>
          {openSections.discount ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {openSections.discount && (
          <div className="mt-3 space-y-2">
            {discountRanges.map((range, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`discount-${index}`}
                  name="discount"
                  checked={filters.discount === range.value}
                  onChange={() => onFilterChange({ ...filters, discount: range.value })}
                  className="mr-2"
                />
                <label htmlFor={`discount-${index}`} className="text-sm">{range.label}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {mobileFilter && (
        <div className="sticky bottom-0 p-4 bg-white border-t flex justify-between">
          <button 
            className="w-1/2 py-3 border border-gray-300 rounded-md text-gray-800 font-medium"
            onClick={clearFilters}
          >
            Clear All
          </button>
          <button 
            className="w-1/2 ml-2 py-3 bg-pink-500 text-white rounded-md font-medium"
            onClick={onCloseMobileFilter}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );

  if (mobileFilter) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-white h-full overflow-auto">
          {filterContent}
        </div>
      </div>
    );
  }

  return filterContent;
};

export default ProductFilters;