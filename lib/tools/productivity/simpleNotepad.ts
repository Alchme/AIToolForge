
import type { StaticTool } from '../../../types';
import { PencilSquareIcon } from '../../../components/Icons';

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
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full h-full mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 flex flex-col">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold text-white">Simple Notepad</h1>
            <div id="status" class="text-sm text-gray-400 transition-opacity duration-300"></div>
        </div>
        <textarea id="notepad" class="w-full flex-grow bg-gray-800 text-gray-200 p-4 rounded-lg resize-none border-2 border-gray-700 focus:border-green-500 focus:ring-0" placeholder="Your notes are saved automatically to this browser..."></textarea>
    </div>
    <script>
        const notepad = document.getElementById('notepad');
        const statusDiv = document.getElementById('status');
        let saveTimeout;

        // Load saved notes
        notepad.value = localStorage.getItem('simple-notepad-content') || '';

        // Save notes on input
        notepad.addEventListener('input', () => {
            statusDiv.textContent = 'Saving...';
            statusDiv.classList.remove('opacity-0');
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                localStorage.setItem('simple-notepad-content', notepad.value);
                const now = new Date();
                statusDiv.textContent = 'Saved at ' + now.toLocaleTimeString();
                setTimeout(() => {
                     statusDiv.classList.add('opacity-0');
                }, 2000);
            }, 500); // Debounce saving
        });
    </script>
</body>
</html>
`;

export const simpleNotepad: StaticTool = {
    id: 'tool-notepad',
    name: 'Simple Notepad',
    type: 'static',
    subType: 'Utility',
    description: 'A browser-based notepad that automatically saves your notes.',
    icon: PencilSquareIcon,
    iconName: 'PencilSquareIcon',
    author: 'ToolFORGE Team',
    uses: 18000,
    html: html,
};
