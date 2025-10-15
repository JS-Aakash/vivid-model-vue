import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <Button
        variant={selectedCategory === 'All' ? 'default' : 'outline'}
        onClick={() => onCategoryChange('All')}
        className={cn(
          "relative overflow-hidden group",
          selectedCategory === 'All' && "shadow-lg"
        )}
      >
        <span className="relative z-10">All Products</span>
        {selectedCategory === 'All' && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-100" />
        )}
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "relative overflow-hidden group",
            selectedCategory === category && "shadow-lg"
          )}
        >
          <span className="relative z-10">{category}</span>
          {selectedCategory === category && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-100" />
          )}
        </Button>
      ))}
    </div>
  );
};
