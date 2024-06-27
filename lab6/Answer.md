Name: 陳柏瑋
ID: 312551068

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 5 min, 15 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 35 sec       │  total paths : 6      │
│ last uniq crash : 0 days, 0 hrs, 3 min, 12 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 16 sec       │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.48 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 4/1           │ favored paths : 1 (16.67%)             │
│ stage execs : 5/221 (2.26%)         │  new edges on : 2 (33.33%)             │
│ total execs : 535                   │ total crashes : 23 (1 unique)          │
│  exec speed : 0.00/sec (zzzz...)    │  total tmouts : 136 (4 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 3/224, 3/223, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 6          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
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
==725==ERROR: AddressSanitizer: stack-overflow on address 0x7fff9346dfc8 (pc 0x55b1fedb41af bp 0x7fff93c6c420 sp 0x7fff9346cfd0 T0)
    #0 0x55b1fedb41ae in main /home/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7efdfdbfa082 in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x24082)
    #2 0x55b1fedb4d0d in _start (/home/112-spring-software-testing/lab6/src/bmpcomp+0x2d0d)

SUMMARY: AddressSanitizer: stack-overflow /home/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==725==ABORTING
```
