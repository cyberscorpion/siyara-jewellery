import { useMemo } from 'react';
import { Product } from '@/lib/types';
import { FilterState } from '@/components/ProductFilters';

export function useProductFilters(products: Product[], filters: FilterState) {
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply price range filter
    filtered = filtered.filter(
      product => 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
    );

    // Apply material filter
    if (filters.materials.length > 0) {
      filtered = filtered.filter(
        product => filters.materials.includes(product.material)
      );
    }

    // Apply new arrivals filter
    if (filters.isNewOnly) {
      filtered = filtered.filter(product => product.isNew === true);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          // New items first, then by name
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    
    // Check if price range is different from default (full range)
    const minPrice = Math.min(...products.map(p => p.price));
    const maxPrice = Math.max(...products.map(p => p.price));
    if (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice) {
      count++;
    }
    
    // Count material filters
    if (filters.materials.length > 0) {
      count++;
    }
    
    // Check new arrivals filter
    if (filters.isNewOnly) {
      count++;
    }
    
    // Check if sorting is not default
    if (filters.sortBy !== 'name') {
      count++;
    }
    
    return count;
  }, [products, filters]);

  return {
    filteredProducts: filteredAndSortedProducts,
    activeFilterCount
  };
}