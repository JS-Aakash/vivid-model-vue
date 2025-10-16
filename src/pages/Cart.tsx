import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Particles } from '@/components/Particles';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, loading } = useCart();
  const [processingCheckout, setProcessingCheckout] = useState(false);

  if (!user) {
    navigate('/auth');
    return null;
  }

  const cartWithProducts = cartItems.map(item => ({
    ...item,
    product: products.find(p => p.id === item.product_id)!
  })).filter(item => item.product);

  const total = cartWithProducts.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  const handleCheckout = () => {
    setProcessingCheckout(true);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <Particles />
        <Header />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

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
          Continue Shopping
        </Button>

        <h1 className="text-4xl font-bold text-gradient mb-8">Shopping Cart</h1>

        {cartWithProducts.length === 0 ? (
          <Card className="glass-panel p-12 text-center">
            <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
            <Button onClick={() => navigate('/')}>Start Shopping</Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartWithProducts.map((item) => (
                <Card key={item.id} className="glass-panel p-6">
                  <div className="flex gap-6">
                    <div 
                      className="w-24 h-24 rounded-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${item.selected_color}, ${item.selected_color}dd)`
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.product.tagline}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">Color:</span>
                        <div 
                          className="w-5 h-5 rounded-full border-2 border-border"
                          style={{ backgroundColor: item.selected_color }}
                        />
                      </div>
                      <p className="text-lg font-bold text-primary">${item.product.price}</p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <div className="flex items-center gap-2 glass-panel rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="glass-panel p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-primary">Free</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full relative overflow-hidden group"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={processingCheckout}
                >
                  <span className="relative z-10">
                    {processingCheckout ? 'Processing...' : 'Proceed to Checkout'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  ✓ Secure checkout • ✓ Free shipping • ✓ 30-day returns
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
