#!/usr/bin/env sh

# 发生任何错误时终止
set -e

# 构建
npm run build

# 部署
git add .
git commit -m 'feat: :memo: add echarts'
git push origin master

cd -
