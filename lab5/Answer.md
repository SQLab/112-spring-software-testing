# Answer

Name: 田珈源
ID: 312553018

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |      v   |   v  |
| Stack out-of-bounds  |      x   |   v  |
| Global out-of-bounds |      x   |   v  |
| Use-after-free       |      v   |   v  |
| Use-after-return     |      v   |   v  |

### Heap out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int* heapArray = malloc(100 * sizeof(int));
    heapArray[100] = 0;
    int heapVar = heapArray[150];

    free(heapArray);
    return 0;
}

```
#### Valgrind Report
```
==27251== Memcheck, a memory error detector
==27251== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==27251== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==27251== Command: ./lab5
==27251==
==27251== Invalid write of size 4
==27251==    at 0x10918D: main (lab5.c:7)
==27251==  Address 0x4a8c1d0 is 0 bytes after a block of size 400 alloc'd
==27251==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==27251==    by 0x10917E: main (lab5.c:6)
==27251==
==27251== Invalid read of size 4
==27251==    at 0x109197: main (lab5.c:8)
==27251==  Address 0x4a8c298 is 136 bytes inside an unallocated block of size 4,193,744 in arena "client"
==27251==
==27251==
==27251== HEAP SUMMARY:
==27251==     in use at exit: 0 bytes in 0 blocks
==27251==   total heap usage: 1 allocs, 1 frees, 400 bytes allocated
==27251==
==27251== All heap blocks were freed -- no leaks are possible
==27251==
==27251== For lists of detected and suppressed errors, rerun with: -s
==27251== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==32543==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x6140000001d0 at pc 0x56525df48225 bp 0x7ffe3dedc430 sp 0x7ffe3dedc420        
WRITE of size 4 at 0x6140000001d0 thread T0
    #0 0x56525df48224 in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:7
    #1 0x7f40a5521d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f40a5521e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56525df48104 in _start (/mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5+0x1104)

0x6140000001d0 is located 0 bytes to the right of 400-byte region [0x614000000040,0x6140000001d0)
allocated by thread T0 here:
    #0 0x7f40a57d5887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56525df481da in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:6

SUMMARY: AddressSanitizer: heap-buffer-overflow /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:7 in main
Shadow bytes around the buggy address:
  0x0c287fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff8000: fa fa fa fa fa fa fa fa 00 00 00 00 00 00 00 00
  0x0c287fff8010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff8020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c287fff8030: 00 00 00 00 00 00 00 00 00 00[fa]fa fa fa fa fa
  0x0c287fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8060: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8070: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==32543==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int stackArray[100];
    stackArray[100] = 0;
    int stackVar = stackArray[150];

    return 0;
}

```
#### Valgrind Report
```
==27476== Memcheck, a memory error detector
==27476== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==27476== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==27476== Command: ./lab5
==27476==
==27476== 
==27476== HEAP SUMMARY:
==27476==     in use at exit: 0 bytes in 0 blocks
==27476==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==27476==
==27476== All heap blocks were freed -- no leaks are possible
==27476==
==27476== For lists of detected and suppressed errors, rerun with: -s
==27476== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==32922==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe2e9cc6b0 at pc 0x555c03f582d5 bp 0x7ffe2e9cc4e0 sp 0x7ffe2e9cc4d0       
WRITE of size 4 at 0x7ffe2e9cc6b0 thread T0
    #0 0x555c03f582d4 in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:7
    #1 0x7fb23074fd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb23074fe3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x555c03f58104 in _start (/mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5+0x1104)

Address 0x7ffe2e9cc6b0 is located in stack of thread T0 at offset 448 in frame
    #0 0x555c03f581d8 in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:5

  This frame has 1 object(s):
    [48, 448) 'stackArray' (line 6) <== Memory access at offset 448 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:7 in main
Shadow bytes around the buggy address:
  0x100045d31880: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045d31890: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
  0x100045d318a0: f1 f1 f1 f1 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045d318b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045d318c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100045d318d0: 00 00 00 00 00 00[f3]f3 f3 f3 f3 f3 f3 f3 00 00
  0x100045d318e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045d318f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045d31900: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045d31910: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100045d31920: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==32922==ABORTING
```

### Global out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int globalArray[100] = {-1};

int main(void)
{
    globalArray[100] = 0;
    int globalVar = globalArray[150];

    return 0;
}

```
#### Valgrind Report
```
==28011== Memcheck, a memory error detector
==28011== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28011== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==28011== Command: ./lab5
==28011==
==28011== 
==28011== HEAP SUMMARY:
==28011==     in use at exit: 0 bytes in 0 blocks
==28011==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==28011==
==28011== All heap blocks were freed -- no leaks are possible
==28011==
==28011== For lists of detected and suppressed errors, rerun with: -s
==28011== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==33399==ERROR: AddressSanitizer: global-buffer-overflow on address 0x555d2c3701b0 at pc 0x555d2c36d203 bp 0x7ffdd5205440 sp 0x7ffdd5205430
WRITE of size 4 at 0x555d2c3701b0 thread T0
    #0 0x555d2c36d202 in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:8
    #1 0x7fabb5fa8d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fabb5fa8e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x555d2c36d104 in _start (/mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5+0x1104)

0x555d2c3701b0 is located 0 bytes to the right of global variable 'globalArray' defined in 'lab5.c:4:5' (0x555d2c370020) of size 400
SUMMARY: AddressSanitizer: global-buffer-overflow /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:8 in main
Shadow bytes around the buggy address:
  0x0aac25865fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aac25865ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aac25866000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aac25866010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aac25866020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0aac25866030: 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 00 00 00 00
  0x0aac25866040: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x0aac25866050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aac25866060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aac25866070: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aac25866080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==33399==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int* heapArray = malloc(100 * sizeof(int));
    free(heapArray);

    int uafVar = heapArray[50];
    heapArray[50] = 400;

    return 0;
}

```
#### Valgrind Report
```
==28260== Memcheck, a memory error detector
==28260== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28260== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==28260== Command: ./lab5
==28260==
==28260== Invalid read of size 4
==28260==    at 0x109193: main (lab5.c:9)
==28260==  Address 0x4a8c108 is 200 bytes inside a block of size 400 free'd
==28260==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==28260==    by 0x10918E: main (lab5.c:7)
==28260==  Block was alloc'd at
==28260==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==28260==    by 0x10917E: main (lab5.c:6)
==28260==
==28260== Invalid write of size 4
==28260==    at 0x1091A6: main (lab5.c:10)
==28260==  Address 0x4a8c108 is 200 bytes inside a block of size 400 free'd
==28260==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==28260==    by 0x10918E: main (lab5.c:7)
==28260==  Block was alloc'd at
==28260==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==28260==    by 0x10917E: main (lab5.c:6)
==28260==
==28260==
==28260== HEAP SUMMARY:
==28260==     in use at exit: 0 bytes in 0 blocks
==28260==   total heap usage: 1 allocs, 1 frees, 400 bytes allocated
==28260==
==28260== All heap blocks were freed -- no leaks are possible
==28260==
==28260== For lists of detected and suppressed errors, rerun with: -s
==28260== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==33653==ERROR: AddressSanitizer: heap-use-after-free on address 0x614000000108 at pc 0x55dd621d421f bp 0x7ffcb0715bd0 sp 0x7ffcb0715bc0
WRITE of size 4 at 0x614000000108 thread T0
    #0 0x55dd621d421e in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:10
    #1 0x7f66a7dddd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f66a7ddde3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55dd621d4104 in _start (/mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5+0x1104)

0x614000000108 is located 200 bytes inside of 400-byte region [0x614000000040,0x6140000001d0)
freed by thread T0 here:
    #0 0x7f66a8091537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55dd621d41e2 in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:7

previously allocated by thread T0 here:
    #0 0x7f66a8091887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55dd621d41d7 in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:6

SUMMARY: AddressSanitizer: heap-use-after-free /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:10 in main
Shadow bytes around the buggy address:
  0x0c287fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff8000: fa fa fa fa fa fa fa fa fd fd fd fd fd fd fd fd
  0x0c287fff8010: fd fd fd fd fd fd fd fd fd fd fd fd fd fd fd fd
=>0x0c287fff8020: fd[fd]fd fd fd fd fd fd fd fd fd fd fd fd fd fd
  0x0c287fff8030: fd fd fd fd fd fd fd fd fd fd fa fa fa fa fa fa
  0x0c287fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8060: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8070: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==33653==ABORTING
```

### Use-after-return
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int *doSomething() {
    int stackArray[100];
    return stackArray;
}

int main() {
    int *array = doSomething();
    array[50] = 100;

    return 0;
}

```
#### Valgrind Report
```
==29183== Memcheck, a memory error detector
==29183== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==29183== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==29183== Command: ./lab5
==29183==
==29183== Invalid write of size 4
==29183==    at 0x1091A6: main (lab5.c:11)
==29183==  Address 0xc8 is not stack'd, malloc'd or (recently) free'd
==29183==
==29183==
==29183== Process terminating with default action of signal 11 (SIGSEGV)
==29183==  Access not within mapped region at address 0xC8
==29183==    at 0x1091A6: main (lab5.c:11)
==29183==  If you believe this happened as a result of a stack
==29183==  overflow in your program's main thread (unlikely but
==29183==  possible), you can try to increase the size of the
==29183==  main thread stack using the --main-stacksize= flag.
==29183==  The main thread stack size used in this run was 8388608.
==29183==
==29183== HEAP SUMMARY:
==29183==     in use at exit: 0 bytes in 0 blocks
==29183==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==29183==
==29183== All heap blocks were freed -- no leaks are possible
==29183==
==29183== For lists of detected and suppressed errors, rerun with: -s
==29183== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==33962==ERROR: AddressSanitizer: SEGV on unknown address 0x0000000000c8 (pc 0x5571126fc1cb bp 0x000000000001 sp 0x7fffae294c90 T0)
==33962==The signal is caused by a WRITE memory access.
==33962==Hint: address points to the zero page.
    #0 0x5571126fc1cb in main /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:11
    #1 0x7f719a70ad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f719a70ae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5571126fc0c4 in _start (/mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5+0x10c4)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /mnt/c/Users/Acer/Desktop/Software-testing/lab/112-spring-software-testing/112-spring-software-testing/lab5/lab5.c:11 in main
==33962==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int array1[8];
int array2[8];

int main() {
    array2[16] = 123;
    return 0;
}
```
### Why
Asan會通過，我首先寫一個out-of-bound的程式(ex. array1[9] = 123;)先看Asan出來的結果來確認array跟redzone分配的位置，經過測試發現說array2的位置被分配在array1的前面，array2的後32 bytes被設為redzone，因為1個shadowbyte表示8個application bytes，而這個redzone後面32 bytes是array1的位置，然後array1的後32 bytes被設為redzone，所以如果我想要用array2的位置去跨過redzone到array1[0]的位置的話就會需要跨過32 bytes，而已知一個int是4 bytes，所以32 / 4 = 8，因此array2[16]就會剛好跨過redzone到array1[0]的位置，因為不是指派到的位置，所以Asan沒有偵測出來。
