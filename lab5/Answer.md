# Answer


Name: 周原慶
ID: 312553016

## Test Valgrind and ASan
### Result
gcc version 11.4.0
|                      | Valgrind |  Asan |
| -------------------- | -------- | ----- |
| Heap out-of-bounds   |     v    |   v   |
| Stack out-of-bounds  |     x    |   v   |
| Global out-of-bounds |     x    |   v   |
| Use-after-free       |     v    |   v   |
| Use-after-return     |     v    |   v   |


### Heap out-of-bounds
#### Source code
```c
int main() {
    int *ptr = (int*)malloc(5 * sizeof(int));
    ptr[5] = 10;  // heap out-of-bounds write
    int val = ptr[6];  // heap out-of-bounds read
    free(ptr);
    return 0;
}

```
#### Valgrind Report
```
==37115== Memcheck, a memory error detector
==37115== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==37115== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==37115== Command: ./heap
==37115== 
==37115== Invalid write of size 4
==37115==    at 0x10918B: main (in /home/user/112-spring-software-testing/lab5/my_test/heap)
==37115==  Address 0x4a8c054 is 0 bytes after a block of size 20 alloc'd
==37115==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==37115==    by 0x10917E: main (in /home/user/112-spring-software-testing/lab5/my_test/heap)
==37115== 
==37115== Invalid read of size 4
==37115==    at 0x109195: main (in /home/user/112-spring-software-testing/lab5/my_test/heap)
==37115==  Address 0x4a8c058 is 4 bytes after a block of size 20 alloc'd
==37115==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==37115==    by 0x10917E: main (in /home/user/112-spring-software-testing/lab5/my_test/heap)
==37115== 
==37115== 
==37115== HEAP SUMMARY:
==37115==     in use at exit: 0 bytes in 0 blocks
==37115==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==37115== 
==37115== All heap blocks were freed -- no leaks are possible
==37115== 
==37115== For lists of detected and suppressed errors, rerun with: -s
==37115== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==35364==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x55d750d61242 bp 0x7fff94dddc90 sp 0x7fff94dddc80
WRITE of size 4 at 0x603000000054 thread T0
    #0 0x55d750d61241 in main (/home/user/112-spring-software-testing/lab5/my_test/heap+0x1241)
    #1 0x7fe8d8fafd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fe8d8fafe3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55d750d61124 in _start (/home/user/112-spring-software-testing/lab5/my_test/heap+0x1124)

0x603000000054 is located 0 bytes to the right of 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:
    #0 0x7fe8d9263887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55d750d611fe in main (/home/user/112-spring-software-testing/lab5/my_test/heap+0x11fe)
    #2 0x7fe8d8fafd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/user/112-spring-software-testing/lab5/my_test/heap+0x1241) in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00[04]fa fa fa fa fa
  0x0c067fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==35364==ABORTING

```

### Stack out-of-bounds
#### Source code
```c
int main() {
    int array[5];
    array[5] = 10;  // stack out-of-bounds write
    int val = array[6];  // stack out-of-bounds read
    return 0;
}

```
#### Valgrind Report
```
==37254== Memcheck, a memory error detector
==37254== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==37254== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==37254== Command: ./stack
==37254== 
==37254== 
==37254== HEAP SUMMARY:
==37254==     in use at exit: 0 bytes in 0 blocks
==37254==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==37254== 
==37254== All heap blocks were freed -- no leaks are possible
==37254== 
==37254== For lists of detected and suppressed errors, rerun with: -s
==37254== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==34266==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fff32b02904 at pc 0x5567194d02bb bp 0x7fff32b028b0 sp 0x7fff32b028a0
WRITE of size 4 at 0x7fff32b02904 thread T0
    #0 0x5567194d02ba in main (/home/user/112-spring-software-testing/lab5/my_test/stack+0x12ba)
    #1 0x7f77fad4dd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f77fad4de3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5567194d0124 in _start (/home/user/112-spring-software-testing/lab5/my_test/stack+0x1124)

Address 0x7fff32b02904 is located in stack of thread T0 at offset 52 in frame
    #0 0x5567194d01f8 in main (/home/user/112-spring-software-testing/lab5/my_test/stack+0x11f8)

  This frame has 1 object(s):
    [32, 52) 'array' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/user/112-spring-software-testing/lab5/my_test/stack+0x12ba) in main
Shadow bytes around the buggy address:
  0x1000665584d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000665584e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000665584f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066558500: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066558510: 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00
=>0x100066558520:[04]f3 f3 f3 f3 f3 00 00 00 00 00 00 00 00 00 00
  0x100066558530: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066558540: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066558550: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066558560: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066558570: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==34266==ABORTING
```

### Global out-of-bounds
#### Source code
```c
int array[5];

int main() {
    array[5] = 10;  // global out-of-bounds write
    int val = array[6];  // global out-of-bounds read
    return 0;
}

```
#### Valgrind Report
```
==37384== Memcheck, a memory error detector
==37384== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==37384== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==37384== Command: ./global
==37384== 
==37384== 
==37384== HEAP SUMMARY:
==37384==     in use at exit: 0 bytes in 0 blocks
==37384==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==37384== 
==37384== All heap blocks were freed -- no leaks are possible
==37384== 
==37384== For lists of detected and suppressed errors, rerun with: -s
==37384== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==35686==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5559d634a0b4 at pc 0x5559d634722f bp 0x7ffdfcbdebf0 sp 0x7ffdfcbdebe0
WRITE of size 4 at 0x5559d634a0b4 thread T0
    #0 0x5559d634722e in main (/home/user/112-spring-software-testing/lab5/my_test/global+0x122e)
    #1 0x7f582e82ad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f582e82ae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5559d6347124 in _start (/home/user/112-spring-software-testing/lab5/my_test/global+0x1124)

0x5559d634a0b4 is located 0 bytes to the right of global variable 'array' defined in 'global.c:3:5' (0x5559d634a0a0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/user/112-spring-software-testing/lab5/my_test/global+0x122e) in main
Shadow bytes around the buggy address:
  0x0aabbac613c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabbac613d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabbac613e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabbac613f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabbac61400: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0aabbac61410: 00 00 00 00 00 00[04]f9 f9 f9 f9 f9 00 00 00 00
  0x0aabbac61420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabbac61430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabbac61440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabbac61450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabbac61460: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==35686==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdlib.h>

int main() {
    int *ptr = (int*)malloc(sizeof(int));
    free(ptr);
    *ptr = 10;  // use-after-free
    return 0;
}

```
#### Valgrind Report
```
==37500== Memcheck, a memory error detector
==37500== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==37500== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==37500== Command: ./free
==37500== 
==37500== Invalid write of size 4
==37500==    at 0x109193: main (in /home/user/112-spring-software-testing/lab5/my_test/free)
==37500==  Address 0x4a8c040 is 0 bytes inside a block of size 4 free'd
==37500==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==37500==    by 0x10918E: main (in /home/user/112-spring-software-testing/lab5/my_test/free)
==37500==  Block was alloc'd at
==37500==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==37500==    by 0x10917E: main (in /home/user/112-spring-software-testing/lab5/my_test/free)
==37500== 
==37500== 
==37500== HEAP SUMMARY:
==37500==     in use at exit: 0 bytes in 0 blocks
==37500==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==37500== 
==37500== All heap blocks were freed -- no leaks are possible
==37500== 
==37500== For lists of detected and suppressed errors, rerun with: -s
==37500== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==35916==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x562ed8364226 bp 0x7ffec6c86b10 sp 0x7ffec6c86b00
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x562ed8364225 in main (/home/user/112-spring-software-testing/lab5/my_test/free+0x1225)
    #1 0x7f9090531d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f9090531e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x562ed8364104 in _start (/home/user/112-spring-software-testing/lab5/my_test/free+0x1104)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f90907e5537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x562ed83641ee in main (/home/user/112-spring-software-testing/lab5/my_test/free+0x11ee)
    #2 0x7f9090531d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7f90907e5887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x562ed83641de in main (/home/user/112-spring-software-testing/lab5/my_test/free+0x11de)
    #2 0x7f9090531d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/user/112-spring-software-testing/lab5/my_test/free+0x1225) in main
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
==35916==ABORTING
=======

```
```

### Use-after-return
#### Source code
```c
int* fun() {
    int local_var = 10;
    return &local_var;
}

int main() {
    int *ptr = fun();
    *ptr = 20;  // use-after-return
    return 0;
}

```
#### Valgrind Report
```
==37613== Memcheck, a memory error detector
==37613== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==37613== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==37613== Command: ./return
==37613== 
==37613== Invalid write of size 4
==37613==    at 0x1091A4: main (in /home/user/112-spring-software-testing/lab5/my_test/return)
==37613==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==37613== 
==37613== 
==37613== Process terminating with default action of signal 11 (SIGSEGV)
==37613==  Access not within mapped region at address 0x0
==37613==    at 0x1091A4: main (in /home/user/112-spring-software-testing/lab5/my_test/return)
==37613==  If you believe this happened as a result of a stack
==37613==  overflow in your program's main thread (unlikely but
==37613==  possible), you can try to increase the size of the
==37613==  main thread stack using the --main-stacksize= flag.
==37613==  The main thread stack size used in this run was 8388608.
==37613== 
==37613== HEAP SUMMARY:
==37613==     in use at exit: 0 bytes in 0 blocks
==37613==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==37613== 
==37613== All heap blocks were freed -- no leaks are possible
==37613== 
==37613== For lists of detected and suppressed errors, rerun with: -s
==37613== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==36252==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55c9b974332c bp 0x7ffd9175af00 sp 0x7ffd9175aef0 T0)
==36252==The signal is caused by a WRITE memory access.
==36252==Hint: address points to the zero page.
    #0 0x55c9b974332c in main (/home/user/112-spring-software-testing/lab5/my_test/return+0x132c)
    #1 0x7fed1619dd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fed1619de3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55c9b9743104 in _start (/home/user/112-spring-software-testing/lab5/my_test/return+0x1104)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/user/112-spring-software-testing/lab5/my_test/return+0x132c) in main
==36252==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
int main() {
    int a[8];
    int b[8];
    a[16] = 10;  // stack out-of-bounds write
    int val = a[16];  // stack out-of-bounds read
    // b[8] = 1; // show error message
    return 0;
}
```
### Why
只要避免存取紅色區域就不會觸發到error，可以任意存取白色區域。更極端的可以存取a[999]也不會有error產生。
故意存取b[8]查看狀態:
```
  0x100079b6f450: f1 f1 f1 f1 00 00 00 00 f2 f2 f2 f2 00 00 00 00
=>0x100079b6f460:[f3]f3 f3 f3 00 00 00 00 00 00 00 00 00 00 00 00

  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
```