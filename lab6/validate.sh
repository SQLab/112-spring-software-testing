#!/bin/bash

# Check for unwanted files
for file in *; do
  if [[ $file != "src" && $file != "src/makefile" && $file != "src/hw0302.c" && $file != "src/1.bmp" && $file != "Answer.md" && $file != "validate.sh" ]]; then
    echo "[!] Unwanted file detected: $file."
    exit 1
  fi
done

echo "[V] Pass"

exit 0

# vim: set fenc=utf8 ff=unix et sw=2 ts=2 sts=2:
