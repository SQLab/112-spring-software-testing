Name: Kuan-Wei Chiu (邱冠維)
ID: 312551071

### Fuzz Monitor
```
afl-fuzz 2.57b by <lcamtuf@google.com>
[+] You have 16 CPU cores and 1 runnable tasks (utilization: 6%).
[+] Try parallel jobs - see /usr/local/share/doc/afl/parallel_fuzzing.txt.

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 52 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 1 min, 7 sec        │  total paths : 18     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 48 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 1 min, 44 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.17 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 32/8            │ favored paths : 1 (5.56%)              │
│ stage execs : 760/941 (80.77%)      │  new edges on : 4 (22.22%)             │
│ total execs : 4562                  │ total crashes : 412 (1 unique)         │
│  exec speed : 9.54/sec (zzzz...)    │  total tmouts : 695 (7 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 7/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 18         │
│ arithmetics : 7/1565, 0/1300, 0/0                   │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 17         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010: 17%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==677041==ERROR: AddressSanitizer: stack-overflow on address 0x7fff616c7038 (pc 0x64a9dcf130eb bp 0x7fff61ec5490 sp 0x7fff616c6040 T0)
    #0 0x64a9dcf130eb in main /home/visitorckw/nycuhw/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7d3248c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7d3248c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x64a9dcf13c04 in _start (/home/visitorckw/nycuhw/112-spring-software-testing/lab6/src/bmpcomp+0x2c04)

SUMMARY: AddressSanitizer: stack-overflow /home/visitorckw/nycuhw/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==677041==ABORTING
```
