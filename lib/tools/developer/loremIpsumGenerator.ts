import type { StaticTool } from '../../../types';
import { DocumentTextIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-3xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 flex flex-col h-[90%]">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Lorem Ipsum Generator</h1>
        <div class="flex items-center gap-4 mb-4">
            <div class="flex-1">
                <label for="amount" class="text-sm font-medium text-gray-400">Amount</label>
                <input type="number" id="amount" value="5" min="1" class="w-full bg-gray-800 p-2 mt-1 rounded-lg border-2 border-gray-700 focus:border-green-500 focus:ring-green-500">
            </div>
            <div class="flex-1">
                <label for="type" class="text-sm font-medium text-gray-400">Type</label>
                <select id="type" class="w-full bg-gray-800 p-2.5 mt-1 rounded-lg border-2 border-gray-700 focus:border-green-500 focus:ring-green-500">
                    <option>Paragraphs</option>
                    <option>Sentences</option>
                    <option>Words</option>
                </select>
            </div>
            <button id="copy-btn" class="self-end bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Copy</button>
        </div>
        <textarea id="output" class="w-full flex-grow bg-gray-800 text-gray-300 p-3 rounded-lg font-serif resize-none border-2 border-gray-700" readonly></textarea>
    </div>
    <script>
        const amountInput = document.getElementById('amount');
        const typeSelect = document.getElementById('type');
        const copyBtn = document.getElementById('copy-btn');
        const outputArea = document.getElementById('output');

        const loremWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');
        const loremSentences = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split('. ');

        function generate() {
            const amount = parseInt(amountInput.value) || 1;
            const type = typeSelect.value.toLowerCase();
            let result = '';

            if (type === 'words') {
                result = Array.from({ length: amount }, (_, i) => loremWords[i % loremWords.length]).join(' ');
            } else if (type === 'sentences') {
                result = Array.from({ length: amount }, (_, i) => loremSentences[i % loremSentences.length]).join('. ') + '.';
            } else { // paragraphs
                result = Array.from({ length: amount }, () => loremSentences.join('. ') + '.').join('\\n\\n');
            }
            outputArea.value = result.trim();
        }

        [amountInput, typeSelect].forEach(el => el.addEventListener('input', generate));
        
        copyBtn.addEventListener('click', () => {
             if (!outputArea.value) return;
             navigator.clipboard.writeText(outputArea.value).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
             });
        });
        
        generate();
    </script>
</body>
</html>
`;

export const loremIpsumGenerator: StaticTool = {
    id: 'tool-lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Generate customizable placeholder text for your designs.',
    icon: DocumentTextIcon,
    iconName: 'DocumentTextIcon',
    author: 'ToolFORGE Team',
    uses: 19800,
    html: html,
};