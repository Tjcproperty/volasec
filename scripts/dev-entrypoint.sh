#!/usr/bin/env sh

set -eu

LOCKFILE_PATH="package-lock.json"
LOCKFILE_HASH_FILE="node_modules/.package-lock.sha256"

compute_lockfile_hash() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$LOCKFILE_PATH" | awk '{print $1}'
    return
  fi

  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$LOCKFILE_PATH" | awk '{print $1}'
    return
  fi

  echo ""
}

ensure_dependencies() {
  if [ ! -f "$LOCKFILE_PATH" ]; then
    echo "[frontend] package-lock.json not found; skipping dependency check"
    return
  fi

  CURRENT_HASH="$(compute_lockfile_hash)"
  PREVIOUS_HASH=""

  if [ -f "$LOCKFILE_HASH_FILE" ]; then
    PREVIOUS_HASH="$(cat "$LOCKFILE_HASH_FILE")"
  fi

  if [ ! -d node_modules ] || [ "$CURRENT_HASH" = "" ] || [ "$CURRENT_HASH" != "$PREVIOUS_HASH" ]; then
    echo "[frontend] Installing dependencies with npm ci"
    npm ci

    if [ "$CURRENT_HASH" != "" ]; then
      mkdir -p "$(dirname "$LOCKFILE_HASH_FILE")"
      echo "$CURRENT_HASH" > "$LOCKFILE_HASH_FILE"
    fi
  else
    echo "[frontend] Dependencies already up to date"
  fi
}

ensure_dependencies

exec npm run dev -- --host 0.0.0.0 --port 3000
