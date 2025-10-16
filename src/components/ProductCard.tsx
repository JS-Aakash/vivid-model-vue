import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, product.defaultColor);
  };

  return (
    <div
      className="group glass-panel rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 animate-fade-in"
    >
      {/* Product Image */}
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative aspect-square overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.defaultColor}, ${product.defaultColor}dd)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        
        {product.badge && (
          <Badge className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm">
            {product.badge}
          </Badge>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlistClick}
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-destructive' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToCart}
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-8xl opacity-30 group-hover:scale-110 transition-transform duration-300">
            {product.category === 'Footwear' && '👟'}
            {product.category === 'Accessories' && '🎒'}
            {product.category === 'Furniture' && '🪑'}
            {product.category === 'Electronics' && '🎧'}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6"
        onClick={() => navigate(`/product/${product.id}`)}
      >

        <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.tagline}</p>
        </div>

        {/* Colors */}
        <div className="flex gap-2">
          {product.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border-2 border-border"
              style={{ backgroundColor: color }}
            />
          ))}
          {product.colors.length > 4 && (
            <div className="w-6 h-6 rounded-full border-2 border-border bg-muted flex items-center justify-center text-xs">
              +{product.colors.length - 4}
            </div>
          )}
        </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">${product.price}</span>
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            </div>
            <Badge variant="destructive" className="text-xs">{product.discount}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
