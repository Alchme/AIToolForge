import type { StaticTool } from '../../../types';
import { HashtagIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 flex flex-col h-auto max-h-[90vh]">
        <h1 class="text-3xl font-bold text-center text-white mb-6">UUID Generator</h1>
        <div class="flex items-center gap-4 mb-4">
            <label for="count" class="text-sm font-medium text-gray-400">Amount:</label>
            <input type="number" id="count" value="5" min="1" max="100" class="w-24 bg-gray-800 p-2 rounded-lg text-center border-2 border-gray-700 focus:border-green-500 focus:ring-green-500">
            <button id="generate-btn" class="flex-grow bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Generate</button>
        </div>
        <div id="uuid-list" class="flex-grow overflow-y-auto bg-gray-900/50 p-3 rounded-lg space-y-2 border-2 border-gray-800">
            <!-- UUIDs will be injected here -->
        </div>
    </div>
    <script>
        const countInput = document.getElementById('count');
        const generateBtn = document.getElementById('generate-btn');
        const uuidList = document.getElementById('uuid-list');

        const copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.75m0 0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25m0 0V5.25m0 0A2.25 2.25 0 016.75 3h1.5a2.25 2.25 0 012.25 2.25m0 0v3.75m-3.75 0h3.75M12 15.75h.008v.008H12v-.008z" /></svg>';
        const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-400"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>';

        function generate() {
            const count = Math.max(1, Math.min(100, parseInt(countInput.value) || 1));
            uuidList.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const uuid = crypto.randomUUID();
                const item = document.createElement('div');
                item.className = 'flex items-center justify-between bg-gray-800 p-2 rounded-md';
                item.innerHTML = \`<span class="font-mono text-sm text-gray-300">\${uuid}</span>
                    <button class="copy-btn text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700" data-uuid="\${uuid}" title="Copy UUID">
                        \${copyIcon}
                    </button>\`;
                uuidList.appendChild(item);
            }
        }
        
        uuidList.addEventListener('click', e => {
            const button = e.target.closest('.copy-btn');
            if (button) {
                const uuidToCopy = button.dataset.uuid;
                navigator.clipboard.writeText(uuidToCopy).then(() => {
                    button.innerHTML = checkIcon;
                    setTimeout(() => { button.innerHTML = copyIcon; }, 2000);
                });
            }
        });

        generateBtn.addEventListener('click', generate);
        
        generate(); // Initial generation
    </script>
</body>
</html>
`;

export const uuidGenerator: StaticTool = {
    id: 'tool-uuid-generator',
    name: 'UUID Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Generate universally unique identifiers (UUIDs) on the fly.',
    icon: HashtagIcon,
    iconName: 'HashtagIcon',
    author: 'ToolFORGE Team',
    uses: 22000,
    html: html,
};