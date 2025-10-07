
import type { StaticTool } from '../../../types';
import { PaintBrushIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        input[type="color"] { -webkit-appearance: none; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; padding: 0; }
        input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
        input[type="color"]::-webkit-color-swatch { border: 2px solid #4A5568; border-radius: 50%; }
        input[type="range"] { -webkit-appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-runnable-track { height: 4px; background: #4a5568; border-radius: 2px; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; margin-top: -6px; width: 16px; height: 16px; background: #10B981; border-radius: 50%; cursor: pointer; }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-5xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-6 h-[90%]">
        <!-- Controls -->
        <div class="md:w-1/3 bg-gray-800 p-4 rounded-lg flex flex-col space-y-4 overflow-y-auto">
            <h2 class="text-lg font-bold text-center">Controls</h2>
            <div>
                <label class="text-sm font-medium">Type</label>
                <div class="flex gap-2 mt-1">
                    <button id="type-linear" class="control-btn flex-1 bg-green-600">Linear</button>
                    <button id="type-radial" class="control-btn flex-1 bg-gray-700">Radial</button>
                </div>
            </div>
            <div id="angle-control">
                <label for="angle" class="text-sm font-medium">Angle: <span id="angle-value">90</span>°</label>
                <input type="range" id="angle" min="0" max="360" value="90" class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500 mt-1">
            </div>
            <div>
                <label class="text-sm font-medium">Colors</label>
                <div id="color-stops" class="space-y-3 mt-1"></div>
                 <button id="add-color-btn" class="w-full text-sm mt-3 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors">+ Add Color</button>
            </div>
        </div>
        <!-- Preview and Code -->
        <div class="flex-1 flex flex-col min-h-0">
            <div id="preview" class="w-full flex-grow rounded-lg border-2 border-gray-700 transition-all duration-300"></div>
            <div class="mt-4 relative">
                <pre class="bg-gray-900 text-gray-300 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap"><code id="code-output"></code></pre>
                <button id="copy-btn" class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md">Copy</button>
            </div>
        </div>
    </div>
    <script>
        const preview = document.getElementById('preview');
        const codeOutput = document.getElementById('code-output');
        const copyBtn = document.getElementById('copy-btn');
        const angleSlider = document.getElementById('angle');
        const angleValue = document.getElementById('angle-value');
        const colorStopsContainer = document.getElementById('color-stops');
        const addColorBtn = document.getElementById('add-color-btn');
        const angleControl = document.getElementById('angle-control');
        const linearBtn = document.getElementById('type-linear');
        const radialBtn = document.getElementById('type-radial');

        let state = {
            type: 'linear',
            angle: 90,
            colors: [
                { color: '#10B981', stop: 0 },
                { color: '#3B82F6', stop: 100 }
            ]
        };

        function renderColorStops() {
            colorStopsContainer.innerHTML = '';
            state.colors.forEach((c, index) => {
                const stopEl = document.createElement('div');
                stopEl.className = 'flex items-center gap-2';
                stopEl.innerHTML = \`
                    <input type="color" value="\${c.color}" data-index="\${index}" class="color-picker">
                    <input type="range" value="\${c.stop}" data-index="\${index}" min="0" max="100" class="w-full color-stop-slider">
                    <span class="w-12 text-right text-xs">\${c.stop}%</span>
                    \${state.colors.length > 2 ? \`<button class="remove-color-btn text-gray-500 hover:text-red-400" data-index="\${index}">&times;</button>\` : ''}
                \`;
                colorStopsContainer.appendChild(stopEl);
            });
        }

        function updateGradient() {
            const colorString = state.colors.map(c => \`\${c.color} \${c.stop}%\`).join(', ');
            let gradient;
            if (state.type === 'linear') {
                gradient = \`linear-gradient(\${state.angle}deg, \${colorString})\`;
            } else {
                gradient = \`radial-gradient(circle, \${colorString})\`;
            }

            preview.style.background = gradient;
            codeOutput.textContent = \`background: \${gradient};\`;
        }

        colorStopsContainer.addEventListener('input', e => {
            const index = e.target.dataset.index;
            if (e.target.classList.contains('color-picker')) {
                state.colors[index].color = e.target.value;
            }
            if (e.target.classList.contains('color-stop-slider')) {
                state.colors[index].stop = e.target.value;
                 const percentageSpan = e.target.closest('.flex').querySelector('span');
                 percentageSpan.textContent = e.target.value + '%';
            }
            updateGradient();
        });

        colorStopsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('remove-color-btn')) {
                state.colors.splice(e.target.dataset.index, 1);
                renderColorStops();
                updateGradient();
            }
        });
        
        angleSlider.addEventListener('input', e => { state.angle = e.target.value; angleValue.textContent = state.angle; updateGradient(); });
        linearBtn.addEventListener('click', () => { state.type = 'linear'; linearBtn.classList.replace('bg-gray-700', 'bg-green-600'); radialBtn.classList.replace('bg-green-600', 'bg-gray-700'); angleControl.style.display = 'block'; updateGradient(); });
        radialBtn.addEventListener('click', () => { state.type = 'radial'; radialBtn.classList.replace('bg-gray-700', 'bg-green-600'); linearBtn.classList.replace('bg-green-600', 'bg-gray-700'); angleControl.style.display = 'none'; updateGradient(); });
        addColorBtn.addEventListener('click', () => { state.colors.push({color: '#ffffff', stop: 100}); renderColorStops(); updateGradient(); });
        copyBtn.addEventListener('click', () => { navigator.clipboard.writeText(codeOutput.textContent).then(() => { copyBtn.textContent = 'Copied!'; setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000); }); });

        document.querySelectorAll('.control-btn').forEach(b => { b.classList.add('py-2', 'px-4', 'rounded-lg', 'transition-colors', 'font-semibold'); });
        renderColorStops();
        updateGradient();
    </script>
</body>
</html>
`;

export const cssGradientGenerator: StaticTool = {
    id: 'tool-css-gradient',
    name: 'CSS Gradient Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Visually create complex and beautiful CSS color gradients.',
    icon: PaintBrushIcon,
    iconName: 'PaintBrushIcon',
    author: 'ToolFORGE Team',
    uses: 13200,
    html: html,
};
