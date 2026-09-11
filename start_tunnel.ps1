Set-Location -Path $PSScriptRoot

# Stop any previous tunnel instances
Get-Process cloudflared -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Remove-Item -Force tunnel.log -ErrorAction SilentlyContinue
Remove-Item -Force CURRENT_TUNNEL_URL.txt -ErrorAction SilentlyContinue

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  Starting PetEmbro Shareable HTTPS Tunnel...           " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Connecting to Cloudflare, generating link..." -ForegroundColor Yellow

$proc = Start-Process -FilePath ".\cloudflared.exe" -ArgumentList "tunnel --url http://127.0.0.1:5173 --http-host-header localhost:5173 --logfile tunnel.log" -PassThru -WindowStyle Hidden

$url = $null
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    if (Test-Path "tunnel.log") {
        $match = Select-String -Path "tunnel.log" -Pattern "https://[a-zA-Z0-9-]+\.trycloudflare\.com" | Select-Object -First 1
        if ($match) {
            $url = $match.Matches[0].Value
            break
        }
    }
}

if ($url) {
    $editorUrl = "$url/customizer.html"
    Set-Content -Path "CURRENT_TUNNEL_URL.txt" -Value $editorUrl
    try { Set-Clipboard -Value $editorUrl } catch {}

    Write-Host ""
    Write-Host "=========================================================" -ForegroundColor Green
    Write-Host " [SUCCESS] TUNNEL IS LIVE AND READY!" -ForegroundColor Green
    Write-Host "=========================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host " Open this link on your phone or send to your partner:" -ForegroundColor White
    Write-Host ""
    Write-Host "   $editorUrl" -ForegroundColor Yellow -BackgroundColor Black
    Write-Host ""
    Write-Host " (The link was also automatically copied to your clipboard!)" -ForegroundColor Gray
    Write-Host " (Also saved to CURRENT_TUNNEL_URL.txt in this folder)" -ForegroundColor Gray
    Write-Host ""
    Write-Host " Note: If phone shows 1033 on first second, wait 10 seconds for DNS to finish warming up and refresh." -ForegroundColor Cyan
    Write-Host " KEEP THIS WINDOW OPEN while editing." -ForegroundColor White
    Write-Host " Close this window when done." -ForegroundColor Gray
    Write-Host "=========================================================" -ForegroundColor Green

    try {
        Wait-Process -Id $proc.Id
    } finally {
        Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    }
} else {
    Write-Host ""
    Write-Host "[ERROR] Could not start Cloudflare tunnel. Check tunnel.log for details." -ForegroundColor Red
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
