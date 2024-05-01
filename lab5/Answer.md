# Answer

Name: 唐磊
ID: 312552020

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | 能 | 能 |
| Stack out-of-bounds  | 不能 | 能 |
| Global out-of-bounds | 不能 | 能 |
| Use-after-free       | 能 | 能 |
| Use-after-return     | 不能 | 能 |
### Heap out-of-bounds
#### Source code
```c
#include <stdlib.h>

int main() {
    char *ptr = (char*) malloc(32*sizeof(char));
    ptr[32] = '\0';
    char c = ptr[32];
    free(ptr);
    return 0;
}
```
#### Valgrind Report
```
==3839779== Memcheck, a memory error detector
==3839779== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3839779== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3839779== Command: ./test1
==3839779== 
==3839779== Invalid write of size 1
==3839779==    at 0x109167: main (in /net/gcs/112/312552020/112-spring-software-testing/lab5/test1)
==3839779==  Address 0x4a43060 is 0 bytes after a block of size 32 alloc'd
==3839779==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==3839779==    by 0x10915A: main (in /net/gcs/112/312552020/112-spring-software-testing/lab5/test1)
==3839779== 
==3839779== Invalid read of size 1
==3839779==    at 0x10916E: main (in /net/gcs/112/312552020/112-spring-software-testing/lab5/test1)
==3839779==  Address 0x4a43060 is 0 bytes after a block of size 32 alloc'd
==3839779==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==3839779==    by 0x10915A: main (in /net/gcs/112/312552020/112-spring-software-testing/lab5/test1)
==3839779== 
==3839779== 
==3839779== HEAP SUMMARY:
==3839779==     in use at exit: 0 bytes in 0 blocks
==3839779==   total heap usage: 1 allocs, 1 frees, 32 bytes allocated
==3839779== 
==3839779== All heap blocks were freed -- no leaks are possible
==3839779== 
==3839779== For lists of detected and suppressed errors, rerun with: -s
==3839779== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==199228==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000060 at pc 0x55a1a6a0d23f bp 0x7ffc9ce099f0 sp 0x7ffc9ce099e0
WRITE of size 1 at 0x603000000060 thread T0
    #0 0x55a1a6a0d23e in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test1.c:5
    #1 0x7f321f440d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f321f440e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55a1a6a0d124 in _start (/home/martintl25/code/sw/112-spring-software-testing/lab5/test1+0x1124)

0x603000000060 is located 0 bytes to the right of 32-byte region [0x603000000040,0x603000000060)
allocated by thread T0 here:
    #0 0x7f321f6f4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55a1a6a0d1fe in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test1.c:4
    #2 0x7f321f440d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/martintl25/code/sw/112-spring-software-testing/lab5/test1.c:5 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00 00 00[fa]fa fa fa
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
==199228==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
int main() {
    char str[32];
    str[32] = '\0';
    char c = str[32];
    return 0;
}
```
#### Valgrind Report
```
==3839874== Memcheck, a memory error detector
==3839874== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3839874== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3839874== Command: ./test2
==3839874== 
==3839874== 
==3839874== HEAP SUMMARY:
==3839874==     in use at exit: 0 bytes in 0 blocks
==3839874==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3839874== 
==3839874== All heap blocks were freed -- no leaks are possible
==3839874== 
==3839874== For lists of detected and suppressed errors, rerun with: -s
==3839874== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==199382==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd8b1b8c30 at pc 0x5619522ae286 bp 0x7ffd8b1b8bd0 sp 0x7ffd8b1b8bc0
WRITE of size 1 at 0x7ffd8b1b8c30 thread T0
    #0 0x5619522ae285 in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test2.c:3
    #1 0x7fc0f4e85d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fc0f4e85e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5619522ae104 in _start (/home/martintl25/code/sw/112-spring-software-testing/lab5/test2+0x1104)

Address 0x7ffd8b1b8c30 is located in stack of thread T0 at offset 64 in frame
    #0 0x5619522ae1d8 in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test2.c:1

  This frame has 1 object(s):
    [32, 64) 'str' (line 2) <== Memory access at offset 64 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/martintl25/code/sw/112-spring-software-testing/lab5/test2.c:3 in main
Shadow bytes around the buggy address:
  0x10003162f130: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003162f140: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003162f150: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003162f160: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003162f170: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x10003162f180: f1 f1 00 00 00 00[f3]f3 f3 f3 00 00 00 00 00 00
  0x10003162f190: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003162f1a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003162f1b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003162f1c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10003162f1d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==199382==ABORTING
```

### Global out-of-bounds
#### Source code
```c
char str[32];

int main() {
    str[32] = '\0';
    char c = str[32];
    return 0;
}
```
#### Valgrind Report
```
==3839901== Memcheck, a memory error detector
==3839901== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3839901== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3839901== Command: ./test3
==3839901== 
==3839901== 
==3839901== HEAP SUMMARY:
==3839901==     in use at exit: 0 bytes in 0 blocks
==3839901==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3839901== 
==3839901== All heap blocks were freed -- no leaks are possible
==3839901== 
==3839901== For lists of detected and suppressed errors, rerun with: -s
==3839901== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==199574==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55759d7af0c0 at pc 0x55759d7ac207 bp 0x7ffef4ea1b90 sp 0x7ffef4ea1b80
WRITE of size 1 at 0x55759d7af0c0 thread T0
    #0 0x55759d7ac206 in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test3.c:4
    #1 0x7fdb38ec3d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fdb38ec3e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55759d7ac104 in _start (/home/martintl25/code/sw/112-spring-software-testing/lab5/test3+0x1104)

0x55759d7af0c0 is located 0 bytes to the right of global variable 'str' defined in 'test3.c:1:6' (0x55759d7af0a0) of size 32
SUMMARY: AddressSanitizer: global-buffer-overflow /home/martintl25/code/sw/112-spring-software-testing/lab5/test3.c:4 in main
Shadow bytes around the buggy address:
  0x0aaf33aeddc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aaf33aeddd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aaf33aedde0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aaf33aeddf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aaf33aede00: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0aaf33aede10: 00 00 00 00 00 00 00 00[f9]f9 f9 f9 00 00 00 00
  0x0aaf33aede20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aaf33aede30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aaf33aede40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aaf33aede50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aaf33aede60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==199574==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdlib.h>

int main() {
    char* ptr = (char*) malloc(32*sizeof(char));
    *ptr = 'c';
    free(ptr);
    char c = *ptr;
    return 0;
}
```
#### Valgrind Report
```
==3840125== Memcheck, a memory error detector
==3840125== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==3840125== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==3840125== Command: ./test4
==3840125== 
==3840125== Invalid read of size 1
==3840125==    at 0x109176: main (in /net/gcs/112/312552020/112-spring-software-testing/lab5/test4)
==3840125==  Address 0x4a43040 is 0 bytes inside a block of size 32 free'd
==3840125==    at 0x484317B: free (vg_replace_malloc.c:872)
==3840125==    by 0x109171: main (in /net/gcs/112/312552020/112-spring-software-testing/lab5/test4)
==3840125==  Block was alloc'd at
==3840125==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==3840125==    by 0x10915A: main (in /net/gcs/112/312552020/112-spring-software-testing/lab5/test4)
==3840125== 
==3840125== 
==3840125== HEAP SUMMARY:
==3840125==     in use at exit: 0 bytes in 0 blocks
==3840125==   total heap usage: 1 allocs, 1 frees, 32 bytes allocated
==3840125== 
==3840125== All heap blocks were freed -- no leaks are possible
==3840125== 
==3840125== For lists of detected and suppressed errors, rerun with: -s
==3840125== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==199688==ERROR: AddressSanitizer: heap-use-after-free on address 0x603000000040 at pc 0x556c9c88927e bp 0x7ffc9697dc50 sp 0x7ffc9697dc40
READ of size 1 at 0x603000000040 thread T0
    #0 0x556c9c88927d in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test4.c:7
    #1 0x7f22db634d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f22db634e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x556c9c889124 in _start (/home/martintl25/code/sw/112-spring-software-testing/lab5/test4+0x1124)

0x603000000040 is located 0 bytes inside of 32-byte region [0x603000000040,0x603000000060)
freed by thread T0 here:
    #0 0x7f22db8e8537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x556c9c889249 in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test4.c:6
    #2 0x7f22db634d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7f22db8e8887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x556c9c8891fe in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test4.c:4
    #2 0x7f22db634d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free /home/martintl25/code/sw/112-spring-software-testing/lab5/test4.c:7 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa[fd]fd fd fd fa fa fa fa
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
==199688==ABORTING
```

### Use-after-return
#### Source code
```c
char *ptr;

void init(){
    char a[2] = "a";
    ptr = a;
}

int main() {
    init();
    *ptr = 'b';
    char b = *ptr;
}
```
#### Valgrind Report
```
==198552== Memcheck, a memory error detector
==198552== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==198552== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==198552== Command: ./test5
==198552== 
==198552== 
==198552== HEAP SUMMARY:
==198552==     in use at exit: 0 bytes in 0 blocks
==198552==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==198552== 
==198552== All heap blocks were freed -- no leaks are possible
==198552== 
==198552== For lists of detected and suppressed errors, rerun with: -s
==198552== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
martintl25@martintl25:~/code/sw/112-spring-software-testing/lab5$ clang -fsanitize=address -fsanitize-address-use-after-return=always -g test5.c -o test5
martintl25@martintl25:~/code/sw/112-spring-software-testing/lab5$ ./test5
=================================================================
==213109==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f079af00020 at pc 0x564804cfd009 bp 0x7ffe6d367d10 sp 0x7ffe6d367d08
WRITE of size 1 at 0x7f079af00020 thread T0
    #0 0x564804cfd008 in main /home/martintl25/code/sw/112-spring-software-testing/lab5/test5.c:10:10
    #1 0x7f079daa8d8f in __libc_start_call_main csu/../sysdeps/nptl/libc_start_call_main.h:58:16
    #2 0x7f079daa8e3f in __libc_start_main csu/../csu/libc-start.c:392:3
    #3 0x564804c3f304 in _start (/home/martintl25/code/sw/112-spring-software-testing/lab5/test5+0x1e304) (BuildId: ca96dd22534cdf361e045258218c0a1f19b28d55)

Address 0x7f079af00020 is located in stack of thread T0 at offset 32 in frame
    #0 0x564804cfceaf in init /home/martintl25/code/sw/112-spring-software-testing/lab5/test5.c:3

  This frame has 1 object(s):
    [32, 34) 'a' (line 4) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/martintl25/code/sw/112-spring-software-testing/lab5/test5.c:10:10 in main
Shadow bytes around the buggy address:
  0x0fe1735d7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe1735d7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe1735d7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe1735d7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe1735d7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fe1735d8000: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0fe1735d8010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe1735d8020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe1735d8030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe1735d8040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe1735d8050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==213109==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
int main() {
    int a[8] = {0};
    int b[8] = {0};
    a[16] = -1; //the address of a[16] equals to the address of b[0]
    a[32] = -2;
    printf("%d\n", b[0]); // Output -1
    printf("%d\n", b[16]); // Output -2
    return 0;
}
```
### Output
```
-1
```
### Why
因為a的合法連續記憶體存取區與b的合法連續記憶體存取區之間有32 byte的redzone（為8個int的大小），當我們嘗試寫入a\[8]~a\[15]，ASAN會判定為非法存取。
a\[16]~a\[23]可以映射到b[0]~b\[7]的合法連續記憶體存取區。同理，b\[8]~b\[15]為redzone，b\[16](或a\[32])又是合法存取。因此，我們可以成功寫入a[16]以及a[32]。
