
import type { StaticTool } from '../../../types';
import { HomeIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-2xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Mortgage Calculator</h1>
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <h2 class="text-lg font-semibold text-gray-300">Loan Details</h2>
                <div><label for="price" class="block text-sm font-medium text-gray-400">Home Price ($)</label><input type="number" id="price" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="300000"></div>
                <div><label for="downPayment" class="block text-sm font-medium text-gray-400">Down Payment ($)</label><input type="number" id="downPayment" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="60000"></div>
                <div><label for="term" class="block text-sm font-medium text-gray-400">Loan Term (Years)</label><input type="number" id="term" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="30"></div>
                <div><label for="rate" class="block text-sm font-medium text-gray-400">Interest Rate (%)</label><input type="number" id="rate" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="6.5"></div>
            </div>
            <div class="space-y-4">
                <h2 class="text-lg font-semibold text-gray-300">Additional Costs (p.a.)</h2>
                <div><label for="tax" class="block text-sm font-medium text-gray-400">Property Tax ($)</label><input type="number" id="tax" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="4000"></div>
                <div><label for="insurance" class="block text-sm font-medium text-gray-400">Home Insurance ($)</label><input type="number" id="insurance" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="1500"></div>
                <div><label for="pmi" class="block text-sm font-medium text-gray-400">PMI (%)</label><input type="number" id="pmi" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1" value="0.5"></div>
            </div>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-700">
            <h3 class="text-lg font-semibold text-center mb-4">Estimated Monthly Payment</h3>
            <div id="results" class="bg-gray-900/50 border border-gray-700 rounded-lg p-6 text-center">
                 <p id="totalPayment" class="text-4xl font-bold text-green-400">$0.00</p>
                 <div id="breakdown" class="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-400"></div>
            </div>
        </div>
    </div>
    <script>
        const inputs = ['price', 'downPayment', 'term', 'rate', 'tax', 'insurance', 'pmi'].map(id => document.getElementById(id));
        const totalPaymentEl = document.getElementById('totalPayment');
        const breakdownEl = document.getElementById('breakdown');
        
        function calculate() {
            const [price, downPayment, term, rate, tax, insurance, pmiRate] = inputs.map(el => parseFloat(el.value) || 0);
            
            const loanAmount = price - downPayment;
            if (loanAmount <= 0 || term <= 0 || rate <= 0) {
                totalPaymentEl.textContent = '$0.00';
                breakdownEl.innerHTML = '';
                return;
            }

            const monthlyRate = rate / 100 / 12;
            const numPayments = term * 12;
            
            const principalAndInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
            
            const monthlyTax = tax / 12;
            const monthlyInsurance = insurance / 12;
            
            // Calculate PMI if down payment is less than 20%
            const pmi = (downPayment / price) < 0.2 ? (loanAmount * (pmiRate / 100)) / 12 : 0;
            
            const totalMonthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + pmi;
            
            totalPaymentEl.textContent = '$' + totalMonthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

            let breakdownHtml = '<span>P&I: <strong>$' + principalAndInterest.toFixed(2) + '</strong></span>' +
                                '<span>Taxes: <strong>$' + monthlyTax.toFixed(2) + '</strong></span>' +
                                '<span>Insurance: <strong>$' + monthlyInsurance.toFixed(2) + '</strong></span>';
            if (pmi > 0) {
                breakdownHtml += '<span>PMI: <strong>$' + pmi.toFixed(2) + '</strong></span>';
            }
            breakdownEl.innerHTML = breakdownHtml;
        }
        
        inputs.forEach(el => el.addEventListener('input', calculate));
        calculate();
    </script>
</body>
</html>
`;

export const mortgageCalculator: StaticTool = {
    id: 'tool-mortgage-calculator',
    name: 'Mortgage Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Estimate your monthly mortgage payments with taxes and insurance.',
    icon: HomeIcon,
    iconName: 'HomeIcon',
    author: 'ToolFORGE Team',
    uses: 11200,
    html: html
};
