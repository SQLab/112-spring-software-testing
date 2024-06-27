Name: 紀軒宇 
ID: 312551080

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 32 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 7 sec        │  total paths : 19     │
│ last uniq crash : 0 days, 0 hrs, 0 min, 29 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.35 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (5.26%)              │
│ stage execs : 1451/1593 (91.09%)    │  new edges on : 5 (26.32%)             │
│ total execs : 2397                  │ total crashes : 139 (1 unique)         │
│  exec speed : 23.03/sec (slow!)     │  total tmouts : 341 (8 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 19         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 18         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  6%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==2265811==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd8dfba988 (pc 0x5d5dbfbc109f bp 0x7ffd8e7b7de0 sp 0x7ffd8dfb9990 T0)
    #0 0x5d5dbfbc109f in main /home/hsuanyu/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fdb95429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fdb95429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5d5dbfbc1cc4 in _start (/home/hsuanyu/112-spring-software-testing/lab6/src/bmpcomp+0x2cc4)

SUMMARY: AddressSanitizer: stack-overflow /home/hsuanyu/112-spring-software-testing/lab6/src/hw0302.c:46 in main
```
