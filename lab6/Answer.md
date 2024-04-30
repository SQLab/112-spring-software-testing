
Name: 陳沛圻
ID: 312553008

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 2 min, 5 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 17 sec       │  total paths : 6      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 29 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 11 sec       │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.50 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 1/1           │ favored paths : 1 (16.67%)             │
│ stage execs : 203/224 (90.62%)      │  new edges on : 2 (33.33%)             │
│ total execs : 291                   │ total crashes : 10 (1 unique)          │
│  exec speed : 0.00/sec (zzzz...)    │  total tmouts : 30 (3 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 0/0, 0/0, 0/0                         │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 6          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  9%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==10312==ERROR: AddressSanitizer: stack-overflow on address 0x7fff585f6f68 (pc 0x55f2bc51dff8 bp 0x7fff58df4450 sp 0x7fff585f6f68 T0)
    #0 0x55f2bc51dff8 in main /mnt/c/Users/lab/Desktop/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f126c3bdd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f126c3bde3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55f2bc51ec24 in _start (/mnt/c/Users/lab/Desktop/software_testing/112-spring-software-testing/lab6/src/bmpcomp+0x2c24)

SUMMARY: AddressSanitizer: stack-overflow /mnt/c/Users/lab/Desktop/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==10312==ABORTING
=======
```
