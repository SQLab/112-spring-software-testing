Name: 莊博傑
ID: 312551016

### Fuzz Monitor

```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 32 min, 47 sec      │  cycles done : 4      │
│   last new path : 0 days, 0 hrs, 10 min, 33 sec      │  total paths : 18     │
│ last uniq crash : 0 days, 0 hrs, 29 min, 58 sec      │ uniq crashes : 3      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 9* (50.00%)       │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.24 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 3 (16.67%)             │
│ stage execs : 562/2777 (20.24%)     │  new edges on : 3 (16.67%)             │
│ total execs : 79.6k                 │ total crashes : 19.3k (3 unique)       │
│  exec speed : 108.6/sec             │  total tmouts : 16.1k (7 unique)       │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/2912, 2/2676, 1/2652                │    levels : 5          │
│  byte flips : 0/336, 0/324, 0/300                   │   pending : 6          │
│ arithmetics : 5/18.8k, 0/10.3k, 0/5776              │  pend fav : 0          │
│  known ints : 0/832, 0/3430, 1/6040                 │ own finds : 17         │
│  dictionary : 0/0, 0/0, 0/776                       │  imported : n/a        │
│       havoc : 3/12.9k, 2/6928                       │ stability : 100.00%    │
│        trim : 99.96%/111, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 12%]
```

### Run Crash Result

```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==3765==ERROR: AddressSanitizer: stack-overflow on address 0x7fff41ae7318 (pc 0x5558f975f0c3 bp 0x7fff422e5770 sp 0x7fff41ae6320 T0)
    #0 0x5558f975f0c2 in main /home/bogay/workspace/nycu/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f493df7c082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5558f975fb8d in _start (/home/bogay/workspace/nycu/112-spring-software-testing/lab6/src/bmpcomp+0x2b8d)

SUMMARY: AddressSanitizer: stack-overflow /home/bogay/workspace/nycu/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==3765==ABORTING
```
