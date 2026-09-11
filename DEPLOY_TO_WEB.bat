@echo off
title Deploy PetEmbro to petembro.ca
echo ===================================================
echo   Building and Deploying to petembro.ca...
echo ===================================================
echo.
call npm.cmd run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build failed! Check errors above.
    pause
    exit /b %ERRORLEVEL%
)
echo.
echo Publishing to GitHub Pages...
call npx.cmd gh-pages -d dist
echo.
echo Saving content changes to Git main branch...
git add src/data/siteContent.json
git commit -m "Update site content from visual editor"
git push origin main
echo.
echo ===================================================
echo   Successfully published to https://petembro.ca!
echo ===================================================
pause
