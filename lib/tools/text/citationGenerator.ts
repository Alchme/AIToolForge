import type { StaticTool } from '../../../types';
import { AcademicCapIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-2xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 h-[90vh] flex flex-col">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Citation Generator</h1>
        <div class="flex gap-4 mb-4">
            <div class="flex-1">
                <label for="style" class="block text-sm font-medium text-gray-400">Style</label>
                <select id="style" class="w-full bg-gray-800 p-2 mt-1 rounded-lg border-2 border-gray-700 focus:border-green-500 focus:ring-0">
                    <option>APA 7</option>
                    <option>MLA 9</option>
                    <option>Chicago</option>
                </select>
            </div>
            <div class="flex-1">
                <label for="type" class="block text-sm font-medium text-gray-400">Source Type</label>
                <select id="type" class="w-full bg-gray-800 p-2 mt-1 rounded-lg border-2 border-gray-700 focus:border-green-500 focus:ring-0">
                    <option value="website">Website</option>
                    <option value="book">Book</option>
                    <option value="journal">Journal Article</option>
                </select>
            </div>
        </div>
        <div id="fields" class="space-y-3 mb-4 overflow-y-auto pr-2 flex-grow"></div>
        <div class="mt-auto pt-4 border-t border-gray-700">
             <div id="output" class="bg-gray-900 p-3 rounded-lg text-gray-300 min-h-[6rem] border-2 border-gray-700"></div>
             <button id="copy-btn" class="mt-2 w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Copy</button>
        </div>
    </div>
    <script>
        const styleSelect = document.getElementById('style');
        const typeSelect = document.getElementById('type');
        const fieldsContainer = document.getElementById('fields');
        const outputDiv = document.getElementById('output');
        const copyBtn = document.getElementById('copy-btn');

        const fieldTemplates = {
            website: ['Author(s)', 'Publish Date', 'Title', 'Website Name', 'URL'],
            book: ['Author(s)', 'Publish Year', 'Title', 'Publisher', 'City'],
            journal: ['Author(s)', 'Publish Year', 'Title', 'Journal Name', 'Volume', 'Issue', 'Pages', 'DOI']
        };

        function renderFields() {
            const type = typeSelect.value;
            fieldsContainer.innerHTML = '';
            fieldTemplates[type].forEach(field => {
                const fieldId = field.toLowerCase().replace(/\s+|\(s\)/g, '');
                const div = document.createElement('div');
                div.innerHTML = \`<label for="\${fieldId}" class="text-sm font-medium text-gray-400">\${field}</label>
                               <input type="text" id="\${fieldId}" data-field="\${field}" class="field-input w-full bg-gray-800 p-2 mt-1 rounded-lg border border-gray-600"> \`;
                fieldsContainer.appendChild(div);
            });
            fieldsContainer.addEventListener('input', generateCitation);
        }
        
        function generateCitation() {
            const style = styleSelect.value;
            const fields = {};
            document.querySelectorAll('.field-input').forEach(input => {
                fields[input.dataset.field] = input.value.trim();
            });

            const author = fields['Author(s)'] || 'N.A.';
            const year = fields['Publish Year'] || fields['Publish Date'] || new Date().getFullYear();
            const title = fields['Title'] || 'N.T.';

            let citation = '';
            try {
                 if (style === 'APA 7') {
                    if (typeSelect.value === 'website') citation = \`\${author}. (\${year}). \${title}. <i class="italic">\${fields['Website Name'] || 'N.p.'}</i>. Retrieved from \${fields['URL'] || 'n.d.'}\`;
                    else if (typeSelect.value === 'book') citation = \`\${author}. (\${year}). <i class="italic">\${title}</i>. \${fields['Publisher'] || 'N.p.'}.\`;
                    else citation = \`\${author}. (\${year}). \${title}. <i class="italic">\${fields['Journal Name']}, \${fields['Volume']}</i>(\${fields['Issue']}), \${fields['Pages']}. \${fields['DOI'] ? 'https://doi.org/' + fields['DOI'] : ''}\`;
                } else if (style === 'MLA 9') {
                    if (typeSelect.value === 'website') citation = \`\${author}. "\${title}." <i class="italic">\${fields['Website Name']}</i>, \${year}, \${fields['URL']}.\`;
                    else if (typeSelect.value === 'book') citation = \`\${author}. <i class="italic">\${title}</i>. \${fields['Publisher']}, \${year}.\`;
                    else citation = \`\${author}. "\${title}." <i class="italic">\${fields['Journal Name']}</i>, vol. \${fields['Volume']}, no. \${fields['Issue']}, \${year}, pp. \${fields['Pages']}.\`;
                } else { // Chicago
                    if (typeSelect.value === 'website') citation = \`\${author}. "\${title}." \${fields['Website Name']}. Last modified \${year}. \${fields['URL']}.\`;
                    else if (typeSelect.value === 'book') citation = \`\${author}. <i class="italic">\${title}</i>. \${fields['City'] || 'N.p.'}: \${fields['Publisher']}, \${year}.\`;
                    else citation = \`\${author}. "\${title}." <i class="italic">\${fields['Journal Name']}</i> \${fields['Volume']}, no. \${fields['Issue']} (\${year}): \${fields['Pages']}.\`;
                }
            } catch(e) { citation = "Error generating citation."; }
            
            outputDiv.innerHTML = citation.replace(/\\.\\s*$/, '.'); // Clean up trailing periods
        }

        styleSelect.addEventListener('change', generateCitation);
        typeSelect.addEventListener('change', () => { renderFields(); generateCitation(); });
        
        copyBtn.addEventListener('click', () => {
            if (outputDiv.innerText) {
                navigator.clipboard.writeText(outputDiv.innerText).then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
                });
            }
        });

        renderFields();
        generateCitation();
    </script>
</body>
</html>
`;

export const citationGenerator: StaticTool = {
    id: 'tool-citation-generator',
    name: 'Citation Generator',
    type: 'static',
    subType: 'Generator',
    description: 'Generate academic citations in APA, MLA, Chicago, and other formats.',
    icon: AcademicCapIcon,
    iconName: 'AcademicCapIcon',
    author: 'ToolFORGE Team',
    uses: 11500,
    html: html
};