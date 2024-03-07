#!/bin/bash

# Check for unwanted files
for file in *; do
  if [[ $file != "main.js" && $file != "main_test.js" && $file != "README.md" && $file != "validate.sh" ]]; then
    echo "[!] Unwanted file detected: $file."
    exit 1
  fi
done

node=$(which node)
test_path="${BASH_SOURCE[0]}"
solution_path="$(realpath .)"
tmp_dir=$(mktemp -d -t lab2-XXXXXXXXXX)

cd $tmp_dir

rm -rf *
cp $solution_path/*.js .
result=$($"node" --test --experimental-test-coverage) ; ret=$?
if [ $ret -ne 0 ] ; then
  echo "[!] testing fails"
  exit 1
else
  coverage=$(echo "$result" | grep 'all files' | awk -F '|' '{print $2}' | sed 's/ //g')
  if (( $(echo "$coverage < 100" | bc -l) )); then
    echo "[!] Coverage is only $coverage%"
    exit 1
  else
    echo "[V] Coverage is 100%"
  fi
fi

rm -rf $tmp_dir

exit 0

# vim: set fenc=utf8 ff=unix et sw=2 ts=2 sts=2: