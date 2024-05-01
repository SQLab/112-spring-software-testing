Name: 吳榕憲
ID: 311552066

### Fuzz Monitor
```

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 3 hrs, 30 min, 43 sec      │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 3 min, 40 sec       │  total paths : 15     │
│ last uniq crash : 0 days, 3 hrs, 24 min, 0 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 1 hrs, 56 min, 29 sec      │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.41 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : interest 16/8         │ favored paths : 1 (6.67%)              │
│ stage execs : 79/998 (7.92%)        │  new edges on : 3 (20.00%)             │
│ total execs : 4770                  │ total crashes : 416 (1 unique)         │
│  exec speed : 0.67/sec (zzzz...)    │  total tmouts : 659 (4 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 5/224, 2/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 15         │
│ arithmetics : 6/1565, 0/1300, 0/816                 │  pend fav : 1          │
│  known ints : 1/104, 0/0, 0/0                       │ own finds : 14         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu004: 15%]


```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==214895==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc72a3dcc8 (pc 0x564f02ecc02d bp 0x7ffc7323b120 sp 0x7ffc72a3ccd0 T0)
    #0 0x564f02ecc02d in main /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7efd769fdd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7efd769fde3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x564f02eccb64 in _start (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab6/src/bmpcomp+0x2b64)

SUMMARY: AddressSanitizer: stack-overflow /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==214895==ABORTING

```
