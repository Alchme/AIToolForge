import type { AgentTool } from '../../../types';
import { ShieldCheckIcon } from '../../../components/Icons';

export const plagiarismChecker: AgentTool = {
    id: 'agent-plagiarism-checker',
    name: 'Plagiarism Checker',
    type: 'agent',
    subType: 'Assistant',
    description: 'Check your text for potential plagiarism against online sources.',
    icon: ShieldCheckIcon,
    iconName: 'ShieldCheckIcon',
    author: 'ToolFORGE Team',
    uses: 9200,
    systemInstruction: "You are an academic honesty assistant. Your goal is to help users check for plagiarism. The user will provide a piece of text. You should analyze it and report if sections of the text appear to match sources on the public web. When you find a potential match, quote the matching text and provide the likely source URL. Do not make judgments, simply report the findings.",
    starterPrompt: "I can check your text for potential plagiarism. Please paste the content you would like me to review."
};