
import type { StaticTool } from '../../../types';
import { CalculatorIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        /* Custom input styles for better look in dark mode */
        input[type="number"] {
            -moz-appearance: textfield;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-md mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Loan Calculator</h1>
        <div class="space-y-4">
            <div>
                <label for="amount" class="block text-sm font-medium text-gray-400">Loan Amount ($)</label>
                <input type="number" id="amount" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1 transition" value="25000">
            </div>
            <div>
                <label for="rate" class="block text-sm font-medium text-gray-400">Annual Interest Rate (%)</label>
                <input type="number" id="rate" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1 transition" value="5">
            </div>
            <div>
                <label for="term" class="block text-sm font-medium text-gray-400">Loan Term (Years)</label>
                <input type="number" id="term" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 mt-1 transition" value="5">
            </div>
        </div>
        <div id="results" class="bg-gray-900/50 border border-gray-700 rounded-lg p-6 space-y-4 hidden">
             <div class="flex justify-between items-center text-xl">
                <span class="text-gray-300">Monthly Payment</span>
                <span id="monthlyPayment" class="font-bold text-green-400">$0.00</span>
            </div>
             <hr class="border-gray-700">
            <div class="flex justify-between items-center text-base">
                <span class="text-gray-400">Total Principal Paid</span>
                <span id="totalPrincipal" class="font-semibold text-white">$0.00</span>
            </div>
            <div class="flex justify-between items-center text-base">
                <span class="text-gray-400">Total Interest Paid</span>
                <span id="totalInterest" class="font-semibold text-white">$0.00</span>
            </div>
        </div>
    </div>
    <script>
        const amountInput = document.getElementById('amount');
        const rateInput = document.getElementById('rate');
        const termInput = document.getElementById('term');
        const resultsEl = document.getElementById('results');
        const monthlyPaymentEl = document.getElementById('monthlyPayment');
        const totalPrincipalEl = document.getElementById('totalPrincipal');
        const totalInterestEl = document.getElementById('totalInterest');

        function calculate() {
            const P = parseFloat(amountInput.value) || 0;
            const annualRate = parseFloat(rateInput.value) || 0;
            const termYears = parseFloat(termInput.value) || 0;

            if (P <= 0 || annualRate <= 0 || termYears <= 0) {
                resultsEl.classList.add('hidden');
                return;
            }

            const r = annualRate / 100 / 12; // Monthly interest rate
            const n = termYears * 12; // Total number of payments

            const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayment = M * n;
            const totalInterest = totalPayment - P;
            
            monthlyPaymentEl.textContent = '$' + M.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            totalPrincipalEl.textContent = '$' + P.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            totalInterestEl.textContent = '$' + totalInterest.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            resultsEl.classList.remove('hidden');
        }
        
        [amountInput, rateInput, termInput].forEach(el => el.addEventListener('input', calculate));
        
        calculate();
    </script>
</body>
</html>
`;

export const loanCalculator: StaticTool = {
    id: 'tool-loan-calculator',
    name: 'Loan Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Calculate monthly payments for a loan, including total interest.',
    icon: CalculatorIcon,
    iconName: 'CalculatorIcon',
    author: 'ToolFORGE Team',
    uses: 18200,
    html: html
};
