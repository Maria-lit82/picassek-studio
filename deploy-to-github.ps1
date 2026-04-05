# Скрипт деплоя в GitHub для Picassek Studio

Write-Host "🚀 Начинаем подготовку к загрузке в GitHub..." -ForegroundColor Cyan

# Проверка наличия Git
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Ошибка: Git не установлен. Пожалуйста, установите Git с git-scm.com" -ForegroundColor Red
    exit
}

# Инициализация репозитория, если его нет
if (!(Test-Path .git)) {
    git init
    Write-Host "✅ Локальный репозиторий инициализирован." -ForegroundColor Green
}

# Добавление всех файлов
git add .
Write-Host "📦 Файлы добавлены в индекс." -ForegroundColor Green

# Первый коммит
git commit -m "Initial commit: Picassek Studio Ready for Launch"
Write-Host "💾 Коммит создан." -ForegroundColor Green

# Запрос ссылки на GitHub
$githubUrl = Read-Host "🔗 Пожалуйста, вставьте ссылку на ваш ПУСТОЙ репозиторий GitHub (например, https://github.com/user/repo.git)"

if ([string]::IsNullOrWhiteSpace($githubUrl)) {
    Write-Host "❌ Ошибка: Ссылка не может быть пустой." -ForegroundColor Red
    exit
}

# Настройка удаленного репозитория
git remote remove origin 2>$null
git remote add origin $githubUrl
git branch -M main

Write-Host "📤 Загружаем код в GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✨ УСПЕХ! Проект загружен в GitHub." -ForegroundColor Green
    Write-Host "Теперь вы можете подключить его в Timeweb Cloud App Platform." -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Произошла ошибка при загрузке. Проверьте настройки доступа к вашему GitHub." -ForegroundColor Red
}
