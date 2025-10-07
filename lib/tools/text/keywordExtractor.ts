
import type { AgentTool } from '../../../types';
import { KeyIcon } from '../../../components/Icons';

export const keywordExtractor: AgentTool = {
    id: 'tool-keyword-extractor',
    name: 'Keyword Extractor',
    type: 'agent',
    subType: 'Extractor',
    description: 'Analyze a block of text and extract the most important keywords.',
    icon: KeyIcon,
    iconName: 'KeyIcon',
    author: 'ToolFORGE Team',
    uses: 7100,
    systemInstruction: 'You are a keyword extraction tool. Analyze the text provided by the user and return a list of the most relevant keywords and key phrases.',
    starterPrompt: 'Please paste the text you want to analyze for keywords.'
};
