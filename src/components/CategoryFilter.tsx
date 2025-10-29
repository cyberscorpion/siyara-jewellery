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
    <div className="flex gap-3 p-3 flex-wrap">
      {CATEGORIES.map((category) => (
        <motion.div 
          key={category} 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex h-8 cursor-pointer shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 transition-all",
            selectedCategory === category
              ? "bg-amber-600 text-white"
              : "bg-amber-600/20 hover:bg-amber-600/30 text-amber-600"
          )}
          onClick={() => onCategoryChange(category)}
        >
          <p className="text-sm font-medium leading-normal">{category}</p>
        </motion.div>
      ))}
    </div>
  );
}
