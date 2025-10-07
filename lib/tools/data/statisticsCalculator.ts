import type { StaticTool } from '../../../types';
import { CalculatorIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8">
        <h1 class="text-2xl font-bold text-center text-white mb-4">Statistics Calculator</h1>
        <textarea id="data-input" class="w-full h-32 bg-gray-800 p-3 rounded-lg font-mono resize-y" placeholder="Enter numbers, separated by commas or new lines"></textarea>
        <div id="results" class="mt-4 bg-gray-800 p-4 rounded-lg space-y-2">
            <div class="flex justify-between"><span>Mean:</span><span id="mean" class="font-bold text-green-400">0</span></div>
            <div class="flex justify-between"><span>Median:</span><span id="median" class="font-bold text-green-400">0</span></div>
            <div class="flex justify-between"><span>Mode:</span><span id="mode" class="font-bold text-green-400">0</span></div>
            <div class="flex justify-between"><span>Standard Deviation:</span><span id="stddev" class="font-bold text-green-400">0</span></div>
        </div>
    </div>
    <script>
        const dataInput = document.getElementById('data-input');
        const meanEl = document.getElementById('mean');
        const medianEl = document.getElementById('median');
        const modeEl = document.getElementById('mode');
        const stddevEl = document.getElementById('stddev');

        dataInput.addEventListener('input', () => {
            const rawData = dataInput.value.split(/[\\n,]+/).filter(Boolean);
            const numbers = rawData.map(Number).filter(n => !isNaN(n));

            if (numbers.length === 0) {
                meanEl.textContent = medianEl.textContent = modeEl.textContent = stddevEl.textContent = '0';
                return;
            }

            // Mean
            const sum = numbers.reduce((a, b) => a + b, 0);
            const mean = sum / numbers.length;
            meanEl.textContent = mean.toFixed(4);

            // Median
            numbers.sort((a, b) => a - b);
            const mid = Math.floor(numbers.length / 2);
            const median = numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
            medianEl.textContent = median.toFixed(4);

            // Mode
            const frequency = {};
            numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
            let maxFreq = 0;
            let modes = [];
            for (const key in frequency) {
                if (frequency[key] > maxFreq) {
                    modes = [Number(key)];
                    maxFreq = frequency[key];
                } else if (frequency[key] === maxFreq) {
                    modes.push(Number(key));
                }
            }
            modeEl.textContent = modes.join(', ');

            // Standard Deviation
            const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numbers.length;
            const stddev = Math.sqrt(variance);
            stddevEl.textContent = stddev.toFixed(4);
        });
    </script>
</body>
</html>
`;

export const statisticsCalculator: StaticTool = {
    id: 'tool-statistics-calculator',
    name: 'Statistics Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Calculate mean, median, mode, and standard deviation from a data set.',
    icon: CalculatorIcon,
    iconName: 'CalculatorIcon',
    author: 'ToolFORGE Team',
    uses: 7600,
    html: html
};