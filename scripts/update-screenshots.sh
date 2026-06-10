#!/usr/bin/env bash
# update-screenshots.sh
#
# Retakes the README screenshots from the running dev preview and saves them
# to assets/. Run this whenever the site's visual design changes significantly.
#
# Requirements:
#   - Both dev servers must be running (pnpm --filter @workspace/catch-future run dev
#     and pnpm --filter @workspace/api-server run dev), OR the published app must be live.
#   - `shot-scraper` installed:  pip install shot-scraper && shot-scraper install
#   - OR: manually replace assets/screenshot-hero.jpg and assets/screenshot-form.jpg
#     using any browser screenshot tool and commit the new files.
#
# Usage (local dev, both servers running on default ports):
#   bash scripts/update-screenshots.sh
#
# Usage (against the published production URL):
#   BASE_URL=https://your-app.replit.app bash scripts/update-screenshots.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ASSETS_DIR="$REPO_ROOT/assets"

BASE_URL="${BASE_URL:-http://localhost:80}"

echo "Taking screenshots from: $BASE_URL"
echo "Saving to: $ASSETS_DIR"

# ── Check for shot-scraper ────────────────────────────────────────────────────
if ! command -v shot-scraper &>/dev/null; then
  echo ""
  echo "shot-scraper is not installed. Install it with:"
  echo "  pip install shot-scraper && shot-scraper install"
  echo ""
  echo "Alternatively, open the following URLs in a browser, take screenshots"
  echo "at 1280x720, and save them as:"
  echo "  $ASSETS_DIR/screenshot-hero.jpg   →  $BASE_URL/"
  echo "  $ASSETS_DIR/screenshot-form.jpg   →  $BASE_URL/admin/login"
  exit 1
fi

# ── Hero section ─────────────────────────────────────────────────────────────
shot-scraper \
  --width 1280 --height 720 \
  --output "$ASSETS_DIR/screenshot-hero.jpg" \
  "$BASE_URL/"
echo "✓ screenshot-hero.jpg"

# ── Admin login form ─────────────────────────────────────────────────────────
shot-scraper \
  --width 1280 --height 720 \
  --output "$ASSETS_DIR/screenshot-form.jpg" \
  "$BASE_URL/admin/login"
echo "✓ screenshot-form.jpg"

echo ""
echo "Done. Review the new screenshots, then commit:"
echo "  git add assets/screenshot-hero.jpg assets/screenshot-form.jpg"
echo '  git commit -m "chore: refresh README screenshots"'
