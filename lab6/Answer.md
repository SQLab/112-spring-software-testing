Name: chenzhenyin
ID: 312552058

### Fuzz Monitor
```
                        american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 20 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 29 sec       │  total paths : 6      │
│ last uniq crash : 0 days, 0 hrs, 1 min, 4 sec        │ uniq crashes : 1      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.04%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.70 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : bitflip 4/1           │ favored paths : 1 (16.67%)             │
│ stage execs : 183/253 (72.33%)      │  new edges on : 1 (16.67%)             │
│ total execs : 782                   │ total crashes : 40 (1 unique)          │
│  exec speed : 3.86/sec (zzzz...)    │  total tmouts : 77 (3 unique)          │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/256, 2/255, 0/0                     │    levels : 2          │
│  byte flips : 0/0, 0/0, 0/0                         │   pending : 6          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 5          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, n/a                       ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu004: 21%]

+++ Testing aborted by user +++
[+] We're done here. Have a nice day!
```

### Run Crash Result
```   
annie@DESKTOP-99MH8R8:~/lab6/fuzz$ ../src/bmpcomp out/crashes/id\:000000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==104684==ERROR: AddressSanitizer: stack-overflow on address 0x7ffd312427a8 (pc 0x55cca520702e bp 0x7ffd31a40c00 sp 0x7ffd312417b0 T0)
    #0 0x55cca520702e in main /home/annie/lab6/src/hw0302.c:46
    #1 0x7fae1b2ced8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7fae1b2cee3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x55cca5207b64 in _start (/home/annie/lab6/src/bmpcomp+0x2b64)

SUMMARY: AddressSanitizer: stack-overflow /home/annie/lab6/src/hw0302.c:46 in main
==104684==ABORTING             
```
