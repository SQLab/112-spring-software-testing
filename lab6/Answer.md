Name: 蘇家弘
ID: 312552019

### Fuzz Monitor
```

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 39 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 24 sec       │  total paths : 10     │
│ last uniq crash : 0 days, 0 hrs, 0 min, 35 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.75 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (10.00%)             │
│ stage execs : 1201/1652 (72.70%)    │  new edges on : 3 (30.00%)             │
│ total execs : 2072                  │ total crashes : 109 (1 unique)         │
│  exec speed : 159.2/sec             │  total tmouts : 187 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 10         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 9          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 17%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==9247==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe235ff668 (pc 0x5565614d90cd bp 0x7ffe23dfeac0 sp 0x7ffe235fe670 T0)
    #0 0x5565614d90cd in main /home/axelhowe/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f7ea9f64d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f7ea9f64e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5565614d9c84 in _start (/home/axelhowe/112-spring-software-testing/lab6/src/bmpcomp+0x2c84)

SUMMARY: AddressSanitizer: stack-overflow /home/axelhowe/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==9247==ABORTING
```
