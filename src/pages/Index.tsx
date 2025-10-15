import { Particles } from '@/components/Particles';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Particles />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <header className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            Premium Footwear
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection in stunning 3D. Click any product to customize and view in detail.
          </p>
        </header>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Features Section */}
        <div className="glass-panel rounded-2xl p-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <div className="w-6 h-6 rounded-full bg-primary animate-glow" />
              </div>
              <h3 className="font-semibold text-foreground">360° Interactive View</h3>
              <p className="text-sm text-muted-foreground">
                Experience every product in full 3D with real-time customization
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-3">
                <div className="w-6 h-6 rounded-full bg-accent animate-glow" />
              </div>
              <h3 className="font-semibold text-foreground">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Hand-crafted products with the finest materials
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <div className="w-6 h-6 rounded-full bg-primary animate-glow" />
              </div>
              <h3 className="font-semibold text-foreground">Fast & Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on all orders over $150 with 30-day returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
