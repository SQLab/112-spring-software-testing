#!/bin/bash

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
        git rebase main
        if [[ $? -ne 0 ]]; then
            echo "Rebase failed for branch $branch"
            exit 1
        fi
    fi
done

git checkout main
