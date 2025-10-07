
import type { StaticTool } from '../../../types';
import { LockClosedIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #10B981;
            border-radius: 50%;
            cursor: pointer;
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-md mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Password Generator</h1>
        <div class="relative">
            <input readonly id="password" class="w-full bg-gray-800 text-white rounded-lg p-4 text-xl pr-12 font-mono tracking-wider" />
            <button id="copyBtn" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"></button>
        </div>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <label for="length" class="text-gray-300">Password Length</label>
                <span id="lengthValue" class="text-green-400 font-bold text-lg bg-gray-700 px-3 py-1 rounded-md">16</span>
            </div>
            <input type="range" id="length" min="8" max="32" value="16" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500">
            <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"><input type="checkbox" id="uppercase" class="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500" checked><span class="text-gray-300">Uppercase</span></label>
                <label class="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"><input type="checkbox" id="lowercase" class="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500" checked><span class="text-gray-300">Lowercase</span></label>
                <label class="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"><input type="checkbox" id="numbers" class="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500" checked><span class="text-gray-300">Numbers</span></label>
                <label class="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"><input type="checkbox" id="symbols" class="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"><span class="text-gray-300">Symbols</span></label>
            </div>
        </div>
        <button id="generateBtn" class="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 text-lg">Generate Password</button>
    </div>
    <script>
        const lengthSlider = document.getElementById('length');
        const lengthValue = document.getElementById('lengthValue');
        const generateBtn = document.getElementById('generateBtn');
        const passwordInput = document.getElementById('password');
        const copyBtn = document.getElementById('copyBtn');
        const uppercaseEl = document.getElementById('uppercase');
        const lowercaseEl = document.getElementById('lowercase');
        const numbersEl = document.getElementById('numbers');
        const symbolsEl = document.getElementById('symbols');
        const charSets = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', num: '0123456789', sym: '!@#$%^&*()_+-=[]{}|;:",.<>/?' };
        const copyIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.75m0 0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25m0 0V5.25m0 0A2.25 2.25 0 016.75 3h1.5a2.25 2.25 0 012.25 2.25m0 0v3.75m-3.75 0h3.75M12 15.75h.008v.008H12v-.008z" /></svg>';
        const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-400"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>';
        copyBtn.innerHTML = copyIcon;
        lengthSlider.addEventListener('input', (e) => lengthValue.textContent = e.target.value);
        function generatePassword() {
            const length = lengthSlider.value;
            let charset = '';
            let password = '';
            if (uppercaseEl.checked) charset += charSets.upper;
            if (lowercaseEl.checked) charset += charSets.lower;
            if (numbersEl.checked) charset += charSets.num;
            if (symbolsEl.checked) charset += charSets.sym;
            if (!charset) { passwordInput.value = 'Select options!'; return; }
            for (let i = 0; i < length; i++) { password += charset.charAt(Math.floor(Math.random() * charset.length)); }
            passwordInput.value = password;
            copyBtn.innerHTML = copyIcon;
        }
        generateBtn.addEventListener('click', generatePassword);
        copyBtn.addEventListener('click', () => {
            if(!passwordInput.value || passwordInput.value === 'Select options!') return;
            navigator.clipboard.writeText(passwordInput.value);
            copyBtn.innerHTML = checkIcon;
            setTimeout(() => { copyBtn.innerHTML = copyIcon }, 2000);
        });
        generatePassword();
    </script>
</body>
</html>
`;

export const passwordGenerator: StaticTool = {
    id: 'tool-password-generator',
    name: 'Password Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Create strong, secure, and random passwords with customizable options.',
    icon: LockClosedIcon,
    iconName: 'LockClosedIcon',
    author: 'ToolFORGE Team',
    uses: 52000,
    html: html,
};
