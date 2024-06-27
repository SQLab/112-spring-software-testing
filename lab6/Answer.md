
Name: 宋承諺
ID: 111550054

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 5 min, 45 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 2 min, 29 sec       │  total paths : 21     │
│ last uniq crash : 0 days, 0 hrs, 2 min, 49 sec       │ uniq crashes : 3      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 15 (71.43%)       │    map density : 0.03% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 3.00 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 32/8            │ favored paths : 3 (14.29%)             │
│ stage execs : 731/1072 (68.19%)     │  new edges on : 3 (14.29%)             │
│ total execs : 14.4k                 │ total crashes : 4058 (3 unique)        │
│  exec speed : 13.72/sec (zzzz...)   │  total tmouts : 2248 (4 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/448, 2/446, 1/442                   │    levels : 2          │
│  byte flips : 0/56, 0/54, 0/50                      │   pending : 20         │
│ arithmetics : 7/3130, 0/2665, 0/816                 │  pend fav : 3          │
│  known ints : 1/104, 1/415, 1/709                   │ own finds : 20         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 5/4096, 0/0                           │ stability : 100.00%    │
│        trim : 99.99%/43, 0.00%                      ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 13%]
```

### Run Crash Result
```
chysong@Oatmeals-Legion:~/Homeworks/112-spring-software-testing/lab6/fuzz$ ../src/bmpcomp out/crashes/id\:000000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20 
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==37170==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc49d9c738 (pc 0x561ba427f06f bp 0x7ffc4a599b90 sp 0x7ffc49d9b740 T0)
    #0 0x561ba427f06f in main /home/chysong/Homeworks/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f0e9f227d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f0e9f227e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x561ba427fb34 in _start (/home/chysong/Homeworks/112-spring-software-testing/lab6/src/bmpcomp+0x2b34)

SUMMARY: AddressSanitizer: stack-overflow /home/chysong/Homeworks/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==37170==ABORTING
=======
```
