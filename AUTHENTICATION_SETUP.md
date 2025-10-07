# Authentication Setup Guide

This application uses Supabase for authentication. Follow these steps to set up authentication:

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

## 2. Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## 3. Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. Set Up Database Schema

Run the following SQL in your Supabase SQL editor to create the required tables:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE conversations (
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
CREATE TABLE user_tools (
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
CREATE TABLE tool_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id TEXT,
  user_id UUID REFERENCES auth.users(id),
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tool_likes table
CREATE TABLE tool_likes (
  tool_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (tool_id, user_id)
);

-- Create app_state table
CREATE TABLE app_state (
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, key)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_state ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON conversations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conversations" ON conversations FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own tools" ON user_tools FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can insert own tools" ON user_tools FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tools" ON user_tools FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tools" ON user_tools FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own usage" ON tool_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage" ON tool_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own likes" ON tool_likes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own likes" ON tool_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own likes" ON tool_likes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own app state" ON app_state FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own app state" ON app_state FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own app state" ON app_state FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own app state" ON app_state FOR DELETE USING (auth.uid() = user_id);
```

## 5. Configure OAuth Providers (Optional)

To enable Google and GitHub sign-in:

1. In your Supabase dashboard, go to **Authentication** > **Providers**
2. Enable and configure the providers you want:
   - **Google**: Add your Google OAuth client ID and secret
   - **GitHub**: Add your GitHub OAuth app client ID and secret

## 6. Test Authentication

1. Restart your development server: `pnpm run dev`
2. Open the application in your browser
3. Click the "Sign In" button in the sidebar
4. Try creating an account or signing in

## Troubleshooting

- **"Authentication is not configured" error**: Make sure your environment variables are set correctly and restart the development server
- **Database errors**: Make sure you've run the SQL schema setup in your Supabase project
- **OAuth not working**: Check that your OAuth providers are properly configured in Supabase

## Development Mode

The application will work without Supabase configuration, but authentication features will be disabled. You'll see a warning in the browser console: "Supabase is not configured. Authentication features will be disabled."