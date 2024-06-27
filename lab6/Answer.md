Name: Pin-An Lin
ID: 110550098

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 43 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 15 sec       │  total paths : 4      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 19 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 21 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.26 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (25.00%)             │
│ stage execs : 76/223 (34.08%)       │  new edges on : 1 (25.00%)             │
│ total execs : 372                   │ total crashes : 10 (1 unique)          │
│  exec speed : 10.49/sec (zzzz...)   │  total tmouts : 34 (2 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 4          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 3          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 26%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==502945==ERROR: AddressSanitizer: stack-overflow on address 0x7fff91ecb068 (pc 0x56300606d05d bp 0x7fff926ca4c0 sp 0x7fff91eca070 T0)
    #0 0x56300606d05d in main /home/anthony/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f3015e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f3015e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56300606dbe4 in _start (/home/anthony/112-spring-software-testing/lab6/src/bmpcomp+0x2be4)

SUMMARY: AddressSanitizer: stack-overflow /home/anthony/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==502945==ABORTING
```
