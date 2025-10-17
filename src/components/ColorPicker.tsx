import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ColorOption {
  name: string;
  value: string;
  gradient?: string;
}

const colorOptions: ColorOption[] = [
  { name: 'Midnight Purple', value: '#a855f7', gradient: 'from-purple-600 to-purple-400' },
  { name: 'Ocean Blue', value: '#3b82f6', gradient: 'from-blue-600 to-blue-400' },
  { name: 'Cyber Red', value: '#ef4444', gradient: 'from-red-600 to-red-400' },
  { name: 'Matrix Green', value: '#10b981', gradient: 'from-emerald-600 to-emerald-400' },
  { name: 'Jet Black', value: '#000000', gradient: 'from-gray-900 to-gray-700' },
  { name: 'Neon Pink', value: '#ec4899', gradient: 'from-pink-600 to-pink-400' },
];

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  colors?: string[];
}

export const ColorPicker = ({ selectedColor, onColorChange, colors }: ColorPickerProps) => {
  const displayColors: ColorOption[] = colors
    ? colors.map(color => ({ name: color, value: color }))
    : colorOptions;

  return (
    <div className="glass-panel rounded-xl p-4 space-y-3 bg-background/80 backdrop-blur-md shadow-sm animate-fade-in">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Choose Your Color</h3>
        <p className="text-xs text-muted-foreground">Pick a vibrant shade</p>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {displayColors.map((option) => (
          <button
            key={option.value}
            onClick={() => onColorChange(option.value)}
            className={cn(
              "group relative w-8 h-8 rounded-full transition-all duration-200",
              "hover:scale-105 hover:shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-1",
              selectedColor === option.value && "ring-2 ring-primary ring-offset-1 scale-105"
            )}
            style={{ backgroundColor: option.value }}
            aria-label={`Select ${option.name} color`}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-80 transition-opacity",
                option.gradient
              )}
            />
            {selectedColor === option.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
              </div>
            )}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {option.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="pt-2 mt-2 border-t border-border/30">
        <Button
          variant="outline"
          className="w-full h-8 text-sm font-medium group relative overflow-hidden rounded-lg hover:bg-accent/10"
          onClick={() => onColorChange(displayColors[0].value)}
        >
          <span className="relative z-10">Reset to Default</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </div>
    </div>
  );
};