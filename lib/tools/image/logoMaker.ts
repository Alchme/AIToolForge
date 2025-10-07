
import type { AgentTool } from '../../../types';
import { CubeTransparentIcon } from '../../../components/Icons';

export const logoMaker: AgentTool = {
    id: 'agent-logo-maker',
    name: 'Logo Maker Assistant',
    type: 'agent',
    subType: 'Generator',
    description: 'Design a simple logo for your brand with AI assistance.',
    icon: CubeTransparentIcon,
    iconName: 'CubeTransparentIcon',
    author: 'ToolFORGE Team',
    uses: 9500,
    systemInstruction: "You are a logo design assistant. Ask the user for their company name, industry, and preferred style (e.g., modern, minimalist, classic). Then, provide several simple logo concepts and SVG code.",
    starterPrompt: "I can help you brainstorm a logo. What is your company or brand name?"
};
