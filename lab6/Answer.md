Name: yiwei chen
ID: 312552043

### Fuzz Monitor
```
lq process timing qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwq overall results qqqqqk
x        run time : 0 days, 0 hrs, 1 min, 18 sec       x  cycles done : 0      x
x   last new path : 0 days, 0 hrs, 0 min, 18 sec       x  total paths : 7      x
x last uniq crash : 0 days, 0 hrs, 1 min, 2 sec        x uniq crashes : 1      x
x  last uniq hang : none seen yet                      x   uniq hangs : 0      x
tq cycle progress qqqqqqqqqqqqqqqqqqqqwq map coverage qvqqqqqqqqqqqqqqqqqqqqqqqu
x  now processing : 0 (0.00%)         x    map density : 0.05% / 0.05%         x
x paths timed out : 0 (0.00%)         x count coverage : 1.77 bits/tuple       x
tq stage progress qqqqqqqqqqqqqqqqqqqqnq findings in depth qqqqqqqqqqqqqqqqqqqqu
x  now trying : arith 8/8             x favored paths : 1 (14.29%)             x
x stage execs : 25/2230 (1.12%)       x  new edges on : 1 (14.29%)             x
x total execs : 977                   x total crashes : 47 (1 unique)          x
x  exec speed : 15.56/sec (zzzz...)   x  total tmouts : 123 (2 unique)         x
tq fuzzing strategy yields qqqqqqqqqqqvqqqqqqqqqqqqqqqwq path geometry qqqqqqqqu
x   bit flips : 4/256, 2/255, 1/253                   x    levels : 2          x
x  byte flips : 0/32, 0/31, 0/29                      x   pending : 7          x
x arithmetics : 0/0, 0/0, 0/0                         x  pend fav : 1          x
x  known ints : 0/0, 0/0, 0/0                         x own finds : 6          x
x  dictionary : 0/0, 0/0, 0/0                         x  imported : n/a        x
x       havoc : 0/0, 0/0                              x stability : 100.00%    x
x        trim : 100.00%/37, 0.00%                     tqqqqqqqqqqqqqqqqqqqqqqqqj
mqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqj          [cpu007: 21%]
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==5370==ERROR: AddressSanitizer: stack-overflow on address 0x7ffe7dd3d868 (pc 0x561d1345313d bp 0x7ffe7e53ccc0 sp 0x7ffe7dd3c870 T0)
    #0 0x561d1345313d in main /home/Desktop/ywchen/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f1b169fed8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f1b169fee3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x561d13453bc4 in _start (/home/Desktop/ywchen/software_testing/112-spring-software-testing/lab6/src/bmpcomp+0x2bc4)

SUMMARY: AddressSanitizer: stack-overflow /home/Desktop/ywchen/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==5370==ABORTING
```
