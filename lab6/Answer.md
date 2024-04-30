Name: 許庭涵
ID: 312555008

### Fuzz Monitor
```
                      american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 6 min, 51 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 43 sec       │  total paths : 8      │
│ last uniq crash : 0 days, 0 hrs, 5 min, 22 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 50 sec       │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.48 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (12.50%)             │
│ stage execs : 100/1934 (5.17%)      │  new edges on : 2 (25.00%)             │
│ total execs : 956                   │ total crashes : 50 (1 unique)          │
│  exec speed : 2.36/sec (zzzz...)    │  total tmouts : 128 (6 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 8          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  5%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==181075==ERROR: AddressSanitizer: stack-overflow on address 0x7fff74b102d8 (pc 0x5570daeef194 bp 0x7fff7530e7c0 sp 0x7fff74b102d8 T0)
    #0 0x5570daeef194 in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab6/112-spring-software-testing-lab6/lab6/src/hw0302.c:46
    #1 0x7fa514399d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58     
    #2 0x7fa514399e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5570daeefb74 in _start (/mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab6/112-spring-software-testing-lab6/lab6/src/bmpcomp+0x2b74)

SUMMARY: AddressSanitizer: stack-overflow /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab6/112-spring-software-testing-lab6/lab6/src/hw0302.c:46 in main
==181075==ABORTING
```
