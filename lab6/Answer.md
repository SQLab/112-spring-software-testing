Name:ZIH-HAN CHEN 
ID:512557026 

### Fuzz Monitor
```
 american fuzzy lop 2.57b (bmpcomp)

lq process timing qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwq overall results qqqqqk
x        run time : 0 days, 0 hrs, 2 min, 36 sec       x  cycles done : 0      x 
x   last new path : 0 days, 0 hrs, 0 min, 0 sec        x  total paths : 12     x 
x last uniq crash : 0 days, 0 hrs, 2 min, 22 sec       x uniq crashes : 1      x 
x  last uniq hang : 0 days, 0 hrs, 2 min, 15 sec       x   uniq hangs : 4      x 
tq cycle progress qqqqqqqqqqqqqqqqqqqqwq map coverage qvqqqqqqqqqqqqqqqqqqqqqqqu 
x  now processing : 0 (0.00%)         x    map density : 0.04% / 0.05%         x 
x paths timed out : 0 (0.00%)         x count coverage : 1.85 bits/tuple       x 
tq stage progress qqqqqqqqqqqqqqqqqqqqnq findings in depth qqqqqqqqqqqqqqqqqqqqu 
x  now trying : arith 8/8             x favored paths : 1 (8.33%)              x 
x stage execs : 1251/1638 (76.37%)    x  new edges on : 4 (33.33%)             x 
x total execs : 2140                  x total crashes : 139 (1 unique)         x 
x  exec speed : 19.96/sec (zzzz...)   x  total tmouts : 177 (7 unique)         x 
tq fuzzing strategy yields qqqqqqqqqqqvqqqqqqqqqqqqqqqwq path geometry qqqqqqqqu 
x   bit flips : 5/224, 3/223, 1/221                   x    levels : 2          x 
x  byte flips : 0/28, 0/27, 0/25                      x   pending : 12         x 
x arithmetics : 0/0, 0/0, 0/0                         x  pend fav : 1          x 
x  known ints : 0/0, 0/0, 0/0                         x own finds : 11         x 
x  dictionary : 0/0, 0/0, 0/0                         x  imported : n/a        x 
x       havoc : 0/0, 0/0                              x stability : 100.00%    x 
x        trim : 100.00%/37, 0.00%                     tqqqqqqqqqqqqqqqqqqqqqqqqj   
mqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqj          [cpu010:  8%] 
```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==12908==ERROR: AddressSanitizer: stack-overflow on address 0x7fffe101a4c8 (pc 0x7f7e1f70202d bp 0x7fffe1819920 sp 0x7fffe10194d0 T0)
    #0 0x7f7e1f70202d in main /home/david/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f7e1e9c9d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f7e1e9c9e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x7f7e1f702ba4 in _start (/home/david/112-spring-software-testing/lab6/src/bmpcomp+0x2ba4)

SUMMARY: AddressSanitizer: stack-overflow /home/david/112-spring-software-testing/lab6/src/hw0302.c:46 in main
==12908==ABORTING
```