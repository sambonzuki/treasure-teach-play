#!/bin/bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "=== Starting treasure-teach-play deployment ==="

export GIT_SSH_COMMAND="ssh -i /home/ubuntu/.ssh/treasure-teach-play-deploy -o StrictHostKeyChecking=accept-new"
git pull origin main

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
bun install
NITRO_PRESET=node-server bun run build

sudo systemctl restart treasure-teach-play

echo "=== Deployment complete ==="
