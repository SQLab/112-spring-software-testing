# Answer

Name: 吳明憲
ID: 312551148
# gcc -fsanitize=address -Og -g -o test test.c

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    Y     |  Y   |
| Stack out-of-bounds  |    X     |  Y   |
| Global out-of-bounds |    X     |  Y   |
| Use-after-free       |    Y     |  Y   |
| Use-after-return     |    Y     |  Y   |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int *heap = malloc(sizeof(int) * 3);
    memset(heap, 0, 3);
    printf("%d", heap[3]);
}
```
#### Valgrind Report
```
==1555157== Memcheck, a memory error detector
==1555157== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1555157== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==1555157== Command: ./test
==1555157== 
==1555157== Invalid read of size 4
==1555157==    at 0x1091C1: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1555157==  Address 0x4a5204c is 0 bytes after a block of size 12 alloc'd
==1555157==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==1555157==    by 0x10919E: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1555157== 
0==1555157== 
==1555157== HEAP SUMMARY:
==1555157==     in use at exit: 12 bytes in 1 blocks
==1555157==   total heap usage: 2 allocs, 1 frees, 1,036 bytes allocated
==1555157== 
==1555157== LEAK SUMMARY:
==1555157==    definitely lost: 12 bytes in 1 blocks
==1555157==    indirectly lost: 0 bytes in 0 blocks
==1555157==      possibly lost: 0 bytes in 0 blocks
==1555157==    still reachable: 0 bytes in 0 blocks
==1555157==         suppressed: 0 bytes in 0 blocks
==1555157== Rerun with --leak-check=full to see details of leaked memory
==1555157== 
==1555157== For lists of detected and suppressed errors, rerun with: -s
==1555157== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==1555518==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000001c at pc 0x55627a496295 bp 0x7ffc8e6a49a0 sp 0x7ffc8e6a4990
READ of size 4 at 0x60200000001c thread T0
    #0 0x55627a496294 in main /home/hsien/112-spring-software-testing/lab5/test.c:8
    #1 0x7f9c01fa3082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55627a49616d in _start (/home/hsien/112-spring-software-testing/lab5/test+0x116d)

0x60200000001c is located 0 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x7f9c0227e808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x55627a496237 in main /home/hsien/112-spring-software-testing/lab5/test.c:6

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/hsien/112-spring-software-testing/lab5/test.c:8 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00[04]fa fa fa fa fa fa fa fa fa fa fa fa
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
==1555518==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int stack[2];
    memset(stack, 0 , 2);
    printf("%d", stack[2]);
}
```
#### Valgrind Report
```
==1556364== Memcheck, a memory error detector
==1556364== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1556364== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==1556364== Command: ./test
==1556364== 
-1815840000==1556364== 
==1556364== HEAP SUMMARY:
==1556364==     in use at exit: 0 bytes in 0 blocks
==1556364==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==1556364== 
==1556364== All heap blocks were freed -- no leaks are possible
==1556364== 
==1556364== For lists of detected and suppressed errors, rerun with: -s
==1556364== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==1556749==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffd3652658 at pc 0x563aebfc634d bp 0x7fffd3652620 sp 0x7fffd3652610
READ of size 4 at 0x7fffd3652658 thread T0
    #0 0x563aebfc634c in main /home/hsien/112-spring-software-testing/lab5/test.c:14
    #1 0x7fc665c6a082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x563aebfc618d in _start (/home/hsien/112-spring-software-testing/lab5/test+0x118d)

Address 0x7fffd3652658 is located in stack of thread T0 at offset 40 in frame
    #0 0x563aebfc6258 in main /home/hsien/112-spring-software-testing/lab5/test.c:11

  This frame has 1 object(s):
    [32, 40) 'stack' (line 12) <== Memory access at offset 40 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/hsien/112-spring-software-testing/lab5/test.c:14 in main
Shadow bytes around the buggy address:
  0x10007a6c2470: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007a6c2480: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007a6c2490: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007a6c24a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007a6c24b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10007a6c24c0: 00 00 00 00 00 00 f1 f1 f1 f1 00[f3]f3 f3 00 00
  0x10007a6c24d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007a6c24e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007a6c24f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007a6c2500: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007a6c2510: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==1556749==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int gbl[2] = {1, 2};
int main() {
    printf("%d", gbl[2]);
}
```
#### Valgrind Report
```
==1556879== Memcheck, a memory error detector
==1556879== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1556879== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==1556879== Command: ./test
==1556879== 
0==1556879== 
==1556879== HEAP SUMMARY:
==1556879==     in use at exit: 0 bytes in 0 blocks
==1556879==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==1556879== 
==1556879== All heap blocks were freed -- no leaks are possible
==1556879== 
==1556879== For lists of detected and suppressed errors, rerun with: -s
==1556879== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==1556946==ERROR: AddressSanitizer: global-buffer-overflow on address 0x564e02eb4028 at pc 0x564e02eb1239 bp 0x7fff7882a660 sp 0x7fff7882a650
READ of size 4 at 0x564e02eb4028 thread T0
    #0 0x564e02eb1238 in main /home/hsien/112-spring-software-testing/lab5/test.c:12
    #1 0x7f076b838082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x564e02eb112d in _start (/home/hsien/112-spring-software-testing/lab5/test+0x112d)

0x564e02eb4028 is located 0 bytes to the right of global variable 'gbl' defined in 'test.c:10:5' (0x564e02eb4020) of size 8
SUMMARY: AddressSanitizer: global-buffer-overflow /home/hsien/112-spring-software-testing/lab5/test.c:12 in main
Shadow bytes around the buggy address:
  0x0aca405ce7b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aca405ce7c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aca405ce7d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aca405ce7e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aca405ce7f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0aca405ce800: 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0aca405ce810: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0aca405ce820: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aca405ce830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aca405ce840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aca405ce850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==1556946==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int *heap = malloc(sizeof(int)*3);
    memset(heap, 0, 3);
    free(heap);
    printf("%d", heap[0]);
}
```
#### Valgrind Report
```
==1557344== Memcheck, a memory error detector
==1557344== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1557344== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==1557344== Command: ./test
==1557344== 
==1557344== Invalid read of size 4
==1557344==    at 0x1091E9: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1557344==  Address 0x4a52040 is 0 bytes inside a block of size 12 free'd
==1557344==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==1557344==    by 0x1091E4: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1557344==  Block was alloc'd at
==1557344==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==1557344==    by 0x1091BE: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1557344== 
0==1557344== 
==1557344== HEAP SUMMARY:
==1557344==     in use at exit: 0 bytes in 0 blocks
==1557344==   total heap usage: 2 allocs, 2 frees, 1,036 bytes allocated
==1557344== 
==1557344== All heap blocks were freed -- no leaks are possible
==1557344== 
==1557344== For lists of detected and suppressed errors, rerun with: -s
==1557344== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==1557262==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55dc6ae662bb bp 0x7ffc1e5bd830 sp 0x7ffc1e5bd820
READ of size 4 at 0x602000000010 thread T0
    #0 0x55dc6ae662ba in main /home/hsien/112-spring-software-testing/lab5/test.c:8
    #1 0x7f6bd88a3082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55dc6ae6618d in _start (/home/hsien/112-spring-software-testing/lab5/test+0x118d)

0x602000000010 is located 0 bytes inside of 12-byte region [0x602000000010,0x60200000001c)
freed by thread T0 here:
    #0 0x7f6bd8b7e40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x55dc6ae66274 in main /home/hsien/112-spring-software-testing/lab5/test.c:7

previously allocated by thread T0 here:
    #0 0x7f6bd8b7e808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x55dc6ae66257 in main /home/hsien/112-spring-software-testing/lab5/test.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/hsien/112-spring-software-testing/lab5/test.c:8 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fd fa fa fa fa fa fa fa fa fa fa fa fa
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
==1557262==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int* glb;
void user_after_return() {
    int buf = 3;
    glb = &buf;
    return;
}

int main() {
    user_after_return();
    printf("%d", *glb);
    return 0;
}
```
#### Valgrind Report
```
==1561105== Memcheck, a memory error detector
==1561105== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1561105== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==1561105== Command: ./test
==1561105== 
==1561105== Conditional jump or move depends on uninitialised value(s)
==1561105==    at 0x48D4958: __vfprintf_internal (vfprintf-internal.c:1687)
==1561105==    by 0x48BED3E: printf (printf.c:33)
==1561105==    by 0x1091DA: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1561105== 
==1561105== Use of uninitialised value of size 8
==1561105==    at 0x48B869B: _itoa_word (_itoa.c:179)
==1561105==    by 0x48D4574: __vfprintf_internal (vfprintf-internal.c:1687)
==1561105==    by 0x48BED3E: printf (printf.c:33)
==1561105==    by 0x1091DA: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1561105== 
==1561105== Conditional jump or move depends on uninitialised value(s)
==1561105==    at 0x48B86AD: _itoa_word (_itoa.c:179)
==1561105==    by 0x48D4574: __vfprintf_internal (vfprintf-internal.c:1687)
==1561105==    by 0x48BED3E: printf (printf.c:33)
==1561105==    by 0x1091DA: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1561105== 
==1561105== Conditional jump or move depends on uninitialised value(s)
==1561105==    at 0x48D5228: __vfprintf_internal (vfprintf-internal.c:1687)
==1561105==    by 0x48BED3E: printf (printf.c:33)
==1561105==    by 0x1091DA: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1561105== 
==1561105== Conditional jump or move depends on uninitialised value(s)
==1561105==    at 0x48D46EE: __vfprintf_internal (vfprintf-internal.c:1687)
==1561105==    by 0x48BED3E: printf (printf.c:33)
==1561105==    by 0x1091DA: main (in /home/hsien/112-spring-software-testing/lab5/test)
==1561105== 
3==1561105== 
==1561105== HEAP SUMMARY:
==1561105==     in use at exit: 0 bytes in 0 blocks
==1561105==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==1561105== 
==1561105== All heap blocks were freed -- no leaks are possible
==1561105== 
==1561105== Use --track-origins=yes to see where uninitialised values come from
==1561105== For lists of detected and suppressed errors, rerun with: -s
==1561105== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==1560987==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f631eb85020 at pc 0x55fe43ed53ab bp 0x7ffd47cd62f0 sp 0x7ffd47cd62e0
READ of size 4 at 0x7f631eb85020 thread T0
    #0 0x55fe43ed53aa in main /home/hsien/112-spring-software-testing/lab5/test.c:13
    #1 0x7f63223ab082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55fe43ed518d in _start (/home/hsien/112-spring-software-testing/lab5/test+0x118d)

Address 0x7f631eb85020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55fe43ed5258 in user_after_return /home/hsien/112-spring-software-testing/lab5/test.c:5

  This frame has 1 object(s):
    [32, 36) 'buf' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/hsien/112-spring-software-testing/lab5/test.c:13 in main
Shadow bytes around the buggy address:
  0x0fece3d689b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d689c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d689d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d689e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d689f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fece3d68a00: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0fece3d68a10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d68a20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d68a30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d68a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fece3d68a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==1560987==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int heap[2] = {1,2};
    int buffer[2] = {3,4};
    int offset = &buffer[0] - &heap[1];
    heap[1+offset] = 3;
    return 0;
}
```
### Why
Due to the presence of redzones primarily on both sides of data, if we allocate two data, we can utilize pointers to access the memory space of the other data from the current one, without being detected by the redzone
