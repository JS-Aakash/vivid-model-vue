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
  { name: 'Solar Orange', value: '#f97316', gradient: 'from-orange-600 to-orange-400' },
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
    <div className="glass-panel rounded-2xl p-6 space-y-4 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">Customize Color</h3>
        <p className="text-sm text-muted-foreground">Select your perfect shade</p>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {displayColors.map((option) => (
          <button
            key={option.value}
            onClick={() => onColorChange(option.value)}
            className={cn(
              "group relative aspect-square rounded-xl transition-all duration-300",
              "hover:scale-110 hover:shadow-lg",
              selectedColor === option.value && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
            )}
            style={{ backgroundColor: option.value }}
            aria-label={`Select ${option.name}`}
          >
            <div className={cn(
              "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
              option.gradient
            )} />
            
            {selectedColor === option.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
              </div>
            )}
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {option.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="pt-4 mt-4 border-t border-border/50">
        <Button 
          variant="outline" 
          className="w-full group relative overflow-hidden"
          onClick={() => onColorChange(displayColors[0].value)}
        >
          <span className="relative z-10">Reset to Default</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </div>
    </div>
  );
};
