# Answer

Name: 黃泰揚
ID: 312551004

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    Yes   |  Yes |
| Stack out-of-bounds  |    No    |  Yes |
| Global out-of-bounds |    No    |  Yes |
| Use-after-free       |    Yes   |  Yes |
| Use-after-return     |    No    |  Yes |

### Heap out-of-bounds
#### Source code
```C
#include <stdlib.h>
int main() {
    int *ptr = (int*)malloc(5 * sizeof(int));
    ptr[5] = 10; // 此時指向的是heap中不屬於分配的範圍
    return 0;
}
```
#### Valgrind Report
```
==34488== Memcheck, a memory error detector
==34488== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==34488== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==34488== Command: ./test_valgrind
==34488== 
==34488== Invalid write of size 4
==34488==    at 0x10916B: main (in /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind)
==34488==  Address 0x4a49054 is 0 bytes after a block of size 20 alloc'd
==34488==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==34488==    by 0x10915E: main (in /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind)
==34488== 
==34488== 
==34488== HEAP SUMMARY:
==34488==     in use at exit: 20 bytes in 1 blocks
==34488==   total heap usage: 1 allocs, 0 frees, 20 bytes allocated
==34488== 
==34488== LEAK SUMMARY:
==34488==    definitely lost: 20 bytes in 1 blocks
==34488==    indirectly lost: 0 bytes in 0 blocks
==34488==      possibly lost: 0 bytes in 0 blocks
==34488==    still reachable: 0 bytes in 0 blocks
==34488==         suppressed: 0 bytes in 0 blocks
==34488== Rerun with --leak-check=full to see details of leaked memory
==34488== 
==34488== For lists of detected and suppressed errors, rerun with: -s
==34488== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==37873==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000024 at pc 0x5557a126e1f4 bp 0x7ffd09a72f50 sp 0x7ffd09a72f40
WRITE of size 4 at 0x603000000024 thread T0
    #0 0x5557a126e1f3 in main /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:4
    #1 0x7f08f1dd2082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5557a126e0ed in _start (/workspaces/codespaces-blank/112-spring-software-testing/lab5_test/scan+0x10ed)

0x603000000024 is located 0 bytes to the right of 20-byte region [0x603000000010,0x603000000024)
allocated by thread T0 here:
    #0 0x7f08f20ad808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x5557a126e1ba in main /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:3

SUMMARY: AddressSanitizer: heap-buffer-overflow /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:4 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00[04]fa fa fa fa fa fa fa fa fa fa fa
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
==37873==ABORTING
=======
```

### Stack out-of-bounds
#### Source code
```C
#include <stdio.h>
void function() {
    int arr[5];
    arr[5] = 10; // 超出了陣列的範圍
}
int main() {
    function();
    return 0;
}
```
#### Valgrind Report
```
==38836== Memcheck, a memory error detector
==38836== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==38836== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==38836== Command: ./test_valgrind
==38836== 
==38836== 
==38836== HEAP SUMMARY:
==38836==     in use at exit: 0 bytes in 0 blocks
==38836==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==38836== 
==38836== All heap blocks were freed -- no leaks are possible
==38836== 
==38836== For lists of detected and suppressed errors, rerun with: -s
==38836== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==38507==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffda416eac4 at pc 0x558a6aa2c2c0 bp 0x7ffda416ea80 sp 0x7ffda416ea70
WRITE of size 4 at 0x7ffda416eac4 thread T0
    #0 0x558a6aa2c2bf in function /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:4
    #1 0x558a6aa2c301 in main /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:7
    #2 0x7f9c87e08082 in __libc_start_main ../csu/libc-start.c:308
    #3 0x558a6aa2c10d in _start (/workspaces/codespaces-blank/112-spring-software-testing/lab5_test/scan+0x110d)

Address 0x7ffda416eac4 is located in stack of thread T0 at offset 52 in frame
    #0 0x558a6aa2c1d8 in function /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:2

  This frame has 1 object(s):
    [32, 52) 'arr' (line 3) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:4 in function
Shadow bytes around the buggy address:
  0x100034825d00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100034825d10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100034825d20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100034825d30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100034825d40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100034825d50: 00 00 f1 f1 f1 f1 00 00[04]f3 f3 f3 f3 f3 00 00
  0x100034825d60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100034825d70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100034825d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100034825d90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100034825da0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==38507==ABORTING
=======
```

### Global out-of-bounds
#### Source code
```C
#include <stdio.h>
int ptr[5] = {1};
int main(){
    ptr[5] = 3;
    return 0;
}
```
#### Valgrind Report
```
==39243== Memcheck, a memory error detector
==39243== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==39243== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==39243== Command: ./test_valgrind
==39243== 
==39243== 
==39243== HEAP SUMMARY:
==39243==     in use at exit: 0 bytes in 0 blocks
==39243==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==39243== 
==39243== All heap blocks were freed -- no leaks are possible
==39243== 
==39243== For lists of detected and suppressed errors, rerun with: -s
==39243== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==41974==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55c3d4b21034 at pc 0x55c3d4b1e20c bp 0x7ffd9dd76480 sp 0x7ffd9dd76470
WRITE of size 4 at 0x55c3d4b21034 thread T0
    #0 0x55c3d4b1e20b in main /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:6
    #1 0x7f9ece657082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55c3d4b1e10d in _start (/workspaces/codespaces-blank/112-spring-software-testing/lab5_test/scan+0x110d)

0x55c3d4b21034 is located 0 bytes to the right of global variable 'ptr' defined in 'test_valgrind.c:4:5' (0x55c3d4b21020) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:6 in main
Shadow bytes around the buggy address:
  0x0ab8fa95c1b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab8fa95c1c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab8fa95c1d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab8fa95c1e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab8fa95c1f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ab8fa95c200: 00 00 00 00 00 00[04]f9 f9 f9 f9 f9 00 00 00 00
  0x0ab8fa95c210: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x0ab8fa95c220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab8fa95c230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab8fa95c240: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab8fa95c250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==41974==ABORTING
=======
```

### Use-after-free
#### Source code
```C
#include <stdlib.h>
int main() {
    int *ptr = (int*)malloc(sizeof(int));
    free(ptr);
    *ptr = 10; // 釋放後仍然使用指標
    return 0;
}
```
#### Valgrind Report
```
==43726== Memcheck, a memory error detector
==43726== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==43726== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==43726== Command: ./test_valgrind
==43726== 
==43726== Invalid write of size 4
==43726==    at 0x109193: main (in /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind)
==43726==  Address 0x4a49040 is 0 bytes inside a block of size 4 free'd
==43726==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==43726==    by 0x10918E: main (in /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind)
==43726==  Block was alloc'd at
==43726==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==43726==    by 0x10917E: main (in /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind)
==43726== 
==43726== 
==43726== HEAP SUMMARY:
==43726==     in use at exit: 0 bytes in 0 blocks
==43726==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==43726== 
==43726== All heap blocks were freed -- no leaks are possible
==43726== 
==43726== For lists of detected and suppressed errors, rerun with: -s
==43726== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==43807==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5610f970f217 bp 0x7fff8129f700 sp 0x7fff8129f6f0
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x5610f970f216 in main /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:5
    #1 0x7f693faf4082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5610f970f10d in _start (/workspaces/codespaces-blank/112-spring-software-testing/lab5_test/scan+0x110d)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f693fdcf40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x5610f970f1e2 in main /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:4

previously allocated by thread T0 here:
    #0 0x7f693fdcf808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x5610f970f1d7 in main /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:3

SUMMARY: AddressSanitizer: heap-use-after-free /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:5 in main
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
==43807==ABORTING
=======
```

### Use-after-return
#### Source code
```C
#include <stdio.h>
char* ptr;
void foo() {
    char a;
    ptr = &a;
}
int main() {
    foo();
    *ptr = 1;
    return 0;
}
```
#### Valgrind Report
```
==46779== Memcheck, a memory error detector
==46779== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==46779== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==46779== Command: ./test_valgrind
==46779== 
==46779== 
==46779== HEAP SUMMARY:
==46779==     in use at exit: 0 bytes in 0 blocks
==46779==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==46779== 
==46779== All heap blocks were freed -- no leaks are possible
==46779== 
==46779== For lists of detected and suppressed errors, rerun with: -s
==46779== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==46449==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f90d8bc4020 at pc 0x55e28d9df2e4 bp 0x7ffcff2dc820 sp 0x7ffcff2dc810
WRITE of size 1 at 0x7f90d8bc4020 thread T0
    #0 0x55e28d9df2e3 in main /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:9
    #1 0x7f90dc3f4082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55e28d9df10d in _start (/workspaces/codespaces-blank/112-spring-software-testing/lab5_test/scan+0x110d)

Address 0x7f90d8bc4020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55e28d9df1d8 in foo /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:3

  This frame has 1 object(s):
    [32, 33) 'a' (line 4) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /workspaces/codespaces-blank/112-spring-software-testing/lab5_test/test_valgrind.c:9 in main
Shadow bytes around the buggy address:
  0x0ff29b1707b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff29b1707c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff29b1707d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff29b1707e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff29b1707f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ff29b170800: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0ff29b170810: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff29b170820: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff29b170830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff29b170840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff29b170850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==46449==ABORTING
=======
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
int main(){
    int a[8], b[8];
    printf("b[0] = %d\n",b[0]);
    printf("%ld\n",(b-a));
    a[(b-a)] = 1;
    printf("b[0] = %d\n",b[0]);
    return 0;
}
```
### Why
a | redzone | b | redzone...
a[b-a]相當於b[0]的記憶體位址
改b[0]視為是合法的, ASan找不出來
=======
