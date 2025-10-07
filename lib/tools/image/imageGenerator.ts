
import type { AgentTool } from '../../../types';
import { PhotoIcon } from '../../../components/Icons';

export const imageGenerator: AgentTool = {
    id: 'agent-image-generator',
    name: 'Image Generator',
    type: 'agent',
    subType: 'Generator',
    description: 'Generate stunning images from text descriptions using AI.',
    icon: PhotoIcon,
    iconName: 'PhotoIcon',
    author: 'ToolFORGE Team',
    uses: 42000,
    systemInstruction: "You are an image generation assistant. The user will provide a descriptive prompt, and your sole function is to generate an image based on that prompt. Do not engage in conversation or ask follow-up questions. Focus only on fulfilling the image request.",
    starterPrompt: "Describe the image you want me to create.",
    convoType: 'image-generator',
};
