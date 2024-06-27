# Answer

Name: 吳哲宇
ID: 312551084

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    v     |  v   |
| Stack out-of-bounds  |    x     |  v   |
| Global out-of-bounds |    x     |  v   |
| Use-after-free       |    v     |  v   |
| Use-after-return     |    v     |  v   |

### Heap out-of-bounds
#### Source code
```c
#include <stdlib.h>

int main() {
    int* array = (int*)malloc(10 * sizeof(int)); 
    array[10] = 5;
    int value = array[10];
    free(array);
    return 0;
}
```
#### Valgrind Report
```
==2482== Memcheck, a memory error detector
==2482== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2482== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2482== Command: ./test
==2482== 
==2482== Invalid write of size 4
==2482==    at 0x10918B: main (test.c:8)
==2482==  Address 0x4ac8068 is 0 bytes after a block of size 40 alloc'd
==2482==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2482==    by 0x10917E: main (test.c:7)
==2482== 
==2482== Invalid read of size 4
==2482==    at 0x109195: main (test.c:9)
==2482==  Address 0x4ac8068 is 0 bytes after a block of size 40 alloc'd
==2482==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2482==    by 0x10917E: main (test.c:7)
==2482== 
==2482== 
==2482== HEAP SUMMARY:
==2482==     in use at exit: 0 bytes in 0 blocks
==2482==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==2482== 
==2482== All heap blocks were freed -- no leaks are possible
==2482== 
==2482== For lists of detected and suppressed errors, rerun with: -s
==2482== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3192==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x55ef4d7b721f bp 0x7ffd8cefa770 sp 0x7ffd8cefa760
WRITE of size 4 at 0x604000000038 thread T0
    #0 0x55ef4d7b721e in main /home/user/test.c:5
    #1 0x7fa7764dad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fa7764dae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55ef4d7b7104 in _start (/home/user/test+0x1104)

0x604000000038 is located 0 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7fa77678e887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55ef4d7b71da in main /home/user/test.c:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/user/test.c:5 in main
Shadow bytes around the buggy address:
  0x0c087fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c087fff8000: fa fa 00 00 00 00 00[fa]fa fa fa fa fa fa fa fa
  0x0c087fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==3192==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
#include <stdio.h>

void function() {
    int stackArray[10];
    stackArray[10] = 100;
    printf("%d\n", stackArray[10]);
}

int main() {
    function();
    return 0;
}
```
#### Valgrind Report
```
==2567== Memcheck, a memory error detector
==2567== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2567== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2567== Command: ./test
==2567== 
100
*** stack smashing detected ***: terminated
==2567== 
==2567== Process terminating with default action of signal 6 (SIGABRT): dumping core
==2567==    at 0x49329FC: __pthread_kill_implementation (pthread_kill.c:44)
==2567==    by 0x49329FC: __pthread_kill_internal (pthread_kill.c:78)
==2567==    by 0x49329FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==2567==    by 0x48DE475: raise (raise.c:26)
==2567==    by 0x48C47F2: abort (abort.c:79)
==2567==    by 0x4925675: __libc_message (libc_fatal.c:155)
==2567==    by 0x49D2599: __fortify_fail (fortify_fail.c:26)
==2567==    by 0x49D2565: __stack_chk_fail (stack_chk_fail.c:24)
==2567==    by 0x1091B8: function (test.c:7)
==2567==    by 0x1091CC: main (test.c:10)
==2567== 
==2567== HEAP SUMMARY:
==2567==     in use at exit: 1,024 bytes in 1 blocks
==2567==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==2567== 
==2567== LEAK SUMMARY:
==2567==    definitely lost: 0 bytes in 0 blocks
==2567==    indirectly lost: 0 bytes in 0 blocks
==2567==      possibly lost: 0 bytes in 0 blocks
==2567==    still reachable: 1,024 bytes in 1 blocks
==2567==         suppressed: 0 bytes in 0 blocks
==2567== Rerun with --leak-check=full to see details of leaked memory
==2567== 
==2567== For lists of detected and suppressed errors, rerun with: -s
==2567== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted (core dumped)
```
### ASan Report
```
==3091==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffc0378758 at pc 0x55646bd4d347 bp 0x7fffc03786f0 sp 0x7fffc03786e0
WRITE of size 4 at 0x7fffc0378758 thread T0
    #0 0x55646bd4d346 in function /home/user/test.c:5
    #1 0x55646bd4d385 in main /home/user/test.c:10
    #2 0x7ff3bbf4dd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7ff3bbf4de3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x55646bd4d164 in _start (/home/user/test+0x1164)

Address 0x7fffc0378758 is located in stack of thread T0 at offset 88 in frame
    #0 0x55646bd4d238 in function /home/user/test.c:3

  This frame has 1 object(s):
    [48, 88) 'stackArray' (line 4) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/user/test.c:5 in function
Shadow bytes around the buggy address:
  0x100078067090: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000780670a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000780670b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000780670c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000780670d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x1000780670e0: f1 f1 f1 f1 f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3
  0x1000780670f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078067100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078067110: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078067120: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078067130: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
```

### Global out-of-bounds
#### Source code
```c
#include <stdio.h>

int globalArray[10];

int main() {
    globalArray[10] = 200;  // 寫入越界
    printf("%d\n", globalArray[10]);  // 讀取越界
    return 0;
}
```
#### Valgrind Report
```
==2671== Memcheck, a memory error detector
==2671== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2671== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2671== Command: ./test
==2671== 
200
==2671== 
==2671== HEAP SUMMARY:
==2671==     in use at exit: 0 bytes in 0 blocks
==2671==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==2671== 
==2671== All heap blocks were freed -- no leaks are possible
==2671== 
==2671== For lists of detected and suppressed errors, rerun with: -s
==2671== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3116==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55fa6fe19108 at pc 0x55fa6fe16242 bp 0x7ffe8a477c60 sp 0x7ffe8a477c50
WRITE of size 4 at 0x55fa6fe19108 thread T0
    #0 0x55fa6fe16241 in main /home/user/test.c:6
    #1 0x7ff7603d2d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ff7603d2e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55fa6fe16124 in _start (/home/user/test+0x1124)

0x55fa6fe19108 is located 0 bytes to the right of global variable 'globalArray' defined in 'test.c:3:5' (0x55fa6fe190e0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/user/test.c:6 in main
Shadow bytes around the buggy address:
  0x0abfcdfbb1d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abfcdfbb1e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abfcdfbb1f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abfcdfbb200: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0abfcdfbb210: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0abfcdfbb220: 00[f9]f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x0abfcdfbb230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abfcdfbb240: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abfcdfbb250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abfcdfbb260: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abfcdfbb270: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3116==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdlib.h>

int main() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 10;
    free(ptr);
    *ptr = 20;  // 使用釋放後的記憶體
    return 0;
}
```
#### Valgrind Report
```
==2723== Memcheck, a memory error detector
==2723== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2723== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2723== Command: ./test
==2723== 
==2723== Invalid write of size 4
==2723==    at 0x10919D: main (test.c:7)
==2723==  Address 0x4ac8040 is 0 bytes inside a block of size 4 free'd
==2723==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2723==    by 0x109198: main (test.c:6)
==2723==  Block was alloc'd at
==2723==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2723==    by 0x10917E: main (test.c:4)
==2723== 
==2723== 
==2723== HEAP SUMMARY:
==2723==     in use at exit: 0 bytes in 0 blocks
==2723==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==2723== 
==2723== All heap blocks were freed -- no leaks are possible
==2723== 
==2723== For lists of detected and suppressed errors, rerun with: -s
==2723== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==3142==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x560556d1e241 bp 0x7ffefec5f470 sp 0x7ffefec5f460
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x560556d1e240 in main /home/user/test.c:7
    #1 0x7fb6f25fed8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb6f25fee3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x560556d1e104 in _start (/home/user/test+0x1104)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7fb6f28b2537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x560556d1e204 in main /home/user/test.c:6

previously allocated by thread T0 here:
    #0 0x7fb6f28b2887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x560556d1e1d7 in main /home/user/test.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /home/user/test.c:7 in main
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
```

### Use-after-return
#### Source code
```c
#include <stdio.h>

int* function() {
    int local = 10;
    return &local;
}

int main() {
    int* ptr = function();
    *ptr = 20;  // 使用返回後的堆疊記憶體
    printf("%d\n", *ptr);
    return 0;
}
```
#### Valgrind Report
```
==2749== Memcheck, a memory error detector
==2749== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2749== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2749== Command: ./test
==2749== 
==2749== Invalid write of size 4
==2749==    at 0x1091C4: main (test.c:10)
==2749==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==2749== 
==2749== 
==2749== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==2749==  Access not within mapped region at address 0x0
==2749==    at 0x1091C4: main (test.c:10)
==2749==  If you believe this happened as a result of a stack
==2749==  overflow in your program's main thread (unlikely but
==2749==  possible), you can try to increase the size of the
==2749==  main thread stack using the --main-stacksize= flag.
==2749==  The main thread stack size used in this run was 8388608.
==2749== 
==2749== HEAP SUMMARY:
==2749==     in use at exit: 0 bytes in 0 blocks
==2749==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==2749== 
==2749== All heap blocks were freed -- no leaks are possible
==2749== 
==2749== For lists of detected and suppressed errors, rerun with: -s
==2749== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)

```
### ASan Report
```
==3167==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5562e515e224 bp 0x000000000001 sp 0x7ffe222eed10 T0)
==3167==The signal is caused by a WRITE memory access.
==3167==Hint: address points to the zero page.
    #0 0x5562e515e224 in main /home/user/test.c:10
    #1 0x7f3e1c6ddd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f3e1c6dde3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5562e515e124 in _start (/home/user/test+0x1124)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/user/test.c:10 in main
==3167==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>

int globalArray0[8];
int globalArray1[8];

int main() {
    globalArray1[8+8] = 200;
    return 0;
}
```
### Why
先觀察寫入 globalArray0[8], globalArray1[9] 的 ASan error，可以觀察到皆為:
```
...
0x0abcaebaf210: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0abcaebaf220 f9 f9 f9 f9 00 00 00 00 [f9] f9 f9 f9 00 00 00 00
...
```

觀察寫入 globalArray0[10], globalArray1[9] 的 ASan error，可以觀察為:
```
...
0x0abcaebaf210: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0abcaebaf220 f9 f9 f9 f9 00 00 00 00 f9 [f9] f9 f9 00 00 00 00
...
```

可以驗證**一個 shadow code 是 8bytes**

觀察寫入 globalArray1[8] 的 ASan error，可以觀察為:
```
...
0x0abcaebaf210: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0abcaebaf220 [f9] f9 f9 f9 00 00 00 00 f9 f9 f9 f9 00 00 00 00
...
```

可以得知**globalArray1 的 memory 被 allocate 在 globalArray0 之前**，且**globalArray1 與 globalArray0 之間的 RedZone 大小為 8bytes**

因此，只要 assign globalArray1[16] 就會跨過 RedZone，直接寫到 globalArray0[0] 的 memory location，沒寫到 RedZone ASan 自然就不會偵測到。