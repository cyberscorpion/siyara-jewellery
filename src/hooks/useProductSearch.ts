import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/lib/types';

export function useProductSearch(products: Product[], debounceMs: number = 300) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // Memoized search function for performance
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return products;
    }

    const query = debouncedQuery.toLowerCase().trim();
    const queryWords = query.split(/\s+/);

    return products.filter((product) => {
      // Create searchable text from product properties
      const searchableText = [
        product.name,
        product.description,
        product.material,
        product.category,
        ...product.tags
      ].join(' ').toLowerCase();

      // Check if all query words are found in the searchable text
      return queryWords.every(word => 
        searchableText.includes(word)
      );
    });
  }, [products, debouncedQuery]);

  // Additional search statistics
  const searchStats = useMemo(() => ({
    totalResults: filteredProducts.length,
    isSearching: searchQuery !== debouncedQuery,
    hasQuery: debouncedQuery.trim().length > 0
  }), [filteredProducts.length, searchQuery, debouncedQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    searchStats
  };
}