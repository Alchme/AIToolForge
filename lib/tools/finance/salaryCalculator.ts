
import type { StaticTool } from '../../../types';
import { BriefcaseIcon } from '../../../components/Icons';

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
        <h1 class="text-3xl font-bold text-center text-white">Salary Calculator</h1>
        <div class="space-y-4">
            <div><label for="grossSalary" class="block text-sm font-medium text-gray-400">Gross Annual Salary ($)</label><input type="number" id="grossSalary" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="75000"></div>
            <div><label for="federalTax" class="block text-sm font-medium text-gray-400">Federal Tax Rate (%)</label><input type="number" id="federalTax" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="12"></div>
            <div><label for="stateTax" class="block text-sm font-medium text-gray-400">State Tax Rate (%)</label><input type="number" id="stateTax" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="5"></div>
            <div><label for="deductions" class="block text-sm font-medium text-gray-400">Other Deductions (p.m. $)</label><input type="number" id="deductions" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="250"></div>
        </div>
        <div id="results" class="bg-gray-900/50 border border-gray-700 rounded-lg p-6 space-y-3">
             <div class="flex justify-between items-center text-base">
                <span class="text-gray-400">Gross Monthly Income</span>
                <span id="grossMonthly" class="font-semibold text-white">$0.00</span>
            </div>
            <div class="flex justify-between items-center text-base">
                <span class="text-gray-400">Monthly Taxes</span>
                <span id="monthlyTaxes" class="font-semibold text-red-400">$0.00</span>
            </div>
            <div class="flex justify-between items-center text-base">
                <span class="text-gray-400">Monthly Deductions</span>
                <span id="monthlyDeductions" class="font-semibold text-red-400">$0.00</span>
            </div>
            <hr class="border-gray-700 my-3"/>
            <div class="flex justify-between items-center text-xl">
                <span class="text-gray-300">Net Monthly Income</span>
                <span id="netMonthly" class="font-bold text-green-400">$0.00</span>
            </div>
        </div>
    </div>
    <script>
        const inputs = ['grossSalary', 'federalTax', 'stateTax', 'deductions'].map(id => document.getElementById(id));
        const [grossMonthlyEl, monthlyTaxesEl, monthlyDeductionsEl, netMonthlyEl] = ['grossMonthly', 'monthlyTaxes', 'monthlyDeductions', 'netMonthly'].map(id => document.getElementById(id));

        function calculate() {
            const [grossSalary, federalTaxRate, stateTaxRate, otherDeductions] = inputs.map(el => parseFloat(el.value) || 0);

            const grossMonthly = grossSalary / 12;
            const federalTax = grossMonthly * (federalTaxRate / 100);
            const stateTax = grossMonthly * (stateTaxRate / 100);
            const totalTaxes = federalTax + stateTax;
            
            const netMonthly = grossMonthly - totalTaxes - otherDeductions;
            
            grossMonthlyEl.textContent = '$' + grossMonthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            monthlyTaxesEl.textContent = '-$' + totalTaxes.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            monthlyDeductionsEl.textContent = '-$' + otherDeductions.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            netMonthlyEl.textContent = '$' + netMonthly.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
        
        inputs.forEach(el => el.addEventListener('input', calculate));
        calculate();
    </script>
</body>
</html>
`;

export const salaryCalculator: StaticTool = {
    id: 'tool-salary-calculator',
    name: 'Salary Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'A simplified calculator to estimate your net salary after deductions.',
    icon: BriefcaseIcon,
    iconName: 'BriefcaseIcon',
    author: 'ToolFORGE Team',
    uses: 19300,
    html: html
};
