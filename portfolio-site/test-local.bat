@echo off
REM Quick Start - Test Portfolio Locally
REM Run this to test your portfolio before deploying

echo ========================================
echo  Portfolio Local Test
echo ========================================
echo.

cd "Hrishabh RESUME  site\portfolio-site"

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

echo.
echo Starting development server...
echo.
echo Open your browser and go to:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
