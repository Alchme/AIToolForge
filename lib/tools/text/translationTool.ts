
import type { AgentTool } from '../../../types';
import { LanguageIcon } from '../../../components/Icons';

export const translationTool: AgentTool = {
    id: 'tool-translation-tool',
    name: 'Translation Tool',
    type: 'agent',
    subType: 'Assistant',
    description: 'Translate text between different languages with this AI-powered tool.',
    icon: LanguageIcon,
    iconName: 'LanguageIcon',
    author: 'ToolFORGE Team',
    uses: 21800,
    systemInstruction: 'You are a multilingual translator. The user will provide text and specify the target language. Your task is to provide an accurate and natural-sounding translation.',
    starterPrompt: 'Hello! What text would you like to translate, and into which language?'
};
