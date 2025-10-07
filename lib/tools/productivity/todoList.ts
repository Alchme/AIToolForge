
import type { StaticTool } from '../../../types';
import { ClipboardDocumentListIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        .task-item { transition: all 0.3s ease; }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-md mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 h-[90vh] flex flex-col">
        <h1 class="text-3xl font-bold text-center mb-6">My To-Do List</h1>
        <form id="task-form" class="flex space-x-2 mb-6">
            <input type="text" id="task-input" class="flex-grow bg-gray-800 text-white rounded-lg p-3 border-2 border-gray-700 focus:border-green-500 focus:ring-0" placeholder="Add a new task...">
            <button type="submit" class="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-5 rounded-lg transition-colors">+</button>
        </form>
        <ul id="task-list" class="space-y-3 overflow-y-auto flex-grow pr-2"></ul>
    </div>
    <script>
        const form = document.getElementById('task-form');
        const input = document.getElementById('task-input');
        const list = document.getElementById('task-list');
        
        let tasks = JSON.parse(localStorage.getItem('tasks-toolforge')) || [];
        
        const saveTasks = () => localStorage.setItem('tasks-toolforge', JSON.stringify(tasks));
        
        const createTaskElement = (task, index) => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between bg-gray-800 p-3 rounded-lg task-item ' + (task.done ? 'opacity-50' : '');
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'flex items-center space-x-3';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.done;
            checkbox.className = 'form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-600 cursor-pointer';
            checkbox.onchange = () => toggleDone(index);
            
            const textSpan = document.createElement('span');
            textSpan.textContent = task.text;
            textSpan.className = task.done ? 'line-through text-gray-500' : '';
            
            contentDiv.append(checkbox, textSpan);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&times;';
            deleteBtn.className = 'text-gray-500 hover:text-red-400 text-2xl font-bold leading-none';
            deleteBtn.onclick = () => deleteTask(index);

            li.append(contentDiv, deleteBtn);
            return li;
        };

        const renderTasks = () => {
            list.innerHTML = '';
            tasks.forEach((task, index) => {
                list.appendChild(createTaskElement(task, index));
            });
        };

        const addTask = (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (text) { 
                tasks.unshift({ text, done: false }); 
                input.value = ''; 
                saveTasks(); 
                renderTasks(); 
            }
        };

        const toggleDone = (index) => {
            tasks[index].done = !tasks[index].done; 
            saveTasks(); 
            renderTasks(); 
        };
        
        const deleteTask = (index) => {
            tasks.splice(index, 1); 
            saveTasks(); 
            renderTasks(); 
        };

        form.addEventListener('submit', addTask);
        renderTasks();
    </script>
</body>
</html>`;

export const todoList: StaticTool = {
    id: 'tool-todo-list',
    name: 'To-Do List',
    type: 'static',
    subType: 'Utility',
    description: 'A simple and clean to-do list to keep track of your tasks.',
    icon: ClipboardDocumentListIcon,
    iconName: 'ClipboardDocumentListIcon',
    author: 'ToolFORGE Team',
    uses: 45000,
    html: html
};
