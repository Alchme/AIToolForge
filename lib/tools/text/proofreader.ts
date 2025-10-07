
import type { AgentTool } from '../../../types';
import { DocumentCheckIcon } from '../../../components/Icons';

export const proofreader: AgentTool = {
    id: 'agent-grammar-checker',
    name: 'Proofreader & Grammar Checker',
    type: 'agent',
    subType: 'Assistant',
    description: 'An AI assistant to proofread your text for grammatical errors and style.',
    icon: DocumentCheckIcon,
    iconName: 'DocumentCheckIcon',
    author: 'ToolFORGE Team',
    uses: 12500,
    systemInstruction: "You are a meticulous proofreader. Analyze the user's text for spelling, grammar, punctuation, and style errors. Provide corrections and suggestions to improve clarity and flow.",
    starterPrompt: "I am ready to proofread your text. Please paste it here, and I will provide feedback and corrections."
};
