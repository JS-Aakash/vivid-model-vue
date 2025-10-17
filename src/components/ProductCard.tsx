import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Sparkles, Star } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

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

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="group relative glass-panel rounded-xl overflow-hidden cursor-pointer hover:scale-[1.03] transition-all duration-500 animate-fade-in hover:shadow-2xl hover:shadow-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20 pointer-events-none" />

      {/* Glow effect on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />

      {/* Product Image */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative aspect-[4/3] overflow-hidden"
      >
        {/* Image or Fallback */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500',
              isHovered ? 'scale-110' : 'scale-100'
            )}
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${product.defaultColor}, ${product.defaultColor}dd)`,
            }}
          >
            <div className="text-7xl opacity-40 transition-all duration-500">
              {product.category === 'Footwear' && '👟'}
              {product.category === 'Accessories' && '🎒'}
              {product.category === 'Furniture' && '🪑'}
              {product.category === 'Electronics' && '🎧'}
            </div>
          </div>
        )}

        {/* Subtle overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />

        {/* Floating sparkles */}
        {isHovered && (
          <>
            <Sparkles className="absolute top-4 left-4 w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '0ms' }} />
            <Sparkles className="absolute top-8 right-8 w-3 h-3 text-yellow-400 animate-pulse" style={{ animationDelay: '200ms' }} />
            <Sparkles className="absolute bottom-6 left-8 w-3 h-3 text-yellow-400 animate-pulse" style={{ animationDelay: '400ms' }} />
          </>
        )}

        {/* Badge with animation */}
        {product.badge && (
          <Badge className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary to-accent text-white backdrop-blur-sm shadow-lg animate-bounce">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {product.badge}
          </Badge>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlistClick}
            className="h-9 w-9 bg-background/90 backdrop-blur-md hover:bg-background hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500 animate-pulse' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToCart}
            className="h-9 w-9 bg-background/90 backdrop-blur-md hover:bg-background hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleQuickView}
            className="h-9 w-9 bg-background/90 backdrop-blur-md hover:bg-background hover:scale-110 transition-all duration-200 shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Product Info */}
      <div
        className="p-4"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="space-y-2.5">
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{product.tagline}</p>
          </div>

          {/* Colors */}
          <div className="flex gap-1.5 items-center">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border-2 border-border hover:scale-125 hover:border-primary transition-all duration-200 cursor-pointer shadow-sm"
                style={{
                  backgroundColor: color,
                  transitionDelay: `${index * 50}ms`,
                }}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-5 h-5 rounded-full border-2 border-border bg-muted flex items-center justify-center text-[10px] font-semibold hover:scale-110 transition-transform">
                +{product.colors.length - 4}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ${product.price}
              </span>
              <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
            </div>
            <Badge variant="destructive" className="text-xs shadow-md animate-pulse">
              {product.discount}
            </Badge>
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-1 pt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-3 h-3',
                  i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">(4.5)</span>
          </div>
        </div>
      </div>

      {/* Quick Add to Cart Button */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-background via-background to-background/95 backdrop-blur-sm p-3 border-t border-border/50">
        <Button
          onClick={handleAddToCart}
          className="w-full h-9 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 text-sm font-semibold"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Quick Add to Cart
        </Button>
      </div>
    </div>
  );
};