Name: 
ID: 

### Fuzz Monitor
```
                      american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 2 min, 21 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 54 sec       │  total paths : 10     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 59 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 58 sec       │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.83 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (10.00%)             │
│ stage execs : 486/1835 (26.49%)     │  new edges on : 3 (30.00%)             │
│ total execs : 1359                  │ total crashes : 50 (1 unique)          │
│  exec speed : 14.18/sec (zzzz...)   │  total tmouts : 127 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 10         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 9          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/39, 0.00%                     ├────────────────────────┘
^C────────────────────────────────────────────────────┘             [cpu:206%]

```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==33370==ERROR: AddressSanitizer: stack-overflow on address 0x7ffec8cd4de8 (pc 0x5646632a8ff0 bp 0x7ffec94d32d0 sp 0x7ffec8cd4de8 T0)
    #0 0x5646632a8ff0 in main /home/ubuntu/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f90dbde0d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f90dbde0e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5646632a9b24 in _start (/home/ubuntu/112-spring-software-testing/lab6/src/bmpcomp+0x2b24)

SUMMARY: AddressSanitizer: stack-overflow /home/ubuntu/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==33370==ABORTING
```
