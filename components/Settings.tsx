
import React from 'react';
import * as Icons from './Icons';

interface SettingsProps {
    onClearConversations: () => void;
    onClearCreations: () => void;
    onClearAllData: () => void;
}

const DangerAction: React.FC<{ title: string, description: string, buttonText: string, onAction: () => void }> =
({ title, description, buttonText, onAction }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
        <div className="mb-3 sm:mb-0">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-md">{description}</p>
        </div>
        <button
            onClick={onAction}
            className="w-full sm:w-auto shrink-0 bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 hover:text-red-300 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
        >
            <Icons.TrashIcon className="w-4 h-4" />
            {buttonText}
        </button>
    </div>
);

const Settings: React.FC<SettingsProps> = ({ onClearConversations, onClearCreations, onClearAllData }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#121212]">
      <header className="flex items-center p-4 px-4 sm:px-6 lg:px-8 border-b border-gray-800 shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Settings</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4">Data Management</h2>
                <div className="bg-[#1e1e1e] border border-red-500/30 rounded-lg overflow-hidden">
                    <div className="p-3 sm:p-4 bg-red-900/20 border-b border-red-500/30">
                        <div className="flex items-start sm:items-center gap-3">
                            <Icons.ExclamationTriangleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 shrink-0 mt-0.5 sm:mt-0"/>
                            <div>
                                <h3 className="font-bold text-red-300 text-sm sm:text-base">Danger Zone</h3>
                                <p className="text-xs sm:text-sm text-red-400/80">These actions are permanent and cannot be undone.</p>
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-800">
                        <DangerAction 
                            title="Clear All Conversations"
                            description="This will permanently delete all your chat histories and conversations."
                            buttonText="Clear Conversations"
                            onAction={onClearConversations}
                        />
                         <DangerAction 
                            title="Clear All 'My Creations'"
                            description="This will permanently delete all the tools you have built and saved."
                            buttonText="Clear My Creations"
                            onAction={onClearCreations}
                        />
                         <DangerAction 
                            title="Reset Application"
                            description="This will permanently delete all conversations and created tools, resetting the app to its original state."
                            buttonText="Clear All Data"
                            onAction={onClearAllData}
                        />
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
