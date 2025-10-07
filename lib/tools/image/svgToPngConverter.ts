import type { StaticTool } from '../../../types';
import { SwitchHorizontalIcon } from '../../../components/Icons';

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
        <h1 class="text-2xl font-bold text-center text-white mb-4">SVG to PNG Converter</h1>
        <div class="mb-4">
            <label for="svg-upload" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <p class="mb-2 text-sm text-gray-400"><span class="font-semibold">Click to upload SVG</span></p>
                    <p class="text-xs text-gray-500">Or paste SVG code below</p>
                </div>
                <input id="svg-upload" type="file" class="hidden" accept="image/svg+xml" />
            </label>
        </div>
        <textarea id="svg-code" class="w-full h-32 bg-gray-800 p-2 rounded-lg font-mono resize-y mb-4" placeholder="<svg>...</svg>"></textarea>
        <div id="result" class="hidden text-center">
            <h2 class="text-lg font-semibold mb-2">PNG Preview:</h2>
            <img id="result-image" class="max-w-full mx-auto rounded-lg mb-4 bg-white p-2"/>
            <a id="download-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Download PNG</a>
        </div>
    </div>
    <script>
        const uploadInput = document.getElementById('svg-upload');
        const codeTextarea = document.getElementById('svg-code');
        const resultDiv = document.getElementById('result');
        const resultImage = document.getElementById('result-image');
        const downloadBtn = document.getElementById('download-btn');
        let fileName = 'converted.png';

        function convert(svgString) {
            const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                
                const pngUrl = canvas.toDataURL('image/png');
                resultImage.src = pngUrl;
                downloadBtn.href = pngUrl;
                downloadBtn.download = fileName;
                resultDiv.classList.remove('hidden');
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                alert("Invalid SVG code.");
            };
            img.src = url;
        }

        uploadInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                fileName = file.name.replace(/\\.svg$/, '.png');
                const reader = new FileReader();
                reader.onload = event => {
                    const svgString = event.target.result;
                    codeTextarea.value = svgString;
                    convert(svgString);
                };
                reader.readAsText(file);
            }
        });
        
        codeTextarea.addEventListener('input', () => {
            convert(codeTextarea.value);
        });

    </script>
</body>
</html>
`;

export const svgToPngConverter: StaticTool = {
    id: 'tool-svg-to-png-converter',
    name: 'SVG to PNG Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert SVG vector files to PNG images with a transparent background.',
    icon: SwitchHorizontalIcon,
    iconName: 'SwitchHorizontalIcon',
    author: 'ToolFORGE Team',
    uses: 13400,
    html: html
};