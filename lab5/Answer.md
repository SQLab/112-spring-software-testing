# Answer


Name: 陳沛圻
ID: 312553008


## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |

| Heap out-of-bounds   |    O     |   O  |
| Stack out-of-bounds  |    X     |   O  |
| Global out-of-bounds |    X     |   O  |
| Use-after-free       |    O     |   O  |
| Use-after-return     |    X     |   O  |

### Heap out-of-bounds
#### Source code
```c
#include<stdio.h>
#include<stdlib.h>

int main() {
    int *a = (int *)malloc(6 * sizeof(int));
    int temp = a[6];
    a[6] = 0;
    free(a);
    return 0;
}
```
#### Valgrind Report
```
==204551== Memcheck, a memory error detector
==204551== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==204551== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==204551== Command: ./test
==204551== Parent PID: 204545
==204551== 
==204551== Invalid read of size 4
==204551==    at 0x109187: main (heap.c:6)
==204551==  Address 0x4a8c058 is 0 bytes after a block of size 24 alloc'd
==204551==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==204551==    by 0x10917E: main (heap.c:5)
==204551== 
==204551== Invalid write of size 4
==204551==    at 0x109195: main (heap.c:7)
==204551==  Address 0x4a8c058 is 0 bytes after a block of size 24 alloc'd
==204551==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==204551==    by 0x10917E: main (heap.c:5)
==204551== 
==204551== 
==204551== HEAP SUMMARY:
==204551==     in use at exit: 0 bytes in 0 blocks
==204551==   total heap usage: 1 allocs, 1 frees, 24 bytes allocated
==204551== 
==204551== All heap blocks were freed -- no leaks are possible
==204551== 
==204551== For lists of detected and suppressed errors, rerun with: -s
==204551== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==204560==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000058 at pc 0x561bc607923e bp 0x7ffd94f644b0 sp 0x7ffd94f644a0
READ of size 4 at 0x603000000058 thread T0
    #0 0x561bc607923d in main /mnt/c/Users/lab/Desktop/lab5/heap.c:6
    #1 0x7f542e7a5d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f542e7a5e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x561bc6079124 in _start (/mnt/c/Users/lab/Desktop/lab5/test+0x1124)

0x603000000058 is located 0 bytes to the right of 24-byte region [0x603000000040,0x603000000058)
allocated by thread T0 here:
    #0 0x7f542ea59887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x561bc60791fe in main /mnt/c/Users/lab/Desktop/lab5/heap.c:5
    #2 0x7f542e7a5d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow /mnt/c/Users/lab/Desktop/lab5/heap.c:6 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00 00[fa]fa fa fa fa
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
==204560==ABORTING
```

### Stack out-of-bounds
#### Source code

```c
#include <stdio.h>
#include <stdlib.h>
int main() {
    int a[6];
    int temp = a[6];
    a[6] = 0;
    return 0;
}
```
#### Valgrind Report
```
==204516== Memcheck, a memory error detector
==204516== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==204516== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==204516== Command: ./test
==204516== Parent PID: 204510
==204516== 
==204516== 
==204516== Process terminating with default action of signal 6 (SIGABRT)
==204516==    at 0x48F69FC: __pthread_kill_implementation (pthread_kill.c:44)
==204516==    by 0x48F69FC: __pthread_kill_internal (pthread_kill.c:78)
==204516==    by 0x48F69FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==204516==    by 0x48A2475: raise (raise.c:26)
==204516==    by 0x48887F2: abort (abort.c:79)
==204516==    by 0x48E9675: __libc_message (libc_fatal.c:155)
==204516==    by 0x4996599: __fortify_fail (fortify_fail.c:26)
==204516==    by 0x4996565: __stack_chk_fail (stack_chk_fail.c:24)
==204516==    by 0x109189: main (stack.c:8)
==204516== 
==204516== HEAP SUMMARY:
==204516==     in use at exit: 0 bytes in 0 blocks
==204516==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==204516== 
==204516== All heap blocks were freed -- no leaks are possible
==204516== 
==204516== For lists of detected and suppressed errors, rerun with: -s
==204516== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==204522==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd0f225fa8 at pc 0x55c27d217291 bp 0x7ffd0f225f50 sp 0x7ffd0f225f40
READ of size 4 at 0x7ffd0f225fa8 thread T0
    #0 0x55c27d217290 in main /mnt/c/Users/lab/Desktop/lab5/stack.c:5
    #1 0x7f93149ead8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f93149eae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55c27d217104 in _start (/mnt/c/Users/lab/Desktop/lab5/test+0x1104)

Address 0x7ffd0f225fa8 is located in stack of thread T0 at offset 56 in frame
    #0 0x55c27d2171d8 in main /mnt/c/Users/lab/Desktop/lab5/stack.c:3

  This frame has 1 object(s):
    [32, 56) 'a' (line 4) <== Memory access at offset 56 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /mnt/c/Users/lab/Desktop/lab5/stack.c:5 in main
Shadow bytes around the buggy address:
  0x100021e3cba0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100021e3cbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100021e3cbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100021e3cbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100021e3cbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x100021e3cbf0: f1 f1 00 00 00[f3]f3 f3 f3 f3 00 00 00 00 00 00
  0x100021e3cc00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100021e3cc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100021e3cc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100021e3cc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100021e3cc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==204522==ABORTING

```

### Global out-of-bounds
#### Source code

```c
#include<stdio.h>
#include<stdlib.h>


int a[6];

int main() {
    int temp = a[6];
    a[6] = 0;
    return 0;
}
```
#### Valgrind Report
```
==204577== Memcheck, a memory error detector
==204577== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==204577== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==204577== Command: ./test
==204577== Parent PID: 204571
==204577== 
==204577== 
==204577== HEAP SUMMARY:
==204577==     in use at exit: 0 bytes in 0 blocks
==204577==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==204577== 
==204577== All heap blocks were freed -- no leaks are possible
==204577== 
==204577== For lists of detected and suppressed errors, rerun with: -s
==204577== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==204583==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55e528a520b8 at pc 0x55e528a4f207 bp 0x7ffd63759e40 sp 0x7ffd63759e30
READ of size 4 at 0x55e528a520b8 thread T0
    #0 0x55e528a4f206 in main /mnt/c/Users/lab/Desktop/lab5/gstack.c:8
    #1 0x7f21fe1ced8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f21fe1cee3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e528a4f104 in _start (/mnt/c/Users/lab/Desktop/lab5/test+0x1104)

0x55e528a520b8 is located 0 bytes to the right of global variable 'a' defined in 'gstack.c:5:5' (0x55e528a520a0) of size 24
SUMMARY: AddressSanitizer: global-buffer-overflow /mnt/c/Users/lab/Desktop/lab5/gstack.c:8 in main
Shadow bytes around the buggy address:
  0x0abd251423c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd251423d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd251423e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd251423f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd25142400: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0abd25142410: 00 00 00 00 00 00 00[f9]f9 f9 f9 f9 00 00 00 00
  0x0abd25142420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd25142430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd25142440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd25142450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd25142460: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==204583==ABORTING

```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *intArr = malloc(3 * sizeof(int) );
    intArr[0] = 100;
    intArr[1] = 200;
    intArr[2] = 300;
    free(intArr);
    printf("%d\n",intArr[0]);
    return 0;
}
```
#### Valgrind Report
```
==204595== Memcheck, a memory error detector
==204595== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==204595== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==204595== Command: ./test
==204595== Parent PID: 204589
==204595== 
==204595== Invalid read of size 4
==204595==    at 0x1091D9: main (freeget.c:10)
==204595==  Address 0x4a8c040 is 0 bytes inside a block of size 12 free'd
==204595==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==204595==    by 0x1091D4: main (freeget.c:9)
==204595==  Block was alloc'd at
==204595==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==204595==    by 0x10919E: main (freeget.c:5)
==204595== 
==204595== 
==204595== HEAP SUMMARY:
==204595==     in use at exit: 0 bytes in 0 blocks
==204595==   total heap usage: 2 allocs, 2 frees, 1,036 bytes allocated
==204595== 
==204595== All heap blocks were freed -- no leaks are possible
==204595== 
==204595== For lists of detected and suppressed errors, rerun with: -s
==204595== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==204605==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55a01033a371 bp 0x7ffd774d4e10 sp 0x7ffd774d4e00
READ of size 4 at 0x602000000010 thread T0
    #0 0x55a01033a370 in main /mnt/c/Users/lab/Desktop/lab5/freeget.c:10
    #1 0x7ff5032aad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ff5032aae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55a01033a184 in _start (/mnt/c/Users/lab/Desktop/lab5/test+0x1184)

0x602000000010 is located 0 bytes inside of 12-byte region [0x602000000010,0x60200000001c)
freed by thread T0 here:
    #0 0x7ff50355e537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55a01033a339 in main /mnt/c/Users/lab/Desktop/lab5/freeget.c:9
    #2 0x7ff5032aad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7ff50355e887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55a01033a25e in main /mnt/c/Users/lab/Desktop/lab5/freeget.c:5
    #2 0x7ff5032aad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free /mnt/c/Users/lab/Desktop/lab5/freeget.c:10 in main
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
==204605==ABORTING
```

### Use-after-return
#### Source code
```c
#include<stdio.h>
#include<stdlib.h>

int *ptr;
void localregion(){
    int a[6];
    ptr = &a[0];
}

int main(){
    localregion();
    *ptr = 100;
    return 0;
}
```
#### Valgrind Report
```
==204612== Memcheck, a memory error detector
==204612== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==204612== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==204612== Command: ./test
==204612== Parent PID: 204606
==204612== 
==204612== 
==204612== HEAP SUMMARY:
==204612==     in use at exit: 0 bytes in 0 blocks
==204612==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==204612== 
==204612== All heap blocks were freed -- no leaks are possible
==204612== 
==204612== For lists of detected and suppressed errors, rerun with: -s
==204612== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==204618==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f41ba657020 at pc 0x559bfdb60356 bp 0x7ffd06e77e40 sp 0x7ffd06e77e30
WRITE of size 4 at 0x7f41ba657020 thread T0
    #0 0x559bfdb60355 in main /mnt/c/Users/lab/Desktop/lab5/returnfail.c:12
    #1 0x7f41bdcf5d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f41bdcf5e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x559bfdb60144 in _start (/mnt/c/Users/lab/Desktop/lab5/test+0x1144)

Address 0x7f41ba657020 is located in stack of thread T0 at offset 32 in frame
    #0 0x559bfdb60218 in localregion /mnt/c/Users/lab/Desktop/lab5/returnfail.c:5

  This frame has 1 object(s):
    [32, 56) 'a' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /mnt/c/Users/lab/Desktop/lab5/returnfail.c:12 in main
Shadow bytes around the buggy address:
  0x0fe8b74c2db0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe8b74c2dc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe8b74c2dd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe8b74c2de0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe8b74c2df0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fe8b74c2e00: f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 00 00 00 00
  0x0fe8b74c2e10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe8b74c2e20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe8b74c2e30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe8b74c2e40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe8b74c2e50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==204618==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include<stdio.h>
#include<stdlib.h>

int main(){
    int a[6] = {1, 2, 3, 4, 5, 6};
    int b[6] = {7, 8, 9, 10, 11, 12};
    a[16] = 50;
    for(int i = 0; i < 6; i++){
        printf("%d\n", a[i]);
    }
    for(int i = 0; i < 6; i++){
        printf("%d\n", b[i]);
    }
    return 0;
}
```
### Why
ASAN抓不到錯誤。 連續建兩個array a[6], b[6] 然後write a[16]會跨過a的redzone區域改到另一個合法區域(b中)


