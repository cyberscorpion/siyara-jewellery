import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Header } from '@/components/Header';
import { HomeView } from '@/components/HomeView';
import { WishlistView } from '@/components/WishlistView';
import { ProductDetail } from '@/components/ProductDetail';
import { PRODUCTS } from '@/lib/products';
import { Product, Category } from '@/lib/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [wishlistedIds, setWishlistedIds] = useKV<string[]>('wishlist', []);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'wishlist'>('home');

  const safeWishlist = wishlistedIds ?? [];

  const handleToggleWishlist = (productId: string) => {
    setWishlistedIds((current) => {
      const currentList = current ?? [];
      const isCurrentlyWishlisted = currentList.includes(productId);
      
      if (isCurrentlyWishlisted) {
        toast.success('Removed from wishlist');
        return currentList.filter(id => id !== productId);
      } else {
        toast.success('Added to wishlist');
        return [...currentList, productId];
      }
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleWishlistClick = () => {
    setCurrentView(currentView === 'wishlist' ? 'home' : 'wishlist');
  };

  const handleLogoClick = () => {
    setCurrentView('home');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 lg:px-8">
        <Header
          wishlistCount={safeWishlist.length}
          onWishlistClick={handleWishlistClick}
          onLogoClick={handleLogoClick}
          isWishlistView={currentView === 'wishlist'}
        />

        <main className="mt-8">
          {currentView === 'home' ? (
            <HomeView
              products={PRODUCTS}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onProductClick={handleProductClick}
              wishlistedIds={safeWishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          ) : (
            <WishlistView
              products={PRODUCTS}
              onProductClick={handleProductClick}
              onToggleWishlist={handleToggleWishlist}
              wishlistedIds={safeWishlist}
            />
          )}
        </main>

        <ProductDetail
          product={selectedProduct}
          open={isProductDetailOpen}
          onOpenChange={setIsProductDetailOpen}
          isWishlisted={selectedProduct ? safeWishlist.includes(selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
        />
      </div>

      <footer className="mt-16 border-t border-amber-600/20 pt-8 pb-4">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg text-foreground mb-2">Siyara</h3>
              <p className="text-sm text-muted-foreground">Crafting elegance, one piece at a time.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li><a className="text-sm text-muted-foreground hover:text-amber-600 transition-colors" href="#">Shipping Policy</a></li>
                <li><a className="text-sm text-muted-foreground hover:text-amber-600 transition-colors" href="#">FAQs</a></li>
                <li><a className="text-sm text-muted-foreground hover:text-amber-600 transition-colors" href="#">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground mb-2">Follow Us</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a className="text-muted-foreground hover:text-amber-600 transition-colors" href="#">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                  </svg>
                </a>
                <a className="text-muted-foreground hover:text-amber-600 transition-colors" href="https://www.instagram.com/siyara.wearables/" target="_blank" rel="noopener noreferrer">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.28-.059-1.688-.073-4.947-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm4.965-10.405c0 .795-.645 1.44-1.44 1.44s-1.44-.645-1.44-1.44.645-1.44 1.44-1.44 1.44.645 1.44 1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>© 2024 Siyara. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;