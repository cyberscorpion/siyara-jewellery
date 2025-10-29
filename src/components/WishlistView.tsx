import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';
import { Heart } from '@phosphor-icons/react';

interface WishlistViewProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistedIds: string[];
}

export function WishlistView({ products, onProductClick, onToggleWishlist, wishlistedIds }: WishlistViewProps) {
  const wishlistedProducts = products.filter(p => wishlistedIds.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 mx-auto bg-secondary rounded-full flex items-center justify-center">
            <Heart size={48} className="text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Your Wishlist is Empty
            </h2>
            <p className="text-muted-foreground max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
              Save your favorite pieces by clicking the heart icon on any product.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          Your Wishlist
        </h1>
        <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
          {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {wishlistedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
            isWishlisted={true}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}
