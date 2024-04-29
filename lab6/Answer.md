Name: 游嘉鈞 
ID: 311555030

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 9 min, 21 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 2 min, 2 sec        │  total paths : 9      │
│ last uniq crash : 0 days, 0 hrs, 8 min, 50 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 3 min, 52 sec       │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.06% / 0.06%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.68 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 1 (11.11%)             │
│ stage execs : 274/2941 (9.32%)      │  new edges on : 3 (33.33%)             │
│ total execs : 2672                  │ total crashes : 124 (1 unique)         │
│  exec speed : 12.88/sec (zzzz...)   │  total tmouts : 1659 (7 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 2/223, 0/221                   │    levels : 2          │
│  byte flips : 0/28, 1/27, 0/25                      │   pending : 9          │
│ arithmetics : 2/1565, 0/0, 0/0                      │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 8          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘             [cpu: 61%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==14875==ERROR: AddressSanitizer: stack-overflow on address 0x7fff64b4d938 (pc 0x599f702ec17f bp 0x7fff6534cd90 sp 0x7fff64b4c940 T0)
    #0 0x599f702ec17f in main /home/user/lab6/src/hw0302.c:46
    #1 0x7f72d9029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f72d9029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x599f702ece24 in _start (/home/user/lab6/src/bmpcomp+0x2e24)

SUMMARY: AddressSanitizer: stack-overflow /home/user/lab6/src/hw0302.c:46 in main
==14875==ABORTING
```
