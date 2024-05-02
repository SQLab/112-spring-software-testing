#!/bin/bash

# Check for unwanted files
for file in *; do
  if [[ $file != "login.c" && $file != "sol.py" && $file != "Makefile" && $file != "README.md" && $file != "validate.sh" ]]; then
    echo "[!] Unwanted file detected: $file."
    exit 1
  fi
done

test_path="${BASH_SOURCE[0]}"
solution_path="$(realpath .)"
tmp_dir=$(mktemp -d -t lab7-XXXXXXXXXX)
answer=""

cd $tmp_dir

pip install angr
rm -rf *
cp $solution_path/Makefile .
cp $solution_path/*.c .
cp $solution_path/sol.py .

make
result=$(python3 sol.py)
if [[ $result != "b'HETOBRCUVWOBFEBB'" ]]; then
  echo "[!] Expected: "
  echo "b'HETOBRCUVWOBFEBB'"
  echo ""
  echo "[!] Actual:   "
  echo $result
  echo ""
  exit 1
else
  echo "[V] Pass"
fi

rm -rf $tmp_dir

exit 0

# vim: set fenc=utf8 ff=unix et sw=2 ts=2 sts=2:
