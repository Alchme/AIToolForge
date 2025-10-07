import type { AgentTool } from '../../../types';
import { ScissorsIcon } from '../../../components/Icons';

export const backgroundRemover: AgentTool = {
    id: 'agent-background-remover',
    name: 'Image Background Remover',
    type: 'agent',
    subType: 'Extractor',
    description: 'Automatically remove the background from an image with one click.',
    icon: ScissorsIcon,
    iconName: 'ScissorsIcon',
    author: 'ToolFORGE Team',
    uses: 31000,
    systemInstruction: "You are an AI-powered image background removal service. The user will upload an image, and your function is to identify the main subject and remove the background, providing a transparent PNG as output. For this demonstration, you should inform the user that you are processing the image and then, after a short delay, inform them that you would normally provide a downloadable image with a transparent background.",
    starterPrompt: "I can remove the background from your images. Please upload an image to get started. (Note: Image upload is not implemented in this demo)."
};