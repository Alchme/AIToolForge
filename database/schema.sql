-- Supabase Database Schema Setup
-- Run this SQL in your Supabase SQL Editor to set up authentication and data tables

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  messages JSONB DEFAULT '[]'::jsonb,
  system_instruction TEXT,
  icon TEXT,
  convo_type TEXT DEFAULT 'builder' CHECK (convo_type IN ('builder', 'agent', 'image-generator')),
  editing_tool_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_tools table
CREATE TABLE IF NOT EXISTS user_tools (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  html TEXT NOT NULL,
  icon_name TEXT DEFAULT 'PuzzlePieceIcon',
  sub_type TEXT DEFAULT 'Utility',
  is_public BOOLEAN DEFAULT false,
  uses INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tool_usage table
CREATE TABLE IF NOT EXISTS tool_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id TEXT,
  user_id UUID REFERENCES auth.users(id),
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tool_likes table
CREATE TABLE IF NOT EXISTS tool_likes (
  tool_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (tool_id, user_id)
);

-- Create app_state table
CREATE TABLE IF NOT EXISTS app_state (
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, key)
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_state ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

DROP POLICY IF EXISTS "Users can view own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can insert own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can update own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can delete own conversations" ON conversations;

DROP POLICY IF EXISTS "Users can view own tools" ON user_tools;
DROP POLICY IF EXISTS "Users can insert own tools" ON user_tools;
DROP POLICY IF EXISTS "Users can update own tools" ON user_tools;
DROP POLICY IF EXISTS "Users can delete own tools" ON user_tools;

DROP POLICY IF EXISTS "Users can view own usage" ON tool_usage;
DROP POLICY IF EXISTS "Users can insert own usage" ON tool_usage;
DROP POLICY IF EXISTS "Anyone can view tool usage for statistics" ON tool_usage;
DROP POLICY IF EXISTS "Users can insert usage records" ON tool_usage;

DROP POLICY IF EXISTS "Users can view own likes" ON tool_likes;
DROP POLICY IF EXISTS "Users can insert own likes" ON tool_likes;
DROP POLICY IF EXISTS "Users can delete own likes" ON tool_likes;

DROP POLICY IF EXISTS "Users can view own app state" ON app_state;
DROP POLICY IF EXISTS "Users can insert own app state" ON app_state;
DROP POLICY IF EXISTS "Users can update own app state" ON app_state;
DROP POLICY IF EXISTS "Users can delete own app state" ON app_state;

-- Create Row Level Security policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Conversations policies
CREATE POLICY "Users can view own conversations" ON conversations 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON conversations 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON conversations 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations" ON conversations 
  FOR DELETE USING (auth.uid() = user_id);

-- User tools policies
CREATE POLICY "Users can view own tools" ON user_tools 
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can insert own tools" ON user_tools 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tools" ON user_tools 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tools" ON user_tools 
  FOR DELETE USING (auth.uid() = user_id);

-- Tool usage policies (updated for global visibility)
CREATE POLICY "Anyone can view tool usage for statistics" ON tool_usage 
  FOR SELECT USING (true);

CREATE POLICY "Users can insert usage records" ON tool_usage 
  FOR INSERT WITH CHECK (true);

-- Tool likes policies
CREATE POLICY "Users can view own likes" ON tool_likes 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own likes" ON tool_likes 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes" ON tool_likes 
  FOR DELETE USING (auth.uid() = user_id);

-- App state policies
CREATE POLICY "Users can view own app state" ON app_state 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own app state" ON app_state 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own app state" ON app_state 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own app state" ON app_state 
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_tools_user_id ON user_tools(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tools_is_public ON user_tools(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_user_tools_created_at ON user_tools(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_id ON tool_usage(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_used_at ON tool_usage(used_at DESC);

CREATE INDEX IF NOT EXISTS idx_app_state_user_id ON app_state(user_id);

-- Create a function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Success message
SELECT 'Database schema setup completed successfully!' as message;