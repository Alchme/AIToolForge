import type { StaticTool } from '../../../types';
import { ArrowsPointingInIcon } from '../../../components/Icons';

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
        <h1 class="text-3xl font-bold text-center text-white mb-4">Image Compressor</h1>
        <div class="mb-4">
            <label for="image-upload" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="mb-2 text-sm text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500">PNG, JPG or WEBP</p>
                </div>
                <input id="image-upload" type="file" class="hidden" accept="image/png, image/jpeg, image/webp" />
            </label>
        </div>
        <div id="controls" class="hidden">
            <div class="mb-4">
                <label for="quality" class="block text-sm font-medium text-gray-400">Quality (<span id="quality-value">0.7</span>)</label>
                <input type="range" id="quality" min="0.1" max="1" step="0.1" value="0.7" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500">
            </div>
            <div id="result" class="text-center">
                <h2 class="text-lg font-semibold mb-2">Result:</h2>
                <img id="result-image" class="max-w-full mx-auto rounded-lg mb-2 border-2 border-gray-700"/>
                <p id="size-info" class="text-sm text-gray-400 mb-4"></p>
                <a id="download-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg inline-block transition-colors">Download Image</a>
            </div>
        </div>
    </div>
    <script>
        const uploadInput = document.getElementById('image-upload');
        const qualitySlider = document.getElementById('quality');
        const qualityValue = document.getElementById('quality-value');
        const controlsDiv = document.getElementById('controls');
        const resultImage = document.getElementById('result-image');
        const sizeInfo = document.getElementById('size-info');
        const downloadBtn = document.getElementById('download-btn');
        let originalFile;

        function compressImage() {
            if (!originalFile) return;

            const quality = parseFloat(qualitySlider.value);
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                        const originalSize = (originalFile.size / 1024).toFixed(2);
                        const compressedSize = (blob.size / 1024).toFixed(2);
                        const reduction = (((originalSize - compressedSize) / originalSize) * 100).toFixed(0);

                        resultImage.src = URL.createObjectURL(blob);
                        downloadBtn.href = resultImage.src;
                        downloadBtn.download = 'compressed-' + originalFile.name;
                        sizeInfo.innerHTML = 'Original: <span class="font-semibold">' + originalSize + ' KB</span> | Compressed: <span class="font-semibold text-green-400">' + compressedSize + ' KB</span> (' + reduction + '% smaller)';
                        controlsDiv.classList.remove('hidden');
                    }, 'image/jpeg', quality);
                }
            };
            reader.readAsDataURL(originalFile);
        }

        uploadInput.addEventListener('change', (e) => {
            originalFile = e.target.files[0];
            if (originalFile) {
                compressImage();
            }
        });

        qualitySlider.addEventListener('input', (e) => {
            qualityValue.textContent = e.target.value;
            compressImage();
        });
    </script>
</body>
</html>
`;

export const imageCompressor: StaticTool = {
    id: 'tool-image-compressor',
    name: 'Image Compressor',
    type: 'static',
    subType: 'Utility',
    description: 'Reduce the file size of your images with smart compression.',
    icon: ArrowsPointingInIcon,
    iconName: 'ArrowsPointingInIcon',
    author: 'ToolFORGE Team',
    uses: 17800,
    html: html
};
