
import type { StaticTool } from '../../../types';
import { LinkIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; }
        textarea {
            background-color: #2d3748;
            border: 2px solid #4a5568;
            transition: border-color 0.2s;
        }
        textarea:focus {
            outline: none;
            border-color: #4ade80;
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 flex flex-col h-[80%]">
        <h1 class="text-3xl font-bold text-center text-white mb-6">URL Encoder / Decoder</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow min-h-0">
            <div class="flex flex-col">
                <label for="decoded" class="text-lg font-medium text-gray-400 mb-2">Decoded</label>
                <textarea id="decoded" class="w-full flex-grow p-3 rounded-lg font-mono resize-none" placeholder="Type text here..."></textarea>
            </div>
            <div class="flex flex-col">
                <label for="encoded" class="text-lg font-medium text-gray-400 mb-2">Encoded</label>
                <textarea id="encoded" class="w-full flex-grow p-3 rounded-lg font-mono resize-none" placeholder="Type encoded URL here..."></textarea>
            </div>
        </div>
    </div>
    <script>
        const decodedArea = document.getElementById('decoded');
        const encodedArea = document.getElementById('encoded');
        
        let isUpdating = false;

        decodedArea.addEventListener('input', () => {
            if (isUpdating) return;
            isUpdating = true;
            try {
                encodedArea.value = encodeURIComponent(decodedArea.value);
            } catch (e) {
                encodedArea.value = 'Error encoding value.';
            }
            isUpdating = false;
        });

        encodedArea.addEventListener('input', () => {
            if (isUpdating) return;
            isUpdating = true;
            try {
                decodedArea.value = decodeURIComponent(encodedArea.value);
            } catch (e) {
                // Gracefully ignore decoding errors as user might be typing
                decodedArea.value = '';
            }
            isUpdating = false;
        });
    </script>
</body>
</html>
`;

export const urlEncoder: StaticTool = {
    id: 'tool-url-encoder',
    name: 'URL Encoder & Decoder',
    type: 'static',
    subType: 'Utility',
    description: 'Encode and decode strings for safe use in URLs.',
    icon: LinkIcon,
    iconName: 'LinkIcon',
    author: 'ToolFORGE Team',
    uses: 14000,
    html: html,
};
