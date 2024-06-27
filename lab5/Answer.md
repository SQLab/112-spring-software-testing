# Answer

Name: Kuan-Wei Chiu (邱冠維)
ID: 312551071

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    YES   | YES  |
| Stack out-of-bounds  |    NO    | YES  |
| Global out-of-bounds |    NO    | YES  |
| Use-after-free       |    YES   | YES  |
| Use-after-return     |    YES   | YES  |

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>

int main()
{
    char *p = malloc(sizeof(char));
    p[1] = 'a';

    return 0;
}
```
#### Valgrind Report
```
==829827== Memcheck, a memory error detector
==829827== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==829827== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==829827== Command: ./a.out
==829827== 
==829827== Invalid write of size 1
==829827==    at 0x10916B: main (heap.c:6)
==829827==  Address 0x4a9b041 is 0 bytes after a block of size 1 alloc'd
==829827==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==829827==    by 0x10915E: main (heap.c:5)
==829827== 
==829827== 
==829827== HEAP SUMMARY:
==829827==     in use at exit: 1 bytes in 1 blocks
==829827==   total heap usage: 1 allocs, 0 frees, 1 bytes allocated
==829827== 
==829827== LEAK SUMMARY:
==829827==    definitely lost: 1 bytes in 1 blocks
==829827==    indirectly lost: 0 bytes in 0 blocks
==829827==      possibly lost: 0 bytes in 0 blocks
==829827==    still reachable: 0 bytes in 0 blocks
==829827==         suppressed: 0 bytes in 0 blocks
==829827== Rerun with --leak-check=full to see details of leaked memory
==829827== 
==829827== For lists of detected and suppressed errors, rerun with: -s
==829827== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==815927==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000011 at pc 0x58f4651661ff bp 0x7fff581e9ec0 sp 0x7fff581e9eb0
WRITE of size 1 at 0x602000000011 thread T0
    #0 0x58f4651661fe in main heap.c:6
    #1 0x7bf4f1429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7bf4f1429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x58f4651660e4 in _start (/home/visitorckw/nycuhw/112-spring-software-testing/lab5/src/a.out+0x10e4)

0x602000000011 is located 0 bytes to the right of 1-byte region [0x602000000010,0x602000000011)
allocated by thread T0 here:
    #0 0x7bf4f18b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x58f4651661be in main heap.c:5
    #2 0x7bf4f1429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow heap.c:6 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[01]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==815927==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdlib.h>

int main()
{
    char p[1];
    p[2] = 'a';

    return 0;
}
```
#### Valgrind Report
```
==914406== Memcheck, a memory error detector
==914406== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==914406== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==914406== Command: ./a.out
==914406== 
==914406== 
==914406== HEAP SUMMARY:
==914406==     in use at exit: 0 bytes in 0 blocks
==914406==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==914406== 
==914406== All heap blocks were freed -- no leaks are possible
==914406== 
==914406== For lists of detected and suppressed errors, rerun with: -s
==914406== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==923196==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe2d4d53c2 at pc 0x5ff80a369253 bp 0x7ffe2d4d5390 sp 0x7ffe2d4d5380
WRITE of size 1 at 0x7ffe2d4d53c2 thread T0
    #0 0x5ff80a369252 in main stack.c:6
    #1 0x74b727429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x74b727429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ff80a3690e4 in _start (/home/visitorckw/nycuhw/112-spring-software-testing/lab5/src/a.out+0x10e4)

Address 0x7ffe2d4d53c2 is located in stack of thread T0 at offset 34 in frame
    #0 0x5ff80a3691b8 in main stack.c:4

  This frame has 1 object(s):
    [32, 33) 'p' (line 5) <== Memory access at offset 34 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow stack.c:6 in main
Shadow bytes around the buggy address:
  0x100045a92a20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045a92a30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045a92a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045a92a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045a92a60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100045a92a70: 00 00 00 00 f1 f1 f1 f1[01]f3 f3 f3 00 00 00 00
  0x100045a92a80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045a92a90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045a92aa0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045a92ab0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045a92ac0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==923196==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdlib.h>

char p[1];

int main()
{
    p[2] = 'a';

    return 0;
}
```
#### Valgrind Report
```
==944776== Memcheck, a memory error detector
==944776== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==944776== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==944776== Command: ./a.out
==944776== 
==944776== 
==944776== HEAP SUMMARY:
==944776==     in use at exit: 0 bytes in 0 blocks
==944776==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==944776== 
==944776== All heap blocks were freed -- no leaks are possible
==944776== 
==944776== For lists of detected and suppressed errors, rerun with: -s
==944776== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==953125==ERROR: AddressSanitizer: global-buffer-overflow on address 0x58a1492130a2 at pc 0x58a149210208 bp 0x7ffe518a01e0 sp 0x7ffe518a01d0
WRITE of size 1 at 0x58a1492130a2 thread T0
    #0 0x58a149210207 in main global.c:7
    #1 0x752edde29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x752edde29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x58a149210104 in _start (/home/visitorckw/nycuhw/112-spring-software-testing/lab5/src/a.out+0x1104)

0x58a1492130a2 is located 1 bytes to the right of global variable 'p' defined in './global.c:3:6' (0x58a1492130a0) of size 1
  'p' is ascii string ''
SUMMARY: AddressSanitizer: global-buffer-overflow global.c:7 in main
Shadow bytes around the buggy address:
  0x0b14a923a5c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b14a923a5d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b14a923a5e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b14a923a5f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b14a923a600: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0b14a923a610: 00 00 00 00[01]f9 f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0b14a923a620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b14a923a630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b14a923a640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b14a923a650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b14a923a660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==953125==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdlib.h>

int main()
{
    char *p = malloc(5);
    free(p);
    p[0] = 'a';

    return 0;
}
```
#### Valgrind Report
```
==989060== Memcheck, a memory error detector
==989060== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==989060== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==989060== Command: ./a.out
==989060== 
==989060== Invalid write of size 1
==989060==    at 0x109193: main (uaf.c:7)
==989060==  Address 0x4a9b040 is 0 bytes inside a block of size 5 free'd
==989060==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==989060==    by 0x10918E: main (uaf.c:6)
==989060==  Block was alloc'd at
==989060==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==989060==    by 0x10917E: main (uaf.c:5)
==989060== 
==989060== 
==989060== HEAP SUMMARY:
==989060==     in use at exit: 0 bytes in 0 blocks
==989060==   total heap usage: 1 allocs, 1 frees, 5 bytes allocated
==989060== 
==989060== All heap blocks were freed -- no leaks are possible
==989060== 
==989060== For lists of detected and suppressed errors, rerun with: -s
==989060== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==979189==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5cab9954f223 bp 0x7ffe44bf16c0 sp 0x7ffe44bf16b0
WRITE of size 1 at 0x602000000010 thread T0
    #0 0x5cab9954f222 in main uaf.c:7
    #1 0x740d8c429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x740d8c429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5cab9954f104 in _start (/home/visitorckw/nycuhw/112-spring-software-testing/lab5/src/a.out+0x1104)

0x602000000010 is located 0 bytes inside of 5-byte region [0x602000000010,0x602000000015)
freed by thread T0 here:
    #0 0x740d8c8b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5cab9954f1ee in main uaf.c:6
    #2 0x740d8c429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x740d8c8b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5cab9954f1de in main uaf.c:5
    #2 0x740d8c429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free uaf.c:7 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
  Left alloca redzone:     ca
  Right alloca redzone:    cb
  Shadow gap:              cc
==979189==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdlib.h>

char *f()
{
    char p[5] = "abc";

    return p;
}

int main()
{
    char *p = f();
    p[1] = 'a';

    return 0;
}
```
#### Valgrind Report
```
==1018822== Memcheck, a memory error detector
==1018822== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1018822== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==1018822== Command: ./a.out
==1018822== 
==1018822== Invalid write of size 1
==1018822==    at 0x109165: main (uar.c:13)
==1018822==  Address 0x1 is not stack'd, malloc'd or (recently) free'd
==1018822== 
==1018822== 
==1018822== Process terminating with default action of signal 11 (SIGSEGV)
==1018822==  Access not within mapped region at address 0x1
==1018822==    at 0x109165: main (uar.c:13)
==1018822==  If you believe this happened as a result of a stack
==1018822==  overflow in your program's main thread (unlikely but
==1018822==  possible), you can try to increase the size of the
==1018822==  main thread stack using the --main-stacksize= flag.
==1018822==  The main thread stack size used in this run was 8388608.
==1018822== 
==1018822== HEAP SUMMARY:
==1018822==     in use at exit: 0 bytes in 0 blocks
==1018822==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==1018822== 
==1018822== All heap blocks were freed -- no leaks are possible
==1018822== 
==1018822== For lists of detected and suppressed errors, rerun with: -s
==1018822== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==1028196==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000001 (pc 0x5ba69b09734b bp 0x7ffce5a78f40 sp 0x7ffce5a78f30 T0)
==1028196==The signal is caused by a WRITE memory access.
==1028196==Hint: address points to the zero page.
    #0 0x5ba69b09734b in main uar.c:13
    #1 0x743db8e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x743db8e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ba69b097104 in _start (/home/visitorckw/nycuhw/112-spring-software-testing/lab5/src/a.out+0x1104)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV uar.c:13 in main
==1028196==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdlib.h>

int main()
{
    char *a = malloc(10 * sizeof(char));
    char *b = malloc(10 * sizeof(char));
    long long int diff = b - a;
    
    a[5 + diff] = 10;

    free(a);
    free(b);

    return 0;
}
```
### Why

You can determine how much array a exceeds its bounds precisely enough to access array b by calculating their relative positions. As long as the accessed memory is within either array a or array b, ASan won't report an error.
