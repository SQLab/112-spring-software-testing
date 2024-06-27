
Name: 翁愉媃
ID:   312551035

### Fuzz Monitor
```
                american fuzzy lop 2.57b (bmpcomp)



┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐

│        run time : 0 days, 0 hrs, 1 min, 41 sec       │  cycles done : 0      │

│   last new path : 0 days, 0 hrs, 0 min, 30 sec       │  total paths : 8      │

│ last uniq crash : 0 days, 0 hrs, 1 min, 20 sec       │ uniq crashes : 1      │

│  last uniq hang : 0 days, 0 hrs, 0 min, 42 sec       │   uniq hangs : 4      │

├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤

│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │

│ paths timed out : 0 (0.00%)         │ count coverage : 1.55 bits/tuple       │

├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤

│  now trying : arith 8/8             │ favored paths : 1 (12.50%)             │

│ stage execs : 363/1864 (19.47%)     │  new edges on : 2 (25.00%)             │

│ total execs : 1218                  │ total crashes : 50 (1 unique)          │

│  exec speed : 24.46/sec (slow!)     │  total tmouts : 115 (5 unique)         │

├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤

│   bit flips : 5/224, 2/223, 1/221                   │    levels : 2          │

│  byte flips : 0/28, 0/27, 0/25                      │   pending : 8          │

│ arithmetics : 0/0, 0/0, 0/0                         │  pend fav : 1          │

│  known ints : 0/0, 0/0, 0/0                         │ own finds : 7          │

│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │

│       havoc : 0/0, 0/0                              │ stability : 100.00%    │

│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘

^C────────────────────────────────────────────────────┘          [cpu001: 58%]


```

### Run Crash Result
```

size of Herder 54

AddressSanitizer:DEADLYSIGNAL

=================================================================

==88245==ERROR: AddressSanitizer: stack-overflow on address 0x7ffde592fdd8 (pc 0x57b2ff25a03c bp 0x7ffde612e2c0 sp 0x7ffde592fdd8 T0)

    #0 0x57b2ff25a03c in main /home/emily/Documents/112-spring-software-testing/lab6/src/hw0302.c:46

    #1 0x737342a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

    #2 0x737342a29e3f in __libc_start_main_impl ../csu/libc-start.c:392

    #3 0x57b2ff25abf4 in _start (/home/emily/Documents/112-spring-software-testing/lab6/src/bmpcomp+0x2bf4)



SUMMARY: AddressSanitizer: stack-overflow /home/emily/Documents/112-spring-software-testing/lab6/src/hw0302.c:46 in main

==88245==ABORTING


```
