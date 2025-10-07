
import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { GeneratedCode, ActiveTab, Conversation, Message, GeneratedImages } from '../types';
import CodeBlock from './CodeBlock';
import * as Icons from './Icons';
import LoadingSpinner from './LoadingSpinner';

interface MainDisplayProps {
  conversation: Conversation | undefined;
  onSendMessage: (prompt: string) => void;
  onSaveTool: (conversationId: string) => void;
}

const TabButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-t-lg border-b-2 transition-colors duration-300 ${
      isActive
        ? 'text-cyan-400 border-cyan-400 bg-[#1e1e1e]/50'
        : 'text-gray-400 border-transparent hover:text-white hover:bg-gray-800/50'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const GenerationResult: React.FC<{
  generatedCode: GeneratedCode;
  onSaveTool: () => void;
  isBuilder: boolean;
}> = ({ generatedCode, onSaveTool, isBuilder }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'preview':
        return (
          <iframe
            srcDoc={generatedCode.html}
            title="Preview"
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        );
      case 'ui':
        return <CodeBlock language="html" code={generatedCode.html} />;
      case 'explanation':
          return <div className="p-8 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: generatedCode.explanation }} />
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-[#1e1e1e]/70 rounded-lg border border-gray-800/80 overflow-hidden my-4 h-[400px] sm:h-[500px] lg:h-[580px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-800 px-2 sm:px-4 bg-black/30 gap-2 sm:gap-0">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto w-full sm:w-auto">
            <TabButton label="Preview" icon={<Icons.EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />} isActive={activeTab === 'preview'} onClick={() => setActiveTab('preview')} />
            <TabButton label="UI Code" icon={<Icons.CodeBracketIcon className="w-4 h-4 sm:w-5 sm:h-5" />} isActive={activeTab === 'ui'} onClick={() => setActiveTab('ui')} />
            <TabButton label="Explanation" icon={<Icons.InformationCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />} isActive={activeTab === 'explanation'} onClick={() => setActiveTab('explanation')} />
        </div>
        {isBuilder && (
            <button 
                onClick={onSaveTool}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-green-600/50 hover:text-white transition-colors whitespace-nowrap"
            >
                <Icons.BookmarkSquareIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Save Tool</span>
                <span className="sm:hidden">Save</span>
            </button>
        )}
      </div>
      <div className="flex-1 overflow-auto relative">
        {renderContent()}
      </div>
    </div>
  );
};

const ImageGenerationResult: React.FC<{
  generatedImages: GeneratedImages;
}> = ({ generatedImages }) => {
    const handleDownload = (base64Image: string, index: number) => {
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${base64Image}`;
        link.download = `generated-image-${Date.now()}-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4 p-3 sm:p-4 bg-[#1e1e1e]/70 rounded-lg border border-gray-800/80">
            {generatedImages.images.map((base64Image, index) => (
                <div key={index} className="relative group aspect-square">
                    <img
                        src={`data:image/png;base64,${base64Image}`}
                        alt={`Generated image ${index + 1}`}
                        className="rounded-lg w-full h-full object-cover"
                    />
                    <button
                        onClick={() => handleDownload(base64Image, index)}
                        className="absolute bottom-2 right-2 bg-black/50 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity"
                        title="Download image"
                    >
                        <Icons.ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            ))}
        </div>
    );
};


const MessageItem: React.FC<{
  message: Message;
  conversationId: string;
  convoType: Conversation['convoType'];
  onSaveTool: (conversationId: string) => void;
}> = ({ message, conversationId, convoType, onSaveTool }) => {
  const Icon = message.role === 'user' ? Icons.UserCircleIcon : Icons.SparklesIcon;
  const authorName = message.role === 'user' ? 'You' : 'ToolFORGE AI';
  const iconColor = message.role === 'user' ? 'text-gray-400' : 'text-green-400';

  return (
    <div className="py-4 sm:py-6 px-4 sm:px-6 md:px-8">
      <div className="flex items-start space-x-3 sm:space-x-4">
        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 mt-1 ${iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm sm:text-base">{authorName}</p>
          <div className="text-gray-300 mt-1">
            {typeof message.content === 'string' ? (
              <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
            ) : 'html' in message.content ? (
              <GenerationResult 
                generatedCode={message.content}
                onSaveTool={() => onSaveTool(conversationId)}
                isBuilder={convoType === 'builder'}
              />
            ) : 'images' in message.content ? (
              <ImageGenerationResult generatedImages={message.content} />
            ) : null }
          </div>
        </div>
      </div>
    </div>
  );
};

const PromptInput: React.FC<{
  onSendMessage: (prompt: string) => void;
  isLoading: boolean;
  convoType: Conversation['convoType'];
}> = ({ onSendMessage, isLoading, convoType }) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSend = () => {
    if (prompt.trim() && !isLoading) {
      onSendMessage(prompt);
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const placeholderText = isLoading
    ? "Generating..."
    : convoType === 'image-generator'
    ? "Describe the image you want to create..."
    : convoType === 'builder'
    ? "Describe the changes you want to make..."
    : "Ask the agent anything...";

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-4 bg-transparent">
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-lg">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          className="w-full h-auto max-h-48 resize-none bg-transparent p-3 sm:p-4 pr-12 sm:pr-14 text-gray-300 focus:outline-none placeholder:text-gray-500 text-sm sm:text-base"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !prompt.trim()}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
            <path d="M3.105 3.105a.75.75 0 01.954-.158l12.92 6.459a.75.75 0 010 1.392L4.059 17.053a.75.75 0 01-1.112-.878l1.402-4.195a.75.75 0 00-.31-.552l-2.6-1.733a.75.75 0 01.158-.954l4.195-1.402a.75.75 0 00.552-.31l1.733-2.6zM4.53 8.32l-2.6 1.733 1.402 4.195 9.692-4.845-4.195-1.402a1.5 1.5 0 01-1.104-.622L4.53 8.32z" />
          </svg>
        </button>
      </div>
    </div>
  );
};


const MainDisplay: React.FC<MainDisplayProps> = ({ conversation, onSendMessage, onSaveTool }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const lastArtifactMessageId = useMemo(() => {
    if (!conversation) return null;
    // Find the last message that is from the model and contains a generated artifact
    const lastMessage = [...conversation.messages].reverse().find(m => 
        m.role === 'model' && 
        typeof m.content === 'object' && 
        m.content !== null && 
        ('html' in m.content || 'images' in m.content)
    );
    return lastMessage?.id;
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 p-8">
        <h2 className="text-2xl font-bold text-gray-400">Conversation not found</h2>
        <p className="max-w-md mt-2">Please select a conversation from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-transparent">
      <div className="flex-1 overflow-y-auto min-h-0">
        {conversation.messages.map(msg => {
            if (
                lastArtifactMessageId &&
                msg.role === 'model' &&
                typeof msg.content === 'object' &&
                msg.content !== null &&
                ('html' in msg.content || 'images' in msg.content) &&
                msg.id !== lastArtifactMessageId
            ) {
                 return (
                    <div key={msg.id} className="py-6 px-4 sm:px-6 md:px-8">
                        <div className="flex items-start space-x-4">
                            <Icons.SparklesIcon className="w-7 h-7 flex-shrink-0 mt-1 text-gray-600" />
                            <div className="flex-1 italic text-gray-500 mt-1 border-l-2 border-gray-700 pl-4">
                                A previous version of the result was generated here. It is now hidden to keep the workspace clean.
                            </div>
                        </div>
                    </div>
                );
            }

            return (
              <MessageItem 
                  key={msg.id} 
                  message={msg} 
                  onSaveTool={onSaveTool}
                  conversationId={conversation.id} 
                  convoType={conversation.convoType}
              />
            );
        })}
        {conversation.isLoading && <LoadingSpinner />}
        {conversation.error && <div className="text-center text-red-400 p-8">Error: {conversation.error}</div>}
        <div ref={messagesEndRef} />
      </div>
      <PromptInput onSendMessage={onSendMessage} isLoading={conversation.isLoading} convoType={conversation.convoType} />
    </div>
  );
};

export default MainDisplay;
