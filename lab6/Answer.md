Name: 施育衡
ID: 312553004

### Fuzz Monitor
```
                        american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 12 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 0 sec        │  total paths : 11     │
│ last uniq crash : 0 days, 0 hrs, 0 min, 9 sec        │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 2 sec        │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.06%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.71 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : calibration           │ favored paths : 1 (9.09%)              │
│ stage execs : 4/8 (50.00%)          │  new edges on : 4 (36.36%)             │
│ total execs : 754                   │ total crashes : 40 (1 unique)          │
│  exec speed : 122.5/sec             │  total tmouts : 70 (8 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 3/223, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 11         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 9          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  8%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==2993624==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc7e474768 (pc 0x585b201eb1f7 bp 0x7ffc7ec72bc0 sp 0x7ffc7e473770 T0)
    #0 0x585b201eb1f7 in main /home/shiheng/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x77545a029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x77545a029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x585b201ebda4 in _start (/home/shiheng/112-spring-software-testing/lab6/src/bmpcomp+0x2da4)

SUMMARY: AddressSanitizer: stack-overflow /home/shiheng/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==2993624==ABORTING
```
