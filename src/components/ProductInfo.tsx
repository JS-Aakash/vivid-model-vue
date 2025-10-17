import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2, Star, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ColorPicker } from '@/components/ColorPicker';
import { Product, products } from '@/data/products';

interface ProductInfoProps {
  productId: string;
}

export const ProductInfo = ({ productId }: ProductInfoProps) => {
  const product = products.find((p) => p.id === productId);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.defaultColor || '#a855f7');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== productId)
    .slice(0, 3);

  if (!product) {
    return <div className="text-center text-muted-foreground">Product not found</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Product Title */}
      <div className="space-y-2">
        {product.badge && (
          <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/30">
            {product.badge}
          </Badge>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">{product.name}</h1>
        <p className="text-xl text-muted-foreground">{product.tagline}</p>
      </div>

      {/* Price and Stock Status */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">${product.price}</span>
        <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
        {product.discount && (
          <Badge variant="destructive" className="ml-2">
            {product.discount}
          </Badge>
        )}
        <Badge
          className={cn(
            'ml-4',
            product.price < 200 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
          )}
        >
          {product.price < 200 ? 'In Stock' : 'Low Stock'}
        </Badge>
      </div>

      {/* Size Selector (for Footwear only) */}
      {product.category === 'Footwear' && product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Select Size (US)</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? 'default' : 'outline'}
                className={cn(
                  'w-12 h-10 text-sm font-medium',
                  selectedSize === size ? 'bg-primary text-white' : 'hover:bg-accent/10'
                )}
                onClick={() => setSelectedSize(size)}
                aria-label={`Select size ${size}`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Color Picker */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Select Color</h3>
        <ColorPicker
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          colors={product.colors}
        />
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Quantity</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
          >
            -
          </Button>
          <span className="w-12 text-center text-sm font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>
      </div>

      {/* 3D Model Viewer (for Footwear with modelPath) */}
      {product.category === 'Footwear' && product.modelPath && (
        <div className="glass-panel rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-foreground">3D Model Preview</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              View the {product.name} in 3D
            </p>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => alert('3D Model Viewer Placeholder')}
              aria-label="View 3D model"
            >
              <Eye className="w-4 h-4" />
              View 3D
            </Button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="glass-panel rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-foreground">Features</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className={cn('w-1.5 h-1.5 rounded-full', index % 2 === 0 ? 'bg-primary' : 'bg-accent')} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1 relative group overflow-hidden"
          disabled={product.category === 'Footwear' && !selectedSize}
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

      {/* Product Description */}
      <div className="glass-panel rounded-xl p-4 space-y-3">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        >
          <h3 className="font-semibold text-foreground">Product Description</h3>
          {isDescriptionOpen ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        {isDescriptionOpen && (
          <p className="text-sm text-muted-foreground">
            {product.description || 'No description available for this product.'}
          </p>
        )}
      </div>

      {/* Delivery Estimate */}
      <div className="glass-panel rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-foreground">Delivery Information</h3>
        <p className="text-sm text-muted-foreground">
          Estimated delivery: 3-5 business days
        </p>
        <p className="text-sm text-muted-foreground">
          Free shipping on orders over $150
        </p>
      </div>

      {/* Customer Reviews */}
      <div className="glass-panel rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-foreground">Customer Reviews</h3>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn('w-4 h-4', i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground')}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">4.2 (128 reviews)</span>
        </div>
        <div className="space-y-3">
          <div className="text-sm">
            <p className="font-medium text-foreground">Alex M.</p>
            <p className="text-muted-foreground">Super comfortable and stylish! Perfect for {product.category.toLowerCase()}.</p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">Sarah K.</p>
            <p className="text-muted-foreground">Great {product.name}, but sizing runs slightly small.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2">
          View All Reviews
        </Button>
      </div>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProducts.map((related) => (
              <div key={related.id} className="glass-panel rounded-xl p-4 text-center">
                <img
                  src={related.image}
                  alt={related.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-sm font-medium text-foreground">{related.name}</p>
                <p className="text-sm text-muted-foreground">${related.price}</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="pt-6 border-t border-border/50 space-y-2 text-sm text-muted-foreground">
        <p>✓ Free shipping on orders over $150</p>
        <p>✓ 30-day return policy</p>
        <p>✓ 1-year warranty included</p>
      </div>
    </div>
  );
};