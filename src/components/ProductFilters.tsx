import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SlidersHorizontal, CaretDown, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterState {
  priceRange: [number, number];
  materials: string[];
  isNewOnly: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest';
}

interface ProductFiltersProps {
  products: Product[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export function ProductFilters({
  products,
  filters,
  onFiltersChange,
  onClearFilters,
  activeFilterCount
}: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    price: true,
    material: true,
    features: true,
    sort: true
  });

  // Calculate min/max prices from products
  const priceRange = products.reduce(
    (acc, product) => ({
      min: Math.min(acc.min, product.price),
      max: Math.max(acc.max, product.price)
    }),
    { min: Infinity, max: 0 }
  );

  // Get unique materials
  const uniqueMaterials = Array.from(
    new Set(products.map(p => p.material))
  ).sort();

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleMaterial = (material: string) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter(m => m !== material)
      : [...filters.materials, material];
    updateFilters({ materials: newMaterials });
  };

  const FilterSection = ({ 
    title, 
    isOpen, 
    onToggle, 
    children 
  }: { 
    title: string; 
    isOpen: boolean; 
    onToggle: () => void; 
    children: React.ReactNode; 
  }) => (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50 rounded-lg transition-colors">
        <span className="font-medium text-sm">{title}</span>
        <CaretDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              min={priceRange.min}
              max={priceRange.max}
              step={50}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0].toLocaleString('en-IN')}</span>
            <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </FilterSection>

      <Separator />

      {/* Materials */}
      <FilterSection
        title="Materials"
        isOpen={openSections.material}
        onToggle={() => toggleSection('material')}
      >
        <div className="space-y-3">
          {uniqueMaterials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={filters.materials.includes(material)}
                onCheckedChange={() => toggleMaterial(material)}
              />
              <label
                htmlFor={material}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {material}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Features */}
      <FilterSection
        title="Features"
        isOpen={openSections.features}
        onToggle={() => toggleSection('features')}
      >
        <div className="flex items-center space-x-2">
          <Checkbox
            id="new-arrivals"
            checked={filters.isNewOnly}
            onCheckedChange={(checked) => updateFilters({ isNewOnly: checked as boolean })}
          />
          <label
            htmlFor="new-arrivals"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            New Arrivals Only
          </label>
        </div>
      </FilterSection>

      <Separator />

      {/* Sort By */}
      <FilterSection
        title="Sort By"
        isOpen={openSections.sort}
        onToggle={() => toggleSection('sort')}
      >
        <div className="space-y-3">
          {[
            { value: 'name', label: 'Name (A-Z)' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'newest', label: 'Newest First' }
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={filters.sortBy === option.value}
                onCheckedChange={() => updateFilters({ sortBy: option.value as FilterState['sortBy'] })}
              />
              <label
                htmlFor={option.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full"
            size="sm"
          >
            <X size={16} className="mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-80 bg-background border border-border rounded-lg p-1">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold text-base">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilterCount} active
            </Badge>
          )}
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}