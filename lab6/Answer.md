Name: 江峻耀
ID: 110550148

### Fuzz Monitor
```
american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 21 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 6 sec        │  total paths : 9      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 14 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.62 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 4/1           │ favored paths : 1 (11.11%)             │
│ stage execs : 156/189 (82.54%)      │  new edges on : 3 (33.33%)             │
│ total execs : 652                   │ total crashes : 23 (1 unique)          │
│  exec speed : 6.55/sec (zzzz...)    │  total tmouts : 42 (6 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/192, 3/191, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 9          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 8          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/35, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001:191%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==3788==ERROR: AddressSanitizer: stack-overflow on address 0x7fff4dce7758 (pc 0x000000401eca bp 0x7fff4f4e84b0 sp 0x7fff4dce7760 T0)
    #0 0x401eca in main /home/csc2024/Desktop/lab6/src/hw0302.c:46
    #1 0x7f76e0bce082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x4028fd in _start (/home/csc2024/Desktop/lab6/src/bmpcomp+0x4028fd)

SUMMARY: AddressSanitizer: stack-overflow /home/csc2024/Desktop/lab6/src/hw0302.c:46 in main
==3788==ABORTING
```
