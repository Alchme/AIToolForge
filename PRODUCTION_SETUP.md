# 🚀 Production Setup Guide for ToolFORGE

This guide helps you deploy ToolFORGE to production and fix common deployment issues.

## 🌐 Vercel Environment Variables Setup

### 1. Set Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your ToolFORGE project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

```bash
# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration  
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Get Your Supabase Credentials

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use as `VITE_SUPABASE_URL`
   - **anon public** key → Use as `VITE_SUPABASE_ANON_KEY`

### 3. Get Your Gemini API Key

1. Go to Google AI Studio: https://aistudio.google.com/app/apikey
2. Create a new API key
3. Copy the key → Use as `VITE_GEMINI_API_KEY`

## 🔧 Common Production Issues & Fixes

### Issue 1: Supabase CORS Errors
**Error**: `Cross-Origin Request Blocked: placeholder.supabase.co`

**Fix**: Set proper environment variables in Vercel (see above)

### Issue 2: QR Code Library MIME Type Error
**Error**: `MIME type mismatch for qrcode.min.js`

**Fix**: ✅ Already fixed - Updated to use unpkg CDN instead of jsdelivr

### Issue 3: Tailwind CDN Warning
**Warning**: `cdn.tailwindcss.com should not be used in production`

**Fix**: This is a warning, not an error. The app works fine, but for better performance you can:
1. Install Tailwind CSS locally
2. Use PostCSS plugin
3. Or ignore the warning (app still works)

## 🚀 Deployment Steps

### 1. Push to Main Branch
```bash
git checkout main
git add .
git commit -m "🚀 Production fixes"
git push origin main
```

### 2. Vercel Auto-Deploy
- Vercel automatically deploys when you push to main
- Check deployment status in Vercel dashboard

### 3. Set Environment Variables
- Add all environment variables in Vercel dashboard
- Redeploy if needed

### 4. Test Production
1. Visit your live site (e.g., https://ep.mk)
2. Test tool usage tracking
3. Test authentication (if configured)
4. Verify no console errors

## ✅ Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Supabase database schema deployed
- [ ] Database policies updated for global usage
- [ ] Custom domain configured (ep.mk)
- [ ] SSL certificate active
- [ ] No console errors
- [ ] Tool usage tracking working
- [ ] All tools loading properly

## 🔍 Troubleshooting

### Check Environment Variables
```javascript
// In browser console
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Has Gemini Key:', !!import.meta.env.VITE_GEMINI_API_KEY)
```

### Common Solutions
1. **Environment variables not working**: Redeploy after setting them
2. **Database errors**: Run the database schema in Supabase
3. **CORS errors**: Check Supabase URL is correct
4. **Tool usage not tracking**: Update database policies

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify environment variables are set
4. Ensure database schema is deployed

## 🎉 Success!

Once everything is set up:
- ✅ ToolFORGE runs smoothly in production
- ✅ Real-time usage tracking works
- ✅ All tools function properly
- ✅ Global usage statistics are live
- ✅ Authentication works (if configured)

Your ToolFORGE platform is ready for users! 🚀