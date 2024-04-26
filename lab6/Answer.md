Name: 周原慶
ID: 312553016

### Fuzz Monitor
```
afl-fuzz 2.57b by <lcamtuf@google.com>
[+] You have 28 CPU cores and 2 runnable tasks (utilization: 7%).
[+] Try parallel jobs - see /usr/local/share/doc/afl/parallel_fuzzing.txt.
[*] Checking CPU core loadout...
[+] Found a free CPU core, binding to #10.
[*] Checking core_pattern...
[*] Setting up output directories...
[*] Scanning 'in/'...
[+] No auto-generated dictionary tokens to reuse.
[*] Creating hard links for all input files...
[*] Validating target binary...
[*] Attempting dry run with 'id:000000,orig:1.bmp'...
[*] Spinning up the fork server...

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 3 min, 54 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 25 sec       │  total paths : 28     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 35 sec       │ uniq crashes : 3      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 1 (3.57%)         │    map density : 0.05% / 0.06%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.21 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 5 (17.86%)             │
│ stage execs : 196/3023 (6.48%)      │  new edges on : 6 (21.43%)             │
│ total execs : 8940                  │ total crashes : 971 (3 unique)         │
│  exec speed : 38.43/sec (slow!)     │  total tmouts : 1569 (8 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/448, 4/446, 1/442                   │    levels : 3          │
│  byte flips : 0/56, 0/54, 0/50                      │   pending : 27         │
│ arithmetics : 11/3130, 0/1300, 0/816                │  pend fav : 5          │
│  known ints : 1/104, 2/415, 2/709                   │ own finds : 27         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 2/512, 0/0                            │ stability : 100.00%    │
│        trim : 99.99%/43, 0.00%                      ├────────────────────────┘
^C────────────────────────────────────────────────────┘          [cpu010:  5%]

+++ Testing aborted by user +++
[+] We're done here. Have a nice day!
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==17578==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc89c3f248 (pc 0x558ccb6d202f bp 0x7ffc8a43d6a0 sp 0x7ffc89c3e250 T0)
    #0 0x558ccb6d202f in main /home/user/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fabb1de3d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fabb1de3e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x558ccb6d2be4 in _start (/home/user/112-spring-software-testing/lab6/src/bmpcomp+0x2be4)

SUMMARY: AddressSanitizer: stack-overflow /home/user/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==17578==ABORTING
```
