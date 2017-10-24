CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git checkout gh-pages
git reset --hard

# remove build from gitignore
echo ${$(cat .gitignore)/build/} > .gitignore

git merge master
npm run build
git add build
git push
git reset --hard

git checkout $CURRENT_BRANCH
