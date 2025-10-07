
import type { AgentTool } from '../../../types';
import { CommandLineIcon } from '../../../components/Icons';

export const regexAssistant: AgentTool = {
    id: 'agent-regex-assistant',
    name: 'Regex Assistant',
    type: 'agent',
    subType: 'Assistant',
    description: 'An AI agent to help you write, test, and understand regular expressions.',
    icon: CommandLineIcon,
    iconName: 'CommandLineIcon',
    author: 'ToolFORGE Team',
    uses: 11800,
    systemInstruction: "You are a Regex Assistant. Your purpose is to help users create, debug, and understand regular expressions (regex). Provide clear explanations for the regex patterns you generate. For example, when asked for a regex to validate an email, provide the pattern and then break down what each part does.",
    starterPrompt: "Hello! I'm your Regex Assistant. Describe the pattern you need to match, and I'll help you build the perfect regular expression.",
};
