Name: 
ID: 

### Fuzz Monitor
```
american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 2 hrs, 13 min, 37 sec      │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 29 min, 54 sec      │  total paths : 9      │
│ last uniq crash : 0 days, 1 hrs, 50 min, 49 sec      │ uniq crashes : 1      │
│  last uniq hang : 0 days, 1 hrs, 17 min, 47 sec      │   uniq hangs : 6      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 1.84 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (11.11%)             │
│ stage execs : 205/1904 (10.77%)     │  new edges on : 3 (33.33%)             │
│ total execs : 1062                  │ total crashes : 50 (1 unique)          │
│  exec speed : 0.00/sec (zzzz...)    │  total tmouts : 363 (6 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 1/223, 1/221                   │    levels : 2          │
│  byte flips : 1/28, 0/27, 0/25                      │   pending : 9          │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 8          │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  8%]
```

### Run Crash Result
```
==4700==ERROR: AddressSanitizer: stack-overflow on address 0x7fff73c43e68 (pc 0x5580d454906f bp 0x7fff744412c0 sp 0x7fff73c42e70 T0)
    #0 0x5580d454906f in main /mnt/c/Users/John8/Desktop/homework/SoftwareTesting/hw1/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7faf871f4d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7faf871f4e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x5580d4549c24 in _start (/mnt/c/Users/John8/Desktop/homework/SoftwareTesting/hw1/112-spring-software-testing/lab6/src/bmpcomp+0x2c24) 

SUMMARY: AddressSanitizer: stack-overflow /mnt/c/Users/John8/Desktop/homework/SoftwareTesting/hw1/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==4700==ABORTING
```
