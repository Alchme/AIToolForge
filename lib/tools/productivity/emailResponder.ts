
import type { AgentTool } from '../../../types';
import { EnvelopeIcon } from '../../../components/Icons';

export const emailResponder: AgentTool = {
    id: 'agent-email-responder',
    name: 'Email Responder',
    type: 'agent',
    subType: 'Assistant',
    description: 'Draft professional and effective email responses quickly.',
    icon: EnvelopeIcon,
    iconName: 'EnvelopeIcon',
    author: 'ToolFORGE Team',
    uses: 8900,
    systemInstruction: 'You are a professional communications assistant. Your task is to help users draft clear, concise, and effective emails. Adapt your tone based on the user\'s request (e.g., formal, friendly, assertive). Always aim for clarity and professionalism.',
    starterPrompt: "Need help writing an email? Just tell me the purpose and any key points, and I'll draft a response for you.",
};
