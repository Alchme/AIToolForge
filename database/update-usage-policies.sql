-- Update Tool Usage Policies for Global Visibility
-- Run this SQL in your Supabase SQL Editor to update existing databases

-- Drop all existing policies (both old and new names)
DROP POLICY IF EXISTS "Users can view own usage" ON tool_usage;
DROP POLICY IF EXISTS "Users can insert own usage" ON tool_usage;
DROP POLICY IF EXISTS "Anyone can view tool usage for statistics" ON tool_usage;
DROP POLICY IF EXISTS "Users can insert usage records" ON tool_usage;

-- Create new policies for global usage visibility
CREATE POLICY "Anyone can view tool usage for statistics" ON tool_usage 
  FOR SELECT USING (true);

CREATE POLICY "Users can insert usage records" ON tool_usage 
  FOR INSERT WITH CHECK (true);

-- Success message
SELECT 'Tool usage policies updated successfully! All users can now see global usage statistics.' as message;