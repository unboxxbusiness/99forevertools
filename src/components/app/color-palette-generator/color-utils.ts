
export type HSLColor = { h: number; s: number; l: number };

type ColorInfo = {
    hex: string;
    hsl: HSLColor;
    luminance: number;
}

export type WebsitePalette = {
    name: string;
    type: string;
    background: ColorInfo;
    foreground: ColorInfo;
    primary: ColorInfo;
    primaryForeground: ColorInfo;
    accent: ColorInfo;
    accentForeground: ColorInfo;
    contrasts: {
        fgOnBg: number;
        primaryOnBg: number;
        accentOnBg: number;
        primaryFgOnPrimary: number;
        accentFgOnAccent: number;
    }
};

function getLuminance(hsl: HSLColor): number {
    const [r, g, b] = hslToRgb(hsl).map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrast(lum1: number, lum2: number): number {
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
}

function createColorInfo(hsl: HSLColor): ColorInfo {
    return {
        hsl,
        hex: hslToHex(hsl),
        luminance: getLuminance(hsl),
    }
}

export function hexToHsl(hex: string): HSLColor | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToHex({ h, s, l }: HSLColor): string {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (h < 60) { [r, g, b] = [c, x, 0]; }
    else if (h < 120) { [r, g, b] = [x, c, 0]; }
    else if (h < 180) { [r, g, b] = [0, c, x]; }
    else if (h < 240) { [r, g, b] = [0, x, c]; }
    else if (h < 300) { [r, g, b] = [x, 0, c]; }
    else { [r, g, b] = [c, 0, x]; }

    const toHex = (c: number) => {
        const hex = Math.round((c + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hslToRgb({ h, s, l }: HSLColor): [number, number, number] {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;
    let r=0, g=0, b=0;

    if (h < 60) { [r, g, b] = [c, x, 0]; }
    else if (h < 120) { [r, g, b] = [x, c, 0]; }
    else if (h < 180) { [r, g, b] = [0, c, x]; }
    else if (h < 240) { [r, g, b] = [0, x, c]; }
    else if (h < 300) { [r, g, b] = [x, 0, c]; }
    else { [r, g, b] = [c, 0, x]; }

    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function getBestForeground(bgLuminance: number): HSLColor {
    return bgLuminance > 0.5 ? { h: 0, s: 0, l: 0 } : { h: 0, s: 0, l: 100 }; // Black or White
}

function generatePalette(name: string, type: string, primaryHsl: HSLColor, accentHsl: HSLColor): WebsitePalette {
    const primary = createColorInfo(primaryHsl);
    const accent = createColorInfo(accentHsl);

    // Determine a base background, can be light or dark
    const isPrimaryDark = primary.luminance < 0.5;
    const background = createColorInfo(isPrimaryDark ? {h: primary.hsl.h, s: 10, l: 95} : {h: primary.hsl.h, s: 10, l: 5});
    const foreground = createColorInfo(getBestForeground(background.luminance));
    
    // Ensure primary and accent colors have enough contrast against the background
    // This is a simplified adjustment logic
    let adjustedPrimary = primary;
    if(getContrast(primary.luminance, background.luminance) < 2.5) {
        adjustedPrimary = createColorInfo({...primary.hsl, l: isPrimaryDark ? primary.hsl.l + 15 : primary.hsl.l - 15});
    }

    let adjustedAccent = accent;
    if(getContrast(accent.luminance, background.luminance) < 2.5) {
        adjustedAccent = createColorInfo({...accent.hsl, l: accent.luminance < 0.5 ? accent.hsl.l + 15 : accent.hsl.l - 15});
    }

    const primaryForeground = createColorInfo(getBestForeground(adjustedPrimary.luminance));
    const accentForeground = createColorInfo(getBestForeground(adjustedAccent.luminance));

    return {
        name,
        type,
        background,
        foreground,
        primary: adjustedPrimary,
        primaryForeground,
        accent: adjustedAccent,
        accentForeground,
        contrasts: {
            fgOnBg: getContrast(foreground.luminance, background.luminance),
            primaryOnBg: getContrast(adjustedPrimary.luminance, background.luminance),
            accentOnBg: getContrast(adjustedAccent.luminance, background.luminance),
            primaryFgOnPrimary: getContrast(primaryForeground.luminance, adjustedPrimary.luminance),
            accentFgOnAccent: getContrast(accentForeground.luminance, adjustedAccent.luminance),
        }
    };
}


export function generateWebsitePalettes(baseHsl: HSLColor): WebsitePalette[] {
    const { h, s, l } = baseHsl;

    const palettes = [];

    // 1. Analogous
    const analogousAccent = { h: (h + 30) % 360, s: s, l };
    palettes.push(generatePalette('Vibrant Analogous', 'Analogous', baseHsl, analogousAccent));
    
    // 2. Complementary
    const complementaryAccent = { h: (h + 180) % 360, s: s, l };
    palettes.push(generatePalette('High-Contrast Complementary', 'Complementary', baseHsl, complementaryAccent));
    
    // 3. Triadic
    const triadicAccent = { h: (h + 120) % 360, s: s, l };
    palettes.push(generatePalette('Creative Triadic', 'Triadic', baseHsl, triadicAccent));

    // 4. Monochromatic
    const monoAccent = { h: h, s: s, l: Math.max(0, l - 20) };
    palettes.push(generatePalette('Calm Monochromatic', 'Monochromatic', baseHsl, monoAccent));

    return palettes;
}
