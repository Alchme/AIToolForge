
import type { StaticTool } from '../../../types';
import { CurrencyDollarIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-sm mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Tip Calculator</h1>
        <div class="space-y-4">
            <div>
                <label for="bill" class="block text-sm font-medium text-gray-400">Bill Amount</label>
                <input type="number" id="bill" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" placeholder="0.00">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-400">Tip Percentage</label>
                <div id="tip-options" class="grid grid-cols-3 gap-2 mt-1">
                    <button class="tip-btn bg-gray-700 p-2 rounded-lg transition-colors duration-200">15%</button>
                    <button class="tip-btn bg-green-600 p-2 rounded-lg transition-colors duration-200">18%</button>
                    <button class="tip-btn bg-gray-700 p-2 rounded-lg transition-colors duration-200">20%</button>
                </div>
            </div>
            <div>
                <label for="split" class="block text-sm font-medium text-gray-400">Split Between</label>
                <input type="number" id="split" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="1" min="1">
            </div>
        </div>
        <div class="bg-gray-900/50 border border-gray-700 rounded-lg p-4 space-y-3">
            <div class="flex justify-between items-center text-lg">
                <span class="text-gray-400">Tip Amount</span>
                <span id="tip-amount" class="font-bold text-green-400">$0.00</span>
            </div>
            <hr class="border-gray-700" />
            <div class="flex justify-between items-center text-xl">
                <span class="text-gray-300">Total Per Person</span>
                <span id="total-per-person" class="font-bold text-white">$0.00</span>
            </div>
        </div>
    </div>
    <script>
        const billInput = document.getElementById('bill');
        const splitInput = document.getElementById('split');
        const tipAmountEl = document.getElementById('tip-amount');
        const totalPerPersonEl = document.getElementById('total-per-person');
        const tipBtns = document.querySelectorAll('.tip-btn');
        let tipPercentage = 0.18;

        function calculate() {
            const bill = parseFloat(billInput.value) || 0;
            const split = parseInt(splitInput.value) || 1;
            if (bill < 0 || split < 1) return;
            
            const tipAmount = bill * tipPercentage;
            const total = bill + tipAmount;
            const totalPerPerson = total / split;

            tipAmountEl.textContent = '$' + tipAmount.toFixed(2);
            totalPerPersonEl.textContent = '$' + totalPerPerson.toFixed(2);
        }

        tipBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tipBtns.forEach(b => b.classList.replace('bg-green-600', 'bg-gray-700'));
                btn.classList.replace('bg-gray-700', 'bg-green-600');
                tipPercentage = parseFloat(btn.textContent) / 100;
                calculate();
            });
        });

        billInput.addEventListener('input', calculate);
        splitInput.addEventListener('input', calculate);
        calculate();
    </script>
</body>
</html>`;

export const tipCalculator: StaticTool = {
    id: 'tool-tip-calculator',
    name: 'Tip Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Quickly calculate tips and split the bill between friends.',
    icon: CurrencyDollarIcon,
    iconName: 'CurrencyDollarIcon',
    author: 'ToolFORGE Team',
    uses: 32500,
    html: html
};
