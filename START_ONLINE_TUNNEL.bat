@echo off
title PetEmbro Shareable Tunnel
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start_tunnel.ps1"
pause
