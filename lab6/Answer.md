Name: 廖韓溢\
ID: 310552064

### Fuzz Monitor
```
lq process timing qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwq overall results qqqqqk
x        run time : 0 days, 0 hrs, 7 min, 36 sec       x  cycles done : 0      x
x   last new path : 0 days, 0 hrs, 2 min, 14 sec       x  total paths : 9      x
x last uniq crash : 0 days, 0 hrs, 5 min, 12 sec       x uniq crashes : 1      x
x  last uniq hang : 0 days, 0 hrs, 1 min, 46 sec       x   uniq hangs : 5      x
tq cycle progress qqqqqqqqqqqqqqqqqqqqwq map coverage qvqqqqqqqqqqqqqqqqqqqqqqqu
x  now processing : 0 (0.00%)         x    map density : 0.04% / 0.05%         x
x paths timed out : 0 (0.00%)         x count coverage : 1.65 bits/tuple       x
tq stage progress qqqqqqqqqqqqqqqqqqqqnq findings in depth qqqqqqqqqqqqqqqqqqqqu
x  now trying : bitflip 4/1           x favored paths : 1 (11.11%)             x
x stage execs : 146/221 (66.06%)      x  new edges on : 3 (33.33%)             x
x total execs : 707                   x total crashes : 23 (1 unique)          x
x  exec speed : 0.00/sec (zzzz...)    x  total tmouts : 70 (5 unique)          x
tq fuzzing strategy yields qqqqqqqqqqqvqqqqqqqqqqqqqqqwq path geometry qqqqqqqqu
x   bit flips : 6/224, 3/223, 0/0                     x    levels : 2          x
x  byte flips : 0/0, 0/0, 0/0                         x   pending : 9          x
x arithmetics : 0/0, 0/0, 0/0                         x  pend fav : 1          x
x  known ints : 0/0, 0/0, 0/0                         x own finds : 8          x
x  dictionary : 0/0, 0/0, 0/0                         x  imported : n/a        x
x       havoc : 0/0, 0/0                              x stability : 100.00%    x
x        trim : 100.00%/37, n/a                       tqqqqqqqqqqqqqqqqqqqqqqqqj
mqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqj          [cpu010: 12%]

```

### Run Crash Result
```
size of Herder 54
AddressSanitizer:DEADLYSIGNAL
=================================================================
==7362==ERROR: AddressSanitizer: stack-overflow on address 0x7fff7471f068 (pc 0x55862b5860f7 bp 0x7fff74f1e4c0 sp 0x7fff7471e070 T0)
    #0 0x55862b5860f6 in main /mnt/e/112交大課程/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46
    #1 0x7f1e8f7b0082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55862b586afd in _start (/mnt/e/112交大課程/software_testing/112-spring-software-testing/lab6/src/bmpcomp+0x2afd)

SUMMARY: AddressSanitizer: stack-overflow /mnt/e/112交大課程/software_testing/112-spring-software-testing/lab6/src/hw0302.c:46 in 
main
==7362==ABORTING

```
