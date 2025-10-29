import { motion } from 'framer-motion';
import { House, MagnifyingGlass, Heart, Info } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/badge';
import iconImage from '@/assets/icons/iconS.png';

interface MobileBottomNavProps {
  currentView: 'home' | 'wishlist' | 'collections';
  onHomeClick: () => void;
  onCollectionsClick: () => void;
  onWishlistClick: () => void;
  onAboutUsClick: () => void;
  wishlistCount: number;
}

export function MobileBottomNav({
  currentView,
  onHomeClick,
  onCollectionsClick,
  onWishlistClick,
  onAboutUsClick,
  wishlistCount
}: MobileBottomNavProps) {
  const handleCenterButtonClick = () => {
    if (currentView === 'home') {
      // If on home, go to collections
      onCollectionsClick();
      // Scroll to top when opening collections
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      // If on any other view, go to home
      onHomeClick();
    }
  };
  const handleCollectionsClick = () => {
    onCollectionsClick();
    // Scroll to top when opening collections
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleWishlistClick = () => {
    onWishlistClick();
    // Scroll to top when opening wishlist
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const leftNavItems = [
    {
      id: 'home',
      label: 'Home',
      icon: House,
      onClick: onHomeClick,
      isActive: currentView === 'home'
    },
    {
      id: 'collections',
      label: 'Collections',
      icon: MagnifyingGlass,
      onClick: handleCollectionsClick,
      isActive: currentView === 'collections'
    }
  ];

  const rightNavItems = [
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      onClick: handleWishlistClick,
      isActive: currentView === 'wishlist',
      badge: wishlistCount > 0 ? wishlistCount : null
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      onClick: onAboutUsClick,
      isActive: false
    }
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-amber-600/20 px-2 py-2"
    >
      <div className="flex items-center justify-between">
        {/* Left Navigation Items */}
        <div className="flex">
          {leftNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={item.onClick}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] transition-colors ${
                  item.isActive
                    ? 'text-amber-600 bg-amber-600/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon 
                    size={20} 
                    weight={item.isActive ? 'fill' : 'regular'} 
                  />
                </div>
                <span className="text-xs font-medium mt-1">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Center Siyara Icon */}
        <motion.button
          onClick={handleCenterButtonClick}
          className="relative flex items-center justify-center w-14 h-14 rounded-full border-4 border-amber-600 bg-background shadow-lg"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src={iconImage} 
            alt="Siyara" 
            className="w-8 h-8 object-contain"
          />
        </motion.button>

        {/* Right Navigation Items */}
        <div className="flex">
          {rightNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={item.onClick}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] transition-colors ${
                  item.isActive
                    ? 'text-amber-600 bg-amber-600/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon 
                    size={20} 
                    weight={item.isActive ? 'fill' : 'regular'} 
                  />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center bg-amber-600">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium mt-1">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}