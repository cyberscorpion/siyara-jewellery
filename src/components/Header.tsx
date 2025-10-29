import { Heart, ShoppingBag } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import iconImage from '@/assets/icons/icon.png';

interface HeaderProps {
  wishlistCount: number;
  onWishlistClick: () => void;
  onLogoClick: () => void;
  isWishlistView: boolean;
  currentView: 'home' | 'wishlist' | 'collections';
  onCollectionsClick: () => void;
}

export function Header({ 
  wishlistCount, 
  onWishlistClick, 
  onLogoClick, 
  isWishlistView, 
  currentView,
  onCollectionsClick 
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-amber-600/20 px-2 lg:px-4 py-3">
      <motion.button
        onClick={onLogoClick}
        className="flex items-center justify-center text-amber-600"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="h-12">
          <img 
            src={iconImage} 
            alt="Siyara Logo" 
            className="h-full w-auto object-contain"
          />
        </div>
      </motion.button>

      <div className="hidden md:flex flex-1 justify-center gap-8">
        <div className="flex items-center gap-9">
          <button 
            onClick={onLogoClick}
            className={`text-sm font-medium leading-normal transition-colors ${
              currentView === 'home' ? 'text-amber-600' : 'text-foreground hover:text-amber-600'
            }`}
          >
            Home
          </button>
          <button 
            onClick={onCollectionsClick}
            className={`text-sm font-medium leading-normal transition-colors ${
              currentView === 'collections' ? 'text-amber-600' : 'text-foreground hover:text-amber-600'
            }`}
          >
            Collections
          </button>
          <a className="text-foreground text-sm font-medium leading-normal hover:text-amber-600 transition-colors" href="#">
            About Us
          </a>
          <a className="text-foreground text-sm font-medium leading-normal hover:text-amber-600 transition-colors" href="#">
            Contact
          </a>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          onClick={onWishlistClick}
          className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-visible rounded-full h-10 w-10 bg-amber-600/20 text-amber-600 hover:bg-amber-600/30 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Heart weight={isWishlistView ? 'fill' : 'regular'} size={20} />
          {wishlistCount > 0 && (
            <div className="absolute -top-1 -right-1 flex min-h-5 min-w-5 px-1 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
              {wishlistCount}
            </div>
          )}
        </motion.button>
      </div>
    </header>
  );
}
