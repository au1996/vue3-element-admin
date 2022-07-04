#!/usr/bin/env sh

# 发生任何错误时终止
set -e

# 部署
git add .
git commit -m 'chore: add redirect'
git push origin webpack

cd -

