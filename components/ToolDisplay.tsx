import React from 'react';
import type { StaticTool } from '../types';
import * as Icons from './Icons';

interface ToolDisplayProps {
  tool: StaticTool;
  onBack: () => void;
}

const ToolDisplay: React.FC<ToolDisplayProps> = ({ tool, onBack }) => {
  const Icon = tool.icon;
  return (
    <div className="flex-1 flex flex-col bg-[#121212]">
       <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 px-4 sm:px-6 lg:px-8 border-b border-gray-800 bg-[#121212]/80 backdrop-blur-sm shrink-0 gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">{tool.name}</h1>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 sm:line-clamp-1">{tool.description}</p>
              </div>
          </div>
          <button 
            onClick={onBack}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg flex items-center gap-2 sm:gap-3 transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
          >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <span className="hidden sm:inline">Back to Marketplace</span>
              <span className="sm:hidden">Back</span>
          </button>
      </header>
      <div className="flex-1 overflow-hidden">
        <iframe
          srcDoc={tool.html}
          title={tool.name}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default ToolDisplay;
