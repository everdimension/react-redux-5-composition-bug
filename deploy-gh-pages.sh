CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git checkout gh-pages
git reset --hard
git merge master
npm run build
git add build
git push -u origin gh-pages

git checkout $CURRENT_BRANCH
