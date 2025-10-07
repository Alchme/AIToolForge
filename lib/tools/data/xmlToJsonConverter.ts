import type { StaticTool } from '../../../types';
import { CodeBracketIcon } from '../../../components/Icons';

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
    <div class="w-full max-w-5xl mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 h-full flex flex-col">
        <h1 class="text-2xl font-bold text-center text-white mb-4">XML to JSON Converter</h1>
        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            <div class="flex flex-col">
                <label for="xml-input" class="text-sm font-medium text-gray-400 mb-2">XML Input</label>
                <textarea id="xml-input" class="w-full flex-grow bg-gray-800 p-3 rounded-lg font-mono resize-none" placeholder="<note><to>You</to></note>"></textarea>
            </div>
            <div class="flex flex-col">
                <label for="json-output" class="text-sm font-medium text-gray-400 mb-2">JSON Output</label>
                <textarea id="json-output" class="w-full flex-grow bg-gray-800 p-3 rounded-lg font-mono resize-none" readonly></textarea>
            </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Note: This is a simplified converter and may not handle all XML complexities (attributes, namespaces, etc).</p>
    </div>
    <script>
        const xmlInput = document.getElementById('xml-input');
        const jsonOutput = document.getElementById('json-output');

        // Simple XML to JSON parser
        function xmlToJson(xml) {
            let obj = {};
            if (xml.nodeType == 1) { // element
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (let j = 0; j < xml.attributes.length; j++) {
                        const attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) { // text
                obj = xml.nodeValue;
            }

            if (xml.hasChildNodes()) {
                for(let i = 0; i < xml.childNodes.length; i++) {
                    const item = xml.childNodes.item(i);
                    const nodeName = item.nodeName;
                    if (nodeName === '#text' && item.nodeValue.trim() === '') continue;

                    if (typeof(obj[nodeName]) == "undefined") {
                         if(nodeName === '#text') obj = item.nodeValue.trim();
                         else obj[nodeName] = xmlToJson(item);
                    } else {
                        if (typeof(obj[nodeName].push) == "undefined") {
                            const old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xmlToJson(item));
                    }
                }
            }
            return obj;
        }

        function convert() {
            const xmlText = xmlInput.value.trim();
            if (!xmlText) {
                jsonOutput.value = '';
                return;
            }
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "text/xml");
                if (xmlDoc.getElementsByTagName("parsererror").length) {
                    throw new Error("Invalid XML format");
                }
                const jsonObj = xmlToJson(xmlDoc.documentElement);
                jsonOutput.value = JSON.stringify(jsonObj, null, 2);
            } catch (e) {
                jsonOutput.value = "Error converting XML: " + e.message;
            }
        }

        xmlInput.addEventListener('input', convert);
    </script>
</body>
</html>
`;

export const xmlToJsonConverter: StaticTool = {
    id: 'tool-xml-to-json-converter',
    name: 'XML to JSON Converter',
    type: 'static',
    subType: 'Converter',
    description: 'Convert legacy XML data into modern, easy-to-use JSON format.',
    icon: CodeBracketIcon,
    iconName: 'CodeBracketIcon',
    author: 'ToolFORGE Team',
    uses: 10500,
    html: html
};