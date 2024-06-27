Name: 蔡怡葶
ID: 312552050

### Fuzz Monitor
```
                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 2 min, 24 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 13 sec       │  total paths : 24     │
│ last uniq crash : 0 days, 0 hrs, 0 min, 13 sec       │ uniq crashes : 2      │
│  last uniq hang : none seen yet                      │   uniq hangs : 0      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.06%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.53 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : havoc                 │ favored paths : 1 (4.17%)              │
│ stage execs : 970/4096 (23.68%)     │  new edges on : 5 (20.83%)             │
│ total execs : 6862                  │ total crashes : 1229 (2 unique)        │
│  exec speed : 66.99/sec (slow!)     │  total tmouts : 1139 (5 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 4/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 24         │
│ arithmetics : 7/1565, 0/1300, 0/816                 │  pend fav : 1          │
│  known ints : 1/104, 2/415, 0/709                   │ own finds : 23         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 11%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==22921==ERROR: AddressSanitizer: stack-overflow on address 0x7fff04ae8b08 (pc 0x55dfa2eb5114 bp 0x7fff052e6ff0 sp 0x7fff04ae8b08 T0)
    #0 0x55dfa2eb5114 in main /home/yeeeee/ST/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fbcf0f44d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fbcf0f44e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55dfa2eb5cb4 in _start (/home/yeeeee/ST/112-spring-software-testing/lab6/src/bmpcomp+0x2cb4)

SUMMARY: AddressSanitizer: stack-overflow /home/yeeeee/ST/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==22921==ABORTING
```
