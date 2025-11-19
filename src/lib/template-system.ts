// JSON-based template system for social media designs
// All templates use open-source assets and can be serialized/deserialized

export interface TemplateMetadata {
  id: string;
  name: string;
  category: string;
  platform: string;
  width: number;
  height: number;
  thumbnail?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateData {
  metadata: TemplateMetadata;
  canvas: any; // Fabric.js JSON
}

export const PLATFORM_PRESETS = [
  { id: 'instagram-post', name: 'Instagram Post', width: 1080, height: 1080, platform: 'Instagram' },
  { id: 'instagram-story', name: 'Instagram Story', width: 1080, height: 1920, platform: 'Instagram' },
  { id: 'facebook-post', name: 'Facebook Post', width: 1200, height: 630, platform: 'Facebook' },
  { id: 'facebook-cover', name: 'Facebook Cover', width: 820, height: 312, platform: 'Facebook' },
  { id: 'twitter-post', name: 'Twitter/X Post', width: 1600, height: 900, platform: 'Twitter' },
  { id: 'linkedin-post', name: 'LinkedIn Post', width: 1200, height: 627, platform: 'LinkedIn' },
  { id: 'linkedin-cover', name: 'LinkedIn Cover', width: 1584, height: 396, platform: 'LinkedIn' },
  { id: 'youtube-thumbnail', name: 'YouTube Thumbnail', width: 1280, height: 720, platform: 'YouTube' },
  { id: 'youtube-banner', name: 'YouTube Banner', width: 2560, height: 1440, platform: 'YouTube' },
  { id: 'pinterest-pin', name: 'Pinterest Pin', width: 1000, height: 1500, platform: 'Pinterest' },
  { id: 'tiktok-video', name: 'TikTok Video', width: 1080, height: 1920, platform: 'TikTok' },
] as const;

/**
 * Predefined template designs
 */
export const PREDEFINED_TEMPLATES: TemplateData[] = [
  {
    metadata: {
      id: 'instagram-minimal-quote',
      name: 'Minimal Quote',
      category: 'Quote',
      platform: 'Instagram',
      width: 1080,
      height: 1080,
      tags: ['minimal', 'quote', 'text'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    canvas: {
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          fill: '#f5f5f5',
          selectable: false,
        },
        {
          type: 'textbox',
          left: 540,
          top: 450,
          width: 800,
          fontSize: 48,
          fontFamily: 'Inter',
          fontWeight: 600,
          text: 'Your inspiring quote here',
          fill: '#1a1a1a',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
        },
        {
          type: 'textbox',
          left: 540,
          top: 580,
          width: 600,
          fontSize: 24,
          fontFamily: 'Inter',
          text: '- Author Name',
          fill: '#666666',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
        },
      ],
    },
  },
  {
    metadata: {
      id: 'instagram-product-showcase',
      name: 'Product Showcase',
      category: 'Product',
      platform: 'Instagram',
      width: 1080,
      height: 1080,
      tags: ['product', 'business', 'promo'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    canvas: {
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1080,
          height: 1080,
          fill: '#ffffff',
          selectable: false,
        },
        {
          type: 'rect',
          left: 540,
          top: 200,
          width: 900,
          height: 600,
          fill: '#f0f0f0',
          originX: 'center',
          originY: 'center',
          rx: 20,
          ry: 20,
        },
        {
          type: 'textbox',
          left: 540,
          top: 850,
          width: 900,
          fontSize: 56,
          fontFamily: 'Poppins',
          fontWeight: 700,
          text: 'Product Name',
          fill: '#1a1a1a',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
        },
        {
          type: 'textbox',
          left: 540,
          top: 950,
          width: 800,
          fontSize: 28,
          fontFamily: 'Poppins',
          text: 'Your product description here',
          fill: '#666666',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
        },
      ],
    },
  },
  {
    metadata: {
      id: 'linkedin-announcement',
      name: 'Professional Announcement',
      category: 'Business',
      platform: 'LinkedIn',
      width: 1200,
      height: 627,
      tags: ['professional', 'announcement', 'corporate'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    canvas: {
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1200,
          height: 627,
          fill: '#0a66c2',
          selectable: false,
        },
        {
          type: 'rect',
          left: 100,
          top: 100,
          width: 1000,
          height: 427,
          fill: '#ffffff',
          rx: 12,
          ry: 12,
        },
        {
          type: 'textbox',
          left: 600,
          top: 250,
          width: 800,
          fontSize: 48,
          fontFamily: 'Montserrat',
          fontWeight: 700,
          text: 'Important Announcement',
          fill: '#0a66c2',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
        },
        {
          type: 'textbox',
          left: 600,
          top: 350,
          width: 700,
          fontSize: 24,
          fontFamily: 'Open Sans',
          text: 'Share your news with your professional network',
          fill: '#333333',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
        },
      ],
    },
  },
  {
    metadata: {
      id: 'youtube-thumbnail-gaming',
      name: 'Gaming Thumbnail',
      category: 'Gaming',
      platform: 'YouTube',
      width: 1280,
      height: 720,
      tags: ['gaming', 'youtube', 'thumbnail'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    canvas: {
      version: '5.3.0',
      objects: [
        {
          type: 'rect',
          left: 0,
          top: 0,
          width: 1280,
          height: 720,
          fill: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          selectable: false,
        },
        {
          type: 'textbox',
          left: 640,
          top: 300,
          width: 1000,
          fontSize: 72,
          fontFamily: 'Bebas Neue',
          fontWeight: 700,
          text: 'EPIC VIDEO TITLE',
          fill: '#ffffff',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          stroke: '#000000',
          strokeWidth: 3,
        },
        {
          type: 'textbox',
          left: 640,
          top: 450,
          width: 800,
          fontSize: 32,
          fontFamily: 'Poppins',
          fontWeight: 600,
          text: 'Subtitle or description',
          fill: '#ffffff',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
        },
      ],
    },
  },
];

/**
 * Save template to JSON
 */
export function saveTemplate(canvas: fabric.Canvas, metadata: Partial<TemplateMetadata>): TemplateData {
  const template: TemplateData = {
    metadata: {
      id: metadata.id || `template-${Date.now()}`,
      name: metadata.name || 'Untitled Template',
      category: metadata.category || 'Custom',
      platform: metadata.platform || 'Custom',
      width: canvas.width || 1080,
      height: canvas.height || 1080,
      tags: metadata.tags || [],
      createdAt: metadata.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    canvas: canvas.toJSON(),
  };

  return template;
}

/**
 * Load template into canvas
 */
export function loadTemplate(canvas: fabric.Canvas, template: TemplateData): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Set canvas dimensions
      canvas.setDimensions({
        width: template.metadata.width,
        height: template.metadata.height,
      });

      // Load canvas data
      canvas.loadFromJSON(template.canvas, () => {
        canvas.renderAll();
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Export template as JSON file
 */
export function exportTemplateJSON(template: TemplateData): void {
  const json = JSON.stringify(template, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${template.metadata.name.toLowerCase().replace(/\s+/g, '-')}.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Import template from JSON file
 */
export async function importTemplateJSON(file: File): Promise<TemplateData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const template: TemplateData = JSON.parse(json);
        resolve(template);
      } catch (error) {
        reject(new Error('Invalid template JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): TemplateData | undefined {
  return PREDEFINED_TEMPLATES.find(t => t.metadata.id === id);
}

/**
 * Get templates by platform
 */
export function getTemplatesByPlatform(platform: string): TemplateData[] {
  return PREDEFINED_TEMPLATES.filter(t => t.metadata.platform === platform);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): TemplateData[] {
  return PREDEFINED_TEMPLATES.filter(t => t.metadata.category === category);
}
