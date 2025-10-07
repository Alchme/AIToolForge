import type { StaticTool } from '../../../types';
import { SparklesIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-2xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 h-full flex flex-col">
        <h1 class="text-2xl font-bold text-center text-white mb-4">Random Data Generator</h1>
        <div class="flex gap-4 mb-4">
            <input type="number" id="count" value="10" min="1" max="100" class="w-24 bg-gray-800 p-2 rounded-lg text-center">
            <button id="generate-btn" class="flex-grow bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">Generate</button>
        </div>
        <textarea id="output" class="w-full flex-grow bg-gray-800 p-3 rounded-lg font-mono resize-none" readonly></textarea>
    </div>
    <script>
        const countInput = document.getElementById('count');
        const generateBtn = document.getElementById('generate-btn');
        const outputArea = document.getElementById('output');
        
        const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie'];
        const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Davis'];
        const domains = ['example.com', 'mail.com', 'test.org', 'web.net'];

        function generate() {
            const count = parseInt(countInput.value) || 1;
            const data = [];
            for (let i = 0; i < count; i++) {
                const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                const email = \`\${firstName.toLowerCase()}.\${lastName.toLowerCase()}\${Math.floor(Math.random()*100)}@\${domains[Math.floor(Math.random() * domains.length)]}\`;
                data.push({ id: i + 1, firstName, lastName, email });
            }
            outputArea.value = JSON.stringify(data, null, 2);
        }

        generateBtn.addEventListener('click', generate);
        generate();
    </script>
</body>
</html>
`;

export const randomDataGenerator: StaticTool = {
    id: 'tool-random-data-generator',
    name: 'Random Data Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Generate fake but realistic data (names, addresses, etc.) for testing.',
    icon: SparklesIcon,
    iconName: 'SparklesIcon',
    author: 'ToolFORGE Team',
    uses: 13000,
    html: html
};