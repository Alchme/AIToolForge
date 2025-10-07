# 🔐 OAuth Setup Guide for ToolFORGE

This guide will help you set up GitHub OAuth authentication for your ToolFORGE platform.

## 🚀 Quick Setup Overview

1. **Create GitHub OAuth App**
2. **Configure Supabase Authentication**
3. **Set Environment Variables**
4. **Test the Integration**

## 📋 Step 1: Create GitHub OAuth App

### 1.1 Go to GitHub Developer Settings
1. Go to https://github.com/settings/developers
2. Click **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"**

### 1.2 Fill in OAuth App Details
```
Application name: ToolFORGE
Homepage URL: https://ep.mk
Application description: AI-powered developer toolbox platform
Authorization callback URL: https://itykmevgrmspufjklkmf.supabase.co/auth/v1/callback
```

**Important**: Replace `itykmevgrmspufjklkmf` with your actual Supabase project ID.

### 1.3 Get OAuth Credentials
After creating the app, you'll get:
- **Client ID**: Copy this (e.g., `Iv1.a1b2c3d4e5f6g7h8`)
- **Client Secret**: Generate and copy this (keep it secure!)

## 📋 Step 2: Configure Supabase Authentication

### 2.1 Enable GitHub Provider
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/itykmevgrmspufjklkmf
2. Navigate to **Authentication** → **Providers**
3. Find **GitHub** in the list
4. Toggle it **ON**

### 2.2 Add GitHub OAuth Credentials
In the GitHub provider settings:
```
Client ID: [Your GitHub Client ID]
Client Secret: [Your GitHub Client Secret]
```

### 2.3 Configure Redirect URLs
In Supabase Authentication settings:
1. Go to **Authentication** → **URL Configuration**
2. Add your site URL: `https://ep.mk`
3. Add redirect URLs:
   - `https://ep.mk`
   - `https://ep.mk/auth/callback` (if you create a callback page)

## 📋 Step 3: Set Environment Variables

Make sure these are set in your Vercel dashboard:

```bash
VITE_SUPABASE_URL=https://itykmevgrmspufjklkmf.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 📋 Step 4: Test the Integration

### 4.1 Test GitHub OAuth
1. Go to https://ep.mk
2. Click **Sign In** in the sidebar
3. Click **GitHub** button
4. You should be redirected to GitHub for authorization
5. After authorization, you should be redirected back and signed in

### 4.2 Troubleshooting Common Issues

**Issue**: "OAuth app not found"
- **Fix**: Check that your GitHub OAuth app is created and active

**Issue**: "Redirect URI mismatch"
- **Fix**: Ensure callback URL in GitHub matches Supabase callback URL

**Issue**: "Invalid client"
- **Fix**: Verify Client ID and Secret are correctly entered in Supabase

**Issue**: "CORS error"
- **Fix**: Add your domain to Supabase URL configuration

## 🔧 Optional: Create Auth Callback Page

If you want a custom callback experience, create this file:

**File**: `auth/callback/index.html`
```html
<!DOCTYPE html>
<html>
<head>
    <title>Authentication - ToolFORGE</title>
    <script>
        // Handle auth callback and redirect
        window.location.href = '/';
    </script>
</head>
<body>
    <p>Completing authentication...</p>
</body>
</html>
```

## ✅ Verification Checklist

- [ ] GitHub OAuth app created
- [ ] Callback URL configured correctly
- [ ] Supabase GitHub provider enabled
- [ ] Client ID and Secret added to Supabase
- [ ] Environment variables set in Vercel
- [ ] Site URL configured in Supabase
- [ ] GitHub sign-in button works
- [ ] User can sign in with GitHub
- [ ] User profile is created after sign-in

## 🎯 Expected Result

After setup:
- ✅ GitHub button is clickable (no longer disabled)
- ✅ Clicking GitHub redirects to GitHub OAuth
- ✅ After authorization, user is signed in
- ✅ User profile is created in Supabase
- ✅ Authentication state persists across sessions

## 🆘 Still Having Issues?

### Check Browser Console
Look for errors like:
- CORS errors → Check Supabase URL configuration
- OAuth errors → Check GitHub app settings
- Network errors → Check environment variables

### Check Supabase Logs
1. Go to Supabase dashboard
2. Navigate to **Logs** → **Auth Logs**
3. Look for authentication attempts and errors

### Test Environment Variables
In browser console on https://ep.mk:
```javascript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Has Supabase Key:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
```

## 🎉 Success!

Once configured, users can:
- Sign in with GitHub in one click
- Have their GitHub profile info automatically imported
- Access all authenticated features
- Enjoy seamless OAuth experience

Your ToolFORGE platform now supports GitHub OAuth! 🚀