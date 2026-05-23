@echo off
REM ==========================================================
REM Setup + jalankan dev server untuk Windows
REM Otomatis cek Node version, install dependencies, npm run dev
REM ==========================================================

cd /d "%~dp0"

echo ==^> Project Management - Setup ^& Run
echo.

REM 1. Cek Node
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js tidak ditemukan.
    echo Install dulu: https://nodejs.org/ ^(versi 20+^)
    pause
    exit /b 1
)

for /f "tokens=1 delims=." %%a in ('node -v') do set NODE_RAW=%%a
set NODE_MAJOR=%NODE_RAW:v=%

if %NODE_MAJOR% LSS 20 (
    echo [ERROR] Butuh Node.js ^>= 20.
    node -v
    echo Install Node 20+ dari https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node
node -v
echo.

REM 2. Install deps kalau belum ada
if not exist "node_modules" (
    echo ==^> node_modules belum ada, menjalankan npm install...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install gagal.
        pause
        exit /b 1
    )
    echo.
)

REM 3. Setup .env.local kalau belum ada
if not exist ".env.local" (
    if exist ".env.example" (
        echo ==^> Copy .env.example -^> .env.local
        copy ".env.example" ".env.local" >nul
        echo [INFO] Edit .env.local untuk set NEXT_PUBLIC_API_URL kalau sudah ada backend.
        echo.
    )
)

REM 4. Jalankan dev server
echo ==^> Menjalankan dev server di http://localhost:3000
echo.
call npm run dev
