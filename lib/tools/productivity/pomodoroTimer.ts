
import type { StaticTool } from '../../../types';
import { ClockIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-md mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 text-center">
        <h1 id="mode-title" class="text-3xl font-bold text-white mb-4">Pomodoro</h1>
        <div class="flex justify-center gap-2 mb-8">
            <button data-mode="pomodoro" class="mode-btn bg-green-600/80 px-4 py-2 rounded-lg font-semibold">Pomodoro</button>
            <button data-mode="shortBreak" class="mode-btn bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold">Short Break</button>
            <button data-mode="longBreak" class="mode-btn bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold">Long Break</button>
        </div>
        <div id="timer" class="text-8xl font-bold text-white tabular-nums mb-8">25:00</div>
        <div class="flex justify-center gap-4">
            <button id="start-stop-btn" class="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all w-32">Start</button>
            <button id="reset-btn" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all">Reset</button>
        </div>
    </div>
    <script>
        const timerDisplay = document.getElementById('timer');
        const modeTitle = document.getElementById('mode-title');
        const startStopBtn = document.getElementById('start-stop-btn');
        const resetBtn = document.getElementById('reset-btn');
        const modeBtns = document.querySelectorAll('.mode-btn');

        const modes = {
            pomodoro: { time: 25, title: 'Pomodoro' },
            shortBreak: { time: 5, title: 'Short Break' },
            longBreak: { time: 15, title: 'Long Break' },
        };
        let currentMode = 'pomodoro';
        let timerInterval;
        let timeLeft = modes[currentMode].time * 60;
        let isRunning = false;
        
        const notificationSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');

        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = \`\${String(minutes).padStart(2, '0')}:\${String(seconds).padStart(2, '0')}\`;
            document.title = \`\${timerDisplay.textContent} - \${modes[currentMode].title}\`;
        }

        function switchMode(mode) {
            currentMode = mode;
            clearInterval(timerInterval);
            isRunning = false;
            startStopBtn.textContent = 'Start';
            timeLeft = modes[mode].time * 60;
            modeTitle.textContent = modes[mode].title;
            updateDisplay();

            modeBtns.forEach(btn => {
                btn.classList.remove('bg-green-600/80');
                btn.classList.add('bg-gray-700', 'hover:bg-gray-600');
            });
            document.querySelector(\`[data-mode="\${mode}"]\`).classList.add('bg-green-600/80');
            document.querySelector(\`[data-mode="\${mode}"]\`).classList.remove('bg-gray-700', 'hover:bg-gray-600');
        }

        function startTimer() {
            if (timeLeft <= 0) return;
            isRunning = true;
            startStopBtn.textContent = 'Pause';
            timerInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    notificationSound.play();
                    isRunning = false;
                    startStopBtn.textContent = 'Start';
                }
            }, 1000);
        }

        function stopTimer() {
            isRunning = false;
            startStopBtn.textContent = 'Start';
            clearInterval(timerInterval);
        }

        startStopBtn.addEventListener('click', () => {
            isRunning ? stopTimer() : startTimer();
        });

        resetBtn.addEventListener('click', () => {
            switchMode(currentMode);
        });

        modeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                switchMode(e.target.dataset.mode);
            });
        });

        updateDisplay();
    </script>
</body>
</html>`;

export const pomodoroTimer: StaticTool = {
    id: 'tool-pomodoro-timer',
    name: 'Pomodoro Timer',
    type: 'static',
    subType: 'Utility',
    description: 'Boost focus with a timer for the Pomodoro productivity technique.',
    icon: ClockIcon,
    iconName: 'ClockIcon',
    author: 'ToolFORGE Team',
    uses: 23000,
    html: html,
};
