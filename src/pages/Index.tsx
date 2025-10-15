import { useState } from 'react';
import { ProductViewer3D } from '@/components/ProductViewer3D';
import { ColorPicker } from '@/components/ColorPicker';
import { ProductInfo } from '@/components/ProductInfo';
import { Particles } from '@/components/Particles';

const Index = () => {
  const [selectedColor, setSelectedColor] = useState('#a855f7');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particles Background */}
      <Particles />
      
      {/* Radial Gradient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
                3D Product Showcase
              </h2>
              <p className="text-muted-foreground">
                Explore in stunning 3D detail
              </p>
            </div>
            <div className="glass-panel px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                Interactive Demo
              </span>
            </div>
          </div>
        </header>

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
              <ProductViewer3D color={selectedColor} />
              
              {/* Interaction Hint */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-full text-sm text-muted-foreground animate-float">
                Drag to rotate • Scroll to zoom
              </div>
            </div>

            {/* Color Picker */}
            <ColorPicker 
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </div>

          {/* Right Side - Product Info */}
          <div className="lg:sticky lg:top-8">
            <ProductInfo />
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

export default Index;
