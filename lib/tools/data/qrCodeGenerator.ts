import type { StaticTool } from '../../../types';
import { QrCodeIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js"></script>
    <style> body { font-family: 'Inter', sans-serif; background-color: #121212; } </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-md mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 text-center">
        <h1 class="text-2xl font-bold text-white mb-4">QR Code Generator</h1>
        <div id="qr-canvas-container" class="p-4 bg-white rounded-lg inline-block mb-4">
            <canvas id="qr-canvas"></canvas>
        </div>
        <textarea id="text-input" class="w-full h-24 bg-gray-800 p-3 rounded-lg font-mono resize-y" placeholder="Enter text or URL"></textarea>
    </div>
    <script>
        const textInput = document.getElementById('text-input');
        const canvas = document.getElementById('qr-canvas');

        function generateQR() {
            const text = textInput.value || 'https://google.com';
            QRCode.toCanvas(canvas, text, { width: 256, errorCorrectionLevel: 'H' }, function (error) {
                if (error) console.error(error);
            });
        }

        textInput.addEventListener('input', generateQR);
        generateQR(); // Initial QR code
    </script>
</body>
</html>
`;

export const qrCodeGenerator: StaticTool = {
    id: 'tool-qr-code-generator',
    name: 'QR Code Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Create QR codes for URLs, text, Wi-Fi networks, and more.',
    icon: QrCodeIcon,
    iconName: 'QrCodeIcon',
    author: 'ToolFORGE Team',
    uses: 25000,
    html: html
};