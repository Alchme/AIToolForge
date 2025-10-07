import type { StaticTool } from '../../../types';
import { TableCellsIcon } from '../../../components/Icons';

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
        <h1 class="text-2xl font-bold text-center text-white mb-4">CSV to JSON Converter</h1>
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <div class="flex flex-col">
                <label for="csv-input" class="text-sm font-medium text-gray-400 mb-2">CSV Input</label>
                <textarea id="csv-input" class="w-full flex-grow bg-gray-800 p-3 rounded-lg font-mono resize-none" placeholder="header1,header2\\nvalue1,value2"></textarea>
            </div>
            <div class="flex flex-col">
                <label for="json-output" class="text-sm font-medium text-gray-400 mb-2">JSON Output</label>
                <textarea id="json-output" class="w-full flex-grow bg-gray-800 p-3 rounded-lg font-mono resize-none" readonly></textarea>
            </div>
        </div>
    </div>
    <script>
        const csvInput = document.getElementById('csv-input');
        const jsonOutput = document.getElementById('json-output');

        function convert() {
            const csvText = csvInput.value.trim();
            if (!csvText) {
                jsonOutput.value = '';
                return;
            }
            try {
                const lines = csvText.split('\\n');
                const headers = lines[0].split(',');
                const jsonArray = [];

                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',');
                    if (values.length !== headers.length) continue;
                    
                    const obj = {};
                    for (let j = 0; j < headers.length; j++) {
                        let value = values[j].trim();
                        // Attempt to convert to number if it looks like one
                        if (!isNaN(value) && value.trim() !== '') {
                            obj[headers[j].trim()] = Number(value);
                        } else {
                             obj[headers[j].trim()] = value;
                        }
                    }
                    jsonArray.push(obj);
                }
                jsonOutput.value = JSON.stringify(jsonArray, null, 2);
            } catch (e) {
                jsonOutput.value = "Error converting CSV: " + e.message;
            }
        }

        csvInput.addEventListener('input', convert);
    </script>
</body>
</html>
`;

export const csvToJsonConverter: StaticTool = {
    id: 'tool-csv-to-json-converter',
    name: 'CSV to JSON Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert data from CSV format to JSON format instantly.',
    icon: TableCellsIcon,
    iconName: 'TableCellsIcon',
    author: 'ToolFORGE Team',
    uses: 19500,
    html: html
};