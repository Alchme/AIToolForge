
import type { StaticTool } from '../../../types';
import { VariableIcon } from '../../../components/Icons';

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
        <h1 class="text-3xl font-bold text-center text-white mb-6">Base64 Encoder / Decoder</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow min-h-0">
            <div class="flex flex-col">
                <label for="plain" class="text-lg font-medium text-gray-400 mb-2">Plain Text</label>
                <textarea id="plain" class="w-full flex-grow p-3 rounded-lg font-mono resize-none" placeholder="Type text here..."></textarea>
            </div>
            <div class="flex flex-col">
                <label for="base64" class="text-lg font-medium text-gray-400 mb-2">Base64</label>
                <textarea id="base64" class="w-full flex-grow p-3 rounded-lg font-mono resize-none" placeholder="Type Base64 string here..."></textarea>
            </div>
        </div>
    </div>
    <script>
        const plainArea = document.getElementById('plain');
        const base64Area = document.getElementById('base64');
        
        let isUpdating = false;

        plainArea.addEventListener('input', () => {
            if (isUpdating) return;
            isUpdating = true;
            try {
                base64Area.value = btoa(unescape(encodeURIComponent(plainArea.value)));
            } catch (e) {
                base64Area.value = 'Error encoding value.';
            }
            isUpdating = false;
        });

        base64Area.addEventListener('input', () => {
            if (isUpdating) return;
            isUpdating = true;
            try {
                plainArea.value = decodeURIComponent(escape(atob(base64Area.value)));
            } catch (e) {
                // Gracefully ignore decoding errors as user might be typing invalid base64
                 plainArea.value = '';
            }
            isUpdating = false;
        });
    </script>
</body>
</html>
`;

export const base64Encoder: StaticTool = {
    id: 'tool-base64-encoder',
    name: 'Base64 Encoder & Decoder',
    type: 'static',
    subType: 'Utility',
    description: 'Encode text to Base64 or decode a Base64 string back to text.',
    icon: VariableIcon,
    iconName: 'VariableIcon',
    author: 'ToolFORGE Team',
    uses: 16500,
    html: html,
};
