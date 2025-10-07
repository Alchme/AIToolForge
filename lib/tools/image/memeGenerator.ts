import type { StaticTool } from '../../../types';
import { FaceSmileIcon } from '../../../components/Icons';

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
            <h1 class="text-2xl font-bold text-center text-white mb-4">Meme Generator</h1>
            <div class="flex-grow flex items-center justify-center bg-gray-900 rounded-lg">
                <canvas id="meme-canvas" class="max-w-full max-h-full"></canvas>
            </div>
        </div>
        <div class="md:w-1/3 flex flex-col space-y-4">
            <input type="file" id="image-upload" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer" accept="image/*" />
            <div>
                <label for="top-text" class="block text-sm font-medium text-gray-400">Top Text</label>
                <input type="text" id="top-text" class="w-full bg-gray-800 p-2 mt-1 rounded-lg" placeholder="Top Text">
            </div>
            <div>
                <label for="bottom-text" class="block text-sm font-medium text-gray-400">Bottom Text</label>
                <input type="text" id="bottom-text" class="w-full bg-gray-800 p-2 mt-1 rounded-lg" placeholder="Bottom Text">
            </div>
            <a id="download-btn" class="mt-auto block text-center bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">Download Meme</a>
        </div>
    </div>
    <script>
        const canvas = document.getElementById('meme-canvas');
        const ctx = canvas.getContext('2d');
        const uploadInput = document.getElementById('image-upload');
        const topTextInput = document.getElementById('top-text');
        const bottomTextInput = document.getElementById('bottom-text');
        const downloadBtn = document.getElementById('download-btn');
        let image;

        function drawMeme() {
            if (!image) return;

            const MAX_WIDTH = canvas.parentElement.clientWidth;
            const scale = MAX_WIDTH / image.width;
            canvas.width = MAX_WIDTH;
            canvas.height = image.height * scale;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.textAlign = 'center';
            let fontSize = canvas.width / 10;
            ctx.font = \`bold \${fontSize}px Impact\`;

            const topText = topTextInput.value.toUpperCase();
            const bottomText = bottomTextInput.value.toUpperCase();

            ctx.textBaseline = 'top';
            ctx.fillText(topText, canvas.width / 2, 10);
            ctx.strokeText(topText, canvas.width / 2, 10);

            ctx.textBaseline = 'bottom';
            ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);
            ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);

            downloadBtn.href = canvas.toDataURL('image/png');
        }

        uploadInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = event => {
                    image = new Image();
                    image.src = event.target.result;
                    image.onload = drawMeme;
                }
                reader.readAsDataURL(file);
            }
        });

        topTextInput.addEventListener('input', drawMeme);
        bottomTextInput.addEventListener('input', drawMeme);
        downloadBtn.download = 'meme.png';
    </script>
</body>
</html>
`;

export const memeGenerator: StaticTool = {
    id: 'tool-meme-generator',
    name: 'Meme Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Create your own memes using popular templates or your own images.',
    icon: FaceSmileIcon,
    iconName: 'FaceSmileIcon',
    author: 'ToolFORGE Team',
    uses: 14200,
    html: html,
};