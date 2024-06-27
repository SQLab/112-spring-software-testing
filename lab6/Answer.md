Name: 林佑庭
ID: 312551098

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 35 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 10 sec       │  total paths : 10     │
│ last uniq crash : 0 days, 0 hrs, 0 min, 26 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 22 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.69 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 4/1           │ favored paths : 1 (10.00%)             │
│ stage execs : 152/221 (68.78%)      │  new edges on : 4 (40.00%)             │
│ total execs : 717                   │ total crashes : 23 (1 unique)          │
│  exec speed : 9.57/sec (zzzz...)    │  total tmouts : 78 (7 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 3/223, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 10         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 9          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 17%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==512255==ERROR: AddressSanitizer: stack-overflow on address 0x7ffdc2c7bba8 (pc 0x5649f42690d7 bp 0x7ffdc3479000 sp 0x7ffdc2c7abb0 T0)
    #0 0x5649f42690d7 in main /home/eusden/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fa0543ead8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fa0543eae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5649f4269c54 in _start (/home/eusden/112-spring-software-testing/lab6/src/bmpcomp+0x2c54)

SUMMARY: AddressSanitizer: stack-overflow /home/eusden/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==512255==ABORTING
```
