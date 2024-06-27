Name: 劉豈瑞
ID: 311551186

### Fuzz Monitor
```

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 7 min, 3 sec        │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 3 min, 16 sec       │  total paths : 18     │
│ last uniq crash : 0 days, 0 hrs, 6 min, 41 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 5 min, 46 sec       │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.53 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 32/8            │ favored paths : 1 (5.56%)              │
│ stage execs : 475/1992 (23.85%)     │  new edges on : 4 (22.22%)             │
│ total execs : 4276                  │ total crashes : 305 (1 unique)         │
│  exec speed : 11.33/sec (zzzz...)   │  total tmouts : 701 (7 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 18         │
│ arithmetics : 8/1565, 0/1300, 0/0                   │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 17         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/41, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu000:303%]

```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==20151==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc39950c88 (pc 0x55e620bae08c bp 0x7ffc3a14e170 sp 0x7ffc39950c88 T0)
    #0 0x55e620bae08b in main /workspaces/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f8a1dc9b082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55e620baeb6d in _start (/workspaces/112-spring-software-testing/lab6/src/bmpcomp+0x2b6d)

SUMMARY: AddressSanitizer: stack-overflow /workspaces/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==20151==ABORTING
```
