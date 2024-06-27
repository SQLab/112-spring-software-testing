# Answer

Name: 鄭宇傑
ID: 312551011

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   Yes    |  Yes |
| Stack out-of-bounds  |    No    |  Yes |
| Global out-of-bounds |    No    |  Yes |
| Use-after-free       |   Yes    |  Yes |
| Use-after-return     |    No    |  Yes |

### Heap out-of-bounds
#### Source code
```C
#include <stdlib.h>
int main() {
    // allocate memory in heap 
    int *ptr = (int*)malloc(8 * sizeof(int));
    // out-of-bounds write
    ptr[8] = 10; 
    return 0;
}
```
#### Valgrind Report
```
==8511== Memcheck, a memory error detector
==8511== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8511== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==8511== Command: ./test
==8511== 
==8511== Invalid write of size 4
==8511==    at 0x10916B: main (in /workspaces/112-spring-software-testing/lab5/test)
==8511==  Address 0x4a49060 is 0 bytes after a block of size 32 alloc'd
==8511==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==8511==    by 0x10915E: main (in /workspaces/112-spring-software-testing/lab5/test)
==8511== 
==8511== 
==8511== HEAP SUMMARY:
==8511==     in use at exit: 32 bytes in 1 blocks
==8511==   total heap usage: 1 allocs, 0 frees, 32 bytes allocated
==8511== 
==8511== LEAK SUMMARY:
==8511==    definitely lost: 32 bytes in 1 blocks
==8511==    indirectly lost: 0 bytes in 0 blocks
==8511==      possibly lost: 0 bytes in 0 blocks
==8511==    still reachable: 0 bytes in 0 blocks
==8511==         suppressed: 0 bytes in 0 blocks
==8511== Rerun with --leak-check=full to see details of leaked memory
==8511== 
==8511== For lists of detected and suppressed errors, rerun with: -s
==8511== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==11588==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000030 at pc 0x5566c7607202 bp 0x7ffccffe4660 sp 0x7ffccffe4650
WRITE of size 4 at 0x603000000030 thread T0
    #0 0x5566c7607201 in main /workspaces/112-spring-software-testing/lab5/test.c:6
    #1 0x7f0e6ea28082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5566c76070ed in _start (/workspaces/112-spring-software-testing/lab5/test_asan+0x10ed)

0x603000000030 is located 0 bytes to the right of 32-byte region [0x603000000010,0x603000000030)
allocated by thread T0 here:
    #0 0x7f0e6ed03808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x5566c76071be in main /workspaces/112-spring-software-testing/lab5/test.c:4
    #2 0x7f0e6ea28082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-buffer-overflow /workspaces/112-spring-software-testing/lab5/test.c:6 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 00[fa]fa fa fa fa fa fa fa fa fa
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
==11588==ABORTING
=======
| Heap out-of-bounds   |          |      |
| Stack out-of-bounds  |          |      |
| Global out-of-bounds |          |      |
| Use-after-free       |          |      |
| Use-after-return     |          |      |
```

### Stack out-of-bounds
#### Source code
```
int main(){
    int a[100];
    int b = a[101];
    
    return 0;
}
```
#### Valgrind Report
```
==12427== Memcheck, a memory error detector
==12427== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==12427== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==12427== Command: ./test_valgrind
==12427== 
==12427== 
==12427== HEAP SUMMARY:
==12427==     in use at exit: 0 bytes in 0 blocks
==12427==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==12427== 
==12427== All heap blocks were freed -- no leaks are possible
==12427== 
==12427== For lists of detected and suppressed errors, rerun with: -s
==12427== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
    #0 0x562b4e7af1d8 in main /workspaces/112-spring-software-testing/lab5/test.c:1

  This frame has 1 object(s):
    [48, 448) 'a' (line 2) <== Memory access at offset 452 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /workspaces/112-spring-software-testing/lab5/test.c:3 in main
Shadow bytes around the buggy address:
  0x10004ace9a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004ace9a50: 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1 f1 f1
  0x10004ace9a60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004ace9a70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004ace9a80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10004ace9a90: 00 00[f3]f3 f3 f3 f3 f3 f3 f3 00 00 00 00 00 00
  0x10004ace9aa0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004ace9ab0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004ace9ac0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004ace9ad0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004ace9ae0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==12633==ABORTING
=======
```

### Global out-of-bounds
#### Source code
```
int a[100] = {0};

int main(){
    int b = a[101];
}
```
#### Valgrind Report
```
==14159== Memcheck, a memory error detector
==14159== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==14159== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==14159== Command: ./test_valgrind
==14159== 
==14159== 
==14159== HEAP SUMMARY:
==14159==     in use at exit: 0 bytes in 0 blocks
==14159==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==14159== 
==14159== All heap blocks were freed -- no leaks are possible
==14159== 
==14159== For lists of detected and suppressed errors, rerun with: -s
==14159== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==14002==ERROR: AddressSanitizer: global-buffer-overflow on address 0x556647cf9234 at pc 0x556647cf620f bp 0x7ffefc61d0e0 sp 0x7ffefc61d0d0
READ of size 4 at 0x556647cf9234 thread T0
    #0 0x556647cf620e in main /workspaces/112-spring-software-testing/lab5/test.c:6
    #1 0x7fb421550082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x556647cf610d in _start (/workspaces/112-spring-software-testing/lab5/test_asan+0x110d)

0x556647cf9234 is located 4 bytes to the right of global variable 'a' defined in 'test.c:3:5' (0x556647cf90a0) of size 400
SUMMARY: AddressSanitizer: global-buffer-overflow /workspaces/112-spring-software-testing/lab5/test.c:6 in main
Shadow bytes around the buggy address:
  0x0aad48f971f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad48f97200: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0aad48f97210: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad48f97220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad48f97230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0aad48f97240: 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 00 00 00 00
  0x0aad48f97250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad48f97260: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad48f97270: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad48f97280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad48f97290: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==14002==ABORTING
=======
```

### Use-after-free
#### Source code
```
#include <stdlib.h>
int main() {
    int *ptr = (int*)malloc(sizeof(int));
    free(ptr);
    *ptr = 10;
    return 0;
}
```
#### Valgrind Report
```
==14587== Memcheck, a memory error detector
==14587== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==14587== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==14587== Command: ./test_valgrind
==14587== 
==14587== Invalid write of size 4
==14587==    at 0x109193: main (in /workspaces/112-spring-software-testing/lab5/test_valgrind)
==14587==  Address 0x4a49040 is 0 bytes inside a block of size 4 free'd
==14587==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==14587==    by 0x10918E: main (in /workspaces/112-spring-software-testing/lab5/test_valgrind)
==14587==  Block was alloc'd at
==14587==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==14587==    by 0x10917E: main (in /workspaces/112-spring-software-testing/lab5/test_valgrind)
==14587== 
==14587== 
==14587== HEAP SUMMARY:
==14587==     in use at exit: 0 bytes in 0 blocks
==14587==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==14587== 
==14587== All heap blocks were freed -- no leaks are possible
==14587== 
==14587== For lists of detected and suppressed errors, rerun with: -s
==14587== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==14629==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x558bbf620226 bp 0x7ffc45ebbf90 sp 0x7ffc45ebbf80
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x558bbf620225 in main /workspaces/112-spring-software-testing/lab5/test.c:5
    #1 0x7fb671821082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x558bbf62010d in _start (/workspaces/112-spring-software-testing/lab5/test_asan+0x110d)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7fb671afc40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x558bbf6201ee in main /workspaces/112-spring-software-testing/lab5/test.c:4
    #2 0x7fb671821082 in __libc_start_main ../csu/libc-start.c:308

previously allocated by thread T0 here:
    #0 0x7fb671afc808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x558bbf6201de in main /workspaces/112-spring-software-testing/lab5/test.c:3
    #2 0x7fb671821082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-use-after-free /workspaces/112-spring-software-testing/lab5/test.c:5 in main
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
==14629==ABORTING
=======
```

### Use-after-return
#### Source code
```C
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
==15474== Memcheck, a memory error detector
==15474== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==15474== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==15474== Command: ./test_valgrind
==15474== 
==15474== 
==15474== HEAP SUMMARY:
==15474==     in use at exit: 0 bytes in 0 blocks
==15474==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==15474== 
==15474== All heap blocks were freed -- no leaks are possible
==15474== 
==15474== For lists of detected and suppressed errors, rerun with: -s
==15474== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
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
==46449==ABORTING==============
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
int main() {
  int a[8];
  int b[8];
  a[16] = 1;
}
```
### Why

The following output is the case that we want to access a[8] and we can find there is a redzone after array. 

```
  0x100009839780: 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00 00 00
=>0x100009839790:[f2]f2 f2 f2 00 00 00 00 f3 f3 f3 f3 00 00 00 00
```

So if we can cross it by accessing a[16], we can bypass the redzone and get the out-of-bound write.