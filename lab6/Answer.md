Name: 唐磊
ID: 312552020

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 16 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 6 sec        │  total paths : 11     │
│ last uniq crash : 0 days, 0 hrs, 0 min, 13 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.06%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.73 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (9.09%)              │
│ stage execs : 534/1822 (29.31%)     │  new edges on : 4 (36.36%)             │
│ total execs : 1413                  │ total crashes : 50 (1 unique)          │
│  exec speed : 116.8/sec             │  total tmouts : 110 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 11         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 10         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
^C────────────────────────────────────────────────────┘          [cpu010:  8%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==3171160==ERROR: AddressSanitizer: stack-overflow on address 0x7fffbb1761b8 (pc 0x5e24ff6bd147 bp 0x7fffbb974610 sp 0x7fffbb1751c0 T0)
    #0 0x5e24ff6bd147 in main /home/martintl25/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7941f7a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7941f7a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5e24ff6bdc14 in _start (/home/martintl25/112-spring-software-testing/lab6/src/bmpcomp+0x2c14)

SUMMARY: AddressSanitizer: stack-overflow /home/martintl25/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==3171160==ABORTING
```
