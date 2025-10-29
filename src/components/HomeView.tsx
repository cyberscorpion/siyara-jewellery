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
      {/* Hero Section */}
      <section className="relative">
        <div className="min-h-[480px] flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWDBuNt-G3adnDGKrwvS8nYlwbkrcOmGeeEq89_B6OObjTKAeZFjz6aJtry1kf1g8fyKu2mN_H5YiPr-VSBUv7Nfy6bNCsArKYTmNKF9-BkqWJHhSXW5tltFhxRN33NE8PNTRJiC81KYjlP-Fid7rS_dAcfpmseT07Qcv5fDaj1utxWG6QKdR_8BofOXWERd-FeApgSoyV3tpzR_i2SnRCx-ZMIKIBgTj_GErghxzUhLYMBnsHsyxvAr-OwIKzlci29xvE6Nk48pA")`
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 text-center"
          >
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
              Elegance Redefined
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal md:text-base">
              Discover exquisite artificial jewellery crafted with elegance and precision
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-amber-600 text-white text-sm font-bold leading-normal tracking-[0.015em] md:text-base hover:opacity-90 transition-opacity"
            onClick={() => {
              document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="truncate">Shop Now</span>
          </motion.button>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="space-y-8">
        <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Our Collections
        </h2>
        
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
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 lg:gap-6 p-4">
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
