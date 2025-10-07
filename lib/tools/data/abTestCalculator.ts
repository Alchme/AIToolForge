import type { StaticTool } from '../../../types';
import { BeakerIcon } from '../../../components/Icons';

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
        <h1 class="text-2xl font-bold text-center text-white mb-6">A/B Test Significance Calculator</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-gray-800 p-4 rounded-lg">
                <h2 class="text-lg font-semibold text-center mb-3">Version A (Control)</h2>
                <label class="block text-sm">Visitors:</label>
                <input type="number" id="visitorsA" value="1000" class="w-full bg-gray-700 p-2 mt-1 rounded-lg">
                <label class="block text-sm mt-2">Conversions:</label>
                <input type="number" id="conversionsA" value="100" class="w-full bg-gray-700 p-2 mt-1 rounded-lg">
            </div>
            <div class="bg-gray-800 p-4 rounded-lg">
                <h2 class="text-lg font-semibold text-center mb-3">Version B (Variant)</h2>
                <label class="block text-sm">Visitors:</label>
                <input type="number" id="visitorsB" value="1000" class="w-full bg-gray-700 p-2 mt-1 rounded-lg">
                <label class="block text-sm mt-2">Conversions:</label>
                <input type="number" id="conversionsB" value="120" class="w-full bg-gray-700 p-2 mt-1 rounded-lg">
            </div>
        </div>
        <div id="result" class="mt-6 text-center"></div>
    </div>
    <script>
        const inputs = Array.from(document.querySelectorAll('input'));
        const resultEl = document.getElementById('result');

        // Z-score for 95% confidence
        const Z_SCORE = 1.96;

        function calculate() {
            const vA = parseInt(inputs[0].value) || 0;
            const cA = parseInt(inputs[1].value) || 0;
            const vB = parseInt(inputs[2].value) || 0;
            const cB = parseInt(inputs[3].value) || 0;

            if (vA <= 0 || vB <= 0) {
                resultEl.innerHTML = '';
                return;
            }

            const pA = cA / vA;
            const pB = cB / vB;

            const pPool = (cA + cB) / (vA + vB);
            const se = Math.sqrt(pPool * (1 - pPool) * (1/vA + 1/vB));
            const z = (pB - pA) / se;
            
            // Two-tailed test check
            const significant = Math.abs(z) > Z_SCORE;
            const winner = pB > pA ? 'B' : 'A';
            const uplift = (((pB - pA) / pA) * 100).toFixed(2);

            resultEl.innerHTML = \`
                <div class="p-4 rounded-lg \${significant ? 'bg-green-800/50' : 'bg-red-800/50'}">
                    <p class="text-2xl font-bold \${significant ? 'text-green-300' : 'text-red-300'}">
                        \${significant ? 'Statistically Significant' : 'Not Significant'}
                    </p>
                    <p class="text-gray-300 mt-2">Z-Score: \${z.toFixed(3)}. Version \${winner} performed \${uplift}% better.</p>
                </div>
            \`;
        }

        inputs.forEach(input => input.addEventListener('input', calculate));
        calculate();
    </script>
</body>
</html>
`;

export const abTestCalculator: StaticTool = {
    id: 'tool-ab-test-calculator',
    name: 'A/B Test Significance Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Determine if the results of your A/B test are statistically significant.',
    icon: BeakerIcon,
    iconName: 'BeakerIcon',
    author: 'ToolFORGE Team',
    uses: 5900,
    html: html
};