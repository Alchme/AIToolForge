
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainDisplay from './components/MainDisplay';
import ToolDisplay from './components/ToolDisplay';
import Marketplace from './components/Marketplace';
import ConfirmationModal from './components/ConfirmationModal';
import AuthModal from './components/AuthModal';
import Settings from './components/Settings';
import { generateCode, generateChatResponse, generateImages } from './services/geminiService';
import * as db from './services/dbService';
import type { Conversation, Message, LibraryTool, AgentTool, StaticTool, ToolCategory, GeneratedCode, GeneratedImages } from './types';
import { toolCategories as defaultToolCategories } from './lib/tools';
import * as Icons from './components/Icons';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './lib/contexts/AuthContext';
import { useToolUsage } from './lib/hooks/useToolUsage';

type View = 'marketplace' | 'tool' | 'chat' | 'settings';

function App(): React.ReactNode {
  const { user, loading: authLoading } = useAuth();
  const { trackUsage, updateToolsWithUsage } = useToolUsage();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<StaticTool | null>(null);
  const [currentView, setCurrentView] = useState<View>('marketplace');
  const [userMadeTools, setUserMadeTools] = useState<StaticTool[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<{ onConfirm: () => void } | null>(null);
  const [modalContent, setModalContent] = useState({ title: '', message: '', details: '' });
  const [isDataLoaded, setIsDataLoaded] = useState(false);


  // Load state from IndexedDB on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedConversations, savedUserTools, savedView, savedActiveConvoId, savedActiveToolId] = await Promise.all([
            db.getConversations(),
            db.getUserTools(),
            db.getAppState<View>('currentView'),
            db.getAppState<string>('activeConversationId'),
            db.getAppState<string>('activeToolId'),
        ]);

        const loadedConversations = savedConversations || [];
        setConversations(loadedConversations);

        let loadedUserTools: StaticTool[] = [];
        if (savedUserTools) {
            loadedUserTools = savedUserTools.map((tool: any) => ({
                ...tool,
                icon: Icons[tool.iconName as keyof typeof Icons] || Icons.PuzzlePieceIcon,
            }));
            setUserMadeTools(loadedUserTools);
        }
        
        const allToolsFromStorage = [...defaultToolCategories.flatMap(c => c.tools), ...loadedUserTools];

        if (savedView === 'chat' && savedActiveConvoId && loadedConversations.some(c => c.id === savedActiveConvoId)) {
          setActiveConversationId(savedActiveConvoId);
          setCurrentView('chat');
        } else if (savedView === 'tool' && savedActiveToolId) {
          const tool = allToolsFromStorage.find(t => t.id === savedActiveToolId) as StaticTool | undefined;
          if(tool) {
              setActiveTool(tool);
              setCurrentView('tool');
          } else {
              setCurrentView('marketplace');
          }
        } else if (savedView === 'settings') {
          setCurrentView('settings');
        } else {
          setCurrentView('marketplace');
        }

      } catch (error) {
        console.error("Failed to load state from IndexedDB", error);
        setCurrentView('marketplace');
      } finally {
        setIsDataLoaded(true);
      }
    };

    loadData();
  }, []);

  // Persist UI state to IndexedDB whenever it changes
  useEffect(() => {
    if (isDataLoaded) {
      db.saveAppState('currentView', currentView);
      db.saveAppState('activeConversationId', activeConversationId || '');
      db.saveAppState('activeToolId', activeTool?.id || '');
    }
  }, [currentView, activeConversationId, activeTool, isDataLoaded]);
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  
  const handleCreateOrSelectTool = useCallback(async (tool: LibraryTool) => {
    // Track tool usage
    await trackUsage(tool.id, tool.name);
    
    if (tool.type === 'static') {
      setActiveTool(tool as StaticTool);
      setCurrentView('tool');
      setActiveConversationId(null);
    } else if (tool.type === 'agent') {
      const agentTool = tool as AgentTool;
      const newConversation: Conversation = {
        id: `convo-agent-${Date.now()}`,
        name: tool.name,
        messages: [{ id: `msg-agent-start-${Date.now()}`, role: 'model', content: agentTool.starterPrompt, timestamp: Date.now() }],
        isLoading: false, error: null, systemInstruction: agentTool.systemInstruction, icon: agentTool.iconName,
        convoType: agentTool.convoType || 'agent',
      };
      await db.saveConversation(newConversation);
      setConversations(prev => [newConversation, ...prev]);
      setActiveConversationId(newConversation.id);
      setCurrentView('chat');
      setActiveTool(null);
    }
  }, [trackUsage]);

  const handleNewCustomTool = useCallback(async () => {
    const newConversation: Conversation = {
      id: `convo-${Date.now()}`, name: 'New Custom Tool', messages: [], isLoading: false, error: null,
      icon: 'PencilIcon', convoType: 'builder',
    };
    await db.saveConversation(newConversation);
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setCurrentView('chat');
    setActiveTool(null);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setCurrentView('chat');
    setActiveTool(null);
  }, []);
  
  const handleDeleteConversation = useCallback(async (id: string) => {
    await db.deleteConversation(id);
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
      setCurrentView('marketplace');
    }
  }, [activeConversationId]);

  const handleRenameConversation = useCallback(async (id: string, newName: string) => {
    const convoToUpdate = conversations.find(c => c.id === id);
    if (convoToUpdate) {
        const updatedConvo = { ...convoToUpdate, name: newName };
        await db.saveConversation(updatedConvo);
        setConversations(prev => prev.map(c => c.id === id ? updatedConvo : c));
    }
  }, [conversations]);

  const handleSaveTool = useCallback(async (conversationId: string) => {
    const convo = conversations.find(c => c.id === conversationId);
    if (!convo || convo.convoType !== 'builder') return;

    const lastModelMessage = [...convo.messages].reverse().find(m => m.role === 'model' && typeof m.content === 'object' && m.content && 'html' in m.content);
    if (!lastModelMessage || typeof lastModelMessage.content !== 'object' || !('html' in lastModelMessage.content)) return;

    const generatedCode = lastModelMessage.content as GeneratedCode;
    
    if(convo.editingToolId) {
        const toolToUpdate = userMadeTools.find(tool => tool.id === convo.editingToolId);
        if(toolToUpdate) {
            const updatedTool = {
                ...toolToUpdate,
                name: convo.name,
                html: generatedCode.html,
                description: generatedCode.explanation.substring(0, 100) + (generatedCode.explanation.length > 100 ? '...' : ''),
            };
            const { icon, ...dbTool } = updatedTool;
            await db.saveUserTool(dbTool);
            setUserMadeTools(prev => prev.map(t => t.id === convo.editingToolId ? updatedTool : t));
            alert(`Tool "${convo.name}" has been updated!`);
        }
    } else {
        const newTool: StaticTool = {
            id: `tool-user-${Date.now()}`, name: convo.name,
            description: generatedCode.explanation.substring(0, 100) + (generatedCode.explanation.length > 100 ? '...' : ''),
            html: generatedCode.html, icon: Icons.PuzzlePieceIcon, iconName: 'PuzzlePieceIcon', type: 'static',
            subType: 'Utility', author: 'You', uses: 0,
        };
        const { icon, ...dbTool } = newTool;
        await db.saveUserTool(dbTool);
        setUserMadeTools(prev => [newTool, ...prev]);
        alert(`Tool "${newTool.name}" has been saved to "My Creations"!`);
    }

    await db.deleteConversation(conversationId);
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (activeConversationId === conversationId) {
        setActiveConversationId(null);
        setCurrentView('marketplace');
    }
  }, [conversations, userMadeTools, activeConversationId]);
  
  const handleEditUserTool = useCallback(async (toolId: string) => {
    const toolToEdit = userMadeTools.find(t => t.id === toolId);
    if (!toolToEdit) return;

    const newConversation: Conversation = {
      id: `convo-edit-${Date.now()}`, name: toolToEdit.name,
      messages: [{ id: `msg-edit-start-${Date.now()}`, role: 'model', content: { html: toolToEdit.html, explanation: toolToEdit.description }, timestamp: Date.now() }],
      isLoading: false, error: null, icon: 'PencilIcon', convoType: 'builder', editingToolId: toolToEdit.id,
    };
    
    await db.saveConversation(newConversation);
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setCurrentView('chat');
    setActiveTool(null);
  }, [userMadeTools]);

  const openConfirmationModal = (title: string, message: string, details: string, onConfirmAction: () => void) => {
      setModalContent({ title, message, details });
      setConfirmationAction({ onConfirm: onConfirmAction });
      setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (confirmationAction) {
      confirmationAction.onConfirm();
    }
    setIsModalOpen(false);
    setConfirmationAction(null);
  };
  
  const handleDeleteUserTool = useCallback((toolId: string) => {
    const tool = userMadeTools.find(t => t.id === toolId);
    if (tool) {
        openConfirmationModal(
            "Delete Tool",
            `Are you sure you want to delete the tool "${tool.name}"?`,
            "This action cannot be undone.",
            async () => {
                await db.deleteUserTool(toolId);
                setUserMadeTools(prev => prev.filter(t => t.id !== toolId));
                 if (activeTool?.id === toolId) {
                    setActiveTool(null);
                    setCurrentView('marketplace');
                }
            }
        );
    }
  }, [userMadeTools, activeTool]);


  const handleSendMessage = useCallback(async (prompt: string) => {
    if (!prompt.trim() || !activeConversationId || activeConversation?.isLoading) return;

    const userMessage: Message = { id: `msg-user-${Date.now()}`, role: 'user', content: prompt, timestamp: Date.now() };
    
    let currentConvo = conversations.find(c => c.id === activeConversationId);
    if(!currentConvo) return;

    const updatedMessages = [...currentConvo.messages, userMessage];
    const isFirstRealMessage = currentConvo.messages.filter(m => m.role === 'user').length === 0;

    let convoWithLoading = { 
      ...currentConvo,
      messages: updatedMessages,
      isLoading: true,
      error: null,
      ...(isFirstRealMessage && currentConvo.name === 'New Custom Tool' && { name: prompt.substring(0, 40) + (prompt.length > 40 ? '...' : '') })
    };
    setConversations(prev => prev.map(c => c.id === activeConversationId ? convoWithLoading : c));
    
    try {
      const apiHistory = updatedMessages.map(m => ({ role: m.role, content: m.content }));
      
      let modelResponseContent: string | GeneratedCode | GeneratedImages;

      if (currentConvo.convoType === 'agent') {
          modelResponseContent = await generateChatResponse(prompt, apiHistory.slice(0, -1), currentConvo.systemInstruction);
      } else if (currentConvo.convoType === 'image-generator') {
          modelResponseContent = await generateImages(prompt);
      } else { // 'builder'
          modelResponseContent = await generateCode(prompt, apiHistory.slice(0, -1), currentConvo.systemInstruction);
      }

      const modelMessage: Message = { id: `msg-model-${Date.now()}`, role: 'model', content: modelResponseContent, timestamp: Date.now() };
      
      const finalConvo = { ...convoWithLoading, messages: [...updatedMessages, modelMessage], isLoading: false };
      await db.saveConversation(finalConvo);
      setConversations(prev => prev.map(c => c.id === activeConversationId ? finalConvo : c));

    } catch (err) {
      console.error(err);
      const error = err instanceof Error ? err.message : 'An unknown error occurred.';
      const convoWithError = { ...convoWithLoading, error, isLoading: false };
      await db.saveConversation(convoWithError);
      setConversations(prev => prev.map(c => c.id === activeConversationId ? convoWithError : c));
    }
  }, [activeConversationId, conversations, activeConversation?.isLoading]);

  const handleNavigate = (view: 'marketplace' | 'settings') => {
    setCurrentView(view);
    setActiveConversationId(null);
    setActiveTool(null);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const handleSelectConversationMobile = useCallback((id: string) => {
    handleSelectConversation(id);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  }, [handleSelectConversation]);
  
  const handleClearConversations = () => {
    openConfirmationModal(
      "Clear All Conversations",
      "Are you sure you want to delete all your conversations?",
      "This action will permanently delete all chat histories and cannot be undone.",
      async () => {
        await db.clearAllConversations();
        setConversations([]);
        setActiveConversationId(null);
        setCurrentView('marketplace');
      }
    );
  };

  const handleClearCreations = () => {
    openConfirmationModal(
      "Clear All My Creations",
      "Are you sure you want to delete all tools you have created?",
      "This action will permanently delete all of your custom tools and cannot be undone.",
      async () => {
        await db.clearAllUserTools();
        setUserMadeTools([]);
        if (activeTool && activeTool.author === 'You') {
          setActiveTool(null);
          setCurrentView('marketplace');
        }
      }
    );
  };

  const handleClearAllData = () => {
    openConfirmationModal(
      "Reset Application",
      "Are you sure you want to clear all data?",
      "This will delete all conversations and created tools, resetting the app. This action cannot be undone.",
      async () => {
        await db.clearAllData();
        setConversations([]);
        setUserMadeTools([]);
        setActiveConversationId(null);
        setActiveTool(null);
        setCurrentView('marketplace');
      }
    );
  };

  const getCombinedToolCategories = (): ToolCategory[] => {
    // Update all tools with real usage counts
    const updatedDefaultCategories = defaultToolCategories.map(category => ({
      ...category,
      tools: updateToolsWithUsage(category.tools)
    }));

    if (userMadeTools.length > 0) {
      const userCreationsCategory: ToolCategory = {
        name: 'My Creations',
        tools: updateToolsWithUsage(userMadeTools)
      };
      return [userCreationsCategory, ...updatedDefaultCategories];
    }
    return updatedDefaultCategories;
  };

  const allToolCategories = getCombinedToolCategories();

  const renderMainContent = () => {
    switch(currentView) {
      case 'tool':
        return activeTool ? <ToolDisplay tool={activeTool} onBack={() => handleNavigate('marketplace')} /> : <Marketplace toolCategories={allToolCategories} onSelectTool={handleCreateOrSelectTool} onCreateTool={handleNewCustomTool} onEditTool={handleEditUserTool} onDeleteTool={handleDeleteUserTool} />;
      case 'chat':
        return activeConversation ? <MainDisplay key={activeConversation.id} conversation={activeConversation} onSendMessage={handleSendMessage} onSaveTool={handleSaveTool} /> : <Marketplace toolCategories={allToolCategories} onSelectTool={handleCreateOrSelectTool} onCreateTool={handleNewCustomTool} onEditTool={handleEditUserTool} onDeleteTool={handleDeleteUserTool} />;
      case 'settings':
        return <Settings
                  onClearConversations={handleClearConversations}
                  onClearCreations={handleClearCreations}
                  onClearAllData={handleClearAllData}
                />;
      case 'marketplace':
      default:
        return <Marketplace toolCategories={allToolCategories} onSelectTool={handleCreateOrSelectTool} onCreateTool={handleNewCustomTool} onEditTool={handleEditUserTool} onDeleteTool={handleDeleteUserTool} />;
    }
  }

  if (!isDataLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#121212]">
        <div className="flex items-center justify-center p-8 space-x-3">
            <Icons.SparklesIcon className="w-8 h-8 text-cyan-400 animate-pulse" />
            <p className="text-cyan-300 font-medium tracking-wider text-lg">Loading Toolbox...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#121212]">
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={modalContent.title}
      >
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Icons.ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <p className="mt-4 text-gray-300">
                {modalContent.message}
            </p>
            {modalContent.details && <p className="mt-2 text-sm text-gray-500">{modalContent.details}</p>}
        </div>
      </ConfirmationModal>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        currentView={currentView}
        onNavigate={handleNavigate}
        onSelectConversation={handleSelectConversationMobile}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        isMobileOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header with menu button */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-gray-800">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-400 hover:text-white"
          >
            <Icons.Bars3Icon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Icons.ToolboxLogoIcon className="w-6 h-6"/>
            <h1 className="text-lg font-bold text-white">Toolbox</h1>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
        
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;
