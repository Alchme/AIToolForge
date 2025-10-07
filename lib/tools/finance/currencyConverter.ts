
import type { StaticTool } from '../../../types';
import { GlobeAltIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Currency Converter</h1>
        <div class="flex items-end space-x-4">
            <div class="flex-1 space-y-2">
                <label for="fromAmount" class="block text-sm font-medium text-gray-400">From</label>
                <input type="number" id="fromAmount" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3" value="100">
                <select id="fromCurrency" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3"></select>
            </div>
            <button id="swapBtn" class="p-3 bg-gray-700 rounded-full hover:bg-green-600 transition-colors mb-[56px]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 12l-4-4m4 4l4-4m6 8v-12m0 12l4-4m-4 4l-4-4" /></svg>
            </button>
            <div class="flex-1 space-y-2">
                <label for="toAmount" class="block text-sm font-medium text-gray-400">To</label>
                 <div id="toAmount" class="w-full bg-gray-900 border-2 border-gray-700 text-white rounded-lg p-3 h-[52px] flex items-center text-lg font-semibold"></div>
                <select id="toCurrency" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3"></select>
            </div>
        </div>
        <p id="rate" class="text-center text-gray-500 text-sm h-5"></p>
    </div>
    <script>
        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');
        const fromAmountInput = document.getElementById('fromAmount');
        const toAmountEl = document.getElementById('toAmount');
        const swapBtn = document.getElementById('swapBtn');
        const rateEl = document.getElementById('rate');

        // Note: In a real app, these rates would be fetched from an API.
        const rates = { "USD": 1, "EUR": 0.92, "JPY": 157.24, "GBP": 0.78, "AUD": 1.50, "CAD": 1.37, "CHF": 0.90, "CNY": 7.24, "INR": 83.54 };

        function populateSelects() {
            Object.keys(rates).sort().forEach(currency => {
                fromCurrencySelect.add(new Option(currency, currency));
                toCurrencySelect.add(new Option(currency, currency));
            });
            fromCurrencySelect.value = "USD";
            toCurrencySelect.value = "EUR";
        }

        function convert() {
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            const amount = parseFloat(fromAmountInput.value) || 0;

            const rate = rates[toCurrency] / rates[fromCurrency];
            const result = amount * rate;
            
            toAmountEl.textContent = result.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
            rateEl.textContent = '1 ' + fromCurrency + ' = ' + rate.toFixed(4) + ' ' + toCurrency;
        }

        swapBtn.addEventListener('click', () => {
            [fromCurrencySelect.value, toCurrencySelect.value] = [toCurrencySelect.value, fromCurrencySelect.value];
            convert();
        });
        
        [fromCurrencySelect, toCurrencySelect, fromAmountInput].forEach(el => el.addEventListener('input', convert));
        
        populateSelects();
        convert();
    </script>
</body>
</html>`;

export const currencyConverter: StaticTool = {
    id: 'tool-currency-converter',
    name: 'Currency Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert between major world currencies with mock exchange rates.',
    icon: GlobeAltIcon,
    iconName: 'GlobeAltIcon',
    author: 'ToolFORGE Team',
    uses: 41000,
    html: html
};
