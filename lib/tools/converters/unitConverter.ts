
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
    <div class="w-full max-w-2xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Unit Converter</h1>
        <div>
            <label for="category" class="block text-sm font-medium text-gray-400 mb-2">Category</label>
            <select id="category" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3"></select>
        </div>
        <div class="flex items-center space-x-4">
            <div class="flex-1 space-y-2">
                <input type="number" id="inputValue" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 text-lg" value="1">
                <select id="fromUnit" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-2"></select>
            </div>
            <div class="text-2xl text-gray-500">→</div>
            <div class="flex-1 space-y-2">
                <div id="outputValue" class="w-full bg-gray-900 border-2 border-gray-700 text-white rounded-lg p-3 text-lg h-[52px] flex items-center"></div>
                <select id="toUnit" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-2"></select>
            </div>
        </div>
    </div>
    <script>
        const units = {
            length: { name: 'Length', base: 'meter', list: { meter: 1, kilometer: 1000, mile: 1609.34, foot: 0.3048, inch: 0.0254 } },
            mass: { name: 'Mass', base: 'gram', list: { gram: 1, kilogram: 1000, pound: 453.592, ounce: 28.3495 } },
            temperature: { 
                name: 'Temperature', 
                base: 'celsius', 
                list: { celsius: 'c', fahrenheit: 'f', kelvin: 'k' },
                convert: (value, from, to) => {
                    if (from === to) return value;
                    let celsius;
                    // Convert to base (Celsius)
                    if (from === 'f') celsius = (value - 32) * 5/9;
                    else if (from === 'k') celsius = value - 273.15;
                    else celsius = value;
                    // Convert from base to target
                    if (to === 'f') return celsius * 9/5 + 32;
                    if (to === 'k') return celsius + 273.15;
                    return celsius;
                }
            }
        };
        const categorySelect = document.getElementById('category');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const inputValue = document.getElementById('inputValue');
        const outputValue = document.getElementById('outputValue');

        function populateCategories() { 
            Object.keys(units).forEach(key => { 
                const option = new Option(units[key].name, key); 
                categorySelect.add(option); 
            }); 
        }
        function populateUnits() {
            const category = units[categorySelect.value];
            fromUnitSelect.innerHTML = ''; 
            toUnitSelect.innerHTML = '';
            Object.keys(category.list).forEach(unit => { 
                fromUnitSelect.add(new Option(unit, unit)); 
                toUnitSelect.add(new Option(unit, unit)); 
            });
            toUnitSelect.value = Object.keys(category.list)[1] || Object.keys(category.list)[0];
        }
        function convert() {
            const category = units[categorySelect.value];
            const from = fromUnitSelect.value;
            const to = toUnitSelect.value;
            const value = parseFloat(inputValue.value);
            if(isNaN(value)) { 
                outputValue.textContent = ''; 
                return; 
            }
            
            let result;
            if (category.name === 'Temperature') {
                result = category.convert(value, from, to);
            } else {
                const baseValue = value * category.list[from];
                result = baseValue / category.list[to];
            }
            outputValue.textContent = result.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 3 });
        }
        categorySelect.addEventListener('change', () => { populateUnits(); convert(); });
        fromUnitSelect.addEventListener('change', convert);
        toUnitSelect.addEventListener('change', convert);
        inputValue.addEventListener('input', convert);
        
        populateCategories(); 
        populateUnits();
        convert();
    </script>
</body>
</html>
`;

export const unitConverter: StaticTool = {
    id: 'tool-unit-converter',
    name: 'Metric & Imperial Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert between various units of measurement like length, mass, and temperature.',
    icon: SwitchHorizontalIcon,
    iconName: 'SwitchHorizontalIcon',
    author: 'ToolFORGE Team',
    uses: 25500,
    html: html,
};
