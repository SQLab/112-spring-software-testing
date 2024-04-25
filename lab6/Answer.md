Name: 鄧人豪
ID: 110550174

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 22 min, 45 sec      │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 27 sec       │  total paths : 9      │
│ last uniq crash : 0 days, 0 hrs, 21 min, 57 sec      │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 21 min, 56 sec      │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.10 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : interest 16/8         │ favored paths : 1 (11.11%)             │
│ stage execs : 107/836 (12.80%)      │  new edges on : 3 (33.33%)             │
│ total execs : 3996                  │ total crashes : 415 (1 unique)         │
│  exec speed : 4.88/sec (zzzz...)    │  total tmouts : 1692 (8 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/192, 2/191, 1/189                   │    levels : 2          │
│  byte flips : 0/24, 0/23, 0/21                      │   pending : 9          │
│ arithmetics : 0/1341, 0/1029, 0/678                 │  pend fav : 1          │
│  known ints : 1/94, 0/0, 0/0                        │ own finds : 8          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/35, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu000: 30%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==103224==ERROR: AddressSanitizer: stack-overflow on address 0x7fff7ea8b6b8 (pc 0x603507c48e69 bp 0x7fff8028c430 sp 0x7fff7ea8b6c0 T0)
    #0 0x603507c48e69 in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x72f99d443ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x72f99d443d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x603507c49904 in _start (/win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab6/src/bmpcomp+0x2904) (BuildId: 6f98f02d279310e877b12e2fa103effb700a71ba)

SUMMARY: AddressSanitizer: stack-overflow /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==103224==ABORTING
```
