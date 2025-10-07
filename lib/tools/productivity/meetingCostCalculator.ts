
import type { StaticTool } from '../../../types';
import { UsersIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> body { font-family: 'Inter', sans-serif; background-color: #121212; } </style>
</head>
<body class="text-white flex items-center justify-center h-screen">
    <div class="w-full max-w-md mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Meeting Cost Calculator</h1>
        <div id="settings-panel" class="space-y-4">
            <div>
                <label for="attendees" class="block text-sm font-medium text-gray-400">Number of Attendees</label>
                <input type="number" id="attendees" value="5" class="w-full bg-gray-800 p-2 mt-1 rounded-lg border-2 border-gray-700 focus:border-green-500 focus:ring-0">
            </div>
            <div>
                <label for="rate" class="block text-sm font-medium text-gray-400">Average Hourly Rate ($)</label>
                <input type="number" id="rate" value="75" class="w-full bg-gray-800 p-2 mt-1 rounded-lg border-2 border-gray-700 focus:border-green-500 focus:ring-0">
            </div>
        </div>
        <div id="cost-display" class="text-center bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
            <div class="text-5xl font-bold text-red-400 tabular-nums" id="cost-ticker">$0.00</div>
            <div class="text-gray-400 mt-2">Total Cost</div>
        </div>
        <div class="flex justify-center gap-4">
            <button id="start-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg transition-colors w-28">Start</button>
            <button id="stop-btn" class="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-lg transition-colors w-28" disabled>Stop</button>
            <button id="reset-btn" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">Reset</button>
        </div>
    </div>
    <script>
        const attendeesInput = document.getElementById('attendees');
        const rateInput = document.getElementById('rate');
        const costTicker = document.getElementById('cost-ticker');
        const startBtn = document.getElementById('start-btn');
        const stopBtn = document.getElementById('stop-btn');
        const resetBtn = document.getElementById('reset-btn');

        let timerInterval = null;
        let startTime = 0;
        let pausedTime = 0;
        let accumulatedPausedTime = 0;
        let costPerSecond = 0;

        function updateCost() {
            const elapsedSeconds = (Date.now() - startTime - accumulatedPausedTime) / 1000;
            const currentCost = elapsedSeconds * costPerSecond;
            costTicker.textContent = '$' + currentCost.toFixed(2);
        }
        
        startBtn.addEventListener('click', () => {
            if (timerInterval) { // Resuming from pause
                 accumulatedPausedTime += Date.now() - pausedTime;
            } else { // Starting fresh
                const attendees = parseFloat(attendeesInput.value) || 0;
                const hourlyRate = parseFloat(rateInput.value) || 0;
                if (attendees <= 0 || hourlyRate <= 0) return;
                costPerSecond = (attendees * hourlyRate) / 3600;
                startTime = Date.now();
                accumulatedPausedTime = 0;
            }
            
            timerInterval = setInterval(updateCost, 100);

            startBtn.disabled = true;
            stopBtn.disabled = false;
            attendeesInput.disabled = true;
            rateInput.disabled = true;
            startBtn.textContent = 'Start';
        });

        stopBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            pausedTime = Date.now();
            startBtn.disabled = false;
            stopBtn.disabled = true;
            startBtn.textContent = 'Resume';
        });

        resetBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            costTicker.textContent = '$0.00';
            startBtn.disabled = false;
            stopBtn.disabled = true;
            attendeesInput.disabled = false;
            rateInput.disabled = false;
            startBtn.textContent = 'Start';
        });
    </script>
</body>
</html>
`;

export const meetingCostCalculator: StaticTool = {
    id: 'tool-meeting-cost',
    name: 'Meeting Cost Calculator',
    type: 'static',
    subType: 'Calculator',
    description: 'Calculate the real cost of a meeting based on attendee salaries.',
    icon: UsersIcon,
    iconName: 'UsersIcon',
    author: 'ToolFORGE Team',
    uses: 3100,
    html: html,
};
