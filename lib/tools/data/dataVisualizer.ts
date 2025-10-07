import type { StaticTool } from '../../../types';
import { ChartBarIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style> body { font-family: 'Inter', sans-serif; background-color: #121212; } </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 h-full flex flex-col">
        <h1 class="text-2xl font-bold text-center text-white mb-4">Data Visualizer</h1>
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <div class="flex flex-col">
                <label for="data-input" class="text-sm font-medium text-gray-400 mb-2">Data (CSV: label,value)</label>
                <textarea id="data-input" class="w-full flex-grow bg-gray-800 p-3 rounded-lg font-mono resize-none" placeholder="Apples,12\\nOranges,9\\nPears,5"></textarea>
                <div class="flex gap-2 mt-2">
                    <select id="chart-type" class="bg-gray-800 p-2 rounded-lg">
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="pie">Pie Chart</option>
                    </select>
                    <button id="visualize-btn" class="flex-grow bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">Visualize</button>
                </div>
            </div>
            <div class="bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                <canvas id="chart-canvas"></canvas>
            </div>
        </div>
    </div>
    <script>
        const dataInput = document.getElementById('data-input');
        const visualizeBtn = document.getElementById('visualize-btn');
        const chartTypeSelect = document.getElementById('chart-type');
        const ctx = document.getElementById('chart-canvas').getContext('2d');
        let chart;

        function visualize() {
            const dataText = dataInput.value.trim();
            if (!dataText) return;

            const lines = dataText.split('\\n');
            const labels = [];
            const values = [];

            lines.forEach(line => {
                const parts = line.split(',');
                if (parts.length === 2) {
                    labels.push(parts[0].trim());
                    values.push(parseFloat(parts[1].trim()));
                }
            });

            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: chartTypeSelect.value,
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Dataset',
                        data: values,
                        backgroundColor: ['#4ade80', '#38bdf8', '#facc15', '#f87171', '#c084fc', '#fb923c'],
                        borderColor: '#4a5568',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#d1d5db'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: '#9ca3af' },
                            grid: { color: '#374151' }
                        },
                        x: {
                            ticks: { color: '#9ca3af' },
                             grid: { color: '#374151' }
                        }
                    }
                }
            });
        }

        visualizeBtn.addEventListener('click', visualize);
        chartTypeSelect.addEventListener('change', visualize);
        dataInput.value = 'Apples,12\\nOranges,9\\nPears,5\\nGrapes,15\\nBananas,7';
        visualize();
    </script>
</body>
</html>
`;

export const dataVisualizer: StaticTool = {
    id: 'tool-data-visualizer',
    name: 'Data Visualizer',
    type: 'static',
    subType: 'Utility',
    description: 'Paste CSV or JSON data to generate simple bar, line, and pie charts.',
    icon: ChartBarIcon,
    iconName: 'ChartBarIcon',
    author: 'ToolFORGE Team',
    uses: 11200,
    html: html
};