Name: 田珈源
ID: 312553018

### Fuzz Monitor
```
afl-fuzz 2.57b by <lcamtuf@google.com>
[+] You have 16 CPU cores and 1 runnable tasks (utilization: 6%).
[+] Try parallel jobs - see /usr/local/share/doc/afl/parallel_fuzzing.txt.
[*] Checking CPU core loadout...
[+] Found a free CPU core, binding to #10.
[*] Checking core_pattern...
[*] Setting up output directories...
[+] Output directory exists but deemed OK to reuse.
[*] Deleting old session data...
[+] Output dir cleanup successful.
[*] Scanning 'in/'...
[+] No auto-generated dictionary tokens to reuse.
[*] Creating hard links for all input files...
[*] Validating target binary...
[*] Attempting dry run with 'id:000000,orig:1.bmp'...
[*] Spinning up the fork server...

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 11 min, 50 sec      │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 3 min, 57 sec       │  total paths : 3      │
│ last uniq crash : 0 days, 0 hrs, 4 min, 25 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 18 sec       │   uniq hangs : 5      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.18 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (33.33%)             │
│ stage execs : 65/223 (29.15%)       │  new edges on : 1 (33.33%)             │
│ total execs : 371                   │ total crashes : 10 (1 unique)          │
│  exec speed : 0.50/sec (zzzz...)    │  total tmouts : 203 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 3/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 3          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 2          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/57, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  9%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==67864==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe24e44f58 (pc 0x55b53196610d bp 0x7ffe256433b0 sp 0x7ffe24e43f60 T0)
    #0 0x55b53196610d in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fe828157d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fe828157e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55b531966c14 in _start (/mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab6/src/bmpcomp+0x2c14)

SUMMARY: AddressSanitizer: stack-overflow /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==67864==ABORTING
```
