@echo off
REM Portfolio Quick Deploy Script
REM This script helps you deploy your portfolio to Vercel

echo ========================================
echo  Portfolio Quick Deploy to Vercel
echo ========================================
echo.

cd "Hrishabh RESUME  site\portfolio-site"

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
echo.

echo Step 1: Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Testing local build...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed! Please check for errors above.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Build completed successfully!
echo.

echo ========================================
echo  Ready to Deploy!
echo ========================================
echo.
echo Choose deployment method:
echo.
echo 1. Deploy to Vercel (Recommended - FREE)
echo 2. Test locally first
echo 3. Exit
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto deploy_vercel
if "%choice%"=="2" goto test_local
if "%choice%"=="3" goto end

echo Invalid choice
pause
exit /b 1

:deploy_vercel
echo.
echo Installing Vercel CLI...
call npm install -g vercel

echo.
echo Logging into Vercel (browser will open)...
call vercel login

echo.
echo Deploying to production...
call vercel --prod

echo.
echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your portfolio is now live!
echo Check the URL printed above.
echo.
goto end

:test_local
echo.
echo Starting local development server...
echo Open http://localhost:3000 in your browser
echo Press Ctrl+C to stop the server
echo.
call npm run dev

:end
echo.
echo Thank you for using the deployment script!
pause
