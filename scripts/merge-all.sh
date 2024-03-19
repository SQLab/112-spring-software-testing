#!/bin/bash

if [ $# -ne 1 ]; then
    echo "./merge-all.sh <commit-message>"
    exit 1
fi

git fetch origin

for branch in $(git branch -r | grep -v HEAD); do
    # Remove the "origin/" prefix
    branch=${branch#origin/}

    if [[ "$branch" != "main" ]]; then
        git checkout "$branch"
        if [[ $? -ne 0 ]]; then
            echo "Checkout failed for branch $branch"
            exit 1
        fi
        git merge --squash main
        if [[ $? -ne 0 ]]; then
            echo "Merge failed for branch $branch"
            exit 1
        fi
        git commit -m "$1"
    fi
done

git checkout main