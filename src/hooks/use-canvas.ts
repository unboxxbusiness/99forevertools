// Custom hook for managing Fabric.js canvas with history
import { useRef, useCallback, useState, useEffect } from 'react';
import { fabric } from 'fabric';

export interface CanvasHistory {
  past: string[];
  present: string | null;
  future: string[];
}

export interface UseCanvasOptions {
  width: number;
  height: number;
  backgroundColor?: string;
  onSelectionChange?: (object: fabric.Object | null) => void;
  onObjectsChange?: (objects: fabric.Object[]) => void;
}

export function useCanvas(options: UseCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const [canvasObjects, setCanvasObjects] = useState<fabric.Object[]>([]);
  const [zoom, setZoom] = useState(1);
  
  const history = useRef<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isSavingState = useRef(false);

  // Update canvas objects list
  const updateCanvasObjects = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const objects = canvas.getObjects();
      setCanvasObjects(objects);
      options.onObjectsChange?.(objects);
    }
  }, [options]);

  // Save canvas state to history
  const saveState = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || isSavingState.current) return;
    
    isSavingState.current = true;
    const jsonState = JSON.stringify(canvas.toJSON());
    
    // Prevent saving duplicate states
    if (history.current[historyIndex] === jsonState) {
      isSavingState.current = false;
      return;
    }

    const newHistory = history.current.slice(0, historyIndex + 1);
    newHistory.push(jsonState);
    history.current = newHistory;
    setHistoryIndex(newHistory.length - 1);
    
    setTimeout(() => {
      isSavingState.current = false;
    }, 100);
  }, [historyIndex]);

  // Undo action
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isSavingState.current = true;
      const newIndex = historyIndex - 1;
      fabricCanvasRef.current?.loadFromJSON(history.current[newIndex], () => {
        fabricCanvasRef.current?.renderAll();
        setHistoryIndex(newIndex);
        updateCanvasObjects();
        setActiveObject(null);
        isSavingState.current = false;
      });
    }
  }, [historyIndex, updateCanvasObjects]);

  // Redo action
  const redo = useCallback(() => {
    if (historyIndex < history.current.length - 1) {
      isSavingState.current = true;
      const newIndex = historyIndex + 1;
      fabricCanvasRef.current?.loadFromJSON(history.current[newIndex], () => {
        fabricCanvasRef.current?.renderAll();
        setHistoryIndex(newIndex);
        updateCanvasObjects();
        setActiveObject(null);
        isSavingState.current = false;
      });
    }
  }, [historyIndex, updateCanvasObjects]);

  // Initialize canvas
  const initCanvas = useCallback(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: options.width,
        height: options.height,
        backgroundColor: options.backgroundColor || '#ffffff',
        preserveObjectStacking: true,
      });

      // Enable selection
      canvas.selection = true;

      // Handle selection events
      canvas.on('selection:created', (e) => {
        const selected = e.selected?.[0] || null;
        setActiveObject(selected);
        options.onSelectionChange?.(selected);
      });

      canvas.on('selection:updated', (e) => {
        const selected = e.selected?.[0] || null;
        setActiveObject(selected);
        options.onSelectionChange?.(selected);
      });

      canvas.on('selection:cleared', () => {
        setActiveObject(null);
        options.onSelectionChange?.(null);
      });

      // Handle object modifications
      canvas.on('object:modified', () => {
        saveState();
        updateCanvasObjects();
      });

      canvas.on('object:added', () => {
        if (!isSavingState.current) {
          saveState();
          updateCanvasObjects();
        }
      });

      canvas.on('object:removed', () => {
        if (!isSavingState.current) {
          saveState();
          updateCanvasObjects();
        }
      });

      fabricCanvasRef.current = canvas;
      saveState(); // Save initial state
      updateCanvasObjects();
    }
  }, [options, saveState, updateCanvasObjects]);

  // Update canvas dimensions
  const updateCanvasDimensions = useCallback((width: number, height: number) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.setDimensions({ width, height });
      canvas.renderAll();
    }
  }, []);

  // Update background color
  const updateBackgroundColor = useCallback((color: string) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.backgroundColor = color;
      canvas.renderAll();
      saveState();
    }
  }, [saveState]);

  // Set zoom level
  const setCanvasZoom = useCallback((zoomLevel: number) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.setZoom(zoomLevel);
      setZoom(zoomLevel);
    }
  }, []);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = options.backgroundColor || '#ffffff';
      canvas.renderAll();
      saveState();
      updateCanvasObjects();
    }
  }, [options.backgroundColor, saveState, updateCanvasObjects]);

  // Export canvas as JSON
  const exportJSON = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      return canvas.toJSON();
    }
    return null;
  }, []);

  // Import canvas from JSON
  const importJSON = useCallback((json: string | object) => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const jsonData = typeof json === 'string' ? json : JSON.stringify(json);
      canvas.loadFromJSON(jsonData, () => {
        canvas.renderAll();
        saveState();
        updateCanvasObjects();
      });
    }
  }, [saveState, updateCanvasObjects]);

  // Delete active object
  const deleteActiveObject = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas && activeObject) {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, [activeObject]);

  // Duplicate active object
  const duplicateActiveObject = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas && activeObject) {
      activeObject.clone((cloned: fabric.Object) => {
        cloned.set({
          left: (activeObject.left || 0) + 20,
          top: (activeObject.top || 0) + 20,
        });
        canvas.add(cloned);
        canvas.setActiveObject(cloned);
        canvas.renderAll();
      });
    }
  }, [activeObject]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, []);

  return {
    canvasRef,
    fabricCanvas: fabricCanvasRef.current,
    activeObject,
    canvasObjects,
    zoom,
    historyIndex,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.current.length - 1,
    initCanvas,
    updateCanvasDimensions,
    updateBackgroundColor,
    setCanvasZoom,
    clearCanvas,
    exportJSON,
    importJSON,
    undo,
    redo,
    deleteActiveObject,
    duplicateActiveObject,
    saveState,
    updateCanvasObjects,
  };
}
