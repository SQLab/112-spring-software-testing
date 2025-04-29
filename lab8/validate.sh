#!/bin/bash

# Check for unwanted files
for file in *; do
  if [[ $file != "llvm-pass.so.cc" && $file != "target.c" && $file != "Makefile" && $file != "README.md" && $file != "validate.sh" && $file != "ans" ]]; then
    echo "[!] Unwanted file detected: $file."
    exit 1
  fi
done

test_path="${BASH_SOURCE[0]}"
solution_path="$(realpath .)"
tmp_dir=$(mktemp -d -t lab5-XXXXXXXXXX)
answer=""

cd $tmp_dir

rm -rf *
cp $solution_path/Makefile .
cp $solution_path/*.c .
cp $solution_path/*.cc .
cp $solution_path/ans .

make
make run > out 2>&1
result=$(diff --strip-trailing-cr ans out)
if [[ -n $result ]]; then
  echo "[!] Expected: "
  cat ans
  echo ""
  echo "[!] Actual:   "
  cat out
  echo ""
  exit 1
else
  echo "[V] Pass"
fi

rm -rf $tmp_dir

exit 0

# vim: set fenc=utf8 ff=unix et sw=2 ts=2 sts=2:
