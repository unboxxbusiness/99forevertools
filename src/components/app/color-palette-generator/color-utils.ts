export type HSLColor = { h: number; s: number; l: number };
export type ColorPalettes = {
    monochromatic: string[];
    analogous: string[];
    complementary: string[];
    triadic: string[];
};

export function hexToHsl(hex: string): HSLColor | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
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

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    const toHex = (c: number) => {
        const hex = Math.round((c + m) * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


export function generatePalettes(baseHsl: HSLColor): ColorPalettes {
    const { h, s, l } = baseHsl;

    // Monochromatic
    const monochromatic = [
        hslToHex({ h, s, l: Math.max(0, l - 20) }),
        hslToHex({ h, s, l: Math.max(0, l - 10) }),
        hslToHex({ h, s, l }),
        hslToHex({ h, s, l: Math.min(100, l + 10) }),
        hslToHex({ h, s, l: Math.min(100, l + 20) }),
    ];

    // Analogous
    const analogous = [
        hslToHex({ h: (h - 60 + 360) % 360, s, l }),
        hslToHex({ h: (h - 30 + 360) % 360, s, l }),
        hslToHex({ h, s, l }),
        hslToHex({ h: (h + 30) % 360, s, l }),
        hslToHex({ h: (h + 60) % 360, s, l }),
    ];
    
    // Complementary
    const complementary = [
        hslToHex({h, s, l}),
        hslToHex({h: (h + 180) % 360, s, l}),
    ]

    // Triadic
    const triadic = [
        hslToHex({ h, s, l }),
        hslToHex({ h: (h + 120) % 360, s, l }),
        hslToHex({ h: (h + 240) % 360, s, l }),
    ];

    return {
        monochromatic,
        analogous,
        complementary,
        triadic,
    };
}
