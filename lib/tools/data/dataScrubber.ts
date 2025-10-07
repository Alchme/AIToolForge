import type { StaticTool } from '../../../types';
import { FunnelIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-5xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 h-full flex flex-col">
        <h1 class="text-2xl font-bold text-center text-white mb-4">Data Scrubber</h1>
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <textarea id="input" class="w-full h-full bg-gray-800 p-3 rounded-lg font-mono resize-none" placeholder="Paste your data here..."></textarea>
            <textarea id="output" class="w-full h-full bg-gray-800 p-3 rounded-lg font-mono resize-none" readonly></textarea>
        </div>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <label class="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg"><input type="checkbox" id="trim" class="scrub-option form-checkbox"><span class="text-sm">Trim Whitespace</span></label>
            <label class="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg"><input type="checkbox" id="remove-empty" class="scrub-option form-checkbox"><span class="text-sm">Remove Empty Lines</span></label>
            <label class="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg"><input type="checkbox" id="remove-duplicates" class="scrub-option form-checkbox"><span class="text-sm">Remove Duplicates</span></label>
            <label class="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg"><input type="checkbox" id="sort-asc" class="scrub-option form-checkbox"><span class="text-sm">Sort Ascending</span></label>
        </div>
    </div>
    <script>
        const inputArea = document.getElementById('input');
        const outputArea = document.getElementById('output');
        const options = document.querySelectorAll('.scrub-option');

        function scrub() {
            const lines = inputArea.value.split('\\n');
            let processedLines = lines;

            if (document.getElementById('trim').checked) {
                processedLines = processedLines.map(line => line.trim());
            }
            if (document.getElementById('remove-empty').checked) {
                processedLines = processedLines.filter(line => line.length > 0);
            }
            if (document.getElementById('remove-duplicates').checked) {
                processedLines = [...new Set(processedLines)];
            }
            if (document.getElementById('sort-asc').checked) {
                processedLines.sort();
            }

            outputArea.value = processedLines.join('\\n');
        }

        inputArea.addEventListener('input', scrub);
        options.forEach(option => option.addEventListener('change', scrub));
    </script>
</body>
</html>
`;

export const dataScrubber: StaticTool = {
    id: 'tool-data-scrubber',
    name: 'Data Scrubber',
    type: 'static',
    subType: 'Utility',
    description: 'Remove duplicates, empty rows, and unwanted characters from your data.',
    icon: FunnelIcon,
    iconName: 'FunnelIcon',
    author: 'ToolFORGE Team',
    uses: 4300,
    html: html
};