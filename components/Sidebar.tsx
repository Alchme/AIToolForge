
import React, { useState, useEffect, useRef } from 'react';
import type { Conversation, View } from '../types';
import * as Icons from './Icons';
import { useAuth } from '../lib/contexts/AuthContext';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  currentView: View;
  onNavigate: (view: 'marketplace' | 'settings') => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newName: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenAuth: () => void;
}

const NavLink: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-green-600/20 text-green-400'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </a>
);

const ConversationItem: React.FC<{
  convo: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
}> = ({ convo, isActive, onSelect, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(convo.name);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const Icon = Icons[convo.icon as keyof typeof Icons] || Icons.ChatBubbleLeftIcon;

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);
  
  const handleRename = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (name.trim()) {
      onRename(name.trim());
      setIsEditing(false);
    }
  };
  
  const handleCancel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setName(convo.name);
    setIsEditing(false);
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }

  return (
    <div
      onClick={() => !isEditing && onSelect()}
      className={`group flex items-center justify-between px-3 py-2.5 rounded-md text-sm cursor-pointer transition-colors duration-200 ${
        isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
      }`}
    >
      <div className="flex items-center gap-3 truncate">
        <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') handleCancel();
            }}
            onBlur={() => handleCancel()}
            className="bg-gray-900 rounded px-1 text-white w-full focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        ) : (
          <span className="truncate text-gray-300">{convo.name}</span>
        )}
      </div>
      <div className="flex items-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button onClick={handleRename} className="p-1 text-gray-400 hover:text-white"><Icons.CheckIcon className="w-4 h-4" /></button>
            <button onClick={handleCancel} className="p-1 text-gray-400 hover:text-white"><Icons.XMarkIcon className="w-4 h-4" /></button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="p-1 text-gray-400 hover:text-white"><Icons.PencilIcon className="w-4 h-4" /></button>
            <button onClick={handleDelete} className="p-1 text-gray-400 hover:text-red-400"><Icons.TrashIcon className="w-4 h-4" /></button>
          </>
        )}
      </div>
    </div>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ conversations, activeConversationId, currentView, onNavigate, onSelectConversation, onDeleteConversation, onRenameConversation, isMobileOpen, onCloseMobile, onOpenAuth }) => {
  const { user, signOut } = useAuth();
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <aside className={`
      w-64 bg-[#0a0a0a] flex flex-col p-4 border-r border-gray-800 shrink-0
      lg:relative lg:translate-x-0
      fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
        {/* Header - Stays at top */}
        <div className="flex items-center gap-2 mb-6 shrink-0">
            <Icons.ToolboxLogoIcon className="w-8 h-8"/>
            <h1 className="text-xl font-bold text-white">Toolbox</h1>
        </div>

        {/* Static Navigation - Stays at top */}
        <nav className="space-y-1 shrink-0 mb-6">
            <NavLink 
              label="Overview" 
              icon={<Icons.GridIcon className="w-5 h-5" />}
              isActive={currentView === 'marketplace'}
              onClick={() => onNavigate('marketplace')}
            />
        </nav>
            
        {/* Scrollable Chat List */}
        <div className="flex-1 flex flex-col overflow-y-auto -mr-4 pr-3">
             <div className="px-3 py-2 text-xs uppercase font-bold text-gray-500 shrink-0">
                Recent Chats
            </div>
            <div className="space-y-1">
                {conversations.map(convo => (
                  <ConversationItem
                    key={convo.id}
                    convo={convo}
                    isActive={convo.id === activeConversationId}
                    onSelect={() => onSelectConversation(convo.id)}
                    onDelete={() => onDeleteConversation(convo.id)}
                    onRename={(newName) => onRenameConversation(convo.id, newName)}
                  />
                ))}
            </div>
        </div>

        {/* Footer - Stays at bottom */}
        <div className="shrink-0 pt-4 space-y-1">
            {/* Authentication Section */}
            {user ? (
              <div className="px-3 py-2 border-t border-gray-800 pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <Icons.UserCircleIcon className="w-6 h-6 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.user_metadata?.display_name || user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                >
                  <Icons.ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              >
                <Icons.UserCircleIcon className="w-5 h-5" />
                Sign In
              </button>
            )}
            
            <NavLink 
              label="Settings" 
              icon={<Icons.SettingsIcon className="w-5 h-5" />}
              isActive={currentView === 'settings'}
              onClick={() => onNavigate('settings')}
            />
        </div>
    </aside>
  );
};

export default Sidebar;
