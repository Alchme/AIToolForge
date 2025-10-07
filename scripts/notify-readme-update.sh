#!/bin/bash

# Discord Webhook Notification for Amazing README Update
# This script sends a notification about the comprehensive README documentation

DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/1395450595405463593/px6cred4lMYc9Ta4ZMX_gp21eNr9iCeAgOmypD1MmekdfMpcE3eYvwoXY6ZIjV_BDMUA"

# Get current commit info
COMMIT_MESSAGE=$(git log -1 --pretty=%B | head -1)
COMMIT_AUTHOR=$(git log -1 --pretty=%an)
COMMIT_HASH=$(git log -1 --pretty=%h)
COMMIT_URL="https://github.com/KastienDevOp/Tool.io-Toolbox/commit/$(git log -1 --pretty=%H)"
CURRENT_BRANCH=$(git branch --show-current)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

echo "📚 Sending Discord notification for Amazing README Update..."
echo "Commit: $COMMIT_MESSAGE"
echo "Author: $COMMIT_AUTHOR"
echo "Hash: $COMMIT_HASH"

# Send Discord notification with detailed README info
curl -H "Content-Type: application/json" \
-d "{
  \"content\": \"📚 **AMAZING README UPDATE: Complete Documentation Overhaul!**\",
  \"embeds\": [{
    \"title\": \"📚 Comprehensive README Documentation Complete!\",
    \"description\": \"ToolFORGE now has an absolutely stunning, detailed README that showcases everything about our platform!\",
    \"url\": \"https://github.com/KastienDevOp/Tool.io-Toolbox#readme\",
    \"color\": 3066993,
    \"fields\": [
      {
        \"name\": \"✨ What's New in the README\",
        \"value\": \"• **Beautiful Design** with emojis, badges, and professional layout\\n• **Complete Tool Catalog** - All 50+ tools documented\\n• **Setup Guides** for every feature and integration\\n• **Architecture Deep Dive** - Technical details\\n• **Contribution Guidelines** - How to get involved\\n• **Community & Support** - All the ways to connect\",
        \"inline\": false
      },
      {
        \"name\": \"🧰 Tool Categories Covered\",
        \"value\": \"• **Converters** (10 tools)\\n• **Data & Analytics** (10 tools)\\n• **Developer Essentials** (10 tools)\\n• **Financial Calculators** (10 tools)\\n• **Image & Media** (10 tools)\\n• **Productivity** (10 tools)\\n• **Text & Content** (10 tools)\",
        \"inline\": true
      },
      {
        \"name\": \"🚀 Key Highlights\",
        \"value\": \"• **AI-Powered Features** prominently showcased\\n• **Authentication System** fully documented\\n• **Multiple Deployment Options** explained\\n• **Security & Privacy** details included\\n• **Performance Metrics** and analytics\\n• **Community Guidelines** for contributors\",
        \"inline\": true
      },
      {
        \"name\": \"🎯 Perfect For\",
        \"value\": \"• **New Users** - Easy onboarding and feature discovery\\n• **Developers** - Technical details and contribution guides\\n• **Contributors** - Clear guidelines and project structure\\n• **Investors/Partners** - Professional presentation\\n• **Community** - Support channels and engagement\",
        \"inline\": false
      },
      {
        \"name\": \"📖 Documentation Sections\",
        \"value\": \"• Welcome & Introduction\\n• Feature Deep Dive\\n• Getting Started Guide\\n• Configuration & Setup\\n• Architecture & Tech Stack\\n• Deployment Options\\n• Contributing Guidelines\\n• Security & Privacy\\n• Community & Support\",
        \"inline\": false
      },
      {
        \"name\": \"📝 Latest Commit\",
        \"value\": \"\`\`\`$COMMIT_MESSAGE\`\`\`\",
        \"inline\": false
      },
      {
        \"name\": \"👤 Documentation Author\",
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
        \"name\": \"📚 Read the Amazing README\",
        \"value\": \"[🔗 View Complete Documentation](https://github.com/KastienDevOp/Tool.io-Toolbox#readme)\\n\\n*This README is a masterpiece - warm, inviting, comprehensive, and professional!*\",
        \"inline\": false
      }
    ],
    \"footer\": {
      \"text\": \"ToolFORGE Platform • Complete Documentation • github.com/KastienDevOp/Tool.io-Toolbox\",
      \"icon_url\": \"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png\"
    },
    \"timestamp\": \"$TIMESTAMP\"
  }]
}" \
$DISCORD_WEBHOOK_URL

echo ""
echo "✅ Discord notification sent successfully!"
echo "📚 Amazing README update has been announced to the team!"