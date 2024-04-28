Name: 盧均祐
ID: 111550065

### Fuzz Monitor
```
afl-fuzz 2.57b by <lcamtuf@google.com>
[+] You have 8 CPU cores and 5 runnable tasks (utilization: 62%).
[+] Try parallel jobs - see /usr/local/share/doc/afl/parallel_fuzzing.txt.
[*] Checking CPU core loadout...
[+] Found a free CPU core, binding to #4.
[*] Checking core_pattern...

[-] Hmm, your system is configured to send core dump notifications to an
    external utility. This will cause issues: there will be an extended delay
    between stumbling upon a crash and having this information relayed to the

                       american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 9 min, 53 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 49 sec       │  total paths : 17     │
│ last uniq crash : 0 days, 0 hrs, 9 min, 11 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 3 min, 23 sec       │   uniq hangs : 3      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.05% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.31 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : arith 8/8             │ favored paths : 1 (5.88%)              │
│ stage execs : 1363/1610 (84.66%)    │  new edges on : 3 (17.65%)             │
│ total execs : 2273                  │ total crashes : 109 (1 unique)         │
│  exec speed : 2.06/sec (zzzz...)    │  total tmouts : 1027 (5 unique)        │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 6/224, 2/223, 2/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 17         │
│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │
│  known ints : 0/0, 0/0, 0/0                         │ own finds : 16         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/43, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu004: 28%]


```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==15824==ERROR: AddressSanitizer: stack-overflow on address 0x7fffb7b3ff18 (pc 0x5c586724e18e bp 0x7fffb833e370 sp 0x7fffb7b3ef20 T0)
    #0 0x5c586724e18e in main /home/mushroom/下載/Github/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x72e775429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x72e775429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c586724ed14 in _start (/home/mushroom/下載/Github/112-spring-software-testing/lab6/src/bmpcomp+0x2d14)

SUMMARY: AddressSanitizer: stack-overflow /home/mushroom/下載/Github/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==15824==ABORTING
```
