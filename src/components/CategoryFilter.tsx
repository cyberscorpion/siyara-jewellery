import { Category, CATEGORIES } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-3 justify-center min-w-max px-4">
        {CATEGORIES.map((category) => (
          <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => onCategoryChange(category)}
              className={cn(
                'relative px-6 py-2 font-medium uppercase tracking-wider text-sm transition-all',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-transparent hover:bg-secondary border-border/50'
              )}
            >
              {category}
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
