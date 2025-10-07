
import type { StaticTool } from '../../../types';
import { SwitchHorizontalIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        .input-field {
             width: 100%;
             background-color: #2d3748;
             border: 2px solid #4a5568;
             padding: 0.75rem;
             border-radius: 0.5rem;
             font-size: 1.25rem;
             transition: border-color 0.2s;
        }
        .input-field:focus {
            outline: none;
            border-color: #4ade80;
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Angle Converter</h1>
        <div class="flex items-center space-x-4">
            <div class="flex-1">
                <label for="degreesInput" class="block text-sm font-medium text-gray-400 mb-1">Degrees (°)</label>
                <input type="number" id="degreesInput" class="input-field" value="180">
            </div>
            <div class="text-2xl text-gray-500 pt-7">↔</div>
            <div class="flex-1">
                <label for="radiansInput" class="block text-sm font-medium text-gray-400 mb-1">Radians (rad)</label>
                <input type="number" id="radiansInput" class="input-field">
            </div>
        </div>
        <div class="text-center text-gray-500">π radians = 180°</div>
    </div>
    <script>
        const degreesInput = document.getElementById('degreesInput');
        const radiansInput = document.getElementById('radiansInput');
        let isUpdating = false;

        function degreesToRadians(degrees) {
            return degrees * (Math.PI / 180);
        }

        function radiansToDegrees(radians) {
            return radians * (180 / Math.PI);
        }

        degreesInput.addEventListener('input', () => {
            if (isUpdating) return;
            isUpdating = true;
            const degrees = parseFloat(degreesInput.value);
            radiansInput.value = isNaN(degrees) ? '' : degreesToRadians(degrees).toFixed(6);
            isUpdating = false;
        });

        radiansInput.addEventListener('input', () => {
            if (isUpdating) return;
            isUpdating = true;
            const radians = parseFloat(radiansInput.value);
            degreesInput.value = isNaN(radians) ? '' : radiansToDegrees(radians).toFixed(6);
            isUpdating = false;
        });

        // Initial conversion
        radiansInput.value = degreesToRadians(parseFloat(degreesInput.value)).toFixed(6);
    </script>
</body>
</html>
`;

export const angleConverter: StaticTool = {
    id: 'tool-angle-converter',
    name: 'Angle Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert between degrees and radians for geometric calculations.',
    icon: SwitchHorizontalIcon,
    iconName: 'SwitchHorizontalIcon',
    author: 'ToolFORGE Team',
    uses: 3400,
    html: html,
};
