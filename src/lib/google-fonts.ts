// Google Fonts utility for dynamic font loading
// Open source fonts from Google Fonts API (SIL Open Font License)

export const GOOGLE_FONTS = [
  { name: 'Inter', family: 'Inter', weights: [400, 500, 600, 700], category: 'sans-serif' },
  { name: 'Roboto', family: 'Roboto', weights: [400, 500, 700], category: 'sans-serif' },
  { name: 'Poppins', family: 'Poppins', weights: [400, 500, 600, 700], category: 'sans-serif' },
  { name: 'Open Sans', family: 'Open Sans', weights: [400, 600, 700], category: 'sans-serif' },
  { name: 'Montserrat', family: 'Montserrat', weights: [400, 500, 600, 700], category: 'sans-serif' },
  { name: 'Lato', family: 'Lato', weights: [400, 700], category: 'sans-serif' },
  { name: 'Oswald', family: 'Oswald', weights: [400, 500, 600, 700], category: 'sans-serif' },
  { name: 'Raleway', family: 'Raleway', weights: [400, 500, 600, 700], category: 'sans-serif' },
  { name: 'PT Sans', family: 'PT Sans', weights: [400, 700], category: 'sans-serif' },
  { name: 'Source Sans Pro', family: 'Source Sans 3', weights: [400, 600, 700], category: 'sans-serif' },
  { name: 'Playfair Display', family: 'Playfair Display', weights: [400, 500, 600, 700], category: 'serif' },
  { name: 'Merriweather', family: 'Merriweather', weights: [400, 700], category: 'serif' },
  { name: 'Lora', family: 'Lora', weights: [400, 500, 600, 700], category: 'serif' },
  { name: 'PT Serif', family: 'PT Serif', weights: [400, 700], category: 'serif' },
  { name: 'Crimson Text', family: 'Crimson Text', weights: [400, 600, 700], category: 'serif' },
  { name: 'Roboto Mono', family: 'Roboto Mono', weights: [400, 500, 700], category: 'monospace' },
  { name: 'Source Code Pro', family: 'Source Code Pro', weights: [400, 600, 700], category: 'monospace' },
  { name: 'Fira Code', family: 'Fira Code', weights: [400, 500, 700], category: 'monospace' },
  { name: 'Ubuntu', family: 'Ubuntu', weights: [400, 500, 700], category: 'sans-serif' },
  { name: 'Nunito', family: 'Nunito', weights: [400, 600, 700], category: 'sans-serif' },
  { name: 'Dancing Script', family: 'Dancing Script', weights: [400, 500, 600, 700], category: 'handwriting' },
  { name: 'Pacifico', family: 'Pacifico', weights: [400], category: 'handwriting' },
  { name: 'Satisfy', family: 'Satisfy', weights: [400], category: 'handwriting' },
  { name: 'Bebas Neue', family: 'Bebas Neue', weights: [400], category: 'display' },
  { name: 'Righteous', family: 'Righteous', weights: [400], category: 'display' },
] as const;

export type GoogleFont = typeof GOOGLE_FONTS[number];

/**
 * Load a Google Font dynamically
 * @param fontFamily - The font family to load
 * @param weights - Array of font weights to load
 */
export function loadGoogleFont(fontFamily: string, weights: ReadonlyArray<number> = [400]): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if font is already loaded
    if (document.fonts.check(`12px "${fontFamily}"`)) {
      resolve();
      return;
    }

    // Build Google Fonts URL
  const weightsStr = Array.from(weights).join(';');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@${weightsStr}&display=swap`;
    
    // Check if link already exists
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) {
      resolve();
      return;
    }

    // Create and append link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    
    link.onload = () => {
      // Wait for font to be ready
      document.fonts.ready.then(() => resolve());
    };
    
    link.onerror = () => {
      reject(new Error(`Failed to load font: ${fontFamily}`));
    };

    document.head.appendChild(link);
  });
}

/**
 * Load multiple Google Fonts
 * @param fonts - Array of font configurations
 */
export async function loadMultipleGoogleFonts(fonts: Array<{ family: string; weights: ReadonlyArray<number> }>): Promise<void> {
  const promises = fonts.map(font => loadGoogleFont(font.family, Array.from(font.weights)));
  await Promise.all(promises);
}

/**
 * Get CSS font family string
 * @param fontFamily - The font family name
 * @param fallback - Fallback font category
 */
export function getFontFamily(fontFamily: string, fallback: string = 'sans-serif'): string {
  return `"${fontFamily}", ${fallback}`;
}

/**
 * Preload common fonts for the editor
 */
export async function preloadEditorFonts(): Promise<void> {
  const commonFonts = GOOGLE_FONTS.slice(0, 10); // Load first 10 fonts
  await loadMultipleGoogleFonts(commonFonts.map(f => ({ family: f.family, weights: f.weights })));
}
