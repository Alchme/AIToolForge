
import type { AgentTool } from '../../../types';
import { IdentificationIcon } from '../../../components/Icons';

export const resumeBuilder: AgentTool = {
    id: 'tool-resume-builder',
    name: 'Resume Builder Assistant',
    type: 'agent',
    subType: 'Assistant',
    description: 'Get AI assistance to build a professional and effective resume.',
    icon: IdentificationIcon,
    iconName: 'IdentificationIcon',
    author: 'ToolFORGE Team',
    uses: 8400,
    systemInstruction: 'You are a professional resume writer and career coach. Guide the user through the process of building a resume, section by section. Ask for their experience, skills, and education, then format it professionally.',
    starterPrompt: "Let's build a standout resume together. We'll start with your contact information. What is your full name, phone number, and email address?"
};
