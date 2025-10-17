import { useEffect, useRef } from 'react';
import '@google/model-viewer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface ARViewerProps {
  modelPath: string;
  productName: string;
  onClose: () => void;
}

export const ARViewer = ({ modelPath, productName, onClose }: ARViewerProps) => {
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    // Initialize model-viewer when component mounts
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.cameraOrbit = '0deg 75deg 105%';
      modelViewer.fieldOfView = '30deg';
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto h-full flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{productName}</h2>
            <p className="text-sm text-muted-foreground">Tap "View in your space" to see in AR</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 relative rounded-2xl overflow-hidden glass-panel">
          <model-viewer
            ref={modelViewerRef}
            src={modelPath}
            alt={productName}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            touch-action="pan-y"
            shadow-intensity="1"
            shadow-softness="0.5"
            exposure="1"
            environment-image="neutral"
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="30deg"
            interaction-prompt="auto"
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 50%, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
            }}
          >
            <button
              slot="ar-button"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-all animate-pulse"
            >
              View in your space
            </button>
            
            <div className="absolute top-4 left-4 glass-panel px-4 py-2 rounded-lg text-sm">
              <p className="text-muted-foreground">Drag to rotate • Pinch to zoom</p>
            </div>
          </model-viewer>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          <div className="glass-panel p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Step 1</p>
            <p className="text-sm font-medium text-foreground">Tap "View in your space"</p>
          </div>
          <div className="glass-panel p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Step 2</p>
            <p className="text-sm font-medium text-foreground">Point camera at floor/surface</p>
          </div>
          <div className="glass-panel p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Step 3</p>
            <p className="text-sm font-medium text-foreground">Tap to place & view</p>
          </div>
        </div>
      </div>
    </div>
  );
};
