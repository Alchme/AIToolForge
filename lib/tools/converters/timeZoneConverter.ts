
import type { StaticTool } from '../../../types';
import { GlobeAltIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        .time-display {
            background-color: #1a202c;
            border: 1px solid #4a5568;
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-top: 0.5rem;
        }
        .time-display .time {
            font-size: 1.5rem;
            font-weight: bold;
        }
         .time-display .date {
            font-size: 0.875rem;
            color: #9ca3af;
        }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 class="text-3xl font-bold text-center text-white">Time Zone Converter</h1>
        <div class="pt-4">
            <label for="dateInput" class="block text-sm font-medium text-gray-400 mb-1">Set a Custom Date & Time (in your local time)</label>
            <input type="datetime-local" id="dateInput" class="w-full bg-gray-800 border-2 border-gray-700 focus:border-green-500 focus:ring-green-500 text-white rounded-lg p-3 appearance-none" style="color-scheme: dark;">
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="fromZone" class="block text-sm font-medium text-gray-400 mb-1">From</label>
                <select id="fromZone" class="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-lg p-3"></select>
                <div id="fromTime" class="time-display"></div>
            </div>
            <div>
                <label for="toZone" class="block text-sm font-medium text-gray-400 mb-1">To</label>
                <select id="toZone" class="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-lg p-3"></select>
                <div id="toTime" class="time-display"></div>
            </div>
        </div>
    </div>
    <script>
        const fromZoneSelect = document.getElementById('fromZone');
        const toZoneSelect = document.getElementById('toZone');
        const fromTimeDiv = document.getElementById('fromTime');
        const toTimeDiv = document.getElementById('toTime');
        const dateInput = document.getElementById('dateInput');
        
        const timeZones = Intl.supportedValuesOf('timeZone');
        let referenceDate = new Date();

        function populateSelects() {
            timeZones.forEach(zone => {
                fromZoneSelect.add(new Option(zone, zone));
                toZoneSelect.add(new Option(zone, zone));
            });
            
            try {
                fromZoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
            } catch(e) {
                fromZoneSelect.value = 'America/New_York';
            }
            toZoneSelect.value = 'Asia/Tokyo';
        }
        
        function toLocalISOString(date) {
            const pad = num => num.toString().padStart(2, '0');
            return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}T\${pad(date.getHours())}:\${pad(date.getMinutes())}\`;
        }

        function updateTimes() {
            const fromZone = fromZoneSelect.value;
            const toZone = toZoneSelect.value;

            const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            const fromParts = new Intl.DateTimeFormat('en-US', { timeZone: fromZone, hour12: true, year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(referenceDate);
            const toParts = new Intl.DateTimeFormat('en-US', { timeZone: toZone, hour12: true, year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(referenceDate);

            const formatParts = (parts) => {
                const time = \`\${parts.find(p=>p.type==='hour').value}:\${parts.find(p=>p.type==='minute').value}:\${parts.find(p=>p.type==='second').value} \${parts.find(p=>p.type==='dayPeriod').value}\`;
                const date = \`\${parts.find(p=>p.type==='weekday').value}, \${parts.find(p=>p.type==='month').value} \${parts.find(p=>p.type==='day').value}, \${parts.find(p=>p.type==='year').value}\`;
                return \`<div class="time">\${time}</div><div class="date">\${date}</div>\`;
            };

            fromTimeDiv.innerHTML = formatParts(fromParts);
            toTimeDiv.innerHTML = formatParts(toParts);
        }

        dateInput.addEventListener('input', () => {
            if (dateInput.value) {
                referenceDate = new Date(dateInput.value);
            } else {
                 referenceDate = new Date();
            }
            updateTimes();
        });

        [fromZoneSelect, toZoneSelect].forEach(el => el.addEventListener('change', updateTimes));

        populateSelects();
        dateInput.value = toLocalISOString(referenceDate);
        updateTimes();
    </script>
</body>
</html>
`;

export const timeZoneConverter: StaticTool = {
    id: 'tool-timezone-converter',
    name: 'Time Zone Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Find the time in different cities and time zones around the world.',
    icon: GlobeAltIcon,
    iconName: 'GlobeAltIcon',
    author: 'ToolFORGE Team',
    uses: 17000,
    html: html,
};
