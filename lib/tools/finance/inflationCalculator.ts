
import type { StaticTool } from '../../../types';
import { ScaleIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-md mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Inflation Calculator</h1>
        <div class="space-y-4">
            <div><label for="amount" class="block text-sm font-medium text-gray-400">Initial Amount ($)</label><input type="number" id="amount" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="1000"></div>
            <div><label for="years" class="block text-sm font-medium text-gray-400">Number of Years</label><input type="number" id="years" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="10"></div>
            <div><label for="rate" class="block text-sm font-medium text-gray-400">Avg. Annual Inflation (%)</label><input type="number" id="rate" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="3"></div>
        </div>
        <div id="results" class="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center">
            <p class="text-gray-400">In <span id="futureYears" class="font-bold">10</span> years, <span id="initialAmountText" class="font-bold">$1,000</span> will have the same buying power as</p>
            <p id="futureValue" class="text-4xl font-bold text-green-400 mt-2">$0.00</p>
            <p class="text-gray-400">today.</p>
        </div>
    </div>
    <script>
        const inputs = ['amount', 'years', 'rate'].map(id => document.getElementById(id));
        const [amountInput, yearsInput, rateInput] = inputs;
        const futureYearsEl = document.getElementById('futureYears');
        const initialAmountTextEl = document.getElementById('initialAmountText');
        const futureValueEl = document.getElementById('futureValue');

        function calculate() {
            const amount = parseFloat(amountInput.value) || 0;
            const years = parseFloat(yearsInput.value) || 0;
            const rate = parseFloat(rateInput.value) / 100 || 0;

            if (amount <= 0 || years <= 0) {
                futureValueEl.textContent = '$0.00';
                return;
            }

            const futureValue = amount / Math.pow(1 + rate, years);
            
            futureYearsEl.textContent = years;
            initialAmountTextEl.textContent = '$' + amount.toLocaleString();
            futureValueEl.textContent = '$' + futureValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
        
        inputs.forEach(el => el.addEventListener('input', calculate));
        calculate();
    </script>
</body>
</html>
`;

export const inflationCalculator: StaticTool = {
    id: 'tool-inflation-calculator',
    name: 'Inflation Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'See how the value of money changes over time due to inflation.',
    icon: ScaleIcon,
    iconName: 'ScaleIcon',
    author: 'ToolFORGE Team',
    uses: 4500,
    html: html
};
