
import type { StaticTool } from '../../../types';
import { SwitchHorizontalIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Speed Converter</h1>
        <div class="flex items-end space-x-4">
             <div class="flex-1 space-y-2">
                <label for="fromValue" class="block text-sm font-medium text-gray-400">From</label>
                <input type="number" id="fromValue" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3" value="100">
                <select id="fromUnit" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-2"></select>
            </div>
            <button id="swapBtn" class="p-3 bg-gray-700 rounded-full hover:bg-green-600 transition-colors mb-[52px]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 12l-4-4m4 4l4-4m6 8v-12m0 12l4-4m-4 4l-4-4" /></svg>
            </button>
            <div class="flex-1 space-y-2">
                <label class="block text-sm font-medium text-gray-400">To</label>
                <div id="toValue" class="w-full bg-gray-900 border-2 border-gray-700 text-white rounded-lg p-3 h-[52px] flex items-center"></div>
                <select id="toUnit" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-2"></select>
            </div>
        </div>
    </div>
    <script>
        const fromValueInput = document.getElementById('fromValue');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toValueDiv = document.getElementById('toValue');
        const toUnitSelect = document.getElementById('toUnit');
        const swapBtn = document.getElementById('swapBtn');

        // All conversions relative to 1 meter per second (m/s)
        const units = {
            'Meters per second (m/s)': 1,
            'Kilometers per hour (km/h)': 0.277778,
            'Miles per hour (mph)': 0.44704,
            'Knots': 0.514444,
            'Feet per second (ft/s)': 0.3048
        };

        function populateSelects() {
            Object.keys(units).forEach(unit => {
                fromUnitSelect.add(new Option(unit, unit));
                toUnitSelect.add(new Option(unit, unit));
            });
            fromUnitSelect.value = 'Kilometers per hour (km/h)';
            toUnitSelect.value = 'Miles per hour (mph)';
        }

        function convert() {
            const fromValue = parseFloat(fromValueInput.value) || 0;
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;

            const valueInMetersPerSecond = fromValue * units[fromUnit];
            const result = valueInMetersPerSecond / units[toUnit];
            
            toValueDiv.textContent = result.toLocaleString('en-US', {maximumFractionDigits: 4});
        }

        swapBtn.addEventListener('click', () => {
            [fromUnitSelect.value, toUnitSelect.value] = [toUnitSelect.value, fromUnitSelect.value];
            convert();
        });

        [fromValueInput, fromUnitSelect, toUnitSelect].forEach(el => el.addEventListener('input', convert));

        populateSelects();
        convert();
    </script>
</body>
</html>
`;

export const speedConverter: StaticTool = {
    id: 'tool-speed-converter',
    name: 'Speed Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert between different units of speed like mph, km/h, and m/s.',
    icon: SwitchHorizontalIcon,
    iconName: 'SwitchHorizontalIcon',
    author: 'ToolFORGE Team',
    uses: 8800,
    html: html,
};
