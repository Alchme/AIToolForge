import type { StaticTool } from '../../../types';
import { ArrowsPointingOutIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-2xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8">
        <h1 class="text-2xl font-bold text-center text-white mb-4">Image Resizer</h1>
        <input id="image-upload" type="file" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer mb-4" accept="image/*" />
        <div id="controls" class="hidden grid grid-cols-2 gap-4 items-end mb-4">
            <div>
                <label for="width" class="block text-sm font-medium text-gray-400">Width</label>
                <input type="number" id="width" class="w-full bg-gray-800 p-2 mt-1 rounded-lg">
            </div>
             <div>
                <label for="height" class="block text-sm font-medium text-gray-400">Height</label>
                <input type="number" id="height" class="w-full bg-gray-800 p-2 mt-1 rounded-lg">
            </div>
            <label class="flex items-center space-x-2 text-sm">
                <input type="checkbox" id="aspect-ratio" class="form-checkbox h-4 w-4 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-600" checked>
                <span>Maintain Aspect Ratio</span>
            </label>
        </div>
        <div id="result" class="hidden text-center">
            <h2 class="text-lg font-semibold mb-2">Preview:</h2>
            <img id="result-image" class="max-w-full mx-auto rounded-lg mb-4"/>
            <a id="download-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Download Resized Image</a>
        </div>
    </div>
    <script>
        const uploadInput = document.getElementById('image-upload');
        const controlsDiv = document.getElementById('controls');
        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        const aspectLock = document.getElementById('aspect-ratio');
        const resultDiv = document.getElementById('result');
        const resultImage = document.getElementById('result-image');
        const downloadBtn = document.getElementById('download-btn');
        let originalImage, aspectRatio;

        function resizeImage() {
            if (!originalImage) return;
            const newWidth = parseInt(widthInput.value);
            const newHeight = parseInt(heightInput.value);
            if(isNaN(newWidth) || isNaN(newHeight)) return;

            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

            resultImage.src = canvas.toDataURL();
            downloadBtn.href = resultImage.src;
            downloadBtn.download = 'resized-image.png';
            resultDiv.classList.remove('hidden');
        }
        
        uploadInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = event => {
                    originalImage = new Image();
                    originalImage.src = event.target.result;
                    originalImage.onload = () => {
                        widthInput.value = originalImage.width;
                        heightInput.value = originalImage.height;
                        aspectRatio = originalImage.width / originalImage.height;
                        controlsDiv.classList.remove('hidden');
                        resizeImage();
                    }
                }
                reader.readAsDataURL(file);
            }
        });
        
        widthInput.addEventListener('input', () => {
            if (aspectLock.checked) {
                heightInput.value = Math.round(widthInput.value / aspectRatio);
            }
            resizeImage();
        });

        heightInput.addEventListener('input', () => {
            if (aspectLock.checked) {
                widthInput.value = Math.round(heightInput.value * aspectRatio);
            }
            resizeImage();
        });

        aspectLock.addEventListener('change', () => {
            if (aspectLock.checked && originalImage) {
                aspectRatio = originalImage.width / originalImage.height;
            }
        });
    </script>
</body>
</html>
`;

export const imageResizer: StaticTool = {
    id: 'tool-image-resizer',
    name: 'Image Resizer',
    type: 'static',
    subType: 'Utility',
    description: 'Easily resize images to specific dimensions or percentages.',
    icon: ArrowsPointingOutIcon,
    iconName: 'ArrowsPointingOutIcon',
    author: 'ToolFORGE Team',
    uses: 16500,
    html: html
};