
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
        .color-card { 
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; 
            min-height: 12rem;
        }
        .color-card:hover { 
            transform: translateY(-8px); 
            box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }
    </style>
</head>
<body class="text-white">
    <div class="container mx-auto p-8">
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold">Color Palette Generator</h1>
            <p class="text-gray-400 mt-2">Click the button or press the spacebar to generate a new palette.</p>
        </header>
        <div id="palette" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        </div>
        <div class="text-center">
            <button id="generateBtn" class="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30">
                Generate Palette
            </button>
        </div>
    </div>
    <script>
        const paletteContainer = document.getElementById('palette');
        const generateBtn = document.getElementById('generateBtn');

        function generatePalette() { 
            paletteContainer.innerHTML = ''; 
            const baseHue = Math.random() * 360;
            const baseSaturation = 0.5 + Math.random() * 0.4; // Saturation between 0.5 and 0.9
            const baseLightness = 0.6 + Math.random() * 0.1; // Lightness between 0.6 and 0.7
            
            const schemes = ['complementary', 'analogous', 'triadic', 'split-complementary'];
            const scheme = schemes[Math.floor(Math.random()*schemes.length)];
            
            const colors = [hslToRgb(baseHue, baseSaturation, baseLightness)];

            switch(scheme) {
                case 'complementary':
                    colors.push(hslToRgb((baseHue + 180) % 360, baseSaturation, baseLightness));
                    break;
                case 'analogous':
                    colors.push(hslToRgb((baseHue + 30) % 360, baseSaturation, baseLightness));
                    colors.push(hslToRgb((baseHue - 30 + 360) % 360, baseSaturation, baseLightness));
                    break;
                case 'triadic':
                    colors.push(hslToRgb((baseHue + 120) % 360, baseSaturation, baseLightness));
                    colors.push(hslToRgb((baseHue + 240) % 360, baseSaturation, baseLightness));
                    break;
                 case 'split-complementary':
                    colors.push(hslToRgb((baseHue + 150) % 360, baseSaturation, baseLightness));
                    colors.push(hslToRgb((baseHue + 210) % 360, baseSaturation, baseLightness));
                    break;
            }
            
            // Fill up to 5 colors
            while(colors.length < 5) {
                const newHue = (baseHue + colors.length * 60 + Math.random() * 60) % 360;
                const newSat = Math.max(0.2, baseSaturation - (Math.random() * 0.3));
                const newLight = Math.min(0.9, baseLightness + (Math.random() * 0.3));
                colors.push(hslToRgb(newHue, newSat, newLight));
            }
            
            colors.slice(0, 5).forEach(colorRgb => { 
                const colorHex = rgbToHex(colorRgb.r, colorRgb.g, colorRgb.b);
                const colorCard = document.createElement('div'); 
                colorCard.className = 'color-card rounded-lg shadow-lg text-center p-4 cursor-pointer flex flex-col justify-end'; 
                colorCard.style.backgroundColor = colorHex; 
                const hexValue = document.createElement('div'); 
                hexValue.className = 'font-mono text-lg font-semibold p-2 rounded'; 
                const contrastColor = getContrastColor(colorHex);
                hexValue.style.color = contrastColor;
                hexValue.style.backgroundColor = contrastColor === '#000000' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
                hexValue.textContent = colorHex.toUpperCase(); 
                colorCard.appendChild(hexValue); 
                colorCard.onclick = () => copyToClipboard(colorHex); 
                paletteContainer.appendChild(colorCard); 
            }); 
        }
        
        function hexToRgb(hex) { const m = hex.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i); return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null; }
        function rgbToHex(r, g, b) { return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join(''); }
        function hslToRgb(h, s, l) { let r, g, b; if(s == 0){ r = g = b = l; } else { const hue2rgb = (p, q, t) => { if(t < 0) t += 1; if(t > 1) t -= 1; if(t < 1/6) return p + (q - p) * 6 * t; if(t < 1/2) return q; if(t < 2/3) return p + (q - p) * (2/3 - t) * 6; return p; }; let q = l < 0.5 ? l * (1 + s) : l + s - l * s; let p = 2 * l - q; h /= 360; r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3); } return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)}; }
        function getContrastColor(hex) { const rgb = hexToRgb(hex); if (!rgb) return '#000000'; const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255; return luminance > 0.5 ? '#000000' : '#FFFFFF'; }
        function copyToClipboard(text) { navigator.clipboard.writeText(text).then(() => { const notification = document.createElement('div'); notification.textContent = 'Copied ' + text.toUpperCase() + '!'; notification.className = 'fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300'; document.body.appendChild(notification); setTimeout(() => { notification.classList.add('opacity-0'); setTimeout(() => document.body.removeChild(notification), 300); }, 2000); }); }
        
        generateBtn.addEventListener('click', generatePalette);
        window.addEventListener('keydown', (e) => { if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); generatePalette(); } });
        generatePalette();
    </script>
</body>
</html>
`;

export const colorPaletteGenerator: StaticTool = {
    id: 'tool-palette',
    name: 'Color Palette Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Generates beautiful, harmonious color palettes for your design projects.',
    icon: PaletteIcon,
    iconName: 'PaletteIcon',
    author: 'ToolFORGE Team',
    uses: 22100,
    html: html
};
