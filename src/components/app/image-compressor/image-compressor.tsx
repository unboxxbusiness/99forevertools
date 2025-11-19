'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Download, Loader2, Image as ImageIcon, X, FileImage, Settings2, Zap, Save, Eye, ArrowLeftRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

type CompressionMode = 'high-quality' | 'balanced' | 'small-file' | 'custom';
type OutputFormat = 'original' | 'jpeg' | 'png' | 'webp';

interface ImageFile {
  id: string;
  file: File;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  preview: string;
  compressedPreview: string | null;
  status: 'pending' | 'compressing' | 'completed' | 'error';
}

const COMPRESSION_MODES = {
  'high-quality': { quality: 0.92, label: 'High Quality', description: 'Best for professional photos' },
  'balanced': { quality: 0.80, label: 'Balanced', description: 'Good quality, moderate compression' },
  'small-file': { quality: 0.60, label: 'Small File', description: 'Maximum compression, smaller files' },
  'custom': { quality: 0.80, label: 'Custom', description: 'Adjust settings manually' },
};

export function ImageCompressor() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [compressionMode, setCompressionMode] = useState<CompressionMode>('balanced');
  const [customQuality, setCustomQuality] = useState(0.8);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('original');
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isCompressing, setIsCompressing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImages: ImageFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const id = `${Date.now()}-${Math.random()}`;
        const preview = URL.createObjectURL(file);
        newImages.push({
          id,
          file,
          originalSize: file.size,
          compressedBlob: null,
          compressedSize: 0,
          preview,
          compressedPreview: null,
          status: 'pending',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid file type',
          description: `${file.name} is not an image file.`,
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);
    if (newImages.length > 0) {
      toast({ title: `${newImages.length} image(s) added` });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
        if (image.compressedPreview) {
          URL.revokeObjectURL(image.compressedPreview);
        }
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.preview);
      if (img.compressedPreview) {
        URL.revokeObjectURL(img.compressedPreview);
      }
    });
    setImages([]);
    setSelectedImage(null);
  };

  const compressImage = async (imageFile: ImageFile): Promise<ImageFile> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageFile.preview;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Apply resizing if enabled
        if (resizeEnabled) {
          if (maintainAspectRatio) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            if (ratio < 1) {
              width = Math.round(width * ratio);
              height = Math.round(height * ratio);
            }
          } else {
            width = Math.min(width, maxWidth);
            height = Math.min(height, maxHeight);
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve({ ...imageFile, status: 'error' });
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Determine output format
        let mimeType = imageFile.file.type;
        if (outputFormat !== 'original') {
          if (outputFormat === 'jpeg') mimeType = 'image/jpeg';
          else if (outputFormat === 'png') mimeType = 'image/png';
          else if (outputFormat === 'webp') mimeType = 'image/webp';
        }

        // Get quality setting
        const quality = compressionMode === 'custom' 
          ? customQuality 
          : COMPRESSION_MODES[compressionMode].quality;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedPreview = URL.createObjectURL(blob);
              resolve({
                ...imageFile,
                compressedBlob: blob,
                compressedSize: blob.size,
                compressedPreview,
                status: 'completed',
              });
            } else {
              resolve({ ...imageFile, status: 'error' });
            }
          },
          mimeType,
          quality
        );
      };

      img.onerror = () => {
        resolve({ ...imageFile, status: 'error' });
      };
    });
  };

  const compressAllImages = async () => {
    if (images.length === 0) {
      toast({ variant: 'destructive', title: 'No images to compress' });
      return;
    }

    setIsCompressing(true);
    const updatedImages: ImageFile[] = [];

    for (const image of images) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, status: 'compressing' } : img
        )
      );

      const compressed = await compressImage(image);
      updatedImages.push(compressed);

      setImages((prev) =>
        prev.map((img) => (img.id === compressed.id ? compressed : img))
      );
    }

    setIsCompressing(false);
    const successCount = updatedImages.filter((img) => img.status === 'completed').length;
    toast({
      title: 'Compression complete!',
      description: `${successCount} of ${images.length} images compressed successfully.`,
    });
  };

  const downloadImage = (imageFile: ImageFile) => {
    if (!imageFile.compressedBlob) return;
    
    const url = URL.createObjectURL(imageFile.compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    
    let extension = imageFile.file.name.split('.').pop() || 'jpg';
    if (outputFormat !== 'original') {
      extension = outputFormat === 'jpeg' ? 'jpg' : outputFormat;
    }
    
    const baseName = imageFile.file.name.replace(/\.[^/.]+$/, '');
    a.download = `compressed_${baseName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    images
      .filter((img) => img.status === 'completed')
      .forEach((img) => {
        setTimeout(() => downloadImage(img), 100);
      });
  };

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressedSize = images.reduce((sum, img) => sum + img.compressedSize, 0);
  const totalReduction = totalOriginalSize > 0 
    ? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100 
    : 0;
  const completedCount = images.filter((img) => img.status === 'completed').length;

  const quality = compressionMode === 'custom' 
    ? customQuality 
    : COMPRESSION_MODES[compressionMode].quality;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in">
      <Card className="shadow-lg bg-card border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Advanced Image Compressor</CardTitle>
          <CardDescription>
            Batch compress, resize, and convert images with advanced options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/50 hover:border-primary'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleInputChange}
              className="hidden"
              accept="image/*"
              multiple
            />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-semibold mb-2">
              {images.length === 0 
                ? 'Click to upload images or drag and drop' 
                : `${images.length} image(s) selected`}
            </p>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, WebP, and more • Multiple files supported
            </p>
          </div>

          {/* Settings */}
          <Tabs defaultValue="compression" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="compression">
                <Zap className="mr-2 h-4 w-4" />
                Compression
              </TabsTrigger>
              <TabsTrigger value="resize">
                <Settings2 className="mr-2 h-4 w-4" />
                Resize
              </TabsTrigger>
              <TabsTrigger value="format">
                <FileImage className="mr-2 h-4 w-4" />
                Format
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compression" className="space-y-4 mt-4">
              <div className="space-y-3">
                <Label>Compression Mode</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(COMPRESSION_MODES).map(([key, mode]) => (
                    <Button
                      key={key}
                      variant={compressionMode === key ? 'default' : 'outline'}
                      className="h-auto flex-col items-start p-4"
                      onClick={() => setCompressionMode(key as CompressionMode)}
                    >
                      <span className="font-semibold">{mode.label}</span>
                      <span className="text-xs text-muted-foreground">{mode.description}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {compressionMode === 'custom' && (
                <div className="space-y-3">
                  <Label>
                    Quality: <span className="font-bold text-primary">{Math.round(customQuality * 100)}%</span>
                  </Label>
                  <Slider
                    value={[customQuality]}
                    onValueChange={(v) => setCustomQuality(v[0])}
                    min={0.1}
                    max={1}
                    step={0.05}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower quality = smaller file size. Higher quality = better image.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resize" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="resize-toggle">Enable Resizing</Label>
                <Switch
                  id="resize-toggle"
                  checked={resizeEnabled}
                  onCheckedChange={setResizeEnabled}
                />
              </div>

              {resizeEnabled && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxWidth">Max Width (px)</Label>
                      <Input
                        id="maxWidth"
                        type="number"
                        value={maxWidth}
                        onChange={(e) => setMaxWidth(Number(e.target.value))}
                        min={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxHeight">Max Height (px)</Label>
                      <Input
                        id="maxHeight"
                        type="number"
                        value={maxHeight}
                        onChange={(e) => setMaxHeight(Number(e.target.value))}
                        min={1}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="aspect-ratio">Maintain Aspect Ratio</Label>
                    <Switch
                      id="aspect-ratio"
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                    />
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="format" className="space-y-4 mt-4">
              <div className="space-y-3">
                <Label>Output Format</Label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Keep Original Format</SelectItem>
                    <SelectItem value="jpeg">Convert to JPEG</SelectItem>
                    <SelectItem value="png">Convert to PNG</SelectItem>
                    <SelectItem value="webp">Convert to WebP</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  WebP offers the best compression for web use. JPEG is widely compatible.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          {images.length > 0 && (
            <div className="flex gap-3">
              <Button
                onClick={compressAllImages}
                disabled={isCompressing}
                className="flex-1 h-12 text-lg"
                size="lg"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Compress {images.length} Image{images.length > 1 ? 's' : ''}
                  </>
                )}
              </Button>
              <Button onClick={clearAll} variant="outline" size="lg" className="h-12">
                <X className="mr-2 h-5 w-5" />
                Clear All
              </Button>
            </div>
          )}

          {/* Statistics */}
          {completedCount > 0 && (
            <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{completedCount}/{images.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Original Size</p>
                    <p className="text-2xl font-bold">{formatBytes(totalOriginalSize)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Compressed Size</p>
                    <p className="text-2xl font-bold">{formatBytes(totalCompressedSize)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Space Saved</p>
                    <p className="text-2xl font-bold text-green-500">-{totalReduction.toFixed(1)}%</p>
                  </div>
                </div>
                <Button onClick={downloadAll} className="w-full mt-4" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download All Compressed Images
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Image List */}
      {images.length > 0 && (
        <Card className="shadow-lg bg-card border-primary/20">
          <CardHeader>
            <CardTitle>Images ({images.length})</CardTitle>
            <CardDescription>Click on any image to view before/after comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <Card
                  key={img.id}
                  className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    selectedImage === img.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    if (img.status === 'completed') {
                      setSelectedImage(img.id);
                      setShowComparison(true);
                    }
                  }}
                >
                  <div className="relative aspect-video">
                    <img
                      src={img.compressedPreview || img.preview}
                      alt={img.file.name}
                      className="w-full h-full object-cover"
                    />
                    {img.status === 'compressing' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader2 className="animate-spin h-8 w-8 text-white" />
                      </div>
                    )}
                    {img.status === 'completed' && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-green-500 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 left-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 space-y-2">
                    <p className="text-sm font-medium truncate">{img.file.name}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatBytes(img.originalSize)}</span>
                      {img.status === 'completed' && (
                        <span className="text-green-500 font-semibold">
                          → {formatBytes(img.compressedSize)} (
                          {(((img.originalSize - img.compressedSize) / img.originalSize) * 100).toFixed(1)}%)
                        </span>
                      )}
                    </div>
                    {img.status === 'completed' && (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(img);
                        }}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Modal */}
      {showComparison && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowComparison(false)}
        >
          <Card className="max-w-6xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Before/After Comparison</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowComparison(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {(() => {
                const img = images.find((i) => i.id === selectedImage);
                if (!img) return null;

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <span>Original</span>
                          <span className="text-muted-foreground">({formatBytes(img.originalSize)})</span>
                        </p>
                        <div className="border rounded-lg overflow-hidden bg-muted">
                          <img src={img.preview} alt="Original" className="w-full h-auto" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <span>Compressed</span>
                          <span className="text-green-500">({formatBytes(img.compressedSize)})</span>
                        </p>
                        <div className="border rounded-lg overflow-hidden bg-muted">
                          <img src={img.compressedPreview || img.preview} alt="Compressed" className="w-full h-auto" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-center p-4 bg-muted rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Size Reduction</p>
                        <p className="text-3xl font-bold text-green-500">
                          {(((img.originalSize - img.compressedSize) / img.originalSize) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <ArrowLeftRight className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Space Saved</p>
                        <p className="text-3xl font-bold">
                          {formatBytes(img.originalSize - img.compressedSize)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}