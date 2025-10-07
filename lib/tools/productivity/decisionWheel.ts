
import type { StaticTool } from '../../../types';
import { PuzzlePieceIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; }
        canvas { transition: transform 6s cubic-bezier(0.2, 0.8, 0.2, 1); }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2 flex flex-col items-center justify-center relative">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 text-4xl text-green-400" style="transform: translateX(-50%) translateY(-20px) rotate(90deg);">▶</div>
            <canvas id="wheel-canvas" width="400" height="400"></canvas>
            <button id="spin-btn" class="mt-6 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">SPIN</button>
        </div>
        <div class="md:w-1/2 flex flex-col">
            <h2 class="text-2xl font-bold mb-4">Options</h2>
            <textarea id="options-area" class="w-full h-48 bg-gray-800 p-3 rounded-lg resize-y mb-4 border-2 border-gray-700 focus:border-green-500 focus:ring-0" placeholder="Enter each option on a new line"></textarea>
            <div class="mt-auto text-center">
                 <p class="text-gray-400">Winner:</p>
                 <p id="winner" class="text-3xl font-bold text-green-400 h-10 truncate"></p>
            </div>
        </div>
    </div>
    <script>
        const canvas = document.getElementById('wheel-canvas');
        const ctx = canvas.getContext('2d');
        const optionsArea = document.getElementById('options-area');
        const spinBtn = document.getElementById('spin-btn');
        const winnerEl = document.getElementById('winner');
        const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#2dd4bf', '#38bdf8', '#818cf8', '#c084fc'];
        let currentRotation = 0;

        const defaultOptions = "Pizza\\nBurger\\nTacos\\nSalad\\nSushi\\nPasta\\nSteak";
        optionsArea.value = defaultOptions;

        function drawWheel() {
            const options = optionsArea.value.split('\\n').filter(opt => opt.trim() !== '');
            const numOptions = options.length;
            if (numOptions === 0) {
                 ctx.clearRect(0, 0, 400, 400);
                 return;
            }
            const arc = (2 * Math.PI) / numOptions;

            ctx.clearRect(0, 0, 400, 400);
            ctx.strokeStyle = '#121212';
            ctx.lineWidth = 3;
            ctx.font = '16px Inter, sans-serif';

            for (let i = 0; i < numOptions; i++) {
                const angle = i * arc;
                ctx.fillStyle = colors[i % colors.length];
                ctx.beginPath();
                ctx.moveTo(200, 200);
                ctx.arc(200, 200, 190, angle, angle + arc);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.save();
                ctx.fillStyle = 'white';
                ctx.translate(200 + Math.cos(angle + arc / 2) * 120, 200 + Math.sin(angle + arc / 2) * 120);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                const text = options[i];
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }
        }

        function spin() {
            spinBtn.disabled = true;
            winnerEl.textContent = '';
            
            const randomExtraRotations = Math.floor(Math.random() * 4) + 4; // 4 to 7 full spins
            const randomStopAngle = Math.random() * 360;
            const totalRotation = (randomExtraRotations * 360) + randomStopAngle;
            
            currentRotation += totalRotation;
            canvas.style.transform = \`rotate(\${currentRotation}deg)\`;
            
            setTimeout(() => {
                const options = optionsArea.value.split('\\n').filter(opt => opt.trim() !== '');
                const numOptions = options.length;
                const finalAngle = currentRotation % 360;
                const pointerAngle = 270; // The arrow points down from the top
                const winningSegment = Math.floor(((360 - finalAngle + pointerAngle) % 360) / (360/numOptions));
                
                winnerEl.textContent = options[winningSegment];
                spinBtn.disabled = false;
            }, 6000); // Match CSS transition duration
        }

        spinBtn.addEventListener('click', spin);
        optionsArea.addEventListener('input', drawWheel);
        drawWheel();
    </script>
</body>
</html>`;

export const decisionWheel: StaticTool = {
    id: 'tool-decision-wheel',
    name: 'Decision Wheel',
    type: 'static',
    subType: 'Utility',
    description: 'A fun spinning wheel to help you make decisions when you are stuck.',
    icon: PuzzlePieceIcon,
    iconName: 'PuzzlePieceIcon',
    author: 'ToolFORGE Team',
    uses: 6700,
    html: html,
};
