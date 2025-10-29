import React from 'react';
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
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi! I'm interested in ${product.name} - ₹${product.price.toLocaleString('en-IN')}`;
    const whatsappUrl = `https://wa.me/message/JKJPRWTKTRQ5B1?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-3 pb-3 group">
      <div className="relative w-full overflow-hidden bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 cursor-pointer"
          style={{ backgroundImage: `url("${product.images[0]}")` }}
          onClick={() => onProductClick(product)}
        />
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm text-amber-600 transition hover:bg-white"
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            weight={isWishlisted ? 'fill' : 'regular'}
            className={cn(
              'transition-colors',
              isWishlisted ? 'text-amber-600' : 'text-amber-600'
            )}
            size={18}
          />
        </motion.button>
        {product.isNew && (
          <Badge className="absolute top-3 left-3 bg-amber-600 text-white border-0 uppercase tracking-wider text-xs">
            New
          </Badge>
        )}
      </div>
      
      <div>
        <p className="text-foreground text-base font-medium leading-normal cursor-pointer" onClick={() => onProductClick(product)}>
          {product.name}
        </p>
        <p className="text-amber-600 text-sm font-normal leading-normal">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        <button 
          onClick={handleWhatsAppOrder}
          className="w-full mt-2 text-sm font-bold bg-amber-600/20 text-amber-600 hover:bg-amber-600/30 rounded h-9 transition-colors"
        >
          Order on WhatsApp
        </button>
      </div>
    </div>
  );
}
