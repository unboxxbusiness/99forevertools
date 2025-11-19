// Canvas export utilities with support for PNG, JPG, SVG
// Uses browser-native canvas.toBlob() API (no external dependencies)

export type ExportFormat = 'png' | 'jpg' | 'svg';

export interface ExportOptions {
  format: ExportFormat;
  quality?: number; // 0-1 for JPG
  filename?: string;
  multiplier?: number; // Scale factor for higher resolution
}

/**
 * Export Fabric.js canvas as PNG
 */
export async function exportCanvasToPNG(
  canvas: fabric.Canvas,
  options: { quality?: number; filename?: string; multiplier?: number } = {}
): Promise<void> {
  const {
    quality = 1,
    filename = `design-${Date.now()}.png`,
    multiplier = 1,
  } = options;

  return new Promise((resolve, reject) => {
    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality,
        multiplier,
      });

      downloadDataURL(dataURL, filename);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Export Fabric.js canvas as JPG
 */
export async function exportCanvasToJPG(
  canvas: fabric.Canvas,
  options: { quality?: number; filename?: string; multiplier?: number } = {}
): Promise<void> {
  const {
    quality = 0.9,
    filename = `design-${Date.now()}.jpg`,
    multiplier = 1,
  } = options;

  return new Promise((resolve, reject) => {
    try {
      const dataURL = canvas.toDataURL({
        format: 'jpeg',
        quality,
        multiplier,
      });

      downloadDataURL(dataURL, filename);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Export Fabric.js canvas as SVG
 */
export async function exportCanvasToSVG(
  canvas: fabric.Canvas,
  options: { filename?: string } = {}
): Promise<void> {
  const { filename = `design-${Date.now()}.svg` } = options;

  return new Promise((resolve, reject) => {
    try {
      const svgData = canvas.toSVG();
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      downloadURL(url, filename);
      URL.revokeObjectURL(url);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Universal export function that supports all formats
 */
export async function exportCanvas(
  canvas: fabric.Canvas,
  options: ExportOptions
): Promise<void> {
  const { format, quality = 1, filename, multiplier = 1 } = options;

  const baseFilename = filename || `design-${Date.now()}`;

  switch (format) {
    case 'png':
      return exportCanvasToPNG(canvas, {
        quality,
        filename: baseFilename.endsWith('.png') ? baseFilename : `${baseFilename}.png`,
        multiplier,
      });

    case 'jpg':
      return exportCanvasToJPG(canvas, {
        quality,
        filename: baseFilename.endsWith('.jpg') ? baseFilename : `${baseFilename}.jpg`,
        multiplier,
      });

    case 'svg':
      return exportCanvasToSVG(canvas, {
        filename: baseFilename.endsWith('.svg') ? baseFilename : `${baseFilename}.svg`,
      });

    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

/**
 * Download data URL as file
 */
function downloadDataURL(dataURL: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download URL as file
 */
function downloadURL(url: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Get canvas as Blob (useful for uploading)
 */
export async function getCanvasBlob(
  canvas: fabric.Canvas,
  options: { format?: 'png' | 'jpg'; quality?: number } = {}
): Promise<Blob> {
  const { format = 'png', quality = 1 } = options;

  return new Promise((resolve, reject) => {
    try {
      const dataURL = canvas.toDataURL({
        format: format === 'jpg' ? 'jpeg' : 'png',
        quality,
      });

      // Convert dataURL to Blob
      fetch(dataURL)
        .then(res => res.blob())
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Calculate optimal export dimensions based on platform
 */
export function getOptimalDimensions(platform: string): { width: number; height: number } {
  const presets: Record<string, { width: number; height: number }> = {
    'instagram-post': { width: 1080, height: 1080 },
    'instagram-story': { width: 1080, height: 1920 },
    'facebook-post': { width: 1200, height: 630 },
    'facebook-cover': { width: 820, height: 312 },
    'twitter-post': { width: 1600, height: 900 },
    'linkedin-post': { width: 1200, height: 627 },
    'youtube-thumbnail': { width: 1280, height: 720 },
    'youtube-banner': { width: 2560, height: 1440 },
    'pinterest-pin': { width: 1000, height: 1500 },
    'tiktok-video': { width: 1080, height: 1920 },
  };

  return presets[platform] || { width: 1080, height: 1080 };
}
