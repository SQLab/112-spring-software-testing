Name: 孟羽真
ID: 312581010

### Fuzz Monitor
```
american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 19 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 0 sec        │  total paths : 9      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 11 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.66 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : calibration           │ favored paths : 1 (11.11%)             │
│ stage execs : 1/8 (12.50%)          │  new edges on : 3 (33.33%)             │
│ total execs : 512                   │ total crashes : 1 (1 unique)           │
│  exec speed : 24.31/sec (slow!)     │  total tmouts : 64 (4 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 9          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  6%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==20737==ERROR: AddressSanitizer: stack-overflow on address 0x7ffef8e0dae8 (pc 0x5555bbcc0003 bp 0x7ffefa60e840 sp 0x7ffef8e0daf0 T0)
    #0 0x5555bbcc0003 in main /home/docker/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f343e509249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f343e509304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5555bbcc0aa0 in _start (/home/docker/112-spring-software-testing/lab6/src/bmpcomp+0x2aa0)

SUMMARY: AddressSanitizer: stack-overflow /home/docker/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==20737==ABORTING
```
