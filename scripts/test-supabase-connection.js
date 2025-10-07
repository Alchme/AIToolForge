// Test Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itykmevgrmspufjklkmf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eWttZXZncm1zcHVmamtsa21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzU0OTQsImV4cCI6MjA2ODM1MTQ5NH0.xr9iUhdwio8Haw3inXS_tCEqhjMVnOsYT1RbbattmLM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('🔗 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      
      if (error.message.includes('relation "public.profiles" does not exist')) {
        console.log('📋 Database schema not set up yet.');
        console.log('👉 Please run the SQL schema in your Supabase dashboard:');
        console.log('   1. Go to https://supabase.com/dashboard/project/itykmevgrmspufjklkmf');
        console.log('   2. Click SQL Editor');
        console.log('   3. Run the contents of database/schema.sql');
      }
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('🎉 Authentication system is ready to use!');
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testConnection();