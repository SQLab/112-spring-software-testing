Name: 寸少康
ID: 312553021

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 9 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 1 sec        │  total paths : 4      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 2 sec        │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.03% / 0.03%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.38 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 1/1           │ favored paths : 1 (25.00%)             │
│ stage execs : 203/224 (90.62%)      │  new edges on : 1 (25.00%)             │
│ total execs : 276                   │ total crashes : 9 (1 unique)           │
│  exec speed : 29.70/sec (slow!)     │  total tmouts : 28 (3 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 0/0, 0/0, 0/0                         │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 4          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 3          │
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
==15970==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe7492a718 (pc 0x55fd550f1f7d bp 0x7ffe75128b70 sp 0x7ffe74929720 T0)
    #0 0x55fd550f1f7d in main /home/kyle/lab6/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7facb4ebbd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7facb4ebbe3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55fd550f2934 in _start (/home/kyle/lab6/112-spring-software-testing/lab6/src/bmpcomp+0x2934)

SUMMARY: AddressSanitizer: stack-overflow /home/kyle/lab6/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==15970==ABORTING
```
