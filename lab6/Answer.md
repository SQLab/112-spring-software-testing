Name: herngpei, lin
ID: 312551078

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 3 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 17 sec       │  total paths : 8      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 38 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 7 sec        │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.43 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (12.50%)             │
│ stage execs : 165/223 (73.99%)      │  new edges on : 4 (50.00%)             │
│ total execs : 486                   │ total crashes : 14 (1 unique)          │
│  exec speed : 0.00/sec (zzzz...)    │  total tmouts : 53 (5 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 8          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/41, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu001: 89%]

```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==4964==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe04111be8 (pc 0x580cf12390a7 bp 0x7ffe04911040 sp 0x7ffe04110bf0 T0)
    #0 0x580cf12390a7 in main /home/gary/Desktop/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x798f59c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x798f59c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x580cf1239bf4 in _start (/home/gary/Desktop/112-spring-software-testing/lab6/src/bmpcomp+0x2bf4)

SUMMARY: AddressSanitizer: stack-overflow /home/gary/Desktop/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==4964==ABORTING


```
