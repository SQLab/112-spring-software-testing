Name: 陳翰泓
ID: 312551178

### Fuzz Monitor
```

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 38 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 21 sec       │  total paths : 8      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 34 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.79 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (12.50%)             │
│ stage execs : 793/1754 (45.21%)     │  new edges on : 2 (25.00%)             │
│ total execs : 1646                  │ total crashes : 47 (1 unique)          │
│  exec speed : 57.70/sec (slow!)     │  total tmouts : 114 (3 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 8          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu000: 20%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==32300==ERROR: AddressSanitizer: stack-overflow on address 0x7fff8c0e7df8 (pc 0x55db0e2df017 bp 0x7fff8c8e6250 sp 0x7fff8c0e6e00 T0)
    #0 0x55db0e2df016 in main /home/chh/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f5d55ae4082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55db0e2dfbad in _start (/home/chh/112-spring-software-testing/lab6/src/bmpcomp+0x2bad)

SUMMARY: AddressSanitizer: stack-overflow /home/chh/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==32300==ABORTING
```
