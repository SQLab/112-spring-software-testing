Name: 陳品文  
ID: 110550144  

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 55 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 47 sec       │  total paths : 14     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 48 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.09 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 1 (7.14%)              │
│ stage execs : 1019/1056 (96.50%)    │  new edges on : 1 (7.14%)              │
│ total execs : 3151                  │ total crashes : 308 (1 unique)         │
│  exec speed : 7.84/sec (zzzz...)    │  total tmouts : 244 (3 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/192, 2/191, 1/189                   │    levels : 2          │
│  byte flips : 0/24, 0/23, 0/21                      │   pending : 14         │
│ arithmetics : 7/1341, 0/0, 0/0                      │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 13         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/35, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 23%]
```

### Run Crash Result
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==19925==ERROR: AddressSanitizer: stack-overflow on address 0x7fff93658808 (pc 0x57871fca5eea bp 0x7fff94e59580 sp 0x7fff93658810 T0)
    #0 0x57871fca5eea in main /home/nelsonchen/nycu/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x732c8fd57ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x732c8fd57d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x57871fca68d4 in _start (/home/nelsonchen/nycu/112-spring-software-testing/lab6/src/bmpcomp+0x28d4) (BuildId: a0b9d7b1b9c9be61fe81c8839c871d55f9e962fc)

SUMMARY: AddressSanitizer: stack-overflow /home/nelsonchen/nycu/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==19925==ABORTING
```
