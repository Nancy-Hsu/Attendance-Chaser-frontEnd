# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add .
git commit -m 'deploy'

git branch -M gh-pages

git push -f https://github.com/Nancy-Hsu/Attendance-Chaser-frontEnd.git gh-pages

cd -