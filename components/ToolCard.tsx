
import React from 'react';
import type { LibraryTool } from '../types';
import * as Icons from './Icons';

interface ToolCardProps {
    tool: LibraryTool;
    onSelect: (tool: LibraryTool) => void;
    categoryName: string;
    onEdit: (toolId: string) => void;
    onDelete: (toolId: string) => void;
}

const categoryColors: { [key: string]: string } = {
    'Finance': 'bg-green-500/20 text-green-400',
    'Converters': 'bg-sky-500/20 text-sky-400',
    'Developer Tools': 'bg-rose-500/20 text-rose-400',
    'Productivity': 'bg-indigo-500/20 text-indigo-400',
    'My Creations': 'bg-amber-500/20 text-amber-400',
    'Text & Writing Tools': 'bg-violet-500/20 text-violet-400',
    'Image & Design Tools': 'bg-orange-500/20 text-orange-400',
    'Data & Analytics Tools': 'bg-cyan-500/20 text-cyan-400',
    'Default': 'bg-gray-700/50 text-gray-300'
};

const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, categoryName, onEdit, onDelete }) => {
    const colorClasses = categoryColors[categoryName] || categoryColors.Default;
    
    const handleArticleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof Element && e.target.closest('button')) {
            return;
        }
        onSelect(tool);
    };
    
    return (
        <article 
            className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-4 flex flex-col justify-between relative h-32 hover:bg-[#2a2a2a] hover:ring-1 hover:ring-green-600 transition-all duration-200 cursor-pointer"
            onClick={handleArticleClick}
        >
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-gray-300 font-medium text-sm">
                <Icons.TrendUpIcon className="w-4 h-4 text-green-400" />
                <span>{tool.uses.toLocaleString()}</span>
                <span className="text-xs text-gray-500">uses</span>
            </div>
            
            <div className="pr-16">
                <h3 className="font-bold text-white text-base truncate" title={tool.name}>{tool.name}</h3>
                <p className="text-sm text-gray-400">By: {tool.author}</p>
            </div>
            
            <div className="flex justify-between items-center">
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${colorClasses}`}>{categoryName}</span>

                {tool.author === 'You' ? (
                     <div className="flex items-center gap-1">
                        <button onClick={(e) => { e.stopPropagation(); onEdit(tool.id); }} className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors" title="Edit Tool">
                           <Icons.PencilIcon className="w-4 h-4" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(tool.id); }} className="p-2 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors" title="Delete Tool">
                           <Icons.TrashIcon className="w-4 h-4" />
                        </button>
                     </div>
                ) : (
                    <button 
                        className="p-2 rounded-md bg-green-500/20 hover:bg-green-500/40 text-green-400 transition-colors duration-200" 
                        title={`Use ${tool.name}`}
                        onClick={(e) => { e.stopPropagation(); onSelect(tool); }}
                    >
                        <Icons.PlusIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
        </article>
    );
};

export default ToolCard;
