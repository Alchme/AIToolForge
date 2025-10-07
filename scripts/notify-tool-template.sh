#!/bin/bash

# Discord Webhook Notification for Tool Template Guide
# This script sends a notification about the comprehensive tool development guide

DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/1395450595405463593/px6cred4lMYc9Ta4ZMX_gp21eNr9iCeAgOmypD1MmekdfMpcE3eYvwoXY6ZIjV_BDMUA"

# Get current commit info
COMMIT_MESSAGE=$(git log -1 --pretty=%B | head -1)
COMMIT_AUTHOR=$(git log -1 --pretty=%an)
COMMIT_HASH=$(git log -1 --pretty=%h)
COMMIT_URL="https://github.com/KastienDevOp/Tool.io-Toolbox/commit/$(git log -1 --pretty=%H)"
CURRENT_BRANCH=$(git branch --show-current)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

echo "🛠️ Sending Discord notification for Tool Template Guide..."
echo "Commit: $COMMIT_MESSAGE"
echo "Author: $COMMIT_AUTHOR"
echo "Hash: $COMMIT_HASH"

# Send Discord notification with detailed tool template info
curl -H "Content-Type: application/json" \
-d "{
  \"content\": \"🛠️ **NEW CONTRIBUTOR RESOURCE: Complete Tool Development Guide!**\",
  \"embeds\": [{
    \"title\": \"🛠️ Comprehensive Tool Development Template & Guide\",
    \"description\": \"We've created an amazing resource to help contributors build high-quality tools for ToolFORGE!\",
    \"url\": \"https://github.com/KastienDevOp/Tool.io-Toolbox/blob/main/TOOL_TEMPLATE.md\",
    \"color\": 15844367,
    \"fields\": [
      {
        \"name\": \"🎯 What's Included\",
        \"value\": \"• **Complete TypeScript Template** - Ready-to-use React component\\n• **7 Tool Categories** - Converters, Data, Developer, Finance, Image, Productivity, Text\\n• **UI Guidelines** - Consistent styling and components\\n• **Advanced Features** - File upload, download, persistence\\n• **Best Practices** - Performance, UX, accessibility\\n• **Testing Guide** - Manual and unit testing approaches\",
        \"inline\": false
      },
      {
        \"name\": \"📚 Key Sections\",
        \"value\": \"• **Tool Categories & Structure**\\n• **Complete Code Template**\\n• **UI Components & Styling**\\n• **Advanced Features**\\n• **Best Practices**\\n• **Testing Guidelines**\\n• **Documentation Standards**\\n• **Submission Process**\",
        \"inline\": true
      },
      {
        \"name\": \"🚀 Benefits for Contributors\",
        \"value\": \"• **Faster Development** - Proven patterns\\n• **Consistent Quality** - Standardized approach\\n• **Better UX** - Professional UI guidelines\\n• **Easy Review** - Clear expectations\\n• **Community Support** - Help channels included\",
        \"inline\": true
      },
      {
        \"name\": \"🎨 Features Covered\",
        \"value\": \"• **React + TypeScript** template with hooks\\n• **Error Handling** and loading states\\n• **Copy/Paste** functionality\\n• **File Upload/Download** support\\n• **Local Storage** persistence\\n• **Mobile Responsive** design\\n• **Accessibility** best practices\\n• **Performance** optimization\",
        \"inline\": false
      },
      {
        \"name\": \"🧰 Tool Categories\",
        \"value\": \"• **🔄 Converters** - Data transformation\\n• **📊 Data & Analytics** - Processing & visualization\\n• **💻 Developer Tools** - Programming utilities\\n• **💰 Finance Tools** - Calculators & planners\\n• **🖼️ Image & Media** - Processing & editing\\n• **📝 Productivity** - Organization & efficiency\\n• **📚 Text & Content** - Writing & analysis\",
        \"inline\": false
      },
      {
        \"name\": \"📝 Latest Commit\",
        \"value\": \"\`\`\`$COMMIT_MESSAGE\`\`\`\",
        \"inline\": false
      },
      {
        \"name\": \"👤 Guide Author\",
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
        \"name\": \"📖 Read the Complete Guide\",
        \"value\": \"[🔗 View Tool Development Template](https://github.com/KastienDevOp/Tool.io-Toolbox/blob/main/TOOL_TEMPLATE.md)\\n\\n*Everything you need to create amazing tools for ToolFORGE!*\",
        \"inline\": false
      }
    ],
    \"footer\": {
      \"text\": \"ToolFORGE Platform • Tool Development Guide • Ready for Contributors!\",
      \"icon_url\": \"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png\"
    },
    \"timestamp\": \"$TIMESTAMP\"
  }]
}" \
$DISCORD_WEBHOOK_URL

echo ""
echo "✅ Discord notification sent successfully!"
echo "🛠️ Tool development guide has been announced to the community!"