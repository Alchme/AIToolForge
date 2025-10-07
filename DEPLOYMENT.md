# Vercel Deployment Guide for ToolFORGE

## Quick Setup Commands

After setting up your GitHub repository, run these commands:

```bash
# Set the correct branch name
git branch -M main

# Add your GitHub repository as origin (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/Tool.io-Toolbox.git

# Push to GitHub
git push -u origin main
```

## Vercel Environment Variables Setup

When you deploy on Vercel, make sure to add these environment variables in your Vercel project settings:

1. Go to your Vercel dashboard
2. Select your ToolFORGE project
3. Go to Settings > Environment Variables
4. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `GEMINI_API_KEY` | Your actual Gemini API key | Production, Preview, Development |

## Build Configuration

The project is already configured for Vercel with:

- `vercel.json` - Vercel deployment configuration
- `package.json` - Correct build scripts
- `vite.config.ts` - Environment variable handling

## Troubleshooting

### Common Issues:

1. **Build fails with "API_KEY not found"**
   - Make sure you've added `GEMINI_API_KEY` in Vercel environment variables
   - Ensure the variable is available for all environments

2. **404 on page refresh**
   - This is handled by the `vercel.json` configuration for SPA routing

3. **Environment variables not working**
   - Check that variable names match exactly: `GEMINI_API_KEY`
   - Redeploy after adding environment variables

## Post-Deployment Checklist

- [ ] Repository is private on GitHub
- [ ] Environment variables are set in Vercel
- [ ] Build completes successfully
- [ ] App loads and tools work correctly
- [ ] API calls to Gemini are functioning
- [ ] No sensitive data in public repository

## Custom Domain (Optional)

To add a custom domain:
1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions