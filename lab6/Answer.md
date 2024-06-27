Name: 張百寬 
ID: m091545

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)
                       
┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 5 min, 29 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 38 sec       │  total paths : 2      │
│ last uniq crash : 0 days, 0 hrs, 1 min, 47 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 52 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 1* (50.00%)       │    map density : 0.04% / 0.04%         │
│ paths timed out : 1 (50.00%)        │ count coverage : 1.17 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 1/1           │ favored paths : 1 (50.00%)             │
│ stage execs : 132/224 (58.93%)      │  new edges on : 1 (50.00%)             │
│ total execs : 2141                  │ total crashes : 10 (1 unique)          │
│  exec speed : 9.76/sec (zzzz...)    │  total tmouts : 590 (2 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 0/0, 0/0, 0/0                         │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 1          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 0          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 1          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 74.73%/1384, n/a                      ├────────────────────────┘
└─────────────────────────────────────────────────────┘             [cpu:316%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==44708==ERROR: AddressSanitizer: stack-overflow on address 0x7ffdd19eafb8 (pc 0x55e0a76d10d6 bp 0x7ffdd21e9410 sp 0x7ffdd19e9fc0 T0)
    #0 0x55e0a76d10d6 in main /home/ubuntu/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f89b7a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f89b7a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e0a76d1c94 in _start (/home/ubuntu/112-spring-software-testing/lab6/src/bmpcomp+0x2c94)

SUMMARY: AddressSanitizer: stack-overflow /home/ubuntu/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==44708==ABORTING
```
