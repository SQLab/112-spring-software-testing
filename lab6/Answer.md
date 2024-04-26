Name: 謝翔丞
ID: 312551183

### Fuzz Monitor
```
                      american fuzzy lop 2.57b (bmpcomp)

┌─ process timing ─────────────────────────────────────┬─ overall results ─────┐
│        run time : 0 days, 0 hrs, 1 min, 37 sec       │  cycles done : 0      │
│   last new path : 0 days, 0 hrs, 0 min, 2 sec        │  total paths : 19     │
│ last uniq crash : 0 days, 0 hrs, 1 min, 34 sec       │ uniq crashes : 1      │
│  last uniq hang : 0 days, 0 hrs, 0 min, 53 sec       │   uniq hangs : 2      │
├─ cycle progress ────────────────────┬─ map coverage ─┴───────────────────────┤
│  now processing : 0 (0.00%)         │    map density : 0.04% / 0.05%         │
│ paths timed out : 0 (0.00%)         │ count coverage : 2.45 bits/tuple       │
├─ stage progress ────────────────────┼─ findings in depth ────────────────────┤
│  now trying : interest 16/8         │ favored paths : 1 (5.26%)              │
│ stage execs : 395/442 (89.37%)      │  new edges on : 4 (21.05%)             │
│ total execs : 5123                  │ total crashes : 449 (1 unique)         │
│  exec speed : 42.69/sec (slow!)     │  total tmouts : 806 (5 unique)         │
├─ fuzzing strategy yields ───────────┴───────────────┬─ path geometry ────────┤
│   bit flips : 4/224, 3/223, 1/221                   │    levels : 2          │
│  byte flips : 0/28, 0/27, 0/25                      │   pending : 19         │
│ arithmetics : 8/1565, 0/1300, 0/816                 │  pend fav : 1          │
│  known ints : 1/104, 0/0, 0/0                       │ own finds : 18         │
│  dictionary : 0/0, 0/0, 0/0                         │  imported : n/a        │
│       havoc : 0/0, 0/0                              │ stability : 100.00%    │
│        trim : 100.00%/37, 0.00%                     ├────────────────────────┘
└─────────────────────────────────────────────────────┘          [cpu010:  8%]

```

### Run Crash Result
```
../src/bmpcomp out/crashes/id\:000000\,sig\:06\,src\:000000\,op\:flip1\,pos\:20 
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==605364==ERROR: AddressSanitizer: stack-overflow on address 0x7ffed4499c78 (pc 0x5599644a005d bp 0x7ffed4c980d0 sp 0x7ffed4498c80 T0)
    #0 0x5599644a005d in main /home/docker/workspace/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fa1eba29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fa1eba29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5599644a0c14 in _start (/home/anonymouself/st_tool_study/112-spring-software-testing/lab6/src/bmpcomp+0x2c14)

SUMMARY: AddressSanitizer: stack-overflow /home/docker/workspace/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==605364==ABORTING
```
