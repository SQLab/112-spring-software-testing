Name: 鄭博薪

ID: 312555020

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 29 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 51 sec       │  total paths : 16     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 26 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.76 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 1 (6.25%)              │
│ stage execs : 1107/1502 (73.70%)    │  new edges on : 3 (18.75%)             │
│ total execs : 3591                  │ total crashes : 287 (1 unique)         │
│  exec speed : 10.60/sec (zzzz...)   │  total tmouts : 503 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 16         │
│ arithmetics : 7/1565, 0/0, 0/0                      │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 15         │
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
==103102==ERROR: AddressSanitizer: stack-overflow on address 0x7ffcc0bfdfe8 (pc 0x5ecc0a6020a6 bp 0x7ffcc13fc440 sp 0x7ffcc0bfcff0 T0)
    #0 0x5ecc0a6020a6 in main /home/joyuri1022/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x71587b829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x71587b829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ecc0a602c24 in _start (/home/joyuri1022/112-spring-software-testing/lab6/src/bmpcomp+0x2c24)

SUMMARY: AddressSanitizer: stack-overflow /home/joyuri1022/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==103102==ABORTING
```
