
import type { StaticTool } from '../../../types';
import { TrophyIcon } from '../../../components/Icons';

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
        <h1 class="text-3xl font-bold text-center text-white">Savings Goal Calculator</h1>
        <div class="space-y-4">
            <div><label for="goal" class="block text-sm font-medium text-gray-400">Savings Goal ($)</label><input type="number" id="goal" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="20000"></div>
            <div><label for="initial" class="block text-sm font-medium text-gray-400">Initial Deposit ($)</label><input type="number" id="initial" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="1000"></div>
            <div><label for="years" class="block text-sm font-medium text-gray-400">Time to Save (Years)</label><input type="number" id="years" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="5"></div>
            <div><label for="rate" class="block text-sm font-medium text-gray-400">Estimated Annual Rate (%)</label><input type="number" id="rate" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="4"></div>
        </div>
        <div class="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center">
            <p class="text-gray-400 text-lg">You need to save</p>
            <p id="monthlyContribution" class="text-4xl font-bold text-green-400 mt-1">$0.00</p>
            <p class="text-gray-400">per month to reach your goal.</p>
        </div>
    </div>
    <script>
        const inputs = ['goal', 'initial', 'years', 'rate'].map(id => document.getElementById(id));
        const monthlyContributionEl = document.getElementById('monthlyContribution');

        function calculate() {
            const [goal, initial, years, annualRate] = inputs.map(el => parseFloat(el.value) || 0);

            if (goal <= 0 || years <= 0 || goal <= initial) {
                monthlyContributionEl.textContent = '$0.00';
                return;
            }

            const r = annualRate / 100 / 12; // Monthly interest rate
            const n = years * 12; // Total number of months

            // FV = P * (1+r)^n + PMT * [((1+r)^n - 1) / r]
            // PMT = (FV - P * (1+r)^n) / [((1+r)^n - 1) / r]
            
            const futureValueOfInitial = initial * Math.pow(1 + r, n);
            const denominator = (Math.pow(1 + r, n) - 1) / r;
            
            const pmt = denominator > 0 ? (goal - futureValueOfInitial) / denominator : (goal - initial) / n;
            
            monthlyContributionEl.textContent = '$' + pmt.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
        
        inputs.forEach(el => el.addEventListener('input', calculate));
        calculate();
    </script>
</body>
</html>
`;

export const savingsGoalCalculator: StaticTool = {
    id: 'tool-savings-goal',
    name: 'Savings Goal Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Find out how much you need to save to reach your financial goals.',
    icon: TrophyIcon,
    iconName: 'TrophyIcon',
    author: 'ToolFORGE Team',
    uses: 8700,
    html: html
};
