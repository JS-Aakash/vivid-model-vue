import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Particles } from '@/components/Particles';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/contexts/AuthContext';
import { products } from '@/data/products';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const Wishlist = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wishlistItems, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const wishlistProducts = wishlistItems.map(item => ({
    ...item,
    product: products.find(p => p.id === item.product_id)!
  })).filter(item => item.product);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Particles />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping
        </Button>

        <h1 className="text-4xl font-bold text-gradient mb-8">My Wishlist</h1>

        {loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Loading wishlist...</p>
          </div>
        ) : wishlistProducts.length === 0 ? (
          <Card className="glass-panel p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-6">Your wishlist is empty</p>
            <Button onClick={() => navigate('/')}>Discover Products</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((item) => (
              <Card key={item.id} className="glass-panel overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div 
                  className="aspect-square relative cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${item.product.defaultColor}, ${item.product.defaultColor}dd)`
                  }}
                  onClick={() => navigate(`/product/${item.product.id}`)}
                >
                  {item.product.badge && (
                    <Badge className="absolute top-4 left-4 z-10">
                      {item.product.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 z-10 bg-background/50 backdrop-blur-sm hover:bg-destructive/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.product.id);
                    }}
                  >
                    <Heart className="w-5 h-5 fill-current text-destructive" />
                  </Button>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.product.tagline}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">${item.product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${item.product.originalPrice}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        addToCart(item.product.id, item.product.defaultColor);
                      }}
                      className="gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
