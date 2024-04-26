Name: 吳明憲
ID: 312551148

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 4 min, 14 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 33 sec       │  total paths : 9      │
│ last uniq crash : 0 days, 0 hrs, 3 min, 47 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 2 min, 33 sec       │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.62 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (11.11%)             │
│ stage execs : 1108/1958 (56.59%)    │  new edges on : 4 (44.44%)             │
│ total execs : 2079                  │ total crashes : 50 (1 unique)          │
│  exec speed : 2.16/sec (zzzz...)    │  total tmouts : 318 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/256, 2/255, 1/253                   │    levels : 2          │
│  byte flips : 0/32, 0/31, 0/29                      │   pending : 9          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 8          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/47, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu007: 53%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==1696402==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc533daf28 (pc 0x564923e7b08d bp 0x7ffc53bd9380 sp 0x7ffc533d9f30 T0)
    #0 0x564923e7b08c in main /home/hsien/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fcad0e13082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x564923e7bbad in _start (/home/hsien/112-spring-software-testing/lab6/src/bmpcomp+0x2bad)

SUMMARY: AddressSanitizer: stack-overflow /home/hsien/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==1696402==ABORTING
```
