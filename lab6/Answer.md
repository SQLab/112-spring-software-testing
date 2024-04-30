Name: 鄭宇傑
ID: 312551011

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 3 min, 11 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 2 min, 6 sec        │  total paths : 10     │
│ last uniq crash : 0 days, 0 hrs, 2 min, 53 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 24 sec       │   uniq hangs : 6      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 4 min, 2 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 39 sec       │  total paths : 17     │
│ last uniq crash : 0 days, 0 hrs, 3 min, 44 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 15 sec       │   uniq hangs : 6      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.50 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (5.88%)              │
│ stage execs : 1389/1608 (86.38%)    │  new edges on : 3 (17.65%)             │
│ total execs : 2319                  │ total crashes : 138 (1 unique)         │
│  exec speed : 4.43/sec (zzzz...)    │  total tmouts : 346 (8 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 17         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 16         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
^C────────────────────────────────────────────────────┘          [cpu000:323%]

+++ Testing aborted by user +++
[+] We're done here. Have a nice day!
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==24429==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd3490cf58 (pc 0x55a0384b30ff bp 0x7ffd351093b0 sp 0x7ffd3490bf60 T0)
    #0 0x55a0384b30fe in main /workspaces/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f1096e86082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55a0384b3d0d in _start (/workspaces/112-spring-software-testing/lab6/src/bmpcomp+0x2d0d)

SUMMARY: AddressSanitizer: stack-overflow /workspaces/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==24429==ABORTING
```
