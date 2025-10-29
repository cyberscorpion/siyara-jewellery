import { Heart, ShoppingBag, List, X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import iconImage from '@/assets/icons/icon.png';
import { useState } from 'react';

interface HeaderProps {
  wishlistCount: number;
  onWishlistClick: () => void;
  onLogoClick: () => void;
  isWishlistView: boolean;
  currentView: 'home' | 'wishlist' | 'collections';
  onCollectionsClick: () => void;
  onAboutUsClick: () => void;
  onContactClick: () => void;
}

export function Header({ 
  wishlistCount, 
  onWishlistClick, 
  onLogoClick, 
  isWishlistView, 
  currentView,
  onCollectionsClick,
  onAboutUsClick,
  onContactClick
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  const handleCollectionsClick = () => {
    onCollectionsClick();
    // Scroll to top when opening collections
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
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

            {/* Desktop Navigation */}
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
            onClick={handleCollectionsClick}
            className={`text-sm font-medium leading-normal transition-colors ${
              currentView === 'collections' ? 'text-amber-600' : 'text-foreground hover:text-amber-600'
            }`}
          >
            Collections
          </button>
          <button 
            onClick={onAboutUsClick}
            className="text-foreground text-sm font-medium leading-normal hover:text-amber-600 transition-colors"
          >
            About Us
          </button>
          <button 
            onClick={onContactClick}
            className="text-foreground text-sm font-medium leading-normal hover:text-amber-600 transition-colors"
          >
            Contact
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <List size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <button 
                  onClick={() => handleMobileNavClick(onLogoClick)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentView === 'home' 
                      ? 'bg-amber-600/20 text-amber-600 font-medium' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => handleMobileNavClick(handleCollectionsClick)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentView === 'collections' 
                      ? 'bg-amber-600/20 text-amber-600 font-medium' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  Collections
                </button>
                <button 
                  onClick={() => handleMobileNavClick(onAboutUsClick)}
                  className="w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  About Us
                </button>
                <button 
                  onClick={() => handleMobileNavClick(onContactClick)}
                  className="w-full text-left p-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  Contact
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      <div className="flex items-center gap-2">
        </div>

        {/* Wishlist Button */}
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
