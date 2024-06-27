# Answer

Name: 蘇家弘
ID: 312552019

## Test Valgrind and ASan
### Result
|                      | Valgrind           | Asan               |
| -------------------- | ------------------ | ------------------ |
| Heap out-of-bounds   | :white_check_mark: | :white_check_mark: |
| Stack out-of-bounds  | :x:                | :white_check_mark: |
| Global out-of-bounds | :x:                | :white_check_mark: |
| Use-after-free       | :white_check_mark: | :white_check_mark: |
| Use-after-return     | :x:                | :white_check_mark: |

### Heap out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(10 * sizeof(int));
    ptr[0x10] = 0x12345678;
    printf("%d\n", ptr[0x10]);
    free(ptr);
    return 0;
}
```
#### Valgrind Report
```
==80670== Memcheck, a memory error detector
==80670== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==80670== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==80670== Command: ./main
==80670==
==80670== Invalid write of size 4
==80670==    at 0x1091AB: main (main.c:6)
==80670==  Address 0x4a8f080 is 16 bytes after a block of size 48 in arena "client"
==80670==
==80670== Invalid read of size 4
==80670==    at 0x1091B9: main (main.c:7)
==80670==  Address 0x4a8f080 is 16 bytes after a block of size 48 in arena "client"
==80670==
305419896
==80670==
==80670== HEAP SUMMARY:
==80670==     in use at exit: 0 bytes in 0 blocks
==80670==   total heap usage: 2 allocs, 2 frees, 1,064 bytes allocated
==80670==
==80670== All heap blocks were freed -- no leaks are possible
==80670==
==80670== For lists of detected and suppressed errors, rerun with: -s
==80670== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
=================================================================
==74336==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000050 at pc 0x56157c2ba26f bp 0x7ffe3ee18460 sp 0x7ffe3ee18450
WRITE of size 4 at 0x604000000050 thread T0
    #0 0x56157c2ba26e in main /home/axelhowe/112-spring-software-testing/lab5/main.c:6
    #1 0x7fc438b4dd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fc438b4de3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56157c2ba144 in _start (/home/axelhowe/112-spring-software-testing/lab5/main+0x1144)

0x604000000050 is located 24 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7fc438e01887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56157c2ba21a in main /home/axelhowe/112-spring-software-testing/lab5/main.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/axelhowe/112-spring-software-testing/lab5/main.c:6 in main
Shadow bytes around the buggy address:
  0x0c087fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c087fff8000: fa fa 00 00 00 00 00 fa fa fa[fa]fa fa fa fa fa
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
==74336==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
#include <stdio.h>

int main() {
    int arr[10];
    arr[0x10] = 0x12345678;
    printf("%d\n", arr[0x10]);
    return 0;
}

```
#### Valgrind Report
```
==70524== Memcheck, a memory error detector
==70524== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==70524== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==70524== Command: ./main
==70524==
305419896
==70524==
==70524== HEAP SUMMARY:
==70524==     in use at exit: 0 bytes in 0 blocks
==70524==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==70524==
==70524== All heap blocks were freed -- no leaks are possible
==70524==
==70524== For lists of detected and suppressed errors, rerun with: -s
==70524== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
=================================================================
==71207==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffd59cb170 at pc 0x55b867e9e34c bp 0x7fffd59cb0f0 sp 0x7fffd59cb0e0
WRITE of size 4 at 0x7fffd59cb170 thread T0
    #0 0x55b867e9e34b in main /home/axelhowe/112-spring-software-testing/lab5/main.c:5
    #1 0x7f4a54c12d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f4a54c12e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55b867e9e164 in _start (/home/axelhowe/112-spring-software-testing/lab5/main+0x1164)

Address 0x7fffd59cb170 is located in stack of thread T0 at offset 112 in frame
    #0 0x55b867e9e238 in main /home/axelhowe/112-spring-software-testing/lab5/main.c:3

  This frame has 1 object(s):
    [48, 88) 'arr' (line 4) <== Memory access at offset 112 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/axelhowe/112-spring-software-testing/lab5/main.c:5 in main
Shadow bytes around the buggy address:
  0x10007ab315d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007ab315e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007ab315f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007ab31600: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007ab31610: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10007ab31620: f1 f1 f1 f1 f1 f1 00 00 00 00 00 f3 f3 f3[f3]f3
  0x10007ab31630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007ab31640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007ab31650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007ab31660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007ab31670: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==71207==ABORTING
```

### Global out-of-bounds
#### Source code
```c
#include <stdio.h>
int arr[10];

int main() {
        arr[0x10] = 0x12345678;
    printf("%d\n", arr[0x10]);
    return 0;
}
```
#### Valgrind Report
```
==97474== Memcheck, a memory error detector
==97474== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==97474== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==97474== Command: ./main
==97474==
305419896
==97474==
==97474== HEAP SUMMARY:
==97474==     in use at exit: 0 bytes in 0 blocks
==97474==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==97474==
==97474== All heap blocks were freed -- no leaks are possible
==97474==
==97474== For lists of detected and suppressed errors, rerun with: -s
==97474== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
=================================================================
==97840==ERROR: AddressSanitizer: global-buffer-overflow on address 0x563292eb0120 at pc 0x563292ead242 bp 0x7ffeaedd4480 sp 0x7ffeaedd4470
WRITE of size 4 at 0x563292eb0120 thread T0
    #0 0x563292ead241 in main /home/axelhowe/112-spring-software-testing/lab5/main.c:5
    #1 0x7fa0573fad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fa0573fae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x563292ead124 in _start (/home/axelhowe/112-spring-software-testing/lab5/main+0x1124)

0x563292eb0120 is located 24 bytes to the right of global variable 'arr' defined in 'main.c:2:5' (0x563292eb00e0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/axelhowe/112-spring-software-testing/lab5/main.c:5 in main
Shadow bytes around the buggy address:
  0x0ac6d25cdfd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac6d25cdfe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac6d25cdff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac6d25ce000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ac6d25ce010: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0ac6d25ce020: 00 f9 f9 f9[f9]f9 f9 f9 00 00 00 00 00 00 00 00
  0x0ac6d25ce030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac6d25ce040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac6d25ce050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac6d25ce060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac6d25ce070: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==97840==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    free(ptr);
    *ptr = 10;
    return 0;
}
```
#### Valgrind Report
```
==98662== Memcheck, a memory error detector
==98662== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==98662== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==98662== Command: ./main
==98662==
==98662== Invalid write of size 4
==98662==    at 0x109193: main (main.c:7)
==98662==  Address 0x4a8f040 is 0 bytes inside a block of size 4 free'd
==98662==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==98662==    by 0x10918E: main (main.c:6)
==98662==  Block was alloc'd at
==98662==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==98662==    by 0x10917E: main (main.c:5)
==98662==
==98662==
==98662== HEAP SUMMARY:
==98662==     in use at exit: 0 bytes in 0 blocks
==98662==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==98662==
==98662== All heap blocks were freed -- no leaks are possible
==98662==
==98662== For lists of detected and suppressed errors, rerun with: -s
==98662== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
=================================================================
==99110==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x564c274db217 bp 0x7ffe025dfe40 sp 0x7ffe025dfe30
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x564c274db216 in main /home/axelhowe/112-spring-software-testing/lab5/main.c:7
    #1 0x7f64e7f5ed8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f64e7f5ee3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x564c274db104 in _start (/home/axelhowe/112-spring-software-testing/lab5/main+0x1104)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f64e8212537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x564c274db1e2 in main /home/axelhowe/112-spring-software-testing/lab5/main.c:6

previously allocated by thread T0 here:
    #0 0x7f64e8212887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x564c274db1d7 in main /home/axelhowe/112-spring-software-testing/lab5/main.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/axelhowe/112-spring-software-testing/lab5/main.c:7 in main
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
==99110==ABORTING
```

### Use-after-return
#### Source code
```c
#include <stdio.h>

int* ptr;
void uar() {
    int a = 10;
    ptr = &a;
}

int main() {
    uar();
    *ptr = 10;
    return 0;
}
```
#### Valgrind Report
```
==4612== Memcheck, a memory error detector
==4612== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4612== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4612== Command: ./main
==4612==
==4612==
==4612== HEAP SUMMARY:
==4612==     in use at exit: 0 bytes in 0 blocks
==4612==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==4612==
==4612== All heap blocks were freed -- no leaks are possible
==4612==
==4612== For lists of detected and suppressed errors, rerun with: -s
==4612== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
=================================================================
==4256==ERROR: AddressSanitizer: stack-use-after-return on address 0x7fddbac10020 at pc 0x55b8f8d69359 bp 0x7ffca13f4c10 sp 0x7ffca13f4c00
WRITE of size 4 at 0x7fddbac10020 thread T0
    #0 0x55b8f8d69358 in main /home/axelhowe/112-spring-software-testing/lab5/main.c:11
    #1 0x7fddbe3b2d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fddbe3b2e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55b8f8d69144 in _start (/home/axelhowe/112-spring-software-testing/lab5/main+0x1144)

Address 0x7fddbac10020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55b8f8d69218 in uar /home/axelhowe/112-spring-software-testing/lab5/main.c:4

  This frame has 1 object(s):
    [32, 36) 'a' (line 5) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/axelhowe/112-spring-software-testing/lab5/main.c:11 in main
Shadow bytes around the buggy address:
  0x0ffc37579fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffc37579fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffc37579fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffc37579fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffc37579ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ffc3757a000: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0ffc3757a010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffc3757a020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffc3757a030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffc3757a040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffc3757a050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==4256==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include <stdio.h>

int main() {
    int a[8];
    int b[8];

    int *ptr = a;
    ptr[16] = 10;
    return 0;
}
```
### Why

如果沒有對 redzone 做讀寫 ASan 會找不出來
a 跟 b 之間 redzone 的大小是 32 byte(剛好不用 align)

原本 ptr[8] 會 Out-of-bound Write 到 b
改成把 ptr[8] 的 index 再加上 8，也就是 ptr[16]，對其做讀寫可以 bypass redzone 寫入到 b
