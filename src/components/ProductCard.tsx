import { Heart } from '@phosphor-icons/react';
import { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export function ProductCard({ product, onProductClick, isWishlisted, onToggleWishlist }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden cursor-pointer border-border/50 hover:shadow-2xl transition-shadow duration-300">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/30" onClick={() => onProductClick(product)}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.isNew && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0 uppercase tracking-wider text-xs">
              New
            </Badge>
          )}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-4 right-4 p-2.5 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              weight={isWishlisted ? 'fill' : 'regular'}
              className={cn(
                'transition-colors',
                isWishlisted ? 'text-accent' : 'text-foreground'
              )}
              size={20}
            />
          </motion.button>
        </div>
        
        <div className="p-6 space-y-3" onClick={() => onProductClick(product)}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-medium text-foreground leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-primary" style={{ fontFamily: 'var(--font-body)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            <span className="text-sm text-muted-foreground uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
              {product.category}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
