Name: 黃建廷
ID: 312511041

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 19 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 0 sec        │  total paths : 4      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 51 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.27 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : calibration           │ favored paths : 1 (25.00%)             │
│ stage execs : 4/8 (50.00%)          │  new edges on : 1 (25.00%)             │
│ total execs : 502                   │ total crashes : 22 (1 unique)          │
│  exec speed : 8.37/sec (zzzz...)    │  total tmouts : 94 (4 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 3/256, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 4          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 2          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘             [cpu: 69%]
```

### Run Crash Result
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==15912==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc04eb69f8 (pc 0x5651bc08cfdd bp 0x7ffc056b3e50 sp 0x7ffc04eb5a00 T0)
    #0 0x5651bc08cfdc in main /home/timmy/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fa2d806e082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5651bc08da8d in _start (/home/timmy/112-spring-software-testing/lab6/src/bmpcomp+0x2a8d)

SUMMARY: AddressSanitizer: stack-overflow /home/timmy/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==15912==ABORTING
```
