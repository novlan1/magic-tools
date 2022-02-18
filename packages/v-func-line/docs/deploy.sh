
#!/usr/bin/env sh

set -e

npm run docs:build;

cd dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:novlan1/magic-tools.git master:gh-pages

cd -

# rm -rf dist
