import type { StaticTool } from '../../../types';
import { RectangleGroupIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> body { font-family: 'Inter', sans-serif; background-color: #121212; } </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8">
        <h1 class="text-2xl font-bold text-center text-white mb-6">Aspect Ratio Calculator</h1>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block text-sm font-medium text-gray-400">Original Width</label>
                <input type="number" id="ow" class="calc-input w-full bg-gray-800 p-2 mt-1 rounded-lg" value="1920">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-400">Original Height</label>
                <input type="number" id="oh" class="calc-input w-full bg-gray-800 p-2 mt-1 rounded-lg" value="1080">
            </div>
        </div>
        
        <div class="text-center text-gray-500 mb-4">is a <span id="ratio" class="font-bold text-green-400">16:9</span> aspect ratio</div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-400">New Width</label>
                <input type="number" id="nw" class="calc-input w-full bg-gray-800 p-2 mt-1 rounded-lg" value="1280">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-400">New Height</label>
                <input type="number" id="nh" class="calc-input w-full bg-gray-800 p-2 mt-1 rounded-lg">
            </div>
        </div>
    </div>
    <script>
        const ow_input = document.getElementById('ow');
        const oh_input = document.getElementById('oh');
        const nw_input = document.getElementById('nw');
        const nh_input = document.getElementById('nh');
        const ratioEl = document.getElementById('ratio');
        let lastChanged = 'w';

        function gcd(a, b) {
            return b === 0 ? a : gcd(b, a % b);
        }

        function calculate() {
            const ow = parseInt(ow_input.value) || 0;
            const oh = parseInt(oh_input.value) || 0;
            const nw = parseInt(nw_input.value) || 0;
            const nh = parseInt(nh_input.value) || 0;
            
            if (ow <= 0 || oh <= 0) return;
            
            const commonDivisor = gcd(ow, oh);
            ratioEl.textContent = \`\${ow/commonDivisor}:\${oh/commonDivisor}\`;
            
            const ratio = ow / oh;

            if (lastChanged === 'w' && nw > 0) {
                nh_input.value = Math.round(nw / ratio);
            } else if (lastChanged === 'h' && nh > 0) {
                nw_input.value = Math.round(nh * ratio);
            }
        }
        
        nw_input.addEventListener('input', () => { lastChanged = 'w'; calculate(); });
        nh_input.addEventListener('input', () => { lastChanged = 'h'; calculate(); });
        ow_input.addEventListener('input', calculate);
        oh_input.addEventListener('input', calculate);
        
        calculate();

    </script>
</body>
</html>
`;

export const aspectRatioCalculator: StaticTool = {
    id: 'tool-aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Calculate the correct dimensions for images and videos at any aspect ratio.',
    icon: RectangleGroupIcon,
    iconName: 'RectangleGroupIcon',
    author: 'ToolFORGE Team',
    uses: 8100,
    html: html
};