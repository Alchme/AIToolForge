
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
        <h1 class="text-3xl font-bold text-center text-white">Investment Calculator</h1>
        <div class="space-y-4">
            <div><label for="principal" class="block text-sm font-medium text-gray-400">Initial Investment ($)</label><input type="number" id="principal" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="1000"></div>
            <div><label for="contribution" class="block text-sm font-medium text-gray-400">Monthly Contribution ($)</label><input type="number" id="contribution" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="100"></div>
            <div><label for="years" class="block text-sm font-medium text-gray-400">Years to Grow</label><input type="number" id="years" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="10"></div>
            <div><label for="rate" class="block text-sm font-medium text-gray-400">Estimated Annual Rate (%)</label><input type="number" id="rate" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="7"></div>
        </div>
        <div class="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center">
            <p class="text-gray-400 text-lg">Future Value</p>
            <p id="futureValue" class="text-4xl font-bold text-green-400 mt-1">$0.00</p>
        </div>
    </div>
    <script>
        const principalInput = document.getElementById('principal');
        const contributionInput = document.getElementById('contribution');
        const yearsInput = document.getElementById('years');
        const rateInput = document.getElementById('rate');
        const futureValueEl = document.getElementById('futureValue');

        function calculate() {
            const P = parseFloat(principalInput.value) || 0;
            const PMT = parseFloat(contributionInput.value) || 0;
            const t = parseFloat(yearsInput.value) || 0;
            const r = (parseFloat(rateInput.value) || 0) / 100;
            const n = 12; // Compounded monthly

            const nt = n * t;
            const rate_n = r / n;
            
            const futurePrincipal = P * Math.pow(1 + rate_n, nt);
            const futureContributions = PMT * ( (Math.pow(1 + rate_n, nt) - 1) / rate_n );
            const total = futurePrincipal + futureContributions;

            futureValueEl.textContent = '$' + total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
        [principalInput, contributionInput, yearsInput, rateInput].forEach(el => el.addEventListener('input', calculate));
        calculate();
    </script>
</body>
</html>`;

export const investmentCalculator: StaticTool = {
    id: 'tool-investment-calculator',
    name: 'Investment Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Project the future value of your investments with compound interest.',
    icon: ScaleIcon,
    iconName: 'ScaleIcon',
    author: 'ToolFORGE Team',
    uses: 15100,
    html: html
};
