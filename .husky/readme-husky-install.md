# Установка Husky от версии "^9.0.0"
npm install husky --save-dev

# Инициализация Husky
npx husky-init

# Файл хука husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

if [[ "$OS" == "Windows_NT" ]]; then  
    # npx.cmd lint-staged  
    npm.cmd version patch --no-git-tag-version && git add package.json package-lock.json  
else  
    # npx lint-staged  
    npm version patch --no-git-tag-version && git add .  
fi