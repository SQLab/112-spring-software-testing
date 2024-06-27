# Answer

Name: Pin-An Lin
ID: 110550098

## Test Valgrind and ASan
### Environment
- gcc: `11.4.0 (Ubuntu 11.4.0-1ubuntu1~22.04) `
- valgrind: `3.18.1`
- use `export ASAN_OPTIONS=detect_stack_use_after_return=1` to show the `stack_use_after_return`

### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    Yes   | Yes  |
| Stack out-of-bounds  |    No    | Yes  |
| Global out-of-bounds |    No    | Yes  |
| Use-after-free       |    Yes   | Yes  |
| Use-after-return     |    Yes   | Yes  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    char *str = malloc(3);
    str[3] = 'A';
    printf("%c\n",str[3]);
    free(str);
    return 0;
}

```
#### Valgrind Report
```
==953112== Memcheck, a memory error detector
==953112== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==953112== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==953112== Command: ./heap
==953112== 
==953112== Invalid write of size 1
==953112==    at 0x1091AB: main (heap-out-of-bound.c:6)
==953112==  Address 0x4a92043 is 0 bytes after a block of size 3 alloc'd
==953112==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==953112==    by 0x10919E: main (heap-out-of-bound.c:5)
==953112== 
==953112== Invalid read of size 1
==953112==    at 0x1091B6: main (heap-out-of-bound.c:7)
==953112==  Address 0x4a92043 is 0 bytes after a block of size 3 alloc'd
==953112==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==953112==    by 0x10919E: main (heap-out-of-bound.c:5)
==953112== 
A
==953112== 
==953112== HEAP SUMMARY:
==953112==     in use at exit: 0 bytes in 0 blocks
==953112==   total heap usage: 2 allocs, 2 frees, 1,027 bytes allocated
==953112== 
==953112== All heap blocks were freed -- no leaks are possible
==953112== 
==953112== For lists of detected and suppressed errors, rerun with: -s
==953112== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==953033==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000013 at pc 0x5c4b1c9a929f bp 0x7ffd982d6820 sp 0x7ffd982d6810
WRITE of size 1 at 0x602000000013 thread T0
    #0 0x5c4b1c9a929e in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/heap-asan+0x129e)
    #1 0x75cdfbc29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x75cdfbc29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c4b1c9a9184 in _start (/home/luckyanthonyan/112-spring-software-testing/lab5/src/heap-asan+0x1184)

0x602000000013 is located 0 bytes to the right of 3-byte region [0x602000000010,0x602000000013)
allocated by thread T0 here:
    #0 0x75cdfc0b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5c4b1c9a925e in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/heap-asan+0x125e)
    #2 0x75cdfbc29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/luckyanthonyan/112-spring-software-testing/lab5/src/heap-asan+0x129e) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[03]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==953033==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
int main()
{
    int arr[] = {1,2,3,4,5};
    int c = arr[7];

    return 0;
}
```
#### Valgrind Report
```
==953282== Memcheck, a memory error detector
==953282== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==953282== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==953282== Command: ./stack
==953282== 
==953282== 
==953282== HEAP SUMMARY:
==953282==     in use at exit: 0 bytes in 0 blocks
==953282==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==953282== 
==953282== All heap blocks were freed -- no leaks are possible
==953282== 
==953282== For lists of detected and suppressed errors, rerun with: -s
==953282== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==953391==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x74e3178ae03c at pc 0x5d0d2ae5d3f9 bp 0x7ffc06bf8d40 sp 0x7ffc06bf8d30
READ of size 4 at 0x74e3178ae03c thread T0
    #0 0x5d0d2ae5d3f8 in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/stack-asan+0x13f8)
    #1 0x74e31ae29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x74e31ae29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5d0d2ae5d124 in _start (/home/luckyanthonyan/112-spring-software-testing/lab5/src/stack-asan+0x1124)

Address 0x74e3178ae03c is located in stack of thread T0 at offset 60 in frame
    #0 0x5d0d2ae5d1f8 in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/stack-asan+0x11f8)

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 60 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/luckyanthonyan/112-spring-software-testing/lab5/src/stack-asan+0x13f8) in main
Shadow bytes around the buggy address:
  0x0e9ce2f0dbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e9ce2f0dbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e9ce2f0dbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e9ce2f0dbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e9ce2f0dbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0e9ce2f0dc00: f1 f1 f1 f1 00 00 04[f3]f3 f3 f3 f3 00 00 00 00
  0x0e9ce2f0dc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e9ce2f0dc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e9ce2f0dc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e9ce2f0dc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e9ce2f0dc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==953391==ABORTING
```

### Global out-of-bounds
#### Source code
```
int data[10];
int main () {
    int c = data[10];
}
```
#### Valgrind Report
```
==953503== Memcheck, a memory error detector
==953503== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==953503== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==953503== Command: ./global
==953503== 
==953503== 
==953503== HEAP SUMMARY:
==953503==     in use at exit: 0 bytes in 0 blocks
==953503==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==953503== 
==953503== All heap blocks were freed -- no leaks are possible
==953503== 
==953503== For lists of detected and suppressed errors, rerun with: -s
==953503== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==953459==ERROR: AddressSanitizer: global-buffer-overflow on address 0x58778b0810c8 at pc 0x58778b07e207 bp 0x7ffe27119a30 sp 0x7ffe27119a20
READ of size 4 at 0x58778b0810c8 thread T0
    #0 0x58778b07e206 in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/global-asan+0x1206)
    #1 0x7b4c59e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7b4c59e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x58778b07e104 in _start (/home/luckyanthonyan/112-spring-software-testing/lab5/src/global-asan+0x1104)

0x58778b0810c8 is located 0 bytes to the right of global variable 'data' defined in 'global-out-of-bound.c:1:5' (0x58778b0810a0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/luckyanthonyan/112-spring-software-testing/lab5/src/global-asan+0x1206) in main
Shadow bytes around the buggy address:
  0x0b0f716081c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b0f716081d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b0f716081e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b0f716081f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b0f71608200: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0b0f71608210: 00 00 00 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9
  0x0b0f71608220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b0f71608230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b0f71608240: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b0f71608250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b0f71608260: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==953459==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdlib.h>
int main () {
    char *buf = (char*)malloc(5);
    free(buf);
    char c = buf[0];
}
```
#### Valgrind Report
```
==953562== Memcheck, a memory error detector
==953562== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==953562== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==953562== Command: ./free
==953562== 
==953562== Invalid read of size 1
==953562==    at 0x109193: main (use-after-free.c:5)
==953562==  Address 0x4a92040 is 0 bytes inside a block of size 5 free'd
==953562==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==953562==    by 0x10918E: main (use-after-free.c:4)
==953562==  Block was alloc'd at
==953562==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==953562==    by 0x10917E: main (use-after-free.c:3)
==953562== 
==953562== 
==953562== HEAP SUMMARY:
==953562==     in use at exit: 0 bytes in 0 blocks
==953562==   total heap usage: 1 allocs, 1 frees, 5 bytes allocated
==953562== 
==953562== All heap blocks were freed -- no leaks are possible
==953562== 
==953562== For lists of detected and suppressed errors, rerun with: -s
==953562== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==953714==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5d668b298223 bp 0x7ffd6856ab50 sp 0x7ffd6856ab40
READ of size 1 at 0x602000000010 thread T0
    #0 0x5d668b298222 in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/free-asan+0x1222)
    #1 0x79a5e0a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x79a5e0a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5d668b298104 in _start (/home/luckyanthonyan/112-spring-software-testing/lab5/src/free-asan+0x1104)

0x602000000010 is located 0 bytes inside of 5-byte region [0x602000000010,0x602000000015)
freed by thread T0 here:
    #0 0x79a5e0eb4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5d668b2981ee in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/free-asan+0x11ee)
    #2 0x79a5e0a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x79a5e0eb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5d668b2981de in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/free-asan+0x11de)
    #2 0x79a5e0a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/luckyanthonyan/112-spring-software-testing/lab5/src/free-asan+0x1222) in main
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
==953714==ABORTING
```

### Use-after-return
#### Source code
```
int *f() {
    int a[100000];
    return a;
}

int main () {
    int a = *f();
}
```
#### Valgrind Report
```
==943706== Memcheck, a memory error detector
==943706== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==943706== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==943706== Command: ./return
==943706== 
==943706== Invalid read of size 4
==943706==    at 0x1091B1: main (use-after-return.c:7)
==943706==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==943706== 
==943706== 
==943706== Process terminating with default action of signal 11 (SIGSEGV)
==943706==  Access not within mapped region at address 0x0
==943706==    at 0x1091B1: main (use-after-return.c:7)
==943706==  If you believe this happened as a result of a stack
==943706==  overflow in your program's main thread (unlikely but
==943706==  possible), you can try to increase the size of the
==943706==  main thread stack using the --main-stacksize= flag.
==943706==  The main thread stack size used in this run was 8388608.
==943706== 
==943706== HEAP SUMMARY:
==943706==     in use at exit: 0 bytes in 0 blocks
==943706==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==943706== 
==943706== All heap blocks were freed -- no leaks are possible
==943706== 
==943706== For lists of detected and suppressed errors, rerun with: -s
==943706== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)
```
### ASan Report
```
=================================================================
==952753==ERROR: AddressSanitizer: stack-use-after-return on address 0x7cbe5baae034 at pc 0x5ad44b0883b6 bp 0x7ffc3c420a10 sp 0x7ffc3c420a00
READ of size 4 at 0x7cbe5baae034 thread T0
    #0 0x5ad44b0883b5 in main (/home/luckyanthonyan/112-spring-software-testing/lab5/src/return-asan+0x13b5)
    #1 0x7cbe5ee29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7cbe5ee29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ad44b088144 in _start (/home/luckyanthonyan/112-spring-software-testing/lab5/src/return-asan+0x1144)

Address 0x7cbe5baae034 is located in stack of thread T0 at offset 52 in frame
    #0 0x5ad44b088218 in FunctionThatEscapesLocalObject (/home/luckyanthonyan/112-spring-software-testing/lab5/src/return-asan+0x1218)

  This frame has 1 object(s):
    [48, 448) 'local' (line 3) <== Memory access at offset 52 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (/home/luckyanthonyan/112-spring-software-testing/lab5/src/return-asan+0x13b5) in main
Shadow bytes around the buggy address:
  0x0f984b74dbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f984b74dbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f984b74dbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f984b74dbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f984b74dbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0f984b74dc00: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0f984b74dc10: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0f984b74dc20: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0f984b74dc30: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0f984b74dc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0f984b74dc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==952753==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
int main () {
    char a[8];
    char b[8];
    a[32] = 'a';
}
```
### Why
沒有對 redzone 進行讀寫操作，addressSentinizer 無法偵測。 
