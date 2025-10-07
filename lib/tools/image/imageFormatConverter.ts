import type { StaticTool } from '../../../types';
import { PhotoIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8">
        <h1 class="text-2xl font-bold text-center text-white mb-4">Image Format Converter</h1>
        <input id="image-upload" type="file" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer mb-4" accept="image/*" />
        <div id="controls" class="hidden">
            <div class="grid grid-cols-2 gap-4 items-center">
                <img id="preview" class="max-w-full rounded-lg"/>
                <div>
                    <label for="format" class="block text-sm font-medium text-gray-400 mb-2">Convert to:</label>
                    <select id="format" class="w-full bg-gray-800 p-2 rounded-lg">
                        <option value="image/png">PNG</option>
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/webp">WEBP</option>
                    </select>
                    <a id="download-btn" class="mt-4 block text-center bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Download Converted Image</a>
                </div>
            </div>
        </div>
    </div>
    <script>
        const uploadInput = document.getElementById('image-upload');
        const controlsDiv = document.getElementById('controls');
        const previewImg = document.getElementById('preview');
        const formatSelect = document.getElementById('format');
        const downloadBtn = document.getElementById('download-btn');
        let originalImage;
        let originalFileName = 'image';

        function convertImage() {
            if (!originalImage) return;

            const format = formatSelect.value;
            const newExtension = format.split('/')[1];

            const canvas = document.createElement('canvas');
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            const ctx = canvas.getContext('2d');

            // For JPEG, fill background with white first if original is transparent
            if (format === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(originalImage, 0, 0);

            const dataUrl = canvas.toDataURL(format);
            downloadBtn.href = dataUrl;
            downloadBtn.download = originalFileName.replace(/\\.[^/.]+$/, "") + '.' + newExtension;
        }

        uploadInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                originalFileName = file.name;
                const reader = new FileReader();
                reader.onload = event => {
                    originalImage = new Image();
                    originalImage.src = event.target.result;
                    originalImage.onload = () => {
                        previewImg.src = originalImage.src;
                        controlsDiv.classList.remove('hidden');
                        convertImage();
                    }
                }
                reader.readAsDataURL(file);
            }
        });

        formatSelect.addEventListener('change', convertImage);
    </script>
</body>
</html>
`;

export const imageFormatConverter: StaticTool = {
    id: 'tool-image-format-converter',
    name: 'Image Format Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert images between formats like PNG, JPG, WEBP, and GIF.',
    icon: PhotoIcon,
    iconName: 'PhotoIcon',
    author: 'ToolFORGE Team',
    uses: 22300,
    html: html
};