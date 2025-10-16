import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProductViewer3D } from '@/components/ProductViewer3D';
import { ColorPicker } from '@/components/ColorPicker';
import { ModelUploader } from '@/components/ModelUploader';
import { Particles } from '@/components/Particles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product?.defaultColor || '#a855f7');
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

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, selectedColor);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isWishlisted) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product.id);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.tagline,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

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
          {/* Left Side - 3D Viewer */}
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

            <ModelUploader onModelUpload={handleModelUpload} />
          </div>

          {/* Right Side - Product Info */}
          <div className="lg:sticky lg:top-8">
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                {product.badge && (
                  <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/30">
                    {product.badge}
                  </Badge>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-gradient">
                  {product.name}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {product.tagline}
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                <Badge variant="destructive" className="ml-2">{product.discount}</Badge>
              </div>

              <div className="glass-panel rounded-xl p-4 space-y-3">
                <h3 className="font-semibold text-foreground">Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1 relative group overflow-hidden"
                  onClick={handleAddToCart}
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

              <div className="pt-6 border-t border-border/50 space-y-2 text-sm text-muted-foreground">
                <p>✓ Free shipping on orders over $150</p>
                <p>✓ 30-day return policy</p>
                <p>✓ 1-year warranty included</p>
              </div>
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
