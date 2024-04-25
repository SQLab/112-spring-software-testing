
Name: 詹詠淇
ID: 312551063

### Fuzz Monitor
```
american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 3 min, 31 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 6 sec        │  total paths : 14     │
│ last uniq crash : 0 days, 0 hrs, 3 min, 11 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 36 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.33 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (7.14%)              │
│ stage execs : 1317/1624 (81.10%)    │  new edges on : 2 (14.29%)             │
│ total execs : 2200                  │ total crashes : 137 (1 unique)         │
│  exec speed : 7.17/sec (zzzz...)    │  total tmouts : 394 (8 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 2/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 14         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 13         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/39, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001:118%]


```

### Run Crash Result
```

size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==17527==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe4518ecb8 (pc 0x5926baffffef bp 0x7ffe4598e110 sp 0x7ffe4518dcc0 T0)
    #0 0x5926baffffef in main /home/ubuntu/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x70451f029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x70451f029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5926bb000b34 in _start (/home/ubuntu/112-spring-software-testing/lab6/src/bmpcomp+0x2b34)

SUMMARY: AddressSanitizer: stack-overflow /home/ubuntu/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==17527==ABORTING

```
