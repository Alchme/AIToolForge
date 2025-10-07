
import type { StaticTool } from '../../../types';
import { CalculatorIcon } from '../../../components/Icons';

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
        <h1 class="text-3xl font-bold text-center text-white">Cooking Converter</h1>
        <div class="flex items-end space-x-4">
            <div class="flex-1 space-y-2">
                <label for="fromValue" class="block text-sm font-medium text-gray-400">From</label>
                <input type="number" id="fromValue" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3" value="1">
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

        // All conversions relative to 1 milliliter
        const units = {
            'Milliliter (ml)': 1,
            'Liter (L)': 1000,
            'US Cup': 236.588,
            'US Fluid Ounce (fl oz)': 29.5735,
            'US Tablespoon (tbsp)': 14.7868,
            'US Teaspoon (tsp)': 4.92892,
            'Imperial Cup': 284.131,
            'Imperial Fluid Ounce (fl oz)': 28.4131,
            'Imperial Tablespoon (tbsp)': 17.7582,
            'Imperial Teaspoon (tsp)': 5.91939,
        };

        function populateSelects() {
            Object.keys(units).forEach(unit => {
                fromUnitSelect.add(new Option(unit, unit));
                toUnitSelect.add(new Option(unit, unit));
            });
            fromUnitSelect.value = 'US Cup';
            toUnitSelect.value = 'Milliliter (ml)';
        }

        function convert() {
            const fromValue = parseFloat(fromValueInput.value) || 0;
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;

            const valueInML = fromValue * units[fromUnit];
            const result = valueInML / units[toUnit];
            
            toValueDiv.textContent = result.toLocaleString('en-US', {maximumFractionDigits: 3});
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

export const cookingConverter: StaticTool = {
    id: 'tool-cooking-converter',
    name: 'Cooking Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert cooking measurements like cups, grams, and tablespoons.',
    icon: CalculatorIcon,
    iconName: 'CalculatorIcon',
    author: 'ToolFORGE Team',
    uses: 9500,
    html: html,
};
