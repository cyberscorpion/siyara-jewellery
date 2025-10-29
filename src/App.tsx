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
      <Header
        wishlistCount={safeWishlist.length}
        onWishlistClick={handleWishlistClick}
        onLogoClick={handleLogoClick}
        isWishlistView={currentView === 'wishlist'}
      />

      <main className="container mx-auto py-12">
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

      <footer className="border-t border-border/40 mt-24 py-12 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
              Siyara
            </h2>
            <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
              Premium Artificial Jewellery
            </p>
            <p className="text-sm text-muted-foreground">
              Order directly via WhatsApp • Crafted with elegance
            </p>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;