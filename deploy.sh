# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/Nancy-Hsu/Attendance-Chaser-frontEnd.git main:gh-pages

cd -