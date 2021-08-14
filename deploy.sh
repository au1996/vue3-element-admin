#!/usr/bin/env sh

# 发生任何错误时终止
set -e

# 构建
npm run build

# 部署
git add .
git commit -m 'feat: :zap: update vue version'
git push origin master
git subtree push --prefix dist origin gh-pages

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:au1996/vue3-element-admin.git master:gh-pages

cd -

