Name: Ping-Ting Liu
ID: 110550159

### Fuzz Monitor

```

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 0 min, 46 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 0 sec        │  total paths : 5      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 38 sec       │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.32 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 1/1           │ favored paths : 1 (20.00%)             │
│ stage execs : 184/192 (95.83%)      │  new edges on : 2 (40.00%)             │
│ total execs : 262                   │ total crashes : 10 (1 unique)          │
│  exec speed : 107.7/sec             │  total tmouts : 11 (2 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 0/0, 0/0, 0/0                         │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 5          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 4          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/35, n/a                       ├────────────────────────┘
^C────────────────────────────────────────────────────┘          [cpu010: 17%]

+++ Testing aborted by user +++
[+] We're done here. Have a nice day!
```

### Run Crash Result

```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==122716==ERROR: AddressSanitizer: stack-overflow on address 0x7ffcb33589d8 (pc 0x62bf3b684f21 bp 0x7ffcb4b59750 sp 0x7ffcb33589e0 T0)
    #0 0x62bf3b684f21 in main /home/daniel/Documents/Homework/SoftwareTesting/lab/lab6/src/hw0302.c:46
    #1 0x7200cc357ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #2 0x7200cc357d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #3 0x62bf3b685974 in _start (/home/daniel/Documents/Homework/SoftwareTesting/lab/lab6/src/bmpcomp+0x2974) (BuildId: 32178f7e5bc4cdf7109184843baca3986ef9487c)

SUMMARY: AddressSanitizer: stack-overflow /home/daniel/Documents/Homework/SoftwareTesting/lab/lab6/src/hw0302.c:46 in main
==122716==ABORTING
```
