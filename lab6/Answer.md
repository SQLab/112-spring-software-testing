Name: 鍾博笙
ID: b122521

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 34 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 9 sec        │  total paths : 6      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 27 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 27 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.55 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 4/1           │ favored paths : 1 (16.67%)             │
│ stage execs : 100/221 (45.25%)      │  new edges on : 1 (16.67%)             │
│ total execs : 636                   │ total crashes : 23 (1 unique)          │
│  exec speed : 17.67/sec (zzzz...)   │  total tmouts : 162 (3 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 2/223, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 6          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
^C────────────────────────────────────────────────────┘             [cpu: 93%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==9229==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd7da94428 (pc 0x588f8f13c09d bp 0x7ffd7e292880 sp 0x7ffd7da93430 T0)
    #0 0x588f8f13c09d in main /home/poshzh/week10/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x71ca24229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x71ca24229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x588f8f13cb34 in _start (/home/poshzh/week10/112-spring-software-testing/lab6/src/bmpcomp+0x2b34)

SUMMARY: AddressSanitizer: stack-overflow /home/poshzh/week10/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==9229==ABORTING
```
