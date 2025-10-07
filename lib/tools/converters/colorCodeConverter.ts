
import type { StaticTool } from '../../../types';
import { PaletteIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; }
        input[type="color"] { -webkit-appearance: none; border: none; width: 100%; height: 6rem; border-radius: 0.5rem; cursor: pointer; }
        input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
        input[type="color"]::-webkit-color-swatch { border: 2px solid #4a5568; border-radius: 0.5rem; }
        .color-input { width: 100%; background-color: #2d3748; padding: 0.5rem; border-radius: 0.375rem; font-family: monospace; border: 1px solid #4a5568; }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-sm mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Color Converter</h1>
        <div class="flex gap-4 items-center">
            <div id="color-preview" class="w-24 h-24 rounded-full border-4 border-gray-700 transition-colors duration-300 flex-shrink-0"></div>
            <div class="flex-1 space-y-3">
                <input type="color" id="colorPicker" value="#4ade80">
            </div>
        </div>
        <div class="space-y-3">
            <div>
                <label for="hex" class="text-sm font-medium text-gray-400">HEX</label>
                <input type="text" id="hex" class="color-input mt-1">
            </div>
             <div>
                <label class="text-sm font-medium text-gray-400">RGB</label>
                <div class="grid grid-cols-3 gap-2 mt-1">
                    <input type="number" id="rgbR" min="0" max="255" class="color-input" placeholder="R">
                    <input type="number" id="rgbG" min="0" max="255" class="color-input" placeholder="G">
                    <input type="number" id="rgbB" min="0" max="255" class="color-input" placeholder="B">
                </div>
             </div>
             <div>
                <label class="text-sm font-medium text-gray-400">HSL</label>
                <div class="grid grid-cols-3 gap-2 mt-1">
                    <input type="number" id="hslH" min="0" max="360" class="color-input" placeholder="H">
                    <input type="number" id="hslS" min="0" max="100" class="color-input" placeholder="S">
                    <input type="number" id="hslL" min="0" max="100" class="color-input" placeholder="L">
                </div>
             </div>
        </div>
    </div>
    <script>
        const elements = {
            picker: document.getElementById('colorPicker'),
            preview: document.getElementById('color-preview'),
            hex: document.getElementById('hex'),
            r: document.getElementById('rgbR'),
            g: document.getElementById('rgbG'),
            b: document.getElementById('rgbB'),
            h: document.getElementById('hslH'),
            s: document.getElementById('hslS'),
            l: document.getElementById('hslL'),
        };
        let isUpdating = false;

        function updateAll(source) {
            if (isUpdating) return;
            isUpdating = true;
            try {
                let r, g, b;
                if (source === 'picker' || source === 'hex') {
                    const hex = (source === 'picker' ? elements.picker.value : elements.hex.value).replace(/[^0-9a-f]/gi, '');
                    if (hex.length === 3) {
                        const [rh, gh, bh] = hex.split('');
                        ({r, g, b} = hexToRgb(\`#\${rh}\${rh}\${gh}\${gh}\${bh}\${bh}\`));
                    } else if (hex.length === 6) {
                        ({r, g, b} = hexToRgb(\`#\${hex}\`));
                    } else { throw new Error('Invalid HEX'); }
                } else if (source === 'rgb') {
                    r = parseInt(elements.r.value); g = parseInt(elements.g.value); b = parseInt(elements.b.value);
                    if (isNaN(r) || isNaN(g) || isNaN(b)) { throw new Error('Invalid RGB'); }
                } else if (source === 'hsl') {
                    const hVal = parseInt(elements.h.value), sVal = parseInt(elements.s.value), lVal = parseInt(elements.l.value);
                    if (isNaN(hVal) || isNaN(sVal) || isNaN(lVal)) { throw new Error('Invalid HSL'); }
                    ({r, g, b} = hslToRgb(hVal, sVal / 100, lVal / 100));
                }

                if (r === undefined) throw new Error('Could not derive color');
                
                const hexValue = rgbToHex(r, g, b);
                const { h, s, l } = rgbToHsl(r, g, b);

                if (source !== 'picker') elements.picker.value = hexValue;
                if (source !== 'hex') elements.hex.value = hexValue;
                if (source !== 'rgb') { elements.r.value = r; elements.g.value = g; elements.b.value = b; }
                if (source !== 'hsl') { elements.h.value = Math.round(h); elements.s.value = Math.round(s * 100); elements.l.value = Math.round(l * 100); }
                elements.preview.style.backgroundColor = hexValue;

            } catch(e) { /* Gracefully fail on invalid intermediate input */ }
            finally { isUpdating = false; }
        }

        elements.picker.addEventListener('input', () => updateAll('picker'));
        elements.hex.addEventListener('input', () => updateAll('hex'));
        ['r', 'g', 'b'].forEach(c => elements[c].addEventListener('input', () => updateAll('rgb')));
        ['h', 's', 'l'].forEach(c => elements[c].addEventListener('input', () => updateAll('hsl')));
        
        function hexToRgb(h) { const m = h.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i); return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }; }
        function rgbToHex(r, g, b) { return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join(''); }
        function rgbToHsl(r, g, b) { r /= 255; g /= 255; b /= 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0, s, l = (max + min) / 2; if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; } h /= 6; } return { h: h * 360, s: s || 0, l }; }
        function hslToRgb(h, s, l) { let r, g, b; if (s === 0) { r = g = b = l; } else { const hue2rgb = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; }; const q = l < 0.5 ? l * (1 + s) : l + s - l * s; const p = 2 * l - q; h /= 360; r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3); } return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }; }

        updateAll('picker');
    </script>
</body>
</html>
`;

export const colorCodeConverter: StaticTool = {
    id: 'tool-color-code-converter',
    name: 'Color Code Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert color codes between HEX, RGB, and HSL formats.',
    icon: PaletteIcon,
    iconName: 'PaletteIcon',
    author: 'ToolFORGE Team',
    uses: 15400,
    html: html,
};
