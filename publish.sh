#!/bin/bash
set -e
VAULT_BLOG="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Lillbuddy's Vault/11_Lillbuddy's Blog"
cd "$HOME/Projects/blog"

echo "📂 從 Obsidian 同步文章..."
rsync -a --delete --exclude '.DS_Store' --exclude '.obsidian' "$VAULT_BLOG/" content/

git add -A
if git diff --cached --quiet; then
  echo "沒有新的變更，不需要上傳。"
  exit 0
fi
git commit -m "Publish: $(date '+%Y-%m-%d %H:%M')"
git push
echo "✅ 已上傳！1～2 分鐘後網站會更新：https://lillbuddy.github.io/blog/"
