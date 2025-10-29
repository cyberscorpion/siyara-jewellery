import { Product, Category } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { ProductFilters, FilterState } from './ProductFilters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProductSearch } from '@/hooks/useProductSearch';
import { useProductFilters } from '@/hooks/useProductFilters';
import { motion } from 'framer-motion';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useState, useMemo } from 'react';

interface CollectionsViewProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  wishlistedIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export function CollectionsView({
  products,
  onProductClick,
  wishlistedIds,
  onToggleWishlist
}: CollectionsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const { searchQuery, setSearchQuery, filteredProducts, searchStats } = useProductSearch(products);

  // Initialize filters with default values
  const [filters, setFilters] = useState<FilterState>(() => {
    const prices = products.map(p => p.price);
    return {
      priceRange: [Math.min(...prices), Math.max(...prices)],
      materials: [],
      isNewOnly: false,
      sortBy: 'name'
    };
  });

  // Apply filters to search results
  const { filteredProducts: filterResults, activeFilterCount } = useProductFilters(filteredProducts, filters);

  // Filter by category last
  const finalProducts = useMemo(() => {
    return selectedCategory === 'All' 
      ? filterResults 
      : filterResults.filter(p => p.category === selectedCategory);
  }, [filterResults, selectedCategory]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const clearFilters = () => {
    const prices = products.map(p => p.price);
    setFilters({
      priceRange: [Math.min(...prices), Math.max(...prices)],
      materials: [],
      isNewOnly: false,
      sortBy: 'name'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-foreground tracking-[-0.033em]"
        >
          Our Collections
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          Discover our complete range of exquisite artificial jewellery
        </motion.p>
      </div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <MagnifyingGlass 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
            size={20} 
          />
          <Input
            type="text"
            placeholder="Search by name, description, material, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 text-base bg-background/60 backdrop-blur-sm border-amber-600/20 focus:border-amber-600"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <X size={16} />
            </Button>
          )}
        </div>
        
        {/* Search Stats */}
        {searchStats.hasQuery && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2 text-center"
          >
            <Badge variant="secondary" className="text-xs">
              {searchStats.totalResults} result{searchStats.totalResults !== 1 ? 's' : ''} 
              {searchStats.isSearching && ' (searching...)'}
            </Badge>
          </motion.div>
        )}
      </motion.div>

      {/* Filters and Category Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <ProductFilters
          products={products}
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
          activeFilterCount={activeFilterCount}
        />

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between px-4">
              <h2 className="text-xl font-semibold text-foreground">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({finalProducts.length})
                </span>
              </h2>
            </div>

            {/* Products Grid */}
            {finalProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <MagnifyingGlass size={48} className="mx-auto text-muted-foreground" />
                  <h3 className="text-2xl font-semibold text-foreground">
                    {searchStats.hasQuery || activeFilterCount > 0 ? 'No products found' : 'No products available'}
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    {searchStats.hasQuery || activeFilterCount > 0
                      ? 'Try adjusting your search terms, filters, or browse by category'
                      : 'Check back later for new arrivals'
                    }
                  </p>
                  <div className="flex gap-2 justify-center">
                    {searchStats.hasQuery && (
                      <Button 
                        variant="outline" 
                        onClick={clearSearch}
                      >
                        Clear search
                      </Button>
                    )}
                    {activeFilterCount > 0 && (
                      <Button 
                        variant="outline" 
                        onClick={clearFilters}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 lg:gap-6 p-4">
                {finalProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onProductClick={onProductClick}
                      isWishlisted={wishlistedIds.includes(product.id)}
                      onToggleWishlist={onToggleWishlist}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}