import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ModelUploaderProps {
  onModelUpload: (file: File) => void;
}

export const ModelUploader = ({ onModelUpload }: ModelUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validExtensions = ['.glb', '.gltf'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));

    if (!validExtensions.includes(fileExtension)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a GLB or GLTF file",
        variant: "destructive"
      });
      return;
    }

    onModelUpload(file);
    toast({
      title: "Model uploaded successfully",
      description: "Your 3D model is now ready to use"
    });
  };

  return (
    <div className="glass-panel rounded-xl p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Custom 3D Model</h3>
        <p className="text-sm text-muted-foreground">
          Upload your own GLB or GLTF 3D model to visualize with custom colors
        </p>
      </div>

      <Button
        onClick={() => fileInputRef.current?.click()}
        className="w-full group relative overflow-hidden"
        variant="outline"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Choose 3D Model File
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Supported formats: GLB, GLTF</p>
        <p>• Max file size: 50MB</p>
        <p>• Model will be colored based on your selection</p>
      </div>
    </div>
  );
};
