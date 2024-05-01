Name: 林冠甫
ID: 312552038

### Fuzz Monitor
```
lq process timing qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwq overall results qqqqqk
x        run time : 0 days, 0 hrs, 2 min, 54 sec       x  cycles done : 0      x
x   last new path : 0 days, 0 hrs, 0 min, 22 sec       x  total paths : 18     x
x last uniq crash : 0 days, 0 hrs, 2 min, 40 sec       x uniq crashes : 1      x
x  last uniq hang : none seen yet                      x   uniq hangs : 0      x
tq cycle progress qqqqqqqqqqqqqqqqqqqqwq map coverage qvqqqqqqqqqqqqqqqqqqqqqqqu
x  now processing : 0 (0.00%)         x    map density : 0.05% / 0.05%         x
x paths timed out : 0 (0.00%)         x count coverage : 2.28 bits/tuple       x
tq stage progress qqqqqqqqqqqqqqqqqqqqnq findings in depth qqqqqqqqqqqqqqqqqqqqu
x  now trying : arith 8/8             x favored paths : 1 (5.56%)              x
x stage execs : 1412/1879 (75.15%)    x  new edges on : 4 (22.22%)             x
x total execs : 2435                  x total crashes : 112 (1 unique)         x
x  exec speed : 6.09/sec (zzzz...)    x  total tmouts : 333 (6 unique)         x
tq fuzzing strategy yields qqqqqqqqqqqvqqqqqqqqqqqqqqqwq path geometry qqqqqqqqu
x   bit flips : 5/256, 4/255, 1/253                   x    levels : 2          x
x  byte flips : 0/32, 0/31, 0/29                      x   pending : 18         x
x arithmetics : 0/0, 0/0, 0/0                         x  pend fav : 1          x
x  known ints : 0/0, 0/0, 0/0                         x own finds : 17         x
x  dictionary : 0/0, 0/0, 0/0                         x  imported : n/a        x
x       havoc : 0/0, 0/0                              x stability : 100.00%    x
x        trim : 100.00%/37, 0.00%                     tqqqqqqqqqqqqqqqqqqqqqqqqj
mqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqj          [cpu004: 16%]

```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==9515==ERROR: AddressSanitizer: stack-overflow on address 0x7ffdf981c658 (pc 0x56001415510c bp 0x7ffdfa01ab40 sp 0x7ffdf981c658 T0)
    #0 0x56001415510c in main /home/kf/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f5827badd8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f5827bade3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x560014155de4 in _start (/home/kf/112-spring-software-testing/lab6/src/bmpcomp+0x2de4)

SUMMARY: AddressSanitizer: stack-overflow /home/kf/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==9515==ABORTING
```
