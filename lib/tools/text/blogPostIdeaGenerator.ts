
import type { AgentTool } from '../../../types';
import { LightBulbIcon } from '../../../components/Icons';

export const blogPostIdeaGenerator: AgentTool = {
    id: 'tool-blog-post-ideas',
    name: 'Blog Post Idea Generator',
    type: 'agent',
    subType: 'Generator',
    description: 'Never run out of ideas. Generate creative blog post titles and topics.',
    icon: LightBulbIcon,
    iconName: 'LightBulbIcon',
    author: 'ToolFORGE Team',
    uses: 5300,
    systemInstruction: 'You are a creative content strategist. The user will provide a topic or keyword. Generate a list of 10 engaging and SEO-friendly blog post titles and ideas based on their input.',
    starterPrompt: 'What topic are you interested in writing about? I will generate some blog post ideas for you.'
};
