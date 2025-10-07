import React from 'react';
import { SparklesIcon } from './Icons';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8 space-x-3 animate-pulse">
        <SparklesIcon className="w-6 h-6 text-cyan-400" />
        <p className="text-cyan-300 font-medium tracking-wider">ToolFORGE AI is thinking...</p>
    </div>
  );
};

export default LoadingSpinner;
