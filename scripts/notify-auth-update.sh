#!/bin/bash

# Discord Webhook Notification for Authentication System Implementation
# This script sends a detailed notification about the authentication system update

DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/1395450595405463593/px6cred4lMYc9Ta4ZMX_gp21eNr9iCeAgOmypD1MmekdfMpcE3eYvwoXY6ZIjV_BDMUA"

# Get current commit info
COMMIT_MESSAGE=$(git log -1 --pretty=%B | head -1)
COMMIT_AUTHOR=$(git log -1 --pretty=%an)
COMMIT_HASH=$(git log -1 --pretty=%h)
COMMIT_URL="https://github.com/KastienDevOp/Tool.io-Toolbox/commit/$(git log -1 --pretty=%H)"
CURRENT_BRANCH=$(git branch --show-current)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

echo "🔐 Sending Discord notification for Authentication System Implementation..."
echo "Commit: $COMMIT_MESSAGE"
echo "Author: $COMMIT_AUTHOR"
echo "Hash: $COMMIT_HASH"

# Send Discord notification with detailed authentication system info
curl -H "Content-Type: application/json" \
-d "{
  \"content\": \"🎉 **MAJOR UPDATE: Complete Authentication System Implemented!**\",
  \"embeds\": [{
    \"title\": \"🔐 Authentication System Implementation Complete\",
    \"description\": \"ToolFORGE now has a complete, production-ready authentication system with Supabase integration!\",
    \"url\": \"https://ep.mk\",
    \"color\": 5763719,
    \"fields\": [
      {
        \"name\": \"✨ New Features\",
        \"value\": \"• Email/Password Authentication\\n• GitHub OAuth Integration\\n• User Profile Management\\n• Session Persistence\\n• JWT Token Management\\n• Row Level Security\",
        \"inline\": false
      },
      {
        \"name\": \"🛠️ Technical Stack\",
        \"value\": \"• **Backend**: Supabase\\n• **Auth**: JWT + OAuth\\n• **Frontend**: React + TypeScript\\n• **Security**: RLS Policies\",
        \"inline\": true
      },
      {
        \"name\": \"📁 Files Added\",
        \"value\": \"• Authentication Service\\n• Auth Context Provider\\n• Auth Modal Component\\n• Database Schema\\n• Setup Documentation\",
        \"inline\": true
      },
      {
        \"name\": \"🚀 Ready for Production\",
        \"value\": \"The authentication system is fully functional with:\\n• Secure user registration & login\\n• Password reset functionality\\n• OAuth provider support\\n• Complete setup documentation\",
        \"inline\": false
      },
      {
        \"name\": \"📝 Latest Commit\",
        \"value\": \"\`\`\`$COMMIT_MESSAGE\`\`\`\",
        \"inline\": false
      },
      {
        \"name\": \"👤 Developer\",
        \"value\": \"$COMMIT_AUTHOR\",
        \"inline\": true
      },
      {
        \"name\": \"🔗 Commit\",
        \"value\": \"[\`$COMMIT_HASH\`]($COMMIT_URL)\",
        \"inline\": true
      },
      {
        \"name\": \"🌿 Branch\",
        \"value\": \"$CURRENT_BRANCH\",
        \"inline\": true
      },
      {
        \"name\": \"🌐 Test the Authentication\",
        \"value\": \"[🔗 Try it now on ToolFORGE Platform](https://ep.mk)\\n\\n*Click 'Sign In' in the sidebar to test the new authentication system!*\",
        \"inline\": false
      }
    ],
    \"footer\": {
      \"text\": \"ToolFORGE Platform • Authentication System v1.0 • Live at ep.mk\",
      \"icon_url\": \"https://supabase.com/favicon.ico\"
    },
    \"timestamp\": \"$TIMESTAMP\"
  }]
}" \
$DISCORD_WEBHOOK_URL

echo ""
echo "✅ Discord notification sent successfully!"
echo "🔐 Authentication system update has been announced to the team!"