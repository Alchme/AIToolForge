
import type { StaticTool } from '../../../types';
import { ClipboardDocumentListIcon } from '../../../components/Icons';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; }
        .item-input {
            width: 100%;
            background-color: #2d3748;
            border: 1px solid #4a5568;
            padding: 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            color: white;
        }
        .item-input:focus {
            outline: none;
            border-color: #10b981;
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-2xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 h-[90vh] flex flex-col">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Monthly Budget Planner</h1>
        <div class="grid md:grid-cols-2 gap-8 flex-grow overflow-y-auto pr-2">
            <div class="space-y-4">
                <h2 class="text-xl font-semibold text-green-400 border-b-2 border-green-500/30 pb-2">Income</h2>
                <div id="income-list" class="space-y-2"></div>
                <button id="add-income-btn" class="w-full text-sm bg-green-600/20 hover:bg-green-600/40 p-2 rounded-lg transition-colors">+ Add Income</button>
            </div>
            <div class="space-y-4">
                <h2 class="text-xl font-semibold text-red-400 border-b-2 border-red-500/30 pb-2">Expenses</h2>
                <div id="expense-list" class="space-y-2"></div>
                <button id="add-expense-btn" class="w-full text-sm bg-red-600/20 hover:bg-red-600/40 p-2 rounded-lg transition-colors">+ Add Expense</button>
            </div>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-700 text-center">
            <p class="text-gray-400 text-lg">Remaining Balance</p>
            <p id="balance" class="text-4xl font-bold mt-1">$0.00</p>
        </div>
    </div>
    <script>
        const incomeListEl = document.getElementById('income-list');
        const expenseListEl = document.getElementById('expense-list');
        const balanceEl = document.getElementById('balance');
        const addIncomeBtn = document.getElementById('add-income-btn');
        const addExpenseBtn = document.getElementById('add-expense-btn');

        let budgetData = JSON.parse(localStorage.getItem('budget-items')) || { 
            income: [{name: 'Salary', amount: 3000}], 
            expense: [{name: 'Rent', amount: 1200}, {name: 'Groceries', amount: 400}] 
        };

        const save = () => localStorage.setItem('budget-items', JSON.stringify(budgetData));

        const updateBalance = () => {
            let totalIncome = 0;
            let totalExpense = 0;

            budgetData.income.forEach(item => totalIncome += item.amount);
            budgetData.expense.forEach(item => totalExpense += item.amount);

            const balance = totalIncome - totalExpense;
            balanceEl.textContent = '$' + balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            balanceEl.className = 'text-4xl font-bold mt-1 ' + (balance >= 0 ? 'text-green-400' : 'text-red-400');
        };

        const createItemElement = (type, item, index) => {
            const div = document.createElement('div');
            div.className = 'flex items-center gap-2';

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = item.name;
            nameInput.placeholder = 'Name';
            nameInput.className = 'item-input flex-grow';
            nameInput.addEventListener('input', (e) => {
                budgetData[type][index].name = e.target.value;
                save();
                updateBalance();
            });

            const amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.value = item.amount;
            amountInput.placeholder = 'Amount';
            amountInput.className = 'item-input w-24 text-right';
            amountInput.addEventListener('input', (e) => {
                budgetData[type][index].amount = parseFloat(e.target.value) || 0;
                save();
                updateBalance();
            });

            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '&times;';
            removeBtn.className = 'text-gray-500 hover:text-red-400 text-xl font-bold px-2';
            removeBtn.onclick = () => {
                budgetData[type].splice(index, 1);
                save();
                render();
            };
            
            div.append(nameInput, amountInput, removeBtn);
            return div;
        };

        const render = () => {
            incomeListEl.innerHTML = '';
            expenseListEl.innerHTML = '';

            budgetData.income.forEach((item, i) => {
                incomeListEl.appendChild(createItemElement('income', item, i));
            });
            budgetData.expense.forEach((item, i) => {
                expenseListEl.appendChild(createItemElement('expense', item, i));
            });

            updateBalance();
        };

        addIncomeBtn.onclick = () => {
            budgetData.income.push({name: '', amount: 0});
            save();
            render();
            // Focus the new input after render
            setTimeout(() => {
                const newInputs = incomeListEl.querySelectorAll('.item-input');
                if (newInputs.length > 0) {
                    newInputs[newInputs.length - 2].focus(); // Focus name input of last item
                }
            }, 0);
        };

        addExpenseBtn.onclick = () => {
            budgetData.expense.push({name: '', amount: 0});
            save();
            render();
            // Focus the new input after render
            setTimeout(() => {
                const newInputs = expenseListEl.querySelectorAll('.item-input');
                if (newInputs.length > 0) {
                    newInputs[newInputs.length - 2].focus(); // Focus name input of last item
                }
            }, 0);
        };

        render();
    </script>
</body>
</html>`;

export const budgetPlanner: StaticTool = {
    id: 'tool-budget-planner',
    name: 'Budget Planner',
    type: 'static',
    subType: 'Utility',
    description: 'Organize your monthly income and expenses to manage your finances.',
    icon: ClipboardDocumentListIcon,
    iconName: 'ClipboardDocumentListIcon',
    author: 'ToolFORGE Team',
    uses: 9800,
    html: html
};
