import type { StaticTool } from '../../../types';
import { SwatchIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 h-full flex flex-col md:flex-row gap-8">
        <div class="md:w-2/3 flex flex-col">
            <h1 class="text-2xl font-bold text-center text-white mb-4">Watermark Adder</h1>
            <div class="flex-grow flex items-center justify-center bg-gray-900 rounded-lg">
                <canvas id="image-canvas" class="max-w-full max-h-full"></canvas>
            </div>
        </div>
        <div class="md:w-1/3 flex flex-col space-y-4">
            <input type="file" id="image-upload" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer" accept="image/*" />
            <div>
                <label for="text" class="block text-sm font-medium text-gray-400">Watermark Text</label>
                <input type="text" id="text" class="w-full bg-gray-800 p-2 mt-1 rounded-lg" value="© My Website">
            </div>
            <div>
                <label for="opacity" class="text-sm font-medium text-gray-400">Opacity: <span id="opacity-value">0.5</span></label>
                <input type="range" id="opacity" min="0" max="1" step="0.1" value="0.5" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 mt-1">
            </div>
             <div>
                <label for="size" class="text-sm font-medium text-gray-400">Font Size: <span id="size-value">36</span></label>
                <input type="range" id="size" min="10" max="100" step="2" value="36" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 mt-1">
            </div>
            <a id="download-btn" class="mt-auto block text-center bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Download Image</a>
        </div>
    </div>
    <script>
        const canvas = document.getElementById('image-canvas');
        const ctx = canvas.getContext('2d');
        const uploadInput = document.getElementById('image-upload');
        const textInput = document.getElementById('text');
        const opacitySlider = document.getElementById('opacity');
        const opacityValue = document.getElementById('opacity-value');
        const sizeSlider = document.getElementById('size');
        const sizeValue = document.getElementById('size-value');
        const downloadBtn = document.getElementById('download-btn');
        let image;

        function applyWatermark() {
            if (!image) return;

            const MAX_WIDTH = canvas.parentElement.clientWidth;
            const scale = MAX_WIDTH / image.width;
            canvas.width = MAX_WIDTH;
            canvas.height = image.height * scale;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const text = textInput.value;
            const opacity = opacitySlider.value;
            const size = sizeSlider.value;

            ctx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
            ctx.font = \`bold \${size}px Arial\`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-0.5); // 45 degrees
            ctx.fillText(text, 0, 0);
            ctx.restore();

            downloadBtn.href = canvas.toDataURL('image/png');
        }

        uploadInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = event => {
                    image = new Image();
                    image.src = event.target.result;
                    image.onload = applyWatermark;
                }
                reader.readAsDataURL(file);
            }
        });
        
        textInput.addEventListener('input', applyWatermark);
        opacitySlider.addEventListener('input', e => { opacityValue.textContent = e.target.value; applyWatermark(); });
        sizeSlider.addEventListener('input', e => { sizeValue.textContent = e.target.value; applyWatermark(); });
        downloadBtn.download = 'watermarked-image.png';
    </script>
</body>
</html>
`;

export const watermarkAdder: StaticTool = {
    id: 'tool-watermark-adder',
    name: 'Watermark Adder',
    type: 'static',
    subType: 'Utility',
    description: 'Add a text or image watermark to your photos to protect them.',
    icon: SwatchIcon,
    iconName: 'SwatchIcon',
    author: 'ToolFORGE Team',
    uses: 6800,
    html: html
};