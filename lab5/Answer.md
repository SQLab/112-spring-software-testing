# Answer

Name: 寸少康
ID: 312553021

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   yes    |  yes |
| Stack out-of-bounds  |   no     |  yes |
| Global out-of-bounds |   no     |  yes |
| Use-after-free       |   yes    |  yes |
| Use-after-return     |   yes    |  yes |

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>

int main() {
    int *arr = malloc(3 * sizeof(int));
    arr[3] = 1;    //write
    int a = arr[3];  //read
    free(arr);

    return 0;
}
```
#### Valgrind Report
```
==2947== Memcheck, a memory error detector
==2947== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2947== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2947== Command: ./Heap-out-of-bounds
==2947==
==2947== Invalid write of size 4
==2947==    at 0x10918B: main (in /home/kyle/lab5/Heap-out-of-bounds)
==2947==  Address 0x4a8c04c is 0 bytes after a block of size 12 alloc'd
==2947==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2947==    by 0x10917E: main (in /home/kyle/lab5/Heap-out-of-bounds)
==2947==
==2947== Invalid read of size 4
==2947==    at 0x109195: main (in /home/kyle/lab5/Heap-out-of-bounds)
==2947==  Address 0x4a8c04c is 0 bytes after a block of size 12 alloc'd
==2947==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2947==    by 0x10917E: main (in /home/kyle/lab5/Heap-out-of-bounds)
==2947==
==2947==
==2947== HEAP SUMMARY:
==2947==     in use at exit: 0 bytes in 0 blocks
==2947==   total heap usage: 1 allocs, 1 frees, 12 bytes allocated
==2947==
==2947== All heap blocks were freed -- no leaks are possible
==2947==
==2947== For lists of detected and suppressed errors, rerun with: -s
==2947== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==2960==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000001c at pc 0x557f7c6e521f bp 0x7ffe41d16940 sp 0x7ffe41d16930
WRITE of size 4 at 0x60200000001c thread T0
    #0 0x557f7c6e521e in main /home/kyle/lab5/Heap-out-of-bounds.c:5
    #1 0x7fe10fd6dd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fe10fd6de3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x557f7c6e5104 in _start (/home/kyle/lab5/Heap-out-of-bounds+0x1104)

0x60200000001c is located 0 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x7fe110021887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x557f7c6e51da in main /home/kyle/lab5/Heap-out-of-bounds.c:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/kyle/lab5/Heap-out-of-bounds.c:5 in main
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
==2960==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int arr[3];
    arr[3] = 1;         //write
    int a = arr[3];     //read

    return 0;
}
```
#### Valgrind Report
```
==2551== Memcheck, a memory error detector
==2551== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2551== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2551== Command: ./Stack-out-of-bounds
==2551==
*** stack smashing detected ***: terminated
==2551==
==2551== Process terminating with default action of signal 6 (SIGABRT)
==2551==    at 0x48F69FC: __pthread_kill_implementation (pthread_kill.c:44)
==2551==    by 0x48F69FC: __pthread_kill_internal (pthread_kill.c:78)
==2551==    by 0x48F69FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==2551==    by 0x48A2475: raise (raise.c:26)
==2551==    by 0x48887F2: abort (abort.c:79)
==2551==    by 0x48E9675: __libc_message (libc_fatal.c:155)
==2551==    by 0x4996599: __fortify_fail (fortify_fail.c:26)
==2551==    by 0x4996565: __stack_chk_fail (stack_chk_fail.c:24)
==2551==    by 0x109189: main (in /home/kyle/lab5/Stack-out-of-bounds)
==2551==
==2551== HEAP SUMMARY:
==2551==     in use at exit: 0 bytes in 0 blocks
==2551==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==2551==
==2551== All heap blocks were freed -- no leaks are possible
==2551==
==2551== For lists of detected and suppressed errors, rerun with: -s
==2551== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted
```
### ASan Report
```
=================================================================
==2558==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffdd360fe5c at pc 0x55e6ac3da2a8 bp 0x7ffdd360fe20 sp 0x7ffdd360fe10
WRITE of size 4 at 0x7ffdd360fe5c thread T0
    #0 0x55e6ac3da2a7 in main /home/kyle/lab5/Stack-out-of-bounds.c:5
    #1 0x7fb53bc50d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb53bc50e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e6ac3da104 in _start (/home/kyle/lab5/Stack-out-of-bounds+0x1104)

Address 0x7ffdd360fe5c is located in stack of thread T0 at offset 44 in frame
    #0 0x55e6ac3da1d8 in main /home/kyle/lab5/Stack-out-of-bounds.c:3

  This frame has 1 object(s):
    [32, 44) 'arr' (line 4) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/kyle/lab5/Stack-out-of-bounds.c:5 in main
Shadow bytes around the buggy address:
  0x10003a6b9f70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003a6b9f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003a6b9f90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003a6b9fa0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003a6b9fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10003a6b9fc0: 00 00 00 00 00 00 f1 f1 f1 f1 00[04]f3 f3 00 00
  0x10003a6b9fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003a6b9fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003a6b9ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003a6ba000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003a6ba010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==2558==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
int arr[3];

int main() {
    arr[3] = 1;     //write
    int a = arr[3];  //read

    return 0;
}
```
#### Valgrind Report
```
==2532== Memcheck, a memory error detector
==2532== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2532== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2532== Command: ./Global-out-of-bounds
==2532==
==2532==
==2532== HEAP SUMMARY:
==2532==     in use at exit: 0 bytes in 0 blocks
==2532==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==2532==
==2532== All heap blocks were freed -- no leaks are possible
==2532==
==2532== For lists of detected and suppressed errors, rerun with: -s
==2532== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==2544==ERROR: AddressSanitizer: global-buffer-overflow on address 0x562fe90120ac at pc 0x562fe900f20c bp 0x7ffd29ffa760 sp 0x7ffd29ffa750
WRITE of size 4 at 0x562fe90120ac thread T0
    #0 0x562fe900f20b in main /home/kyle/lab5/Global-out-of-bounds.c:5
    #1 0x7f10402e8d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f10402e8e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x562fe900f104 in _start (/home/kyle/lab5/Global-out-of-bounds+0x1104)

0x562fe90120ac is located 0 bytes to the right of global variable 'arr' defined in 'Global-out-of-bounds.c:2:5' (0x562fe90120a0) of size 12
SUMMARY: AddressSanitizer: global-buffer-overflow /home/kyle/lab5/Global-out-of-bounds.c:5 in main
Shadow bytes around the buggy address:
  0x0ac67d1fa3c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac67d1fa3d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac67d1fa3e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac67d1fa3f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac67d1fa400: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ac67d1fa410: 00 00 00 00 00[04]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0ac67d1fa420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac67d1fa430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac67d1fa440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac67d1fa450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac67d1fa460: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==2544==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    free(ptr);
    *ptr = 1;   //use after free

    return 0;
}
```
#### Valgrind Report
```
==2593== Memcheck, a memory error detector
==2593== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2593== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2593== Command: ./Use-after-free
==2593==
==2593== Invalid write of size 4
==2593==    at 0x109193: main (in /home/kyle/lab5/Use-after-free)
==2593==  Address 0x4a8c040 is 0 bytes inside a block of size 4 free'd
==2593==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2593==    by 0x10918E: main (in /home/kyle/lab5/Use-after-free)
==2593==  Block was alloc'd at
==2593==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2593==    by 0x10917E: main (in /home/kyle/lab5/Use-after-free)
==2593==
==2593==
==2593== HEAP SUMMARY:
==2593==     in use at exit: 0 bytes in 0 blocks
==2593==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==2593==
==2593== All heap blocks were freed -- no leaks are possible
==2593==
==2593== For lists of detected and suppressed errors, rerun with: -s
==2593== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==2599==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55a0e776d217 bp 0x7ffdbaf541e0 sp 0x7ffdbaf541d0
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x55a0e776d216 in main /home/kyle/lab5/Use-after-free.c:6
    #1 0x7f570e373d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f570e373e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55a0e776d104 in _start (/home/kyle/lab5/Use-after-free+0x1104)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f570e627537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55a0e776d1e2 in main /home/kyle/lab5/Use-after-free.c:5

previously allocated by thread T0 here:
    #0 0x7f570e627887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55a0e776d1d7 in main /home/kyle/lab5/Use-after-free.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /home/kyle/lab5/Use-after-free.c:6 in main
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
==2599==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>

int* func() {
    int arr[3];
    arr[0] = 1;
    return arr;
}

int main() {
    int* arr = func();
    printf("%d\n", arr[0]);     //use after return

    return 0;
}
```
#### Valgrind Report
```
==2700== Memcheck, a memory error detector
==2700== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2700== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2700== Command: ./Return-Use-after
==2700==
==2700== Invalid read of size 4
==2700==    at 0x1091C4: main (in /home/kyle/lab5/Return-Use-after)
==2700==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==2700==
==2700==
==2700== Process terminating with default action of signal 11 (SIGSEGV)
==2700==  Access not within mapped region at address 0x0
==2700==    at 0x1091C4: main (in /home/kyle/lab5/Return-Use-after)
==2700==  If you believe this happened as a result of a stack
==2700==  overflow in your program's main thread (unlikely but
==2700==  possible), you can try to increase the size of the
==2700==  main thread stack using the --main-stacksize= flag.
==2700==  The main thread stack size used in this run was 8388608.
==2700==
==2700== HEAP SUMMARY:
==2700==     in use at exit: 0 bytes in 0 blocks
==2700==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==2700==
==2700== All heap blocks were freed -- no leaks are possible
==2700==
==2700== For lists of detected and suppressed errors, rerun with: -s
==2700== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==2720==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5600eee4f377 bp 0x000000000001 sp 0x7ffd09d2cba0 T0)
==2720==The signal is caused by a READ memory access.
==2720==Hint: address points to the zero page.
    #0 0x5600eee4f377 in main /home/kyle/lab5/Return-Use-after.c:11
    #1 0x7ffbf4f4ed8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ffbf4f4ee3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5600eee4f184 in _start (/home/kyle/lab5/Return-Use-after+0x1184)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/kyle/lab5/Return-Use-after.c:11 in main
==2720==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    int a[8];
    int b[8] = {1, 2, 3, 4, 5, 6, 7, 8};
    printf("%d", a[20]);

    return 0;
}
```
### Why
In the case of integers, ASan utilizes shadow memory with an offset. A 32-byte redzone is allocated behind int[8]. With each int being 4 bytes, it means that the positions of 8 integers after a[8] fall within the redzone range. 
The output result is 5, corresponding to the position of b[4]. This occurs because a[20] is 12 positions after a[8], and a[16] extends beyond the redzone, overlapping with b[0]. Therefore, a[20] essentially accesses the same memory location as b[4]. There is no read or write operation on the redzone during this process, and ASan cannot detect the error.


