
import type { StaticTool } from '../../../types';
import { ArrowsRightLeftIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-2xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Case Converter</h1>
        <textarea id="text-area" class="w-full h-48 bg-gray-800 text-white p-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition" placeholder="Type or paste your text here..."></textarea>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button class="case-btn bg-gray-700 p-3 rounded-lg hover:bg-green-600 transition-colors" data-case="upper">UPPER CASE</button>
            <button class="case-btn bg-gray-700 p-3 rounded-lg hover:bg-green-600 transition-colors" data-case="lower">lower case</button>
            <button class="case-btn bg-gray-700 p-3 rounded-lg hover:bg-green-600 transition-colors" data-case="title">Title Case</button>
            <button class="case-btn bg-gray-700 p-3 rounded-lg hover:bg-green-600 transition-colors" data-case="sentence">Sentence case.</button>
            <button class="case-btn bg-gray-700 p-3 rounded-lg hover:bg-green-600 transition-colors" data-case="camel">camelCase</button>
            <button class="case-btn bg-gray-700 p-3 rounded-lg hover:bg-green-600 transition-colors" data-case="pascal">PascalCase</button>
            <button class="case-btn bg-gray-700 p-3 rounded-lg hover:bg-green-600 transition-colors" data-case="kebab">kebab-case</button>
            <button class="case-btn bg-gray-700 p-3 rounded-lg hover:bg-green-600 transition-colors" data-case="snake">snake_case</button>
        </div>
    </div>
    <script>
        const textArea = document.getElementById('text-area');
        const buttons = document.querySelectorAll('.case-btn');
        
        const toWords = (str) => {
            const result = str.replace(/([A-Z])/g, ' $1');
            return result.split(/[^a-zA-Z0-9]+/).filter(Boolean);
        };

        const converters = {
            upper: str => str.toUpperCase(),
            lower: str => str.toLowerCase(),
            title: str => str.toLowerCase().replace(/(?:^|\\s|-|_)(\\w)/g, (match, c) => c.toUpperCase()),
            sentence: str => str.toLowerCase().replace(/(^\s*\\w|[.!?]\\s*\\w)/g, c => c.toUpperCase()),
            camel: str => { const words = toWords(str); return words.length ? words.shift().toLowerCase() + words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('') : ''; },
            pascal: str => toWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''),
            kebab: str => toWords(str).map(w => w.toLowerCase()).join('-'),
            snake: str => toWords(str).map(w => w.toLowerCase()).join('_'),
        };

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const caseType = button.dataset.case;
                const currentText = textArea.value;
                if(currentText && converters[caseType]) {
                    textArea.value = converters[caseType](currentText);
                }
            });
        });
    </script>
</body>
</html>
`;

export const caseConverter: StaticTool = {
    id: 'tool-case-converter',
    name: 'Case Converter',
    type: 'static',
    subType: 'Formatter',
    description: 'Convert text to uppercase, lowercase, title case, and more.',
    icon: ArrowsRightLeftIcon,
    iconName: 'ArrowsRightLeftIcon',
    author: 'ToolFORGE Team',
    uses: 11500,
    html: html,
};
