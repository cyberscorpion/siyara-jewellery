import { Heart, ShoppingBag } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface HeaderProps {
  wishlistCount: number;
  onWishlistClick: () => void;
  onLogoClick: () => void;
  isWishlistView: boolean;
}

export function Header({ wishlistCount, onWishlistClick, onLogoClick, isWishlistView }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <motion.button
            onClick={onLogoClick}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <ShoppingBag size={20} weight="bold" className="text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-primary tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Siyara
            </h1>
          </motion.button>

          <nav className="flex items-center gap-4">
            <Button
              variant={isWishlistView ? 'default' : 'ghost'}
              size="lg"
              onClick={onWishlistClick}
              className="relative"
            >
              <Heart weight={isWishlistView ? 'fill' : 'regular'} size={20} />
              <span className="hidden sm:inline ml-2">Wishlist</span>
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground border-0">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
