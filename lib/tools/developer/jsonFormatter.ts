
import type { StaticTool } from '../../../types';
import { CodeBracketSquareIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; }
    </style>
</head>
<body class="text-white flex flex-col items-center justify-center h-screen p-4">
    <div class="w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 flex flex-col h-full">
        <h1 class="text-2xl font-bold text-center text-white mb-4">JSON Formatter & Validator</h1>
        <div class="flex items-center flex-wrap gap-2 mb-4">
            <button id="format-btn" class="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Format</button>
            <button id="minify-btn" class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Minify</button>
            <button id="copy-btn" class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Copy</button>
            <button id="clear-btn" class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Clear</button>
            <span id="status" class="text-sm ml-auto px-3 py-1 rounded-full transition-all duration-300"></span>
        </div>
        <div class="flex-grow min-h-0">
             <textarea id="json-input" class="w-full h-full bg-gray-800 text-white p-3 rounded-lg font-mono resize-none border-2 border-transparent focus:border-green-500 focus:ring-0" placeholder="Paste your JSON here..."></textarea>
        </div>
    </div>
    <script>
        const inputArea = document.getElementById('json-input');
        const formatBtn = document.getElementById('format-btn');
        const minifyBtn = document.getElementById('minify-btn');
        const copyBtn = document.getElementById('copy-btn');
        const clearBtn = document.getElementById('clear-btn');
        const statusEl = document.getElementById('status');

        let statusTimeout;
        const updateStatus = (message, isError) => {
            clearTimeout(statusTimeout);
            statusEl.textContent = message;
            statusEl.className = 'text-sm ml-auto px-3 py-1 rounded-full transition-all duration-300 ' + (isError ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400');
            statusTimeout = setTimeout(() => {
                 statusEl.className = 'text-sm ml-auto px-3 py-1 rounded-full transition-all duration-300 opacity-0';
            }, 3000);
        };

        const processJson = (minify = false) => {
            const rawJson = inputArea.value;
            if (!rawJson.trim()) {
                updateStatus('Input is empty', true);
                return;
            }
            try {
                const jsonObject = JSON.parse(rawJson);
                inputArea.value = JSON.stringify(jsonObject, null, minify ? 0 : 2);
                updateStatus('Valid JSON', false);
            } catch (error) {
                updateStatus(error.message, true);
            }
        };

        formatBtn.addEventListener('click', () => processJson(false));
        minifyBtn.addEventListener('click', () => processJson(true));

        copyBtn.addEventListener('click', () => {
            if (!inputArea.value) {
                 updateStatus('Nothing to copy', true);
                 return;
            };
            navigator.clipboard.writeText(inputArea.value)
                .then(() => updateStatus('Copied!', false))
                .catch(err => updateStatus('Copy failed', true));
        });

        clearBtn.addEventListener('click', () => {
            inputArea.value = '';
            statusEl.textContent = '';
            statusEl.className = 'text-sm ml-auto px-3 py-1 rounded-full transition-all duration-300';
            inputArea.focus();
        });

    </script>
</body>
</html>
`;

export const jsonFormatter: StaticTool = {
    id: 'tool-json-formatter',
    name: 'JSON Formatter & Validator',
    type: 'static',
    subType: 'Formatter',
    description: 'Beautify, format, and validate your JSON data for readability.',
    icon: CodeBracketSquareIcon,
    iconName: 'CodeBracketSquareIcon',
    author: 'ToolFORGE Team',
    uses: 35000,
    html: html,
};
