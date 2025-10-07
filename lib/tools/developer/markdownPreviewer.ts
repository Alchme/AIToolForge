
import type { StaticTool } from '../../../types';
import { CodeBracketIcon } from '../../../components/Icons';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js"></script>
    <style> 
        body { font-family: 'Inter', sans-serif; background-color: #121212; } 
        .preview-container h1 { font-size: 2em; font-weight: bold; border-bottom: 1px solid #4a5568; padding-bottom: 0.5em; margin-top: 1.5em; margin-bottom: 1em; }
        .preview-container h2 { font-size: 1.5em; font-weight: bold; border-bottom: 1px solid #4a5568; padding-bottom: 0.5em; margin-top: 1.5em; margin-bottom: 1em; }
        .preview-container h3 { font-size: 1.25em; font-weight: bold; margin-top: 1.5em; margin-bottom: 1em; }
        .preview-container p { margin-bottom: 1em; line-height: 1.6; }
        .preview-container a { color: #38bdf8; text-decoration: underline; }
        .preview-container code { background-color: #2d3748; color: #e2e8f0; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; }
        .preview-container pre { background-color: #1a202c; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1em; }
        .preview-container pre code { padding: 0; background-color: transparent; border: none; }
        .preview-container blockquote { border-left: 4px solid #6366f1; padding-left: 1rem; margin: 1em 0; font-style: italic; color: #a5b4fc; }
        .preview-container ul, .preview-container ol { margin-left: 1.5rem; margin-bottom: 1em; }
        .preview-container li { margin-bottom: 0.5em; }
        .preview-container table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
        .preview-container th, .preview-container td { border: 1px solid #4a5568; padding: 0.75rem; }
        .preview-container th { background-color: #2d3748; }
        .preview-container img { max-width: 100%; border-radius: 0.5rem; }
        .preview-container hr { border-color: #4a5568; margin: 2em 0; }
    </style>
</head>
<body class="text-white flex items-center justify-center h-screen p-4">
    <div class="w-full max-w-7xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 flex flex-col h-full">
        <h1 class="text-3xl font-bold text-center text-white mb-6">Markdown Previewer</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow min-h-0">
            <div class="flex flex-col">
                <label for="markdown-input" class="text-sm font-medium text-gray-400 mb-2">Markdown</label>
                <textarea id="markdown-input" class="w-full flex-grow bg-gray-800 text-white p-3 rounded-lg font-mono resize-none border-2 border-gray-700 focus:border-green-500 focus:ring-0" placeholder="# Hello, World!"></textarea>
            </div>
            <div class="flex flex-col">
                <label for="html-preview" class="text-sm font-medium text-gray-400 mb-2">Preview</label>
                <div id="html-preview" class="w-full flex-grow bg-gray-800 text-gray-300 p-4 rounded-lg overflow-y-auto preview-container border-2 border-gray-700"></div>
            </div>
        </div>
    </div>
    <script>
        const markdownInput = document.getElementById('markdown-input');
        const htmlPreview = document.getElementById('html-preview');
        
        const defaultMarkdown = \`# Welcome to Markdown!\\n\\nThis is a real-time previewer.\\n\\n## Features\\n\\n- **Live Preview:** See changes instantly.\\n- **Safe:** Uses DOMPurify to sanitize HTML.\\n- **Styled:** Basic styling for elements.\\n\\n\`\`\`javascript\\n// You can write code blocks!\\nconsole.log("Hello, Markdown!");\\n\`\`\`\\n\\n> Happy writing! \\n\`;

        function updatePreview() {
            const markdownText = markdownInput.value;
            const dirtyHtml = marked.parse(markdownText);
            const cleanHtml = DOMPurify.sanitize(dirtyHtml);
            htmlPreview.innerHTML = cleanHtml;
        }

        markdownInput.addEventListener('input', updatePreview);
        
        // Initial load
        markdownInput.value = defaultMarkdown;
        updatePreview();
    </script>
</body>
</html>
`;

export const markdownPreviewer: StaticTool = {
    id: 'tool-markdown-preview',
    name: 'Markdown Previewer',
    type: 'static',
    subType: 'Utility',
    description: 'Write Markdown text and see a live preview of the rendered HTML.',
    icon: CodeBracketIcon,
    iconName: 'CodeBracketIcon',
    author: 'ToolFORGE Team',
    uses: 9900,
    html: html,
};
