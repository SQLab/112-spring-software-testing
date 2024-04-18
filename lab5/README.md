# Lab5

## Introduction

In this lab, you will write a function antoasan to bypass detection of ASan in `antiasan.c` and answer questions of slide in `Answer.md`.

## Preparation (Important!!!)

1. Sync fork your branch (e.g., `SQLab:311XXXXXX`)
2. `git checkout -b lab5` (**NOT** your student ID !!!)

## Requirement

1. (50%) Test Valgrind and ASan to detect common memory corruption vulns, and then asnwer result, report of Valgrind/ASan and Vulnerable code in `Answer.md`.
2. (40%) Write a vulnerable code to bypass redzone between 2 int [8] arrays and asnwer reason and code in `Answer.md`.

3. (30%) write a function antoasan to bypass detection of ASan in `antiasan.c`.
You can run `validate.sh` in your local to test if you satisfy the requirements.

Please note that you must not alter files other than `antiasan.c` and `Answer.md`. You will get 0 points if

1. you modify other files to achieve requirements.
2. you can't pass all CI on your PR.

## Submission

You need to open a pull request to your branch (e.g. 311XXXXXX, your student number) and contain the code that satisfies the abovementioned requirements.

Moreover, please submit the URL of your PR to E3. Your submission will only be accepted when you present at both places.
