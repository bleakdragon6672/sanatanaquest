#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# SanatanaQuest — portable dev server launcher.
#
# Works whether you have bun, npm, or only node installed.
# Usage:
#   ./dev.sh              # auto-detect best runtime (default port 3000)
#   ./dev.sh 3001         # use a custom port
#   PORT=4000 ./dev.sh    # alternative way to set port
#
# If "bun: command not found" appears in your terminal, this script
# automatically falls back to npm. You can also force the runtime:
#   RUNTIME=npm ./dev.sh
#   RUNTIME=bun ./dev.sh
# ─────────────────────────────────────────────────────────────────────
set -e

PORT="${1:-${PORT:-3000}}"
RUNTIME="${RUNTIME:-auto}"

# Move to project root (script is in project root, but be safe)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Detect runtime
if [ "$RUNTIME" = "auto" ]; then
  if command -v bun >/dev/null 2>&1; then
    RUNTIME="bun"
  elif command -v npm >/dev/null 2>&1; then
    RUNTIME="npm"
  else
    echo "❌ Neither 'bun' nor 'npm' found in PATH."
    echo "   Install one of them:"
    echo "     • Bun:  curl -fsSL https://bun.sh/install | bash"
    echo "     • Node: https://nodejs.org/"
    exit 1
  fi
fi

# Ensure node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 node_modules missing — installing dependencies with $RUNTIME..."
  if [ "$RUNTIME" = "bun" ]; then
    bun install
  else
    npm install
  fi
fi

# Ensure db directory exists (SQLite target)
mkdir -p db

# Launch the dev server
echo "🚀 Starting SanatanaQuest dev server on port $PORT via $RUNTIME..."
echo "   → http://localhost:$PORT"
echo "   Press Ctrl+C to stop."
echo ""

if [ "$RUNTIME" = "bun" ]; then
  exec bun run dev -- -p "$PORT" 2>&1 | tee dev.log
else
  exec npm run dev -- -p "$PORT" 2>&1 | tee dev.log
fi
