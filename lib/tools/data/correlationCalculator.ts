import type { StaticTool } from '../../../types';
import { ChartPieIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-2xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 h-full flex flex-col">
        <h1 class="text-2xl font-bold text-center text-white mb-4">Correlation Calculator</h1>
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <div class="flex flex-col">
                <label for="dataX" class="text-sm font-medium text-gray-400 mb-2">Dataset X</label>
                <textarea id="dataX" class="w-full h-full bg-gray-800 p-3 rounded-lg font-mono resize-none" placeholder="1,2,3,4,5"></textarea>
            </div>
            <div class="flex flex-col">
                <label for="dataY" class="text-sm font-medium text-gray-400 mb-2">Dataset Y</label>
                <textarea id="dataY" class="w-full h-full bg-gray-800 p-3 rounded-lg font-mono resize-none" placeholder="2,4,5,4,5"></textarea>
            </div>
        </div>
        <div id="result" class="mt-4 text-center bg-gray-800 p-4 rounded-lg">
             <span class="text-gray-400">Pearson Correlation (r):</span>
             <span id="correlation" class="text-2xl font-bold text-green-400 ml-2">0</span>
        </div>
    </div>
    <script>
        const dataXInput = document.getElementById('dataX');
        const dataYInput = document.getElementById('dataY');
        const correlationEl = document.getElementById('correlation');

        function calculate() {
            const getNumbers = (input) => input.value.split(/[\n,]+/).map(Number).filter(n => !isNaN(n));
            const x = getNumbers(dataXInput);
            const y = getNumbers(dataYInput);
            
            if (x.length !== y.length || x.length === 0) {
                correlationEl.textContent = 'N/A';
                return;
            }

            const n = x.length;
            const sumX = x.reduce((a, b) => a + b, 0);
            const sumY = y.reduce((a, b) => a + b, 0);
            const sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
            const sumX2 = x.map(xi => xi * xi).reduce((a, b) => a + b, 0);
            const sumY2 = y.map(yi => yi * yi).reduce((a, b) => a + b, 0);

            const numerator = n * sumXY - sumX * sumY;
            const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
            
            if (denominator === 0) {
                 correlationEl.textContent = '0';
                 return;
            }
            
            const r = numerator / denominator;
            correlationEl.textContent = r.toFixed(4);
        }

        dataXInput.addEventListener('input', calculate);
        dataYInput.addEventListener('input', calculate);
        
        dataXInput.value = "1,2,3,4,5";
        dataYInput.value = "2,3,4,5,6";
        calculate();
    </script>
</body>
</html>
`;

export const correlationCalculator: StaticTool = {
    id: 'tool-correlation-calculator',
    name: 'Correlation Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Calculate the correlation coefficient between two sets of data.',
    icon: ChartPieIcon,
    iconName: 'ChartPieIcon',
    author: 'ToolFORGE Team',
    uses: 3900,
    html: html
};