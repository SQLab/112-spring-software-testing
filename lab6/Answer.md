Name：蕭詠繼
ID：312552057

### Fuzz Monitor
```

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 30 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 14 sec       │  total paths : 10     │
│ last uniq crash : 0 days, 0 hrs, 0 min, 26 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.06%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.73 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (10.00%)             │
│ stage execs : 646/1794 (36.01%)     │  new edges on : 3 (30.00%)             │
│ total execs : 1517                  │ total crashes : 47 (1 unique)          │
│  exec speed : 59.55/sec (slow!)     │  total tmouts : 113 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/224, 4/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 10         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 9          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  9%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==91285==ERROR: AddressSanitizer: stack-overflow on address 0x7fff33674468 (pc 0x55ced245d1c0 bp 0x7fff33e72950 sp 0x7fff33674468 T0)
    #0 0x55ced245d1c0 in main /home/pudding/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f36e1a27d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f36e1a27e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55ced245dda4 in _start (/home/pudding/112-spring-software-testing/lab6/src/bmpcomp+0x2da4)

SUMMARY: AddressSanitizer: stack-overflow /home/pudding/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==91285==ABORTING
```
