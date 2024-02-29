#!/bin/bash

git fetch origin

for branch in $(git branch -r | grep -v HEAD); do
    # Remove the "origin/" prefix
    branch=${branch#origin/}

    if [[ "$branch" != "main" ]]; then
        git checkout "$branch"
        git pull origin "$branch"
        git rebase main
        git push origin "$branch"
    fi
done

git checkout main