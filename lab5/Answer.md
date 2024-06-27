# Answer

Name: 黃建廷
ID: 312511041

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    Yes   |  Yes |
| Stack out-of-bounds  |    No    |  Yes |
| Global out-of-bounds |    No    |  Yes |
| Use-after-free       |    Yes   |  Yes |
| Use-after-return     |    Yes   |  Yes |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    char *str = (char*)malloc(sizeof(char)*6);
    strcpy(str, "Hello");
    str[6] = '!';
    putchar(str[7]);
    return 0;
}
```
#### Valgrind Report
```
==119409== Memcheck, a memory error detector
==119409== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==119409== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==119409== Command: ./heap
==119409== 
==119409== Invalid write of size 1
==119409==    at 0x108814: main (in /home/yles94214/112-spring-software-testing/lab5/heap)
==119409==  Address 0x4a39046 is 0 bytes after a block of size 6 alloc'd
==119409==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==119409==    by 0x1087E3: main (in /home/yles94214/112-spring-software-testing/lab5/heap)
==119409== 
==119409== Invalid read of size 1
==119409==    at 0x108820: main (in /home/yles94214/112-spring-software-testing/lab5/heap)
==119409==  Address 0x4a39047 is 1 bytes after a block of size 6 alloc'd
==119409==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==119409==    by 0x1087E3: main (in /home/yles94214/112-spring-software-testing/lab5/heap)
==119409== 
==119409== 
==119409== HEAP SUMMARY:
==119409==     in use at exit: 6 bytes in 1 blocks
==119409==   total heap usage: 2 allocs, 1 frees, 1,030 bytes allocated
==119409== 
==119409== LEAK SUMMARY:
==119409==    definitely lost: 6 bytes in 1 blocks
==119409==    indirectly lost: 0 bytes in 0 blocks
==119409==      possibly lost: 0 bytes in 0 blocks
==119409==    still reachable: 0 bytes in 0 blocks
==119409==         suppressed: 0 bytes in 0 blocks
==119409== Rerun with --leak-check=full to see details of leaked memory
==119409== 
==119409== For lists of detected and suppressed errors, rerun with: -s
==119409== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==51524==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000016 at pc 0x56070ac70308 bp 0x7fff33ef0c80 sp 0x7fff33ef0c70
WRITE of size 1 at 0x602000000016 thread T0
    #0 0x56070ac70307 in main /home/timmy/112-spring-software-testing/lab5/heap_ofb_rw.c:9
    #1 0x7fc23d009082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x56070ac701ad in _start (/home/timmy/112-spring-software-testing/lab5/heap+0x11ad)

0x602000000016 is located 0 bytes to the right of 6-byte region [0x602000000010,0x602000000016)
allocated by thread T0 here:
    #0 0x7fc23d2e4808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x56070ac70277 in main /home/timmy/112-spring-software-testing/lab5/heap_ofb_rw.c:7

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/timmy/112-spring-software-testing/lab5/heap_ofb_rw.c:9 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[06]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==51524==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main(void)
{
    char str[8] = "Hello";
    str[8] = '!';
    putchar(str[8]);
    return 0;
}
```
#### Valgrind Report
```
==52179== Memcheck, a memory error detector
==52179== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==52179== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==52179== Command: ./stack
==52179== 
!==52179== 
==52179== HEAP SUMMARY:
==52179==     in use at exit: 0 bytes in 0 blocks
==52179==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==52179== 
==52179== All heap blocks were freed -- no leaks are possible
==52179== 
==52179== For lists of detected and suppressed errors, rerun with: -s
==52179== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==52264==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe0737b658 at pc 0x55bba5df7351 bp 0x7ffe0737b620 sp 0x7ffe0737b610
WRITE of size 1 at 0x7ffe0737b658 thread T0
    #0 0x55bba5df7350 in main /home/timmy/112-spring-software-testing/lab5/stack_ofb_rw.c:7
    #1 0x7f98558a0082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55bba5df716d in _start (/home/timmy/112-spring-software-testing/lab5/stack+0x116d)

Address 0x7ffe0737b658 is located in stack of thread T0 at offset 40 in frame
    #0 0x55bba5df7238 in main /home/timmy/112-spring-software-testing/lab5/stack_ofb_rw.c:5

  This frame has 1 object(s):
    [32, 40) 'str' (line 6) <== Memory access at offset 40 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/timmy/112-spring-software-testing/lab5/stack_ofb_rw.c:7 in main
Shadow bytes around the buggy address:
  0x100040e67670: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100040e67680: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100040e67690: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100040e676a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100040e676b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100040e676c0: 00 00 00 00 00 00 f1 f1 f1 f1 00[f3]f3 f3 00 00
  0x100040e676d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100040e676e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100040e676f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100040e67700: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100040e67710: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==52264==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

    char str[8] = "Hello";

int main(void)
{
    str[8] = '!';
    putchar(str[8]);
    return 0;
}
```
#### Valgrind Report
```
==52620== Memcheck, a memory error detector
==52620== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==52620== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==52620== Command: ./global
==52620== 
!==52620== 
==52620== HEAP SUMMARY:
==52620==     in use at exit: 0 bytes in 0 blocks
==52620==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==52620== 
==52620== All heap blocks were freed -- no leaks are possible
==52620== 
==52620== For lists of detected and suppressed errors, rerun with: -s
==52620== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==52696==ERROR: AddressSanitizer: global-buffer-overflow on address 0x56366fe7b028 at pc 0x56366fe7826a bp 0x7ffcf6b916d0 sp 0x7ffcf6b916c0
WRITE of size 1 at 0x56366fe7b028 thread T0
    #0 0x56366fe78269 in main /home/timmy/112-spring-software-testing/lab5/global_ofb_rw.c:7
    #1 0x7fdd4d476082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x56366fe7814d in _start (/home/timmy/112-spring-software-testing/lab5/global+0x114d)

0x56366fe7b028 is located 0 bytes to the right of global variable 'str' defined in 'global_ofb_rw.c:3:10' (0x56366fe7b020) of size 8
SUMMARY: AddressSanitizer: global-buffer-overflow /home/timmy/112-spring-software-testing/lab5/global_ofb_rw.c:7 in main
Shadow bytes around the buggy address:
  0x0ac74dfc75b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac74dfc75c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac74dfc75d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac74dfc75e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac74dfc75f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ac74dfc7600: 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0ac74dfc7610: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x0ac74dfc7620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac74dfc7630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac74dfc7640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac74dfc7650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==52696==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    char *str = (char*)malloc(sizeof(char)*6);
    strcpy(str, "Hello");
    free(str);
    str[0] = '!';
    putchar(str[0]);
    return 0;
}
```
#### Valgrind Report
```
==120200== Memcheck, a memory error detector
==120200== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==120200== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==120200== Command: ./uafree
==120200== 
==120200== Invalid write of size 1
==120200==    at 0x108858: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200==  Address 0x4a39040 is 0 bytes inside a block of size 6 free'd
==120200==    at 0x4867AD0: free (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==120200==    by 0x10884F: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200==  Block was alloc'd at
==120200==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==120200==    by 0x108823: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200== 
==120200== Invalid read of size 1
==120200==    at 0x108860: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200==  Address 0x4a39040 is 0 bytes inside a block of size 6 free'd
==120200==    at 0x4867AD0: free (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==120200==    by 0x10884F: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200==  Block was alloc'd at
==120200==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==120200==    by 0x108823: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200== 
!==120200== 
==120200== HEAP SUMMARY:
==120200==     in use at exit: 0 bytes in 0 blocks
==120200==   total heap usage: 2 allocs, 2 frees, 1,030 bytes allocated
==120200== 
==120200== All heap blocks were freed -- no leaks are possible
==120200== 
==120200== For lists of detected and suppressed errors, rerun with: -s
==120200== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==52937==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55fd8f4762ed bp 0x7ffe79981cf0 sp 0x7ffe79981ce0
WRITE of size 1 at 0x602000000010 thread T0
    #0 0x55fd8f4762ec in main /home/timmy/112-spring-software-testing/lab5/uafree.c:10
    #1 0x7fee7128e082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55fd8f4761ad in _start (/home/timmy/112-spring-software-testing/lab5/uafree+0x11ad)

0x602000000010 is located 0 bytes inside of 6-byte region [0x602000000010,0x602000000016)
freed by thread T0 here:
    #0 0x7fee7156940f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x55fd8f476296 in main /home/timmy/112-spring-software-testing/lab5/uafree.c:9

previously allocated by thread T0 here:
    #0 0x7fee71569808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x55fd8f476277 in main /home/timmy/112-spring-software-testing/lab5/uafree.c:7

SUMMARY: AddressSanitizer: heap-use-after-free /home/timmy/112-spring-software-testing/lab5/uafree.c:10 in main
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
==52937==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>

char* foo()
{
    char str[8] = "Hello";
    char *ptr = &str[0];
    return ptr;
}

int main(void)
{
    char *ptr = foo();
    *ptr = 'P';
    return 0;
}
```
#### Valgrind Report
```
==58691== Memcheck, a memory error detector
==58691== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==58691== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==58691== Command: ./uareturn
==58691== 
==58691== 
==58691== HEAP SUMMARY:
==58691==     in use at exit: 0 bytes in 0 blocks
==58691==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==58691== 
==58691== All heap blocks were freed -- no leaks are possible
==58691== 
==58691== For lists of detected and suppressed errors, rerun with: -s
==58691== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==58493==ERROR: AddressSanitizer: stack-use-after-return on address 0x7efc556ce020 at pc 0x55a2550bc328 bp 0x7ffdeb6e3120 sp 0x7ffdeb6e3110
WRITE of size 1 at 0x7efc556ce020 thread T0
    #0 0x55a2550bc327 in main /home/timmy/112-spring-software-testing/lab5/uareturn.c:13
    #1 0x7efc58efe082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55a2550bc12d in _start (/home/timmy/112-spring-software-testing/lab5/uareturn+0x112d)

Address 0x7efc556ce020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55a2550bc1f8 in foo /home/timmy/112-spring-software-testing/lab5/uareturn.c:4

  This frame has 1 object(s):
    [32, 40) 'str' (line 5) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/timmy/112-spring-software-testing/lab5/uareturn.c:13 in main
Shadow bytes around the buggy address:
  0x0fe00aad1bb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe00aad1bc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe00aad1bd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe00aad1be0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe00aad1bf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fe00aad1c00: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0fe00aad1c10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe00aad1c20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe00aad1c30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe00aad1c40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe00aad1c50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==58493==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>

int main(void)
{
    char a[8] = "Hello";
    char b[8] = "World";
    a[32] = 'P';
    printf("a = %p, b = %p\n", a, b);
    printf("*a = %s, *b = %s\n", a, b);
    return 0;
}
```
### Why
The way ASan detects out-of-bound read/write by adding shadow memory that maps to variables in the program, and by inserting redzones between these variables.
In this program, the out-of-bound write operation on string `a` bypasses the redzones and directly into string `b`. Because the redzones are not accessed, no error is produced.