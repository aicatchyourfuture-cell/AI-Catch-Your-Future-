#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push

# Mirror to GitHub after every Replit merge/publish.
# Replit is the single source of truth — force-push keeps GitHub in sync.
# Token is passed via http.extraheader (ephemeral, never stored in .git/config).
# Push failure exits non-zero so the post-merge is visibly broken, not silent.
if [ -n "$GITHUB_TOKEN" ] && [ -n "$GH_REPO" ]; then
  echo "Mirroring to GitHub: $GH_REPO"
  ENCODED_TOKEN="$(printf 'x-access-token:%s' "$GITHUB_TOKEN" | base64 -w0)"
  git \
    -c "credential.helper=" \
    -c "http.extraheader=Authorization: Basic ${ENCODED_TOKEN}" \
    push --force "https://github.com/${GH_REPO}.git" HEAD:main
  echo "GitHub mirror complete."
else
  echo "Skipping GitHub mirror (GITHUB_TOKEN or GH_REPO not set)."
fi
