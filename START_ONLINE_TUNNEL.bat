@echo off
title PetEmbro Shareable Tunnel
echo ===================================================
echo   Starting PetEmbro Shareable HTTPS Tunnel...
echo   (Make sure START_LOCAL_SERVER is running too)
echo ===================================================
echo.
.\cloudflared.exe tunnel --url http://127.0.0.1:5173
pause
