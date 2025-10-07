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
        <h1 class="text-2xl font-bold text-center text-white mb-4">JSON to CSV Converter</h1>
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <div class="flex flex-col">
                <label for="json-input" class="text-sm font-medium text-gray-400 mb-2">JSON Input</label>
                <textarea id="json-input" class="w-full flex-grow bg-gray-800 p-3 rounded-lg font-mono resize-none" placeholder='[{"id":1,"name":"apple"},{"id":2,"name":"orange"}]'></textarea>
            </div>
            <div class="flex flex-col">
                <label for="csv-output" class="text-sm font-medium text-gray-400 mb-2">CSV Output</label>
                <textarea id="csv-output" class="w-full flex-grow bg-gray-800 p-3 rounded-lg font-mono resize-none" readonly></textarea>
            </div>
        </div>
    </div>
    <script>
        const jsonInput = document.getElementById('json-input');
        const csvOutput = document.getElementById('csv-output');

        function convert() {
            const jsonText = jsonInput.value.trim();
            if (!jsonText) {
                csvOutput.value = '';
                return;
            }
            try {
                const data = JSON.parse(jsonText);
                if (!Array.isArray(data)) {
                    throw new Error('Input must be a JSON array.');
                }
                if (data.length === 0) {
                    csvOutput.value = '';
                    return;
                }

                const headers = Object.keys(data[0]);
                const csvRows = [headers.join(',')];

                data.forEach(obj => {
                    const values = headers.map(header => {
                        let val = obj[header];
                        if (typeof val === 'string' && val.includes(',')) {
                            return \`"\${val}"\`;
                        }
                        return val;
                    });
                    csvRows.push(values.join(','));
                });

                csvOutput.value = csvRows.join('\\n');

            } catch (e) {
                csvOutput.value = "Error converting JSON: " + e.message;
            }
        }

        jsonInput.addEventListener('input', convert);
    </script>
</body>
</html>
`;

export const jsonToCsvConverter: StaticTool = {
    id: 'tool-json-to-csv-converter',
    name: 'JSON to CSV Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert complex JSON data into a simple, structured CSV file.',
    icon: TableCellsIcon,
    iconName: 'TableCellsIcon',
    author: 'ToolFORGE Team',
    uses: 14800,
    html: html
};