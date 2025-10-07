#!/bin/bash

# Test Discord Webhook Script for ToolFORGE Platform
# This script tests the Discord webhook with a sample notification

DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/1395450595405463593/px6cred4lMYc9Ta4ZMX_gp21eNr9iCeAgOmypD1MmekdfMpcE3eYvwoXY6ZIjV_BDMUA"

# Get current commit info
COMMIT_MESSAGE=$(git log -1 --pretty=%B | head -1)
COMMIT_AUTHOR=$(git log -1 --pretty=%an)
COMMIT_HASH=$(git log -1 --pretty=%h)
COMMIT_URL="https://github.com/KastienDevOp/Tool.io-Toolbox/commit/$(git log -1 --pretty=%H)"
CURRENT_BRANCH=$(git branch --show-current)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

echo "🚀 Testing Discord webhook notification..."
echo "Commit: $COMMIT_MESSAGE"
echo "Author: $COMMIT_AUTHOR"
echo "Hash: $COMMIT_HASH"

# Send Discord notification
curl -H "Content-Type: application/json" \
-d "{
  \"content\": \"\",
  \"embeds\": [{
    \"title\": \"🚀 ToolFORGE Platform Update\",
    \"description\": \"New changes have been pushed to the repository!\",
    \"url\": \"https://ep.mk\",
    \"color\": 3447003,
    \"fields\": [
      {
        \"name\": \"📝 Commit Message\",
        \"value\": \"\`\`\`$COMMIT_MESSAGE\`\`\`\",
        \"inline\": false
      },
      {
        \"name\": \"👤 Author\",
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
        \"name\": \"🌐 Live Site\",
        \"value\": \"[🔗 Visit ToolFORGE Platform](https://ep.mk)\",
        \"inline\": false
      }
    ],
    \"footer\": {
      \"text\": \"ToolFORGE Platform • Live at ep.mk\",
      \"icon_url\": \"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png\"
    },
    \"timestamp\": \"$TIMESTAMP\"
  }]
}" \
$DISCORD_WEBHOOK_URL

echo ""
echo "✅ Discord notification sent!"