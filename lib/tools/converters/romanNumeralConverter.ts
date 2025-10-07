
import type { StaticTool } from '../../../types';
import { HashtagIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        .input-field {
             width: 100%;
             background-color: #2d3748;
             border: 2px solid #4a5568;
             padding: 0.75rem;
             border-radius: 0.5rem;
             font-size: 1.25rem;
             transition: border-color 0.2s;
        }
        .input-field:focus {
            outline: none;
            border-color: #4ade80;
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Roman Numeral Converter</h1>
        <div class="flex items-center space-x-4">
            <div class="flex-1">
                <label for="numberInput" class="block text-sm font-medium text-gray-400 mb-1">Number</label>
                <input type="number" id="numberInput" class="input-field" value="2024">
            </div>
            <div class="text-2xl text-gray-500 pt-7">↔</div>
            <div class="flex-1">
                <label for="romanInput" class="block text-sm font-medium text-gray-400 mb-1">Roman Numeral</label>
                <input type="text" id="romanInput" class="input-field uppercase font-serif tracking-widest">
            </div>
        </div>
        <div id="error-message" class="text-center text-red-400 h-5 text-sm"></div>
    </div>
    <script>
        const numberInput = document.getElementById('numberInput');
        const romanInput = document.getElementById('romanInput');
        const errorEl = document.getElementById('error-message');
        let isUpdating = false;

        function toRoman(num) {
            if (isNaN(num) || num < 1 || num > 3999) return null;
            const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
            let roman = '';
            for (let i in lookup ) {
                while ( num >= lookup[i] ) {
                    roman += i;
                    num -= lookup[i];
                }
            }
            return roman;
        }

        function fromRoman(roman) {
            if (!roman || typeof roman !== 'string') return null;
            roman = roman.toUpperCase();
            if (!/^[MDCLXVI]+$/.test(roman)) return null;

            const lookup = {M:1000,D:500,C:100,L:50,X:10,V:5,I:1};
            let num = 0, i = 0;
            while (i < roman.length) {
                const currentVal = lookup[roman[i]];
                const nextVal = lookup[roman[i+1]];
                if (nextVal > currentVal) {
                    num += nextVal - currentVal;
                    i += 2;
                } else {
                    num += currentVal;
                    i += 1;
                }
            }
            if (toRoman(num) !== roman) return null;
            return num;
        }

        numberInput.addEventListener('input', () => {
            if (isUpdating) return;
            isUpdating = true;
            errorEl.textContent = '';
            const num = parseInt(numberInput.value);
            if (num < 1 || num > 3999) {
                errorEl.textContent = 'Number must be between 1 and 3999.';
                romanInput.value = '';
            } else {
                const roman = toRoman(num);
                if (roman) romanInput.value = roman;
            }
            isUpdating = false;
        });

        romanInput.addEventListener('input', () => {
            if (isUpdating) return;
            isUpdating = true;
            errorEl.textContent = '';
            const roman = romanInput.value.toUpperCase();
            if (!roman) {
                numberInput.value = '';
            } else {
                 const num = fromRoman(roman);
                if (num) {
                    numberInput.value = num;
                } else {
                    numberInput.value = '';
                    errorEl.textContent = 'Invalid Roman Numeral format.';
                }
            }
            isUpdating = false;
        });

        // Initial conversion
        romanInput.value = toRoman(parseInt(numberInput.value));
    </script>
</body>
</html>
`;

export const romanNumeralConverter: StaticTool = {
    id: 'tool-roman-numeral-converter',
    name: 'Roman Numeral Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert standard numbers to and from Roman numerals (e.g., 1 to I).',
    icon: HashtagIcon,
    iconName: 'HashtagIcon',
    author: 'ToolFORGE Team',
    uses: 7200,
    html: html,
};
