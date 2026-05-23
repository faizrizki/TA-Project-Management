#!/usr/bin/env bash
#
# Setup + jalankan dev server untuk Linux / Mac
# Otomatis cek Node version, install dependencies, lalu npm run dev
#

set -e

cd "$(dirname "$0")"

echo "==> Project Management — Setup & Run"
echo ""

# 1. Cek Node
if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js tidak ditemukan."
  echo "Install dulu: https://nodejs.org/ (versi 20+) atau pakai nvm."
  exit 1
fi

NODE_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1)

if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "[ERROR] Butuh Node.js >= 20. Versi sekarang: $(node -v)"

  if command -v nvm >/dev/null 2>&1; then
    echo "Coba: nvm use 20"
  else
    # try sourcing nvm
    if [ -s "$HOME/.nvm/nvm.sh" ]; then
      echo "Menjalankan nvm use 20..."
      export NVM_DIR="$HOME/.nvm"
      \. "$NVM_DIR/nvm.sh"
      nvm use 20 || { echo "Gagal switch ke Node 20. Jalankan 'nvm install 20' dulu."; exit 1; }
    else
      echo "Install nvm dulu: https://github.com/nvm-sh/nvm"
      exit 1
    fi
  fi
fi

echo "[OK] Node $(node -v)"
echo ""

# 2. Install deps kalau belum ada
if [ ! -d "node_modules" ]; then
  echo "==> node_modules belum ada, menjalankan npm install..."
  npm install
  echo ""
fi

# 3. Setup .env.local kalau belum ada
if [ ! -f ".env.local" ] && [ -f ".env.example" ]; then
  echo "==> Copy .env.example -> .env.local"
  cp .env.example .env.local
  echo "[INFO] Edit .env.local untuk set NEXT_PUBLIC_API_URL kalau sudah ada backend."
  echo ""
fi

# 4. Jalankan dev server
echo "==> Menjalankan dev server di http://localhost:3000"
echo ""
npm run dev
