@echo off
title PetEmbro Local Server
echo ===================================================
echo   Starting PetEmbro Local Network Server...
echo ===================================================
echo.
echo   Local Editor URL:   http://localhost:5173/customizer.html
echo   Local Website URL:  http://localhost:5173/
echo.
echo   Press Ctrl+C anytime to stop.
echo ===================================================
echo.
call npm.cmd run dev
pause
