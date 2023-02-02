#!/usr/bin/env sh

# 发生任何错误时终止
set -e

# 部署
git add .
git commit -m 'chore: update axios cancel api'
git push origin webpack

