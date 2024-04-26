Name: 朱驛
ID: 312555018

### Fuzz Monitor
```
american fuzzy lop 2.57b (bmpcomp)

lqprocess timing qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwqoverall results qqqqqk
x       run time : 0 days, 0 hrs, 0 min, 49 sec       x cycles done : 0      x
x  last new path : 0 days, 0 hrs, 0 min, 16 sec       x total paths : 7      x
xlast uniq crash : 0 days, 0 hrs, 0 min, 19 sec       x uniq crashes : 1     x
x last uniq hang : 0 days, 0 hrs, 0 min, 14 sec       x uniq hangs : 2       x
tqcycle progress qqqqqqqqqqqqqqqqqqqqwqmap coverage qvqqqqqqqqqqqqqqqqqqqqqqqu
x now processing : 0 (0.00%)         x   map density : 0.05% / 0.05%         x
xpaths timed out : 0 (0.00%)         xcount coverage : 1.35 bits/tuple       x
tqstage progress qqqqqqqqqqqqqqqqqqqqnqfindings in depth qqqqqqqqqqqqqqqqqqqqu
x now trying : bitflip 1/1           xfavored paths : 1 (14.29%)             x
xstage execs : 229/256 (89.45%)      x new edges on : 3 (42.86%)             x
xtotal execs : 394                   xtotal crashes : 10 (1 unique)          x
x exec speed : 3.32/sec (zzzz...)    x total tmouts : 40 (3 unique)          x
tqfuzzing strategy yields qqqqqqqqqqqvqqqqqqqqqqqqqqqwqpath geometry qqqqqqqqu
x  bit flips : 0/0, 0/0, 0/0                         x   levels : 2          x
x byte flips : 0/0, 0/0, 0/0                         x  pending : 7          x
xarithmetics : 0/0, 0/0, 0/0                         x pend fav : 1          x
x known ints : 0/0, 0/0, 0/0                         xown finds : 6          x
x dictionary : 0/0, 0/0, 0/0                         x imported : n/a        x
x      havoc : 0/0, 0/0                              xstability : 100.00%    x
x       trim : 100.00%/112, n/a                      tqqqqqqqqqqqqqqqqqqqqqqqqj
^Cqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqj         [cpu004: 20%]

+++ Testing aborted by user +++
[+] We're done here. Have a nice day!

```

### Run Crash Result
```
ize of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==216185==ERROR: AddressSanitizer: stack-overflow on address 0x7ffef2f271a8 (pc 0x5597f6b751d7 bp 0x7ffef3726620 sp 0x7ffef2f261b0 T0)
    #0 0x5597f6b751d7 in main /home/neil/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7fd63221ad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd63221ae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5597f6b75c64 in _start (/home/neil/112-spring-software-testing/lab6/src/bmpcomp+0x2c64)

SUMMARY: AddressSanitizer: stack-overflow /home/neil/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==216185==ABORTING
```

