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
    <div class="w-full max-w-3xl h-[90vh] flex flex-col mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Word & Character Counter</h1>
        <textarea id="text-input" class="w-full flex-grow bg-gray-800 text-gray-200 p-4 rounded-lg resize-none border-2 border-gray-700 focus:border-green-500 focus:ring-0 mb-6" placeholder="Paste your text here..."></textarea>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div class="bg-gray-800 p-4 rounded-lg">
                <div class="text-4xl font-bold text-green-400" id="word-count">0</div>
                <div class="text-gray-400 mt-1">Words</div>
            </div>
            <div class="bg-gray-800 p-4 rounded-lg">
                <div class="text-4xl font-bold text-green-400" id="char-count">0</div>
                <div class="text-gray-400 mt-1">Characters</div>
            </div>
            <div class="bg-gray-800 p-4 rounded-lg">
                <div class="text-4xl font-bold text-green-400" id="sentence-count">0</div>
                <div class="text-gray-400 mt-1">Sentences</div>
            </div>
            <div class="bg-gray-800 p-4 rounded-lg">
                <div class="text-4xl font-bold text-green-400" id="paragraph-count">0</div>
                <div class="text-gray-400 mt-1">Paragraphs</div>
            </div>
        </div>
    </div>
    <script>
        const textInput = document.getElementById('text-input');
        const wordCountEl = document.getElementById('word-count');
        const charCountEl = document.getElementById('char-count');
        const sentenceCountEl = document.getElementById('sentence-count');
        const paragraphCountEl = document.getElementById('paragraph-count');

        textInput.addEventListener('input', () => {
            const text = textInput.value;

            // Character count
            charCountEl.textContent = text.length.toLocaleString();

            // Word count
            const words = text.match(/\S+/g);
            wordCountEl.textContent = words ? words.length.toLocaleString() : 0;

            // Sentence count
            const sentences = text.match(/[^.!?]+[.!?]+/g);
            sentenceCountEl.textContent = sentences ? sentences.length.toLocaleString() : 0;
            
            // Paragraph count
            const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
            paragraphCountEl.textContent = (text.trim().length > 0 ? paragraphs.length : 0).toLocaleString();
        });
    </script>
</body>
</html>
`;

export const wordCounter: StaticTool = {
    id: 'tool-word-counter',
    name: 'Word & Character Counter',
    type: 'static',
    subType: 'Utility',
    description: 'Count words, characters, sentences, and paragraphs in your text.',
    icon: DocumentTextIcon,
    iconName: 'DocumentTextIcon',
    author: 'ToolFORGE Team',
    uses: 12400,
    html: html,
};