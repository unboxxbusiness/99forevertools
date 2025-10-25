// Keyboard shortcuts hook for canvas operations
import { useEffect, useCallback } from 'react';

export interface KeyboardShortcuts {
  undo: () => void;
  redo: () => void;
  delete: () => void;
  copy: () => void;
  paste: () => void;
  duplicate: () => void;
  selectAll: () => void;
  deselect: () => void;
  group: () => void;
  ungroup: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  nudgeUp: () => void;
  nudgeDown: () => void;
  nudgeLeft: () => void;
  nudgeRight: () => void;
  save: () => void;
  export: () => void;
}

export function useKeyboardShortcuts(shortcuts: Partial<KeyboardShortcuts>) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      const ctrl = event.ctrlKey || event.metaKey;
      const shift = event.shiftKey;
      const alt = event.altKey;

      // Undo: Ctrl+Z
      if (ctrl && !shift && event.key === 'z') {
        event.preventDefault();
        shortcuts.undo?.();
      }

      // Redo: Ctrl+Shift+Z or Ctrl+Y
      if ((ctrl && shift && event.key === 'z') || (ctrl && event.key === 'y')) {
        event.preventDefault();
        shortcuts.redo?.();
      }

      // Delete: Delete or Backspace
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        shortcuts.delete?.();
      }

      // Copy: Ctrl+C
      if (ctrl && event.key === 'c') {
        event.preventDefault();
        shortcuts.copy?.();
      }

      // Paste: Ctrl+V
      if (ctrl && event.key === 'v') {
        event.preventDefault();
        shortcuts.paste?.();
      }

      // Duplicate: Ctrl+D
      if (ctrl && event.key === 'd') {
        event.preventDefault();
        shortcuts.duplicate?.();
      }

      // Select All: Ctrl+A
      if (ctrl && event.key === 'a') {
        event.preventDefault();
        shortcuts.selectAll?.();
      }

      // Deselect: Escape
      if (event.key === 'Escape') {
        event.preventDefault();
        shortcuts.deselect?.();
      }

      // Group: Ctrl+G
      if (ctrl && !shift && event.key === 'g') {
        event.preventDefault();
        shortcuts.group?.();
      }

      // Ungroup: Ctrl+Shift+G
      if (ctrl && shift && event.key === 'g') {
        event.preventDefault();
        shortcuts.ungroup?.();
      }

      // Bring Forward: Ctrl+]
      if (ctrl && event.key === ']') {
        event.preventDefault();
        shortcuts.bringForward?.();
      }

      // Send Backward: Ctrl+[
      if (ctrl && event.key === '[') {
        event.preventDefault();
        shortcuts.sendBackward?.();
      }

      // Nudge with arrow keys
      const nudgeDistance = shift ? 10 : 1; // Shift for larger nudges

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        shortcuts.nudgeUp?.();
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        shortcuts.nudgeDown?.();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        shortcuts.nudgeLeft?.();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        shortcuts.nudgeRight?.();
      }

      // Save: Ctrl+S
      if (ctrl && event.key === 's') {
        event.preventDefault();
        shortcuts.save?.();
      }

      // Export: Ctrl+E
      if (ctrl && event.key === 'e') {
        event.preventDefault();
        shortcuts.export?.();
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

/**
 * Get keyboard shortcuts help text
 */
export function getKeyboardShortcutsHelp(): Array<{
  category: string;
  shortcuts: Array<{ keys: string; description: string }>;
}> {
  return [
    {
      category: 'General',
      shortcuts: [
        { keys: 'Ctrl + Z', description: 'Undo' },
        { keys: 'Ctrl + Shift + Z / Ctrl + Y', description: 'Redo' },
        { keys: 'Ctrl + S', description: 'Save project' },
        { keys: 'Ctrl + E', description: 'Export image' },
        { keys: 'Escape', description: 'Deselect' },
      ],
    },
    {
      category: 'Edit',
      shortcuts: [
        { keys: 'Delete / Backspace', description: 'Delete selected' },
        { keys: 'Ctrl + C', description: 'Copy' },
        { keys: 'Ctrl + V', description: 'Paste' },
        { keys: 'Ctrl + D', description: 'Duplicate' },
        { keys: 'Ctrl + A', description: 'Select all' },
      ],
    },
    {
      category: 'Arrange',
      shortcuts: [
        { keys: 'Ctrl + G', description: 'Group objects' },
        { keys: 'Ctrl + Shift + G', description: 'Ungroup' },
        { keys: 'Ctrl + ]', description: 'Bring forward' },
        { keys: 'Ctrl + [', description: 'Send backward' },
      ],
    },
    {
      category: 'Position',
      shortcuts: [
        { keys: '← → ↑ ↓', description: 'Nudge 1px' },
        { keys: 'Shift + Arrow', description: 'Nudge 10px' },
      ],
    },
  ];
}
