import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductGrid from '../components/Products/ProductGrid';
import ProductFilters from '../components/Products/ProductFilters';
import { products, getFilteredProducts } from '../data/products';
import { getCategoryByName } from '../data/categories';
// import { fetchProducts } from '../services/app';

const ProductListingPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [filters, setFilters] = useState<{
    gender?: string;
    category?: string;
    brand?: string[];
    priceRange?: [number, number];
    discount?: number;
    sortBy?: string;
  }>({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Get unique brands for filter options
  const availableBrands = Array.from(new Set(products.map(product => product.brand)));

  // Apply category filter if in URL
  useEffect(() => {
    if (category) {
      // Convert to proper format (capitalized)
      const formattedCategory = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const categoryData = getCategoryByName(formattedCategory);
      
      if (categoryData) {
        setFilters(prev => ({ ...prev, gender: formattedCategory }));
      }
    }
  }, [category]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Apply gender/category filter
    if (filters.gender) {
      filtered = filtered.filter(product => product.gender === filters.gender);
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    // Apply brand filter
    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter(product => filters.brand?.includes(product.brand));
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= filters.priceRange![0] && price <= filters.priceRange![1];
      });
    }
    
    // Apply discount filter
    if (filters.discount) {
      filtered = filtered.filter(product => 
        product.discountPercent ? product.discountPercent >= filters.discount! : false
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'price_desc':
          filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
        case 'rating_desc':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // For demo purposes, we're just shuffling
          filtered.sort(() => Math.random() - 0.5);
          break;
      }
    }
    
    setFilteredProducts(filtered);
  }, [filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (sortValue: string) => {
    setFilters(prev => ({ ...prev, sortBy: sortValue }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {filters.gender || filters.category || 'All Products'}
        </h1>
        <p className="text-gray-600 mt-1">
          {filteredProducts.length} products found
        </p>
      </div>
      
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button 
          className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 text-gray-700"
          onClick={() => setShowMobileFilter(true)}
        >
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            availableBrands={availableBrands}
            totalProducts={filteredProducts.length}
          />
        </div>
        
        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No products found matching your filters.</p>
              <button 
                className="mt-4 text-pink-500 font-medium"
                onClick={() => setFilters({})}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
      
      {/* Mobile Filters */}
      {showMobileFilter && (
        <ProductFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          availableBrands={availableBrands}
          totalProducts={filteredProducts.length}
          mobileFilter={true}
          onCloseMobileFilter={() => setShowMobileFilter(false)}
        />
      )}
    </div>
  );
};

export default ProductListingPage;