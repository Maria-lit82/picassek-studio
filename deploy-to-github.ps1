# Script to deploy to GitHub
Write-Host "Starting GitHub preparation..." -ForegroundColor Cyan

if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not installed." -ForegroundColor Red
    exit
}

if (!(Test-Path .git)) {
    git init
    Write-Host "Local repository initialized." -ForegroundColor Green
}

git add .
Write-Host "Files added to index." -ForegroundColor Green

git commit -m "Initial commit with PostgreSQL and Timeweb ready settings"
Write-Host "Commit created." -ForegroundColor Green

$githubUrl = Read-Host "Please paste your GitHub repository URL (e.g., https://github.com/user/repo.git)"

if ([string]::IsNullOrWhiteSpace($githubUrl)) {
    Write-Host "Error: URL cannot be empty." -ForegroundColor Red
    exit
}

git remote remove origin 2>$null
git remote add origin $githubUrl
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Success! Project uploaded to GitHub." -ForegroundColor Green
    Write-Host "Now you can connect it to Timeweb Cloud App Platform." -ForegroundColor Cyan
} else {
    Write-Host "Error during upload. Check your GitHub access." -ForegroundColor Red
}
