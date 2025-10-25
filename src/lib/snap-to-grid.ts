// Snap-to-grid utility for Fabric.js canvas
// Helps align objects to a grid for precise positioning
import { fabric } from 'fabric';

export interface GridOptions {
  enabled: boolean;
  size: number; // Grid cell size in pixels
  color: string;
  opacity: number;
}

export const DEFAULT_GRID_OPTIONS: GridOptions = {
  enabled: false,
  size: 20,
  color: '#cccccc',
  opacity: 0.3,
};

/**
 * Draw grid on canvas
 */
export function drawGrid(
  canvas: fabric.Canvas,
  options: GridOptions = DEFAULT_GRID_OPTIONS
): void {
  if (!options.enabled) {
    clearGrid(canvas);
    return;
  }

  const { size, color, opacity } = options;
  const width = canvas.width || 1080;
  const height = canvas.height || 1080;

  // Remove existing grid
  clearGrid(canvas);

  // Create vertical lines
  for (let i = 0; i <= width; i += size) {
    const line = new fabric.Line([i, 0, i, height], {
      stroke: color,
      strokeWidth: 1,
      opacity,
      selectable: false,
      evented: false,
      excludeFromExport: true,
      name: 'grid-line',
    });
    canvas.add(line);
    canvas.sendToBack(line);
  }

  // Create horizontal lines
  for (let i = 0; i <= height; i += size) {
    const line = new fabric.Line([0, i, width, i], {
      stroke: color,
      strokeWidth: 1,
      opacity,
      selectable: false,
      evented: false,
      excludeFromExport: true,
      name: 'grid-line',
    });
    canvas.add(line);
    canvas.sendToBack(line);
  }

  canvas.renderAll();
}

/**
 * Clear grid from canvas
 */
export function clearGrid(canvas: fabric.Canvas): void {
  const objects = canvas.getObjects();
  const gridLines = objects.filter((obj: any) => obj.name === 'grid-line');
  gridLines.forEach(line => canvas.remove(line));
  canvas.renderAll();
}

/**
 * Snap value to grid
 */
export function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Enable snap-to-grid for canvas
 */
export function enableSnapToGrid(
  canvas: fabric.Canvas,
  gridSize: number = 20
): () => void {
  const handleObjectMoving = (e: fabric.IEvent) => {
    const obj = e.target;
    if (!obj) return;

    // Snap position
    obj.set({
      left: snapToGrid(obj.left || 0, gridSize),
      top: snapToGrid(obj.top || 0, gridSize),
    });

    obj.setCoords();
  };

  const handleObjectScaling = (e: fabric.IEvent) => {
    const obj = e.target;
    if (!obj) return;

    // Snap scaled dimensions
    const width = (obj.width || 0) * (obj.scaleX || 1);
    const height = (obj.height || 0) * (obj.scaleY || 1);

    const snappedWidth = snapToGrid(width, gridSize);
    const snappedHeight = snapToGrid(height, gridSize);

    obj.set({
      scaleX: snappedWidth / (obj.width || 1),
      scaleY: snappedHeight / (obj.height || 1),
    });

    obj.setCoords();
  };

  // Attach event listeners
  canvas.on('object:moving', handleObjectMoving);
  canvas.on('object:scaling', handleObjectScaling);

  // Return cleanup function
  return () => {
    canvas.off('object:moving', handleObjectMoving);
    canvas.off('object:scaling', handleObjectScaling);
  };
}

/**
 * Disable snap-to-grid for canvas
 */
export function disableSnapToGrid(canvas: fabric.Canvas): void {
  canvas.off('object:moving');
  canvas.off('object:scaling');
}

/**
 * Toggle grid visibility and snap
 */
export function toggleGrid(
  canvas: fabric.Canvas,
  options: GridOptions
): GridOptions {
  const newOptions = { ...options, enabled: !options.enabled };
  drawGrid(canvas, newOptions);
  return newOptions;
}

/**
 * Update grid size
 */
export function updateGridSize(
  canvas: fabric.Canvas,
  options: GridOptions,
  newSize: number
): GridOptions {
  const newOptions = { ...options, size: newSize };
  if (options.enabled) {
    drawGrid(canvas, newOptions);
  }
  return newOptions;
}

/**
 * Snap all objects on canvas to grid
 */
export function snapAllObjectsToGrid(canvas: fabric.Canvas, gridSize: number): void {
  const objects = canvas.getObjects();
  
  objects.forEach(obj => {
    if ((obj as any).name === 'grid-line') return; // Skip grid lines
    
    obj.set({
      left: snapToGrid(obj.left || 0, gridSize),
      top: snapToGrid(obj.top || 0, gridSize),
    });
    
    obj.setCoords();
  });

  canvas.renderAll();
}

/**
 * Get snapping guidelines (smart guides)
 */
export interface SnapGuide {
  type: 'vertical' | 'horizontal';
  position: number;
  objects: fabric.Object[];
}

export function getSnapGuides(
  canvas: fabric.Canvas,
  activeObject: fabric.Object,
  threshold: number = 5
): SnapGuide[] {
  const guides: SnapGuide[] = [];
  const objects = canvas.getObjects().filter(obj => obj !== activeObject && (obj as any).name !== 'grid-line');

  const activeBounds = {
    left: activeObject.left || 0,
    top: activeObject.top || 0,
    right: (activeObject.left || 0) + (activeObject.width || 0) * (activeObject.scaleX || 1),
    bottom: (activeObject.top || 0) + (activeObject.height || 0) * (activeObject.scaleY || 1),
    centerX: (activeObject.left || 0) + ((activeObject.width || 0) * (activeObject.scaleX || 1)) / 2,
    centerY: (activeObject.top || 0) + ((activeObject.height || 0) * (activeObject.scaleY || 1)) / 2,
  };

  objects.forEach(obj => {
    const objBounds = {
      left: obj.left || 0,
      top: obj.top || 0,
      right: (obj.left || 0) + (obj.width || 0) * (obj.scaleX || 1),
      bottom: (obj.top || 0) + (obj.height || 0) * (obj.scaleY || 1),
      centerX: (obj.left || 0) + ((obj.width || 0) * (obj.scaleX || 1)) / 2,
      centerY: (obj.top || 0) + ((obj.height || 0) * (obj.scaleY || 1)) / 2,
    };

    // Vertical alignment checks
    if (Math.abs(activeBounds.left - objBounds.left) < threshold) {
      guides.push({ type: 'vertical', position: objBounds.left, objects: [obj] });
    }
    if (Math.abs(activeBounds.centerX - objBounds.centerX) < threshold) {
      guides.push({ type: 'vertical', position: objBounds.centerX, objects: [obj] });
    }
    if (Math.abs(activeBounds.right - objBounds.right) < threshold) {
      guides.push({ type: 'vertical', position: objBounds.right, objects: [obj] });
    }

    // Horizontal alignment checks
    if (Math.abs(activeBounds.top - objBounds.top) < threshold) {
      guides.push({ type: 'horizontal', position: objBounds.top, objects: [obj] });
    }
    if (Math.abs(activeBounds.centerY - objBounds.centerY) < threshold) {
      guides.push({ type: 'horizontal', position: objBounds.centerY, objects: [obj] });
    }
    if (Math.abs(activeBounds.bottom - objBounds.bottom) < threshold) {
      guides.push({ type: 'horizontal', position: objBounds.bottom, objects: [obj] });
    }
  });

  return guides;
}

/**
 * Draw snap guides on canvas
 */
export function drawSnapGuides(canvas: fabric.Canvas, guides: SnapGuide[]): void {
  // Remove existing guides
  const objects = canvas.getObjects();
  const existingGuides = objects.filter((obj: any) => obj.name === 'snap-guide');
  existingGuides.forEach(guide => canvas.remove(guide));

  // Draw new guides
  const width = canvas.width || 1080;
  const height = canvas.height || 1080;

  guides.forEach(guide => {
    let line: fabric.Line;

    if (guide.type === 'vertical') {
      line = new fabric.Line([guide.position, 0, guide.position, height], {
        stroke: '#ff0000',
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
        excludeFromExport: true,
        name: 'snap-guide',
      });
    } else {
      line = new fabric.Line([0, guide.position, width, guide.position], {
        stroke: '#ff0000',
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
        excludeFromExport: true,
        name: 'snap-guide',
      });
    }

    canvas.add(line);
  });

  canvas.renderAll();
}

/**
 * Clear snap guides from canvas
 */
export function clearSnapGuides(canvas: fabric.Canvas): void {
  const objects = canvas.getObjects();
  const guides = objects.filter((obj: any) => obj.name === 'snap-guide');
  guides.forEach(guide => canvas.remove(guide));
  canvas.renderAll();
}
