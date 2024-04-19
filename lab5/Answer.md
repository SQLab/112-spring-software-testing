# Answer

Name: 鄭博薪

ID: 312555020

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | YES      | YES  |
| Stack out-of-bounds  | NO       | YES  |
| Global out-of-bounds | NO       | YES  |
| Use-after-free       | YES      | YES  |
| Use-after-return     | NO       | YES  |

### Heap out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(5 * sizeof(int));

    // Writing out of bounds
    ptr[5] = 6;

    // Reading out of bounds
    int val = ptr[5];

    free(ptr);

    return 0;
}
```
#### Valgrind Report
```
==3724022== Memcheck, a memory error detector
==3724022== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3724022== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3724022== Command: ./test_valgrind
==3724022== 
==3724022== Invalid write of size 4
==3724022==    at 0x10918B: main (in /home/joyuri1022/software_testing_homework/lab/test_valgrind)
==3724022==  Address 0x4aab054 is 0 bytes after a block of size 20 alloc'd
==3724022==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3724022==    by 0x10917E: main (in /home/joyuri1022/software_testing_homework/lab/test_valgrind)
==3724022== 
==3724022== Invalid read of size 4
==3724022==    at 0x109195: main (in /home/joyuri1022/software_testing_homework/lab/test_valgrind)
==3724022==  Address 0x4aab054 is 0 bytes after a block of size 20 alloc'd
==3724022==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3724022==    by 0x10917E: main (in /home/joyuri1022/software_testing_homework/lab/test_valgrind)
==3724022== 
==3724022== 
==3724022== HEAP SUMMARY:
==3724022==     in use at exit: 0 bytes in 0 blocks
==3724022==   total heap usage: 1 allocs, 1 frees, 20 bytes allocated
==3724022== 
==3724022== All heap blocks were freed -- no leaks are possible
==3724022== 
==3724022== For lists of detected and suppressed errors, rerun with: -s
==3724022== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==3729409==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x5d8cf48e621f bp 0x7ffc249ea3f0 sp 0x7ffc249ea3e0
WRITE of size 4 at 0x603000000054 thread T0
    #0 0x5d8cf48e621e in main /home/joyuri1022/software_testing_homework/lab/source.c:8
    #1 0x7224e1e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7224e1e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5d8cf48e6104 in _start (/home/joyuri1022/software_testing_homework/lab/test_asan+0x1104)

0x603000000054 is located 0 bytes to the right of 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:
    #0 0x7224e22b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5d8cf48e61da in main /home/joyuri1022/software_testing_homework/lab/source.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/joyuri1022/software_testing_homework/lab/source.c:8 in main
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
==3729409==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    
    // Out-of-bounds write
    arr[5] = 6;
    
    // Out-of-bounds read
    printf("%d\n", arr[6]);
    
    return 0;
}
```
#### Valgrind Report
```
==3749859== Memcheck, a memory error detector
==3749859== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3749859== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3749859== Command: ./test_valgrind
==3749859== 
1662344960
==3749859== 
==3749859== HEAP SUMMARY:
==3749859==     in use at exit: 0 bytes in 0 blocks
==3749859==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==3749859== 
==3749859== All heap blocks were freed -- no leaks are possible
==3749859== 
==3749859== For lists of detected and suppressed errors, rerun with: -s
==3749859== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==3751866==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc19952b34 at pc 0x5648adc05466 bp 0x7ffc19952af0 sp 0x7ffc19952ae0
WRITE of size 4 at 0x7ffc19952b34 thread T0
    #0 0x5648adc05465 in main /home/joyuri1022/software_testing_homework/lab/source.c:7
    #1 0x72f5e7e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x72f5e7e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5648adc05184 in _start (/home/joyuri1022/software_testing_homework/lab/test_asan+0x1184)

Address 0x7ffc19952b34 is located in stack of thread T0 at offset 52 in frame
    #0 0x5648adc05258 in main /home/joyuri1022/software_testing_homework/lab/source.c:3

  This frame has 1 object(s):
    [32, 52) 'arr' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/joyuri1022/software_testing_homework/lab/source.c:7 in main
Shadow bytes around the buggy address:
  0x100003322510: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100003322520: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100003322530: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100003322540: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100003322550: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100003322560: f1 f1 f1 f1 00 00[04]f3 f3 f3 f3 f3 00 00 00 00
  0x100003322570: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100003322580: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100003322590: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000033225a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000033225b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3751866==ABORTING
```

### Global out-of-bounds
#### Source code
```c
#include <stdio.h>

int global_arr[5] = {1, 2, 3, 4, 5};

int main() {
    // Out-of-bounds write
    global_arr[5] = 6;
    
    // Out-of-bounds read
    printf("%d\n", global_arr[6]);
    
    return 0;
}
```
#### Valgrind Report
```
==3756926== Memcheck, a memory error detector
==3756926== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3756926== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3756926== Command: ./test_valgrind
==3756926== 
0
==3756926== 
==3756926== HEAP SUMMARY:
==3756926==     in use at exit: 0 bytes in 0 blocks
==3756926==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==3756926== 
==3756926== All heap blocks were freed -- no leaks are possible
==3756926== 
==3756926== For lists of detected and suppressed errors, rerun with: -s
==3756926== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==3757221==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5bc0b3dfc034 at pc 0x5bc0b3df9289 bp 0x7fffa2432d80 sp 0x7fffa2432d70
WRITE of size 4 at 0x5bc0b3dfc034 thread T0
    #0 0x5bc0b3df9288 in main /home/joyuri1022/software_testing_homework/lab/source.c:7
    #1 0x77f04ea29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x77f04ea29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5bc0b3df9144 in _start (/home/joyuri1022/software_testing_homework/lab/test_asan+0x1144)

0x5bc0b3dfc034 is located 0 bytes to the right of global variable 'global_arr' defined in 'source.c:3:5' (0x5bc0b3dfc020) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/joyuri1022/software_testing_homework/lab/source.c:7 in main
Shadow bytes around the buggy address:
  0x0b78967b77b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b78967b77c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b78967b77d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b78967b77e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b78967b77f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0b78967b7800: 00 00 00 00 00 00[04]f9 f9 f9 f9 f9 00 00 00 00
  0x0b78967b7810: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0b78967b7820: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b78967b7830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b78967b7840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b78967b7850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3757221==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Allocate memory for an integer
    int *ptr = (int *)malloc(sizeof(int));

    // Write a value to the allocated memory
    *ptr = 56;
    printf("Value before free: %d\n", *ptr);

    // Free the allocated memory
    free(ptr);

    // Attempt to use the freed memory
    printf("Value after free: %d\n", *ptr);

    return 0;
}
```
#### Valgrind Report
```
==3767939== Memcheck, a memory error detector
==3767939== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3767939== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3767939== Command: ./test_valgrind
==3767939== 
Value before free: 56
==3767939== Invalid read of size 4
==3767939==    at 0x1091D9: main (in /home/joyuri1022/software_testing_homework/lab/test_valgrind)
==3767939==  Address 0x4aab040 is 0 bytes inside a block of size 4 free'd
==3767939==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3767939==    by 0x1091D4: main (in /home/joyuri1022/software_testing_homework/lab/test_valgrind)
==3767939==  Block was alloc'd at
==3767939==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3767939==    by 0x10919E: main (in /home/joyuri1022/software_testing_homework/lab/test_valgrind)
==3767939== 
Value after free: 56
==3767939== 
==3767939== HEAP SUMMARY:
==3767939==     in use at exit: 0 bytes in 0 blocks
==3767939==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==3767939== 
==3767939== All heap blocks were freed -- no leaks are possible
==3767939== 
==3767939== For lists of detected and suppressed errors, rerun with: -s
==3767939== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==3768879==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x57eca5fcd2ee bp 0x7ffd9c953530 sp 0x7ffd9c953520
READ of size 4 at 0x602000000010 thread T0
    #0 0x57eca5fcd2ed in main /home/joyuri1022/software_testing_homework/lab/source.c:16
    #1 0x7a70ce029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7a70ce029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x57eca5fcd184 in _start (/home/joyuri1022/software_testing_homework/lab/test_asan+0x1184)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7a70ce4b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x57eca5fcd29f in main /home/joyuri1022/software_testing_homework/lab/source.c:13

previously allocated by thread T0 here:
    #0 0x7a70ce4b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x57eca5fcd257 in main /home/joyuri1022/software_testing_homework/lab/source.c:6

SUMMARY: AddressSanitizer: heap-use-after-free /home/joyuri1022/software_testing_homework/lab/source.c:16 in main
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
==3768879==ABORTING
```

### Use-after-return
#### Source code
```c
volatile char* x;

void foo() {
    char stack_buffer[56];
    x = &stack_buffer[6];
}

int main() {

    foo();
    *x = 56;

    return (*x == 56);
}
```
#### Valgrind Report
```
==3806318== Memcheck, a memory error detector
==3806318== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3806318== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3806318== Command: ./test_valgrind
==3806318== 
==3806318== 
==3806318== HEAP SUMMARY:
==3806318==     in use at exit: 0 bytes in 0 blocks
==3806318==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3806318== 
==3806318== All heap blocks were freed -- no leaks are possible
==3806318== 
==3806318== For lists of detected and suppressed errors, rerun with: -s
==3806318== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==3805313==ERROR: AddressSanitizer: stack-use-after-return on address 0x7670f0aae026 at pc 0x5f1cf80e235c bp 0x7fff6f4aca60 sp 0x7fff6f4aca50
WRITE of size 1 at 0x7670f0aae026 thread T0
    #0 0x5f1cf80e235b in main /home/joyuri1022/software_testing_homework/lab/source.c:11
    #1 0x7670f4029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7670f4029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5f1cf80e2144 in _start (/home/joyuri1022/software_testing_homework/lab/test_asan+0x1144)

Address 0x7670f0aae026 is located in stack of thread T0 at offset 38 in frame
    #0 0x5f1cf80e2218 in foo /home/joyuri1022/software_testing_homework/lab/source.c:3

  This frame has 1 object(s):
    [32, 88) 'stack_buffer' (line 4) <== Memory access at offset 38 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/joyuri1022/software_testing_homework/lab/source.c:11 in main
Shadow bytes around the buggy address:
  0x0ece9e14dbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ece9e14dbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ece9e14dbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ece9e14dbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ece9e14dbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ece9e14dc00: f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0ece9e14dc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ece9e14dc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ece9e14dc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ece9e14dc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ece9e14dc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3805313==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

```
### Why

