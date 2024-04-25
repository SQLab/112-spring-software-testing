Name: 林琛琛
ID: 312552024

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 8 min, 37 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 10 sec       │  total paths : 17     │
│ last uniq crash : 0 days, 0 hrs, 7 min, 19 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 7 sec        │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.06%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.95 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (5.88%)              │
│ stage execs : 1302/1906 (68.31%)    │  new edges on : 3 (17.65%)             │
│ total execs : 2317                  │ total crashes : 113 (1 unique)         │
│  exec speed : 0.47/sec (zzzz...)    │  total tmouts : 623 (7 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/256, 3/255, 1/253                   │    levels : 2          │
│  byte flips : 0/32, 0/31, 0/29                      │   pending : 17         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 16         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  7%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==6305==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd3ebde1a8 (pc 0x55ca49bd60dc bp 0x7ffd3f3dd690 sp 0x7ffd3ebde1a8 T0)
    #0 0x55ca49bd60dc in main /home/cc/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f2173561d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f2173561e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55ca49bd6c94 in _start (/home/cc/software_testing/112-spring-software-testing/lab6/src/bmpcomp+0x2c94)

SUMMARY: AddressSanitizer: stack-overflow /home/cc/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==6305==ABORTING
```
