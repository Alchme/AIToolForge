import type { StaticTool } from '../../../types';
import { BookOpenIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 h-full flex flex-col">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Readability Score Calculator</h1>
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
            <textarea id="text-input" class="w-full h-full bg-gray-800 text-gray-200 p-4 rounded-lg resize-none border-2 border-gray-700 focus:border-green-500 focus:ring-0" placeholder="Paste your text here..."></textarea>
            <div id="results" class="bg-gray-800 p-6 rounded-lg space-y-4">
                <h2 class="text-xl font-bold text-white">Analysis Results</h2>
                <div class="flex justify-between items-center text-lg"><span>Flesch-Kincaid Grade:</span><span id="grade" class="font-bold text-green-400 text-2xl">N/A</span></div>
                <div class="flex justify-between items-center text-lg"><span>Reading Ease Score:</span><span id="ease" class="font-bold text-green-400 text-2xl">N/A</span></div>
                <p id="ease-desc" class="text-sm text-gray-400"></p>
                <hr class="border-gray-700"/>
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex justify-between"><span>Word Count:</span><span id="words" class="font-mono">0</span></div>
                    <div class="flex justify-between"><span>Sentence Count:</span><span id="sentences" class="font-mono">0</span></div>
                    <div class="flex justify-between"><span>Syllable Count:</span><span id="syllables" class="font-mono">0</span></div>
                     <div class="flex justify-between"><span>Avg Words/Sentence:</span><span id="wps" class="font-mono">0</span></div>
                </div>
                <p class="text-xs text-gray-500 pt-4">Note: Syllable counting is based on an English language heuristic and may not be 100% accurate.</p>
            </div>
        </div>
    </div>
    <script>
        const textInput = document.getElementById('text-input');
        const gradeEl = document.getElementById('grade');
        const easeEl = document.getElementById('ease');
        const easeDescEl = document.getElementById('ease-desc');
        const wordsEl = document.getElementById('words');
        const sentencesEl = document.getElementById('sentences');
        const syllablesEl = document.getElementById('syllables');
        const wpsEl = document.getElementById('wps');

        function countSyllables(word) {
            word = word.toLowerCase();
            if(word.length <= 3) return 1;
            word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
            word = word.replace(/^y/, '');
            const matches = word.match(/[aeiouy]{1,2}/g);
            return matches ? matches.length : 0;
        }
        
        const getEaseDescription = (score) => {
            if (score > 90) return "Very easy to read. Easily understood by an average 11-year-old student.";
            if (score > 80) return "Easy to read. Conversational English for consumers.";
            if (score > 70) return "Fairly easy to read.";
            if (score > 60) return "Plain English. Easily understood by 13- to 15-year-old students.";
            if (score > 50) return "Fairly difficult to read.";
            if (score > 30) return "Difficult to read.";
            return "Very difficult to read. Best understood by university graduates.";
        }

        textInput.addEventListener('input', () => {
            const text = textInput.value;
            if (!text.trim()) {
                gradeEl.textContent = easeEl.textContent = 'N/A';
                easeDescEl.textContent = '';
                wordsEl.textContent = sentencesEl.textContent = syllablesEl.textContent = wpsEl.textContent = '0';
                return;
            }

            const wordList = text.trim().match(/\w+/g) || [];
            const sentenceList = text.trim().match(/[^.!?]+(?:[.!?]+["']?|\s*$)/g) || [];

            const wordCount = wordList.length;
            const sentenceCount = sentenceList.length;
            const syllableCount = wordList.reduce((acc, word) => acc + countSyllables(word), 0);
            
            wordsEl.textContent = wordCount.toLocaleString();
            sentencesEl.textContent = sentenceCount.toLocaleString();
            syllablesEl.textContent = syllableCount.toLocaleString();

            if (wordCount > 0 && sentenceCount > 0) {
                const grade = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59;
                const ease = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount);

                gradeEl.textContent = grade.toFixed(1);
                easeEl.textContent = ease.toFixed(1);
                easeDescEl.textContent = getEaseDescription(ease);
                wpsEl.textContent = (wordCount / sentenceCount).toFixed(2);
            }
        });
    </script>
</body>
</html>
`;

export const readabilityScore: StaticTool = {
    id: 'tool-readability-score',
    name: 'Readability Score',
    type: 'static',
    subType: 'Utility',
    description: 'Calculate the readability score of your text (e.g., Flesch-Kincaid).',
    icon: BookOpenIcon,
    iconName: 'BookOpenIcon',
    author: 'ToolFORGE Team',
    uses: 4800,
    html: html
};