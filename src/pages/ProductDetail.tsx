import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProductViewer3D } from '@/components/ProductViewer3D';
import { ColorPicker } from '@/components/ColorPicker';
import { ModelUploader } from '@/components/ModelUploader';
import { Particles } from '@/components/Particles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Share2, ArrowLeft, Star, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product?.defaultColor || '#a855f7');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [customModelUrl, setCustomModelUrl] = useState<string | undefined>(product?.modelPath);

  const handleModelUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setCustomModelUrl(url);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, selectedColor, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product.id);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Particles />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Button>

        {/* Product Showcase Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - 3D Viewer and Color Picker */}
          <div className="space-y-6">
            <div 
              className="relative aspect-square w-full rounded-2xl overflow-hidden glass-panel"
              style={{ 
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--card)) 0%, hsl(var(--background)) 100%)'
              }}
            >
              <ProductViewer3D color={selectedColor} modelPath={customModelUrl} />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full text-sm text-muted-foreground animate-float">
                Drag to rotate • Scroll to zoom
              </div>
            </div>

            <ColorPicker 
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              colors={product.colors}
            />

            {/* <ModelUploader onModelUpload={handleModelUpload} /> */}
            {/* Customer Reviews */}
            <div className="glass-panel rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn('w-4 h-4', i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground')}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.8 (122 reviews)</span>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-foreground">Alex M.</p>
                  <p className="text-muted-foreground">Super comfortable and stylish! Perfect for {product.category.toLowerCase()}.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Sarah K.</p>
                  <p className="text-muted-foreground">Great {product.name}, and sizing runs perfect for me.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Reviews
              </Button>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="lg:sticky lg:top-8 space-y-6 animate-fade-in">
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
                <Badge variant="destructive" className="ml-2">{product.discount}</Badge>
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

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 relative group overflow-hidden"
                onClick={handleAddToCart}
                disabled={product.category === 'Footwear' && !selectedSize}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group"
                onClick={handleWishlistToggle}
              >
                <Heart className={`w-5 h-5 transition-all ${isWishlisted ? 'fill-current text-destructive' : ''}`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group"
                onClick={handleShare}
              >
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => navigate(`/product/${related.id}`)}
                      >
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
        </div>

        {/* Features Banner */}
        <div className="mt-20 glass-panel rounded-2xl p-8 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <div className="w-6 h-6 rounded-full bg-primary animate-glow" />
              </div>
              <h3 className="font-semibold text-foreground">360° View</h3>
              <p className="text-sm text-muted-foreground">
                Explore every angle in stunning 3D
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-3">
                <div className="w-6 h-6 rounded-full bg-accent animate-glow" />
              </div>
              <h3 className="font-semibold text-foreground">Real-Time Customization</h3>
              <p className="text-sm text-muted-foreground">
                See changes instantly as you customize
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <div className="w-6 h-6 rounded-full bg-primary animate-glow" />
              </div>
              <h3 className="font-semibold text-foreground">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                High-fidelity 3D models with realistic materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;