
import type { StaticTool } from '../../../types';
import { CheckBadgeIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; }
        .grid-container {
             display: grid;
             grid-template-columns: 150px repeat(31, minmax(30px, 1fr));
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-5xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 h-full flex flex-col">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-white">Habit Tracker</h1>
            <div id="month-display" class="text-xl font-semibold"></div>
        </div>
        <div class="overflow-x-auto flex-grow">
            <div id="habit-grid" class="grid-container gap-1"></div>
        </div>
        <div class="mt-4 flex gap-4 pt-4 border-t border-gray-700">
            <input id="new-habit-input" type="text" class="flex-grow bg-gray-800 p-2 rounded-lg border-2 border-gray-700 focus:border-green-500 focus:ring-0" placeholder="Add a new habit...">
            <button id="add-habit-btn" class="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold transition-colors">Add Habit</button>
        </div>
    </div>
    <script>
        const grid = document.getElementById('habit-grid');
        const monthDisplay = document.getElementById('month-display');
        const newHabitInput = document.getElementById('new-habit-input');
        const addHabitBtn = document.getElementById('add-habit-btn');

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        let data = JSON.parse(localStorage.getItem('habit-tracker-data-v2')) || {
            habits: ['Exercise', 'Read 10 pages', 'Meditate'],
            completed: {} // "YYYY-MM-DD": ["Habit Name"]
        };
        
        const save = () => localStorage.setItem('habit-tracker-data-v2', JSON.stringify(data));

        function render() {
            monthDisplay.textContent = today.toLocaleString('default', { month: 'long', year: 'numeric' });
            grid.innerHTML = '';
            grid.style.gridTemplateColumns = \`150px repeat(\${daysInMonth}, minmax(30px, 1fr))\`;

            // Header row
            const habitHeader = document.createElement('div');
            habitHeader.className = 'font-bold text-gray-400 sticky left-0 bg-[#1e1e1e] z-10';
            habitHeader.textContent = 'Habit';
            grid.appendChild(habitHeader);

            for (let day = 1; day <= daysInMonth; day++) {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'text-center font-mono text-sm ' + (day === today.getDate() ? 'text-green-400 font-bold' : 'text-gray-500');
                dayHeader.textContent = day;
                grid.appendChild(dayHeader);
            }

            // Habit rows
            data.habits.forEach((habit, habitIndex) => {
                const habitCell = document.createElement('div');
                habitCell.className = 'flex justify-between items-center pr-2 sticky left-0 bg-[#1e1e1e] z-10';
                
                const habitName = document.createElement('span');
                habitName.textContent = habit;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'text-gray-600 hover:text-red-400 font-bold ml-2';
                removeBtn.innerHTML = '&times;';
                removeBtn.onclick = () => {
                    data.habits.splice(habitIndex, 1);
                    save();
                    render();
                };
                habitCell.append(habitName, removeBtn);
                grid.appendChild(habitCell);

                for (let day = 1; day <= daysInMonth; day++) {
                    const dateString = \`\${currentYear}-\${String(currentMonth + 1).padStart(2, '0')}-\${String(day).padStart(2, '0')}\`;
                    const isCompleted = data.completed[dateString] && data.completed[dateString].includes(habit);
                    
                    const checkboxCell = document.createElement('div');
                    checkboxCell.className = 'flex justify-center items-center bg-gray-800/50';
                    
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.checked = isCompleted;
                    checkbox.className = 'form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-600 cursor-pointer';
                    checkbox.onchange = () => {
                        if (!data.completed[dateString]) data.completed[dateString] = [];
                        const indexInCompleted = data.completed[dateString].indexOf(habit);
                        if (indexInCompleted > -1) {
                            data.completed[dateString].splice(indexInCompleted, 1);
                        } else {
                            data.completed[dateString].push(habit);
                        }
                        save();
                    };
                    checkboxCell.appendChild(checkbox);
                    grid.appendChild(checkboxCell);
                }
            });
        }

        addHabitBtn.addEventListener('click', () => {
            const newHabit = newHabitInput.value.trim();
            if (newHabit && !data.habits.includes(newHabit)) {
                data.habits.push(newHabit);
                newHabitInput.value = '';
                save();
                render();
            }
        });
        
        render();
    </script>
</body>
</html>`;

export const habitTracker: StaticTool = {
    id: 'tool-habit-tracker',
    name: 'Habit Tracker',
    type: 'static',
    subType: 'Utility',
    description: 'A simple grid to track your daily habits and build streaks.',
    icon: CheckBadgeIcon,
    iconName: 'CheckBadgeIcon',
    author: 'ToolFORGE Team',
    uses: 11200,
    html: html,
};
