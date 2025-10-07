# Discord Webhook Setup for ToolFORGE Platform

This document explains how to set up Discord notifications for GitHub commits on the ToolFORGE platform.

## 🚀 Features

- **Automatic Notifications**: Get notified in Discord whenever code is pushed to the main branch
- **Rich Embeds**: Beautiful formatted messages with commit details
- **Commit Information**: Shows commit message, author, hash, and direct GitHub links
- **Branch Information**: Displays which branch was updated

## 📋 Setup Instructions

### 1. GitHub Secret Configuration

You need to add the Discord webhook URL as a GitHub secret:

1. Go to your GitHub repository: `https://github.com/KastienDevOp/Tool.io-Toolbox`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `DISCORD_WEBHOOK_URL`
6. Value: `https://discord.com/api/webhooks/1395450595405463593/px6cred4lMYc9Ta4ZMX_gp21eNr9iCeAgOmypD1MmekdfMpcE3eYvwoXY6ZIjV_BDMUA`
7. Click **Add secret**

### 2. GitHub Actions Workflow

The workflow file `.github/workflows/discord-notify.yml` is already created and will:

- Trigger on pushes to the main branch
- Extract commit information
- Send a formatted Discord notification
- Include commit message, author, hash, and GitHub link

### 3. Testing

You can test the webhook manually using the provided script:

```bash
./scripts/test-discord-webhook.sh
```

## 🎨 Notification Format

The Discord notifications will include:

- **🚀 Title**: "ToolFORGE Platform Update"
- **📝 Commit Message**: The first line of your commit message
- **👤 Author**: Who made the commit
- **🔗 Commit Hash**: Clickable link to the commit on GitHub
- **🌿 Branch**: Which branch was updated
- **⏰ Timestamp**: When the commit was made

## 🔧 Customization

You can customize the notification format by editing the `.github/workflows/discord-notify.yml` file:

- Change the embed color (currently blue: `3447003`)
- Modify the title and description
- Add or remove fields
- Change the footer text or icon

## 🛠️ Troubleshooting

If notifications aren't working:

1. Check that the `DISCORD_WEBHOOK_URL` secret is properly set in GitHub
2. Verify the webhook URL is still valid in Discord
3. Check the GitHub Actions tab for any workflow errors
4. Test the webhook manually using the test script

## 📱 Discord Channel Setup

Make sure your Discord webhook is configured in the right channel:

1. Go to your Discord server
2. Right-click on the channel where you want notifications
3. Select **Edit Channel** → **Integrations** → **Webhooks**
4. The webhook URL should match the one in your GitHub secrets

## 🎯 Next Steps

After setup, every push to the main branch will automatically send a notification to your Discord channel with all the commit details!