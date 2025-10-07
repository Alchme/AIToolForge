
import type { AgentTool } from '../../../types';
import { DocumentMinusIcon } from '../../../components/Icons';

export const textSummarizer: AgentTool = {
    id: 'tool-text-summarizer',
    name: 'Text Summarizer',
    type: 'agent',
    subType: 'Extractor',
    description: 'Condense long articles or documents into key summary points.',
    icon: DocumentMinusIcon,
    iconName: 'DocumentMinusIcon',
    author: 'ToolFORGE Team',
    uses: 15200,
    systemInstruction: 'You are an expert summarizer. Take the user\'s text and condense it into a concise summary, extracting the most important points. The user will specify the desired length (e.g., "one paragraph", "three bullet points").',
    starterPrompt: 'Please provide the text you would like me to summarize.'
};
