import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/lib/types';
import { generateWhatsAppLink } from '@/lib/products';
import { Heart, WhatsappLogo, CaretLeft, CaretRight, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductDetailProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export function ProductDetail({ product, open, onOpenChange, isWishlisted, onToggleWishlist }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const handleOrder = () => {
    window.open(generateWhatsAppLink(product), '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] max-h-[90vh] overflow-y-auto p-0">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-secondary/30 aspect-square md:aspect-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                >
                  <CaretLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                >
                  <CaretRight size={24} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all',
                        index === currentImageIndex ? 'bg-accent w-8' : 'bg-background/60'
                      )}
                    />
                  ))}
                </div>
              </>
            )}

            {product.isNew && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0 uppercase tracking-wider">
                New Arrival
              </Badge>
            )}
          </div>

          <div className="p-8 md:p-12 space-y-6">
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-3xl font-semibold text-foreground leading-tight pr-8" style={{ fontFamily: 'var(--font-display)' }}>
                  {product.name}
                </DialogTitle>
                <motion.button
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-2.5 hover:bg-secondary rounded-full transition-colors flex-shrink-0"
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    weight={isWishlisted ? 'fill' : 'regular'}
                    className={cn(
                      'transition-colors',
                      isWishlisted ? 'text-accent' : 'text-foreground'
                    )}
                    size={24}
                  />
                </motion.button>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <p className="text-4xl font-bold text-primary" style={{ fontFamily: 'var(--font-body)' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Inclusive of all taxes</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Description</h4>
                  <p className="text-base leading-relaxed text-foreground/90" style={{ fontFamily: 'var(--font-body)' }}>
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Product Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product ID</span>
                      <span className="font-medium">{product.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material</span>
                      <span className="font-medium text-right max-w-xs">{product.material}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <Button
                onClick={handleOrder}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-6 text-base uppercase tracking-wide"
                size="lg"
              >
                <WhatsappLogo weight="fill" size={24} className="mr-2" />
                Order via WhatsApp
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Click to send us a message on WhatsApp with your order details
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
