import type { StaticTool } from '../../../types';
import { HeartIcon } from '../../../components/Icons';

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
        <h1 class="text-2xl font-bold text-center text-white mb-4">Favicon Generator</h1>
        <input id="image-upload" type="file" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer mb-4" accept="image/*" />
        <div id="result" class="hidden">
             <h2 class="text-lg font-semibold mb-2">Generated Favicons:</h2>
             <div id="icon-grid" class="grid grid-cols-4 gap-4"></div>
             <p class="text-xs text-gray-500 mt-4">Note: A full favicon package would include more sizes and an .ico file. This is a simplified generator.</p>
        </div>
    </div>
    <script>
        const uploadInput = document.getElementById('image-upload');
        const resultDiv = document.getElementById('result');
        const iconGrid = document.getElementById('icon-grid');
        const SIZES = [16, 32, 48, 180]; // Common favicon sizes

        function generateFavicons(image) {
            iconGrid.innerHTML = '';
            resultDiv.classList.remove('hidden');

            SIZES.forEach(size => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, size, size);

                const dataUrl = canvas.toDataURL('image/png');

                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = \`favicon-\${size}x\${size}.png\`;
                link.className = "flex flex-col items-center p-2 bg-gray-800 rounded-lg hover:bg-gray-700";
                
                const img = document.createElement('img');
                img.src = dataUrl;
                img.width = size;
                img.height = size;
                
                const label = document.createElement('span');
                label.textContent = \`\${size}x\${size}\`;
                label.className = "text-xs mt-1 text-gray-400";

                link.appendChild(img);
                link.appendChild(label);
                iconGrid.appendChild(link);
            });
        }
        
        uploadInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = event => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => generateFavicons(img);
                }
                reader.readAsDataURL(file);
            }
        });

    </script>
</body>
</html>
`;

export const faviconGenerator: StaticTool = {
    id: 'tool-favicon-generator',
    name: 'Favicon Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Create a favicon for your website from any image or text.',
    icon: HeartIcon,
    iconName: 'HeartIcon',
    author: 'ToolFORGE Team',
    uses: 11800,
    html: html,
};