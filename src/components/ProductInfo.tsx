import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';

export const ProductInfo = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Product Title */}
      <div className="space-y-2">
        <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/30">
          New Release
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          HyperSonic X1
        </h1>
        <p className="text-xl text-muted-foreground">
          Premium Performance Sneaker
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">$299</span>
        <span className="text-xl text-muted-foreground line-through">$399</span>
        <Badge variant="destructive" className="ml-2">25% OFF</Badge>
      </div>

      {/* Features */}
      <div className="glass-panel rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-foreground">Features</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Advanced cushioning technology
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            Breathable mesh upper
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Ultra-lightweight construction
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            Premium materials
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          size="lg" 
          className="flex-1 relative group overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
        
        <Button size="lg" variant="outline" className="group">
          <Heart className="w-5 h-5 group-hover:fill-current transition-all" />
        </Button>
        
        <Button size="lg" variant="outline" className="group">
          <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </Button>
      </div>

      {/* Additional Info */}
      <div className="pt-6 border-t border-border/50 space-y-2 text-sm text-muted-foreground">
        <p>✓ Free shipping on orders over $150</p>
        <p>✓ 30-day return policy</p>
        <p>✓ 1-year warranty included</p>
      </div>
    </div>
  );
};
