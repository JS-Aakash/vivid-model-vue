import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Particles } from '@/components/Particles';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { products } from '@/data/products';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Particles />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <header className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4">
            3D Product Store
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our collection in stunning 3D. Click any product to customize and view in detail.
          </p>
          
          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </header>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-2xl mb-16">
            <p className="text-xl text-muted-foreground">No products found matching your search.</p>
          </div>
        )}

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
