
import type { StaticTool } from '../../../types';
import { VariableIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        .base-input {
            width: 100%; 
            background-color: #2d3748; 
            border: 2px solid #4a5568; 
            color: white; 
            border-radius: 0.5rem; 
            padding: 0.75rem; 
            margin-top: 0.25rem; 
            font-family: monospace;
            transition: border-color 0.2s;
        }
        .base-input:focus {
            outline: none;
            border-color: #4ade80;
        }
        .base-input.invalid {
            border-color: #f87171;
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-4">
        <h1 class="text-3xl font-bold text-center text-white mb-4">Number Base Converter</h1>
        <div>
            <label for="decimal" class="block text-sm font-medium text-gray-400">Decimal (Base 10)</label>
            <input type="text" id="decimal" data-base="10" class="base-input">
        </div>
        <div>
            <label for="binary" class="block text-sm font-medium text-gray-400">Binary (Base 2)</label>
            <input type="text" id="binary" data-base="2" class="base-input">
        </div>
        <div>
            <label for="octal" class="block text-sm font-medium text-gray-400">Octal (Base 8)</label>
            <input type="text" id="octal" data-base="8" class="base-input">
        </div>
        <div>
            <label for="hex" class="block text-sm font-medium text-gray-400">Hexadecimal (Base 16)</label>
            <input type="text" id="hex" data-base="16" class="base-input uppercase">
        </div>
    </div>
    <script>
        const inputs = Array.from(document.querySelectorAll('.base-input'));
        const validation = {
            10: /^[0-9]+$/,
            2: /^[01]+$/,
            8: /^[0-7]+$/,
            16: /^[0-9a-f]+$/i,
        };
        let isUpdating = false;

        function updateAll(sourceInput) {
            if (isUpdating) return;
            isUpdating = true;
            
            const fromBase = parseInt(sourceInput.dataset.base);
            const value = sourceInput.value.trim();

            inputs.forEach(input => input.classList.remove('invalid'));

            if (value === '') {
                inputs.forEach(input => { if (input !== sourceInput) input.value = ''; });
                isUpdating = false;
                return;
            }

            if (!validation[fromBase].test(value)) {
                 sourceInput.classList.add('invalid');
                 isUpdating = false;
                 return;
            }
            
            const decimalValue = parseInt(value, fromBase);

            inputs.forEach(input => {
                if (input === sourceInput) return;
                const toBase = parseInt(input.dataset.base);
                if (isNaN(decimalValue)) {
                    input.value = '';
                } else {
                    input.value = decimalValue.toString(toBase).toUpperCase();
                }
            });
            isUpdating = false;
        }
        
        inputs.forEach(input => {
            input.addEventListener('input', () => updateAll(input));
        });

        // Set an initial value
        inputs[0].value = '42';
        updateAll(inputs[0]);

    </script>
</body>
</html>
`;

export const baseConverter: StaticTool = {
    id: 'tool-base-converter',
    name: 'Binary/Hex/Decimal Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal.',
    icon: VariableIcon,
    iconName: 'VariableIcon',
    author: 'ToolFORGE Team',
    uses: 21000,
    html: html,
};
