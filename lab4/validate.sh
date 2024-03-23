#!/bin/bash

# Check for unwanted files
for file in *; do
  if [[ $file != "node_modules" && $file != "main_test.js" && $file != "package-lock.json" && $file != "package.json" && $file != "README.md" && $file != "validate.sh" ]]; then
    echo "[!] Unwanted file detected: $file."
    exit 1
  fi
done

node=$(which node)
test_path="${BASH_SOURCE[0]}"
solution_path="$(realpath .)"
tmp_dir=$(mktemp -d -t lab4-XXXXXXXXXX)
answer="Experimental WebDriver BiDi support"

cd $tmp_dir

rm -rf *
cp $solution_path/*.js .
cp $solution_path/*.json .

# Install dependencies
npm ci

result=$($"node" main_test.js) ; ret=$?
if [ $ret -ne 0 ] ; then
  echo "[!] testing fails"
  exit 1
else
  title=$(echo "$result" | head -1)
  if [[ $title != $answer ]]; then
    echo "[!] Expected: $answer"
    echo "[!] Actual:   $title"
    exit 1
  else
    echo "[V] Pass"
  fi
fi

rm -rf $tmp_dir

exit 0

# vim: set fenc=utf8 ff=unix et sw=2 ts=2 sts=2: