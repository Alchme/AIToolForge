
import type { StaticTool } from '../../../types';
import { ClockIcon } from '../../../components/Icons';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> body { font-family: 'Inter', sans-serif; background-color: #121212; } </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 h-[90vh] flex flex-col">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Time Tracker</h1>
        <div id="task-form" class="flex gap-2 mb-6">
            <input type="text" id="task-input" class="flex-grow bg-gray-800 text-white rounded-lg p-3 border-2 border-gray-700 focus:border-green-500 focus:ring-0 focus:outline-none" placeholder="Enter task name...">
            <button id="add-btn" class="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-5 rounded-lg transition-colors">Add</button>
        </div>
        <div id="task-list" class="space-y-3 overflow-y-auto flex-grow pr-2"></div>
    </div>
    <script>
        const form = document.getElementById('task-form');
        const input = document.getElementById('task-input');
        const addBtn = document.getElementById('add-btn');
        const listEl = document.getElementById('task-list');

        let tasks = JSON.parse(localStorage.getItem('time-tracker-tasks-v2')) || [];
        let timerIntervals = {};

        const saveTasks = () => localStorage.setItem('time-tracker-tasks-v2', JSON.stringify(tasks));
        
        const formatTime = (totalSeconds) => {
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;
            return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
        };

        const updateTimeForTask = (index) => {
            const li = listEl.children[index];
            if (li) {
                const timeSpan = li.querySelector('.font-mono');
                if (timeSpan) {
                    timeSpan.textContent = formatTime(tasks[index].seconds);
                }
            }
        };

        const startTicking = (index) => {
            if (timerIntervals[index]) return;
            timerIntervals[index] = setInterval(() => {
                if (tasks[index]) {
                    tasks[index].seconds++;
                    updateTimeForTask(index);
                    if(tasks[index].seconds % 10 === 0) saveTasks(); // Save every 10 seconds
                }
            }, 1000);
        };

        const stopTicking = (index) => {
            if (timerIntervals[index]) {
                clearInterval(timerIntervals[index]);
                delete timerIntervals[index];
            }
        };

        const toggleTimer = (index) => {
            if (!tasks[index]) return;
            
            tasks[index].running = !tasks[index].running;
            
            if (tasks[index].running) {
                startTicking(index);
            } else {
                stopTicking(index);
            }
            
            saveTasks();
            renderTasks();
        };
        
        const deleteTask = (index) => {
            stopTicking(index);
            tasks.splice(index, 1);
            
            // Update timer intervals for remaining tasks
            const newIntervals = {};
            Object.keys(timerIntervals).forEach(key => {
                const oldIndex = parseInt(key);
                if (oldIndex > index) {
                    newIntervals[oldIndex - 1] = timerIntervals[oldIndex];
                    delete timerIntervals[oldIndex];
                } else if (oldIndex < index) {
                    newIntervals[oldIndex] = timerIntervals[oldIndex];
                }
            });
            timerIntervals = newIntervals;
            
            saveTasks();
            renderTasks();
        };

        const renderTasks = () => {
            listEl.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('div');
                li.className = 'flex items-center justify-between bg-gray-800 p-3 rounded-lg';
                
                const taskName = document.createElement('span');
                taskName.className = 'font-semibold truncate pr-4';
                taskName.textContent = task.name;

                const controlsDiv = document.createElement('div');
                controlsDiv.className = 'flex items-center gap-4 flex-shrink-0';
                
                const timeSpan = document.createElement('span');
                timeSpan.className = 'font-mono text-lg tabular-nums';
                timeSpan.textContent = formatTime(task.seconds);
                
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'toggle-btn w-20 text-white font-bold py-1 px-3 rounded transition-colors ' + (task.running ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600');
                toggleBtn.textContent = task.running ? 'Stop' : 'Start';
                toggleBtn.onclick = () => toggleTimer(index);

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn text-gray-500 hover:text-red-400 font-bold text-xl px-2';
                deleteBtn.innerHTML = '&times;';
                deleteBtn.onclick = () => deleteTask(index);

                controlsDiv.append(timeSpan, toggleBtn, deleteBtn);
                li.append(taskName, controlsDiv);
                listEl.appendChild(li);
            });
        };

        const addTask = () => {
            const name = input.value.trim();
            if (name) {
                tasks.push({ name, seconds: 0, running: false });
                input.value = '';
                saveTasks();
                renderTasks();
            }
        };

        addBtn.addEventListener('click', addTask);
        
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Restart running timers on load
        tasks.forEach((task, index) => {
            if (task.running) {
                startTicking(index);
            }
        });

        renderTasks();
    </script>
</body>
</html>`;

export const timeTracker: StaticTool = {
    id: 'tool-time-tracker',
    name: 'Time Tracker',
    type: 'static',
    subType: 'Utility',
    description: 'A simple start/stop timer to track how much time you spend on tasks.',
    icon: ClockIcon,
    iconName: 'ClockIcon',
    author: 'ToolFORGE Team',
    uses: 8900,
    html: html,
};
