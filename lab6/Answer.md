Name: 游宗穎
ID: B122556

### Fuzz Monitor
```
                      american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 17 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 33 sec       │  total paths : 14     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 12 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 29 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.12 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 32/8            │ favored paths : 1 (7.14%)              │
│ stage execs : 424/1587 (26.72%)     │  new edges on : 3 (21.43%)             │
│ total execs : 3588                  │ total crashes : 308 (1 unique)         │
│  exec speed : 52.84/sec (slow!)     │  total tmouts : 253 (6 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/192, 2/191, 1/189                   │    levels : 2          │
│  byte flips : 0/24, 0/23, 0/21                      │   pending : 14         │
│ arithmetics : 6/1341, 0/1029, 0/0                   │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 13         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/35, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  9%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==21798==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd28a74928 (pc 0x577e38ff8fd1 bp 0x7ffd2a2756a0 sp 0x7ffd28a74930 T0)
    #0 0x577e38ff8fd1 in main /home/an920107/Documents/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7eea77a43ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x7eea77a43d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x577e38ff9944 in _start (/home/an920107/Documents/112-spring-software-testing/lab6/src/bmpcomp+0x2944) (BuildId: e279c0a810652a891005715aa03e3c5352efb661)

SUMMARY: AddressSanitizer: stack-overflow /home/an920107/Documents/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==21798==ABORTING
```
