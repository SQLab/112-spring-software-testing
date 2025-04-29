# Lab6

## Introduction

In this lab, you will write a llvm pass to instrument some codes to `target.c` in `llvm-pass.so.cc`.

## Preparation (Important!!!)

1. Sync fork your branch (e.g., `SQLab:311XXXXXX`)
2. `git checkout -b lab6` (**NOT** your student ID !!!)

## Requirement

Write a llvm pass to instrument some codes to `target.c` in `llvm-pass.so.cc` and satisfy following requirements.
1. (40%) Invoke debug function with the first argument is 48763 in main function.
2. (30%) Overwrite argv[1] to "hayaku... motohayaku!" before checking.
3. (30%) Overwrite argc to 48763 before checking.
You can run `validate.sh` in your local to test if you satisfy the requirements.

Please note that you must not alter files other than `llvm-pass.so.cc`. You will get 0 points if

1. you modify other files to achieve requirements.
2. you can't pass all CI on your PR.

## Submission

You need to open a pull request to your branch (e.g. 311XXXXXX, your student number) and contain the code that satisfies the abovementioned requirements.

Moreover, please submit the URL of your PR to E3. Your submission will only be accepted when you present at both places.
