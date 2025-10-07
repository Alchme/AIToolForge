
import type { AgentTool } from '../../../types';
import { EnvelopeIcon } from '../../../components/Icons';

export const coverLetterGenerator: AgentTool = {
    id: 'tool-cover-letter-generator',
    name: 'Cover Letter Generator',
    type: 'agent',
    subType: 'Generator',
    description: 'Generate a compelling cover letter tailored to a specific job.',
    icon: EnvelopeIcon,
    iconName: 'EnvelopeIcon',
    author: 'ToolFORGE Team',
    uses: 6900,
    systemInstruction: 'You are a cover letter writing expert. Ask the user for the job description and their resume/key skills. Then, generate a tailored cover letter that highlights their qualifications and enthusiasm for the role.',
    starterPrompt: 'I can help you write a cover letter. Please paste the job description you are applying for.'
};
