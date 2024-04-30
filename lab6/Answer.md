Name: 洪佳瑜
ID: 311552005

### Fuzz Monitor
```
┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 4 min, 40 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 33 sec       │  total paths : 20     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 42 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 2 min, 37 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.06% / 0.07%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.26 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 16/8            │ favored paths : 1 (5.00%)              │
│ stage execs : 795/2032 (39.12%)     │  new edges on : 4 (20.00%)             │
│ total execs : 3312                  │ total crashes : 7 (1 unique)           │
│  exec speed : 1.37/sec (zzz...)     │  total tmouts : 512 (6 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 4/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 20         │
│ arithmetics : 9/1565, 0/0, 0/0                      │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 19         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘             [cpu:158%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==66200==ERROR: AddressSanitizer: stack-overflow on address 0x7ffc0af935d8 (pc 0x5648595ab180 bp 0x7ffc0b792ac0 sp 0x7ffc0af935d8 T0)
    #0 0x5648595ab17f in main /home/hypervisor/Desktop/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fb198c42082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5648595abfdd in _start (/home/hypervisor/Desktop/112-spring-software-testing/lab6/src/bmpcomp+0x2fdd)

SUMMARY: AddressSanitizer: stack-overflow /home/hypervisor/Desktop/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==66200==ABORTING
```
