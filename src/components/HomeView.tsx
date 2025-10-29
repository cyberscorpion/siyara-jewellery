import { Product, Category } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { motion } from 'framer-motion';
import { Sparkle } from '@phosphor-icons/react';

interface HomeViewProps {
  products: Product[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  onProductClick: (product: Product) => void;
  wishlistedIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export function HomeView({
  products,
  selectedCategory,
  onCategoryChange,
  onProductClick,
  wishlistedIds,
  onToggleWishlist
}: HomeViewProps) {
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      <section className="relative py-16 md:py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3">
            <Sparkle size={32} weight="fill" className="text-accent" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Siyara
            </h1>
            <Sparkle size={32} weight="fill" className="text-accent" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Discover exquisite artificial jewellery crafted with elegance and precision
          </p>
        </motion.div>
      </section>

      <section className="space-y-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                No Products Found
              </h2>
              <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Try selecting a different category
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 md:px-6 lg:px-8">
            {filteredProducts.map((product, index) => (
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
      </section>
    </div>
  );
}
