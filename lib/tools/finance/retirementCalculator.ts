
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
    <div class="w-full max-w-xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Retirement Calculator</h1>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <div><label for="currentAge" class="block text-sm font-medium text-gray-400">Current Age</label><input type="number" id="currentAge" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 rounded-lg p-3 mt-1" value="30"></div>
                <div><label for="retireAge" class="block text-sm font-medium text-gray-400">Retirement Age</label><input type="number" id="retireAge" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 rounded-lg p-3 mt-1" value="65"></div>
                <div><label for="currentSavings" class="block text-sm font-medium text-gray-400">Current Savings ($)</label><input type="number" id="currentSavings" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 rounded-lg p-3 mt-1" value="50000"></div>
                <div><label for="monthlyContrib" class="block text-sm font-medium text-gray-400">Monthly Contribution ($)</label><input type="number" id="monthlyContrib" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 rounded-lg p-3 mt-1" value="500"></div>
                <div><label for="returnRate" class="block text-sm font-medium text-gray-400">Annual Return Rate (%)</label><input type="number" id="returnRate" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 rounded-lg p-3 mt-1" value="7"></div>
            </div>
            <div class="space-y-6 bg-gray-900/50 border border-gray-700 rounded-lg p-6 flex flex-col justify-center">
                <h2 class="text-lg font-semibold text-center text-white">Results</h2>
                <div class="text-center">
                    <p class="text-gray-400">Est. Savings at Retirement</p>
                    <p id="retirementSavings" class="text-3xl font-bold text-green-400 mt-1">$0.00</p>
                </div>
                <div class="text-center">
                    <p class="text-gray-400">Est. Monthly Income</p>
                    <p id="monthlyIncome" class="text-2xl font-bold text-white mt-1">$0.00</p>
                    <p class="text-xs text-gray-500">(Assuming 4% withdrawal rate)</p>
                </div>
            </div>
        </div>
    </div>
    <script>
        const inputs = ['currentAge', 'retireAge', 'currentSavings', 'monthlyContrib', 'returnRate'].map(id => document.getElementById(id));
        const retirementSavingsEl = document.getElementById('retirementSavings');
        const monthlyIncomeEl = document.getElementById('monthlyIncome');

        function calculate() {
            const [currentAge, retireAge, currentSavings, monthlyContrib, annualRate] = inputs.map(el => parseFloat(el.value) || 0);

            const yearsToGrow = retireAge - currentAge;
            if (yearsToGrow <= 0) {
                retirementSavingsEl.textContent = '$' + currentSavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                monthlyIncomeEl.textContent = '$' + ((currentSavings * 0.04) / 12).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                return;
            }

            const r = annualRate / 100 / 12; // monthly rate
            const n = yearsToGrow * 12; // number of months
            
            const futurePrincipal = currentSavings * Math.pow(1 + r, n);
            const futureContributions = monthlyContrib * ((Math.pow(1 + r, n) - 1) / r);
            const totalSavings = futurePrincipal + futureContributions;

            const monthlyRetirementIncome = (totalSavings * 0.04) / 12;

            retirementSavingsEl.textContent = '$' + totalSavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            monthlyIncomeEl.textContent = '$' + monthlyRetirementIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
        
        inputs.forEach(el => el.addEventListener('input', calculate));
        calculate();
    </script>
</body>
</html>
`;

export const retirementCalculator: StaticTool = {
    id: 'tool-retirement-calculator',
    name: 'Retirement Savings',
    type: 'static',
    subType: 'Calculator',
    description: 'Project your retirement portfolio and see if you are on track.',
    icon: ScaleIcon,
    iconName: 'ScaleIcon',
    author: 'ToolFORGE Team',
    uses: 13000,
    html: html
};
