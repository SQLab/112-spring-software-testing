Name: 林奕辰
ID: b122552

### Fuzz Monitor
```

                       american fuzzy lop 2.57b (bmpcomp)
┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 2 min, 48 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 46 sec       │  total paths : 6      │
│ last uniq crash : 0 days, 0 hrs, 1 min, 0 sec        │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 40 sec       │   uniq hangs : 4      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.50 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 2/1           │ favored paths : 1 (16.67%)             │
│ stage execs : 33/223 (14.80%)       │  new edges on : 2 (33.33%)             │
│ total execs : 347                   │ total crashes : 10 (1 unique)          │
│  exec speed : 2.05/sec (zzzz...)    │  total tmouts : 35 (4 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 0/0, 0/0                       │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 6          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 10%]
```

### Run Crash Result
```
tremolo@TREMOLO:/usr/Albert/112-spring-software-testing/lab6/fuzz$ ../src/bmpcomp out/crashes/id\:000
000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==208133==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd4df72db8 (pc 0x55dd0db65fef bp 0x7ffd4e771210 sp 0x7ffd4df71dc0 T0)
    #0 0x55dd0db65fef in main /usr/Albert/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fb225236d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb252396e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55dd0db66be4 in _start (/usr/Albert/112-spring-software-testing/lab6/src/bmpcomp+0x2be4)
SUMMARY: AddressSanitizer: stack-overflow /usr/Albert/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==208133==ABORTING

```
