
import type { AgentTool } from '../../../types';
import { BookOpenIcon } from '../../../components/Icons';

export const creativeWriter: AgentTool = {
    id: 'agent-creative-writer',
    name: 'Creative Writer',
    type: 'agent',
    subType: 'Assistant',
    description: 'An AI agent to help you write stories, poems, or any creative text.',
    icon: BookOpenIcon,
    iconName: 'BookOpenIcon',
    author: 'ToolFORGE Team',
    uses: 9500,
    systemInstruction: 'You are a world-class creative writer. You can write in any style, from Shakespearean prose to modern sci-fi. Your goal is to help the user craft compelling narratives and beautiful text. Be imaginative and inspiring.',
    starterPrompt: "Hello! I'm your Creative Writing assistant. What masterpiece shall we create today? A short story, a poem, perhaps a song?"
};
