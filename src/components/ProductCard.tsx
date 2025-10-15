import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group glass-panel rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 animate-fade-in"
    >
      {/* Product Image */}
      <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-card to-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-32 h-32 rounded-full opacity-50 blur-2xl"
            style={{ backgroundColor: product.defaultColor }}
          />
        </div>
        {product.badge && (
          <Badge className="absolute top-3 right-3 bg-primary/20 text-primary hover:bg-primary/30">
            {product.badge}
          </Badge>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
          👟
        </div>
      </div>

      {/* Product Info */}
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
            <span className="text-2xl font-bold text-foreground">${product.price}</span>
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          </div>
          <Badge variant="destructive" className="text-xs">{product.discount}</Badge>
        </div>
      </div>
    </div>
  );
};
