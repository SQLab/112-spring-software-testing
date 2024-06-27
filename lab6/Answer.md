Name: 黃泰揚
ID: 312551004

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 46 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 10 sec       │  total paths : 7      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 32 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 27 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.67 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 4/1           │ favored paths : 1 (14.29%)             │
│ stage execs : 144/221 (65.16%)      │  new edges on : 2 (28.57%)             │
│ total execs : 689                   │ total crashes : 22 (1 unique)          │
│  exec speed : 21.02/sec (slow!)     │  total tmouts : 69 (4 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/224, 2/223, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 7          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 6          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu002:152%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==37375==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd9a5c7908 (pc 0x564e778b0057 bp 0x7ffd9adc5d60 sp 0x7ffd9a5c6910 T0)
    #0 0x564e778b0056 in main /workspaces/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7ff689411082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x564e778b0b7d in _start (/workspaces/112-spring-software-testing/lab6/src/bmpcomp+0x2b7d)

SUMMARY: AddressSanitizer: stack-overflow /workspaces/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==37375==ABORTING
```
