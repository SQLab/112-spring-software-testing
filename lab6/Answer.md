Name: `陳彥瑋`
ID: `312555003`

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 14 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 7 sec        │  total paths : 7      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 9 sec        │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 3 sec        │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.36 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (14.29%)             │
│ stage execs : 9/223 (4.04%)         │  new edges on : 3 (42.86%)             │
│ total execs : 324                   │ total crashes : 9 (1 unique)           │
│  exec speed : 14.60/sec (zzzz...)   │  total tmouts : 34 (3 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 7          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 6          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
^C────────────────────────────────────────────────────┘          [cpu010:  8%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==34211==ERROR: AddressSanitizer: stack-overflow on address 0x7fff614770a8 (pc 0x5b3e3fc380d7 bp 0x7fff61c76500 sp 0x7fff614760b0 T0)
    #0 0x5b3e3fc380d7 in main /media/ywc/Data1/1122_software_test/lab6/hw0302.c:46
    #1 0x7f82c4429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f82c4429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b3e3fc38af4 in _start (/home/ywc/lab6/bmpcomp+0x2af4)

SUMMARY: AddressSanitizer: stack-overflow /media/ywc/Data1/1122_software_test/lab6/hw0302.c:46 in main
==34211==ABORTING
```
