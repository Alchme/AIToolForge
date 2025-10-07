
import type { SVGProps, ComponentType } from 'react';

export interface GeneratedCode {
  html: string;
  explanation: string;
}

export interface GeneratedImages {
  images: string[]; // Array of base64 encoded image strings
}

export type ActiveTab = 'preview' | 'ui' | 'explanation';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string | GeneratedCode | GeneratedImages;
  timestamp: number;
}

export interface Conversation {
  id:string;
  name: string;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  systemInstruction?: string;
  icon: string;
  convoType: 'builder' | 'agent' | 'image-generator';
  editingToolId?: string;
}

// Tool Library Types
export type ToolType = 'static' | 'agent';
export type ToolSubType = 'Calculator' | 'Converter' | 'Generator' | 'Extractor' | 'Assistant' | 'Utility' | 'Formatter';
export type View = 'marketplace' | 'tool' | 'chat' | 'settings';

export interface BaseTool {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconName: string;
  type: ToolType;
  subType: ToolSubType;
  author: string;
  uses: number;
}

export interface StaticTool extends BaseTool {
  type: 'static';
  html: string;
}

export interface AgentTool extends BaseTool {
  type: 'agent';
  systemInstruction: string;
  starterPrompt: string;
  convoType?: 'agent' | 'image-generator';
}

export type LibraryTool = StaticTool | AgentTool;

export interface ToolCategory {
  name: string;
  tools: LibraryTool[];
}

// Database Types
export interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
}

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DatabaseConversation {
  id: string;
  user_id: string;
  name: string;
  messages: Message[];
  system_instruction?: string;
  icon?: string;
  convo_type: 'builder' | 'agent' | 'image-generator';
  editing_tool_id?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseUserTool {
  id: string;
  user_id: string;
  name: string;
  description: string;
  html: string;
  icon_name: string;
  sub_type: string;
  is_public: boolean;
  uses: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface PublicTool extends DatabaseUserTool {
  author_name: string;
  author_avatar?: string;
  is_liked_by_user: boolean;
}

export interface ToolUsage {
  id: string;
  tool_id: string;
  user_id: string;
  used_at: string;
}

export interface ToolLike {
  tool_id: string;
  user_id: string;
  created_at: string;
}

export interface AppState {
  user_id: string;
  key: string;
  value: any;
  updated_at: string;
}

// Authentication Types
export interface AuthResponse {
  user: User | null;
  session: any | null;
  error?: string;
}

// Sync Types
export interface SyncStatus {
  lastSync: Date;
  pendingChanges: number;
  isOnline: boolean;
  isSyncing: boolean;
}

export interface ConflictItem {
  id: string;
  type: 'conversation' | 'tool' | 'state';
  localData: any;
  remoteData: any;
  timestamp: Date;
}

export interface SyncResponse<T> {
  data: T[];
  conflicts: ConflictItem[];
  lastModified: Date;
}
