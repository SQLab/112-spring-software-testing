Name: 潘甫翰 
ID: a121100

### Fuzz Monitor

```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 22 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 42 sec       │  total paths : 5      │
│ last uniq crash : 0 days, 0 hrs, 0 min, 44 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 53 sec       │   uniq hangs : 1      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.30 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (20.00%)             │
│ stage execs : 163/223 (73.09%)      │  new edges on : 2 (40.00%)             │
│ total execs : 480                   │ total crashes : 11 (1 unique)          │
│  exec speed : 7.70/sec (zzzz...)    │  total tmouts : 167 (6 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 5          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 4          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/47, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu000: 26%]
```

### Run Crash Result

```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==13210==ERROR: AddressSanitizer: stack-overflow on address 0x7ffcf35ffe58 (pc 0x5ced1eb1210f bp 0x7ffcf3dfd2b0 sp 0x7ffcf35fee60 T0)
    #0 0x5ced1eb1210f in main /home/shark/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x719d48a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x719d48a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ced1eb12c14 in _start (/home/shark/software_testing/112-spring-software-testing/lab6/src/bmpcomp+0x2c14)

SUMMARY: AddressSanitizer: stack-overflow /home/shark/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==13210==ABORTING
```
