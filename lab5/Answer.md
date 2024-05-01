# Answer

Name: 劉洸源
ID: 312555016

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    yes   |  yes |
| Stack out-of-bounds  |     no   |  yes |
| Global out-of-bounds |     no   |  yes |
| Use-after-free       |    yes   |  yes |
| Use-after-return     |    yes   |  yes |

### Heap out-of-bounds
#### Source code
```
#include <iostream>

int main() {

    int* array = new int[5];

    for (int i = 0; i < 5; i++) {
        array[i] = i;
    }


    std::cout << "access the last element: " << array[4] << std::endl;
    std::cout << "out of bound: " << array[5] << std::endl;  


    delete[] array;

    return 0;
}

```
#### Valgrind Report
```
==2329== Memcheck, a memory error detector
==2329== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==2329== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==2329== Command: ./test_valgrind
==2329==
access the last element: 4
==2329== Invalid read of size 4
==2329==    at 0x1092B5: main (in /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind)
==2329==  Address 0x4dd2c94 is 0 bytes after a block of size 20 alloc'd
==2329==    at 0x484A2F3: operator new[](unsigned long) (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==2329==    by 0x10921E: main (in /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind)
==2329==
out of bound: 0
==2329==
==2329== HEAP SUMMARY:
==2329==     in use at exit: 0 bytes in 0 blocks
==2329==   total heap usage: 3 allocs, 3 frees, 73,748 bytes allocated
==2329==
==2329== All heap blocks were freed -- no leaks are possible
==2329==
==2329== For lists of detected and suppressed errors, rerun with: -s
==2329== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
access the last element: 4
=================================================================
==2942==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x55fd2626b458 bp 0x7fffb72ec2f0 sp 0x7fffb72ec2e0
READ of size 4 at 0x603000000054 thread T0
    #0 0x55fd2626b457 in main (/mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind+0x1457)
    #1 0x7fb0b9057d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb0b9057e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55fd2626b244 in _start (/mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind+0x1244)

0x603000000054 is located 0 bytes to the right of 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:
    #0 0x7fb0b9640357 in operator new[](unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:102
    #1 0x55fd2626b362 in main (/mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind+0x1362)

SUMMARY: AddressSanitizer: heap-buffer-overflow (/mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind+0x1457) in main
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
==2942==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    char s[4];
    s[4] = 'a';
    printf("%c\n", s[4]);
    return 0;
}
```
#### Valgrind Report
```
==6917== Memcheck, a memory error detector
==6917== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6917== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6917== Command: ./test_valgrind
==6917==
a
*** stack smashing detected ***: terminated
==6917==
==6917== Process terminating with default action of signal 6 (SIGABRT)
==6917==    at 0x48F69FC: __pthread_kill_implementation (pthread_kill.c:44)
==6917==    by 0x48F69FC: __pthread_kill_internal (pthread_kill.c:78)
==6917==    by 0x48F69FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==6917==    by 0x48A2475: raise (raise.c:26)
==6917==    by 0x48887F2: abort (abort.c:79)
==6917==    by 0x48E9675: __libc_message (libc_fatal.c:155)
==6917==    by 0x4996599: __fortify_fail (fortify_fail.c:26)
==6917==    by 0x4996565: __stack_chk_fail (stack_chk_fail.c:24)
==6917==    by 0x1091BD: main (in /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind)
==6917==
==6917== HEAP SUMMARY:
==6917==     in use at exit: 1,024 bytes in 1 blocks
==6917==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==6917==
==6917== LEAK SUMMARY:
==6917==    definitely lost: 0 bytes in 0 blocks
==6917==    indirectly lost: 0 bytes in 0 blocks
==6917==      possibly lost: 0 bytes in 0 blocks
==6917==    still reachable: 1,024 bytes in 1 blocks
==6917==         suppressed: 0 bytes in 0 blocks
==6917== Rerun with --leak-check=full to see details of leaked memory
==6917==
==6917== For lists of detected and suppressed errors, rerun with: -s
==6917== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted
```
### ASan Report
```
==7247==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffb0dfd484 at pc 0x5607d8014321 bp 0x7fffb0dfd450 sp 0x7fffb0dfd440
WRITE of size 1 at 0x7fffb0dfd484 thread T0
    #0 0x5607d8014320 in main /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:6
    #1 0x7f43d7143d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f43d7143e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5607d8014164 in _start (/mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind+0x1164)

Address 0x7fffb0dfd484 is located in stack of thread T0 at offset 36 in frame
    #0 0x5607d8014238 in main /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:4

  This frame has 1 object(s):
    [32, 36) 's' (line 5) <== Memory access at offset 36 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:6 in main
Shadow bytes around the buggy address:
  0x1000761b7a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7a60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7a70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7a80: 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1
=>0x1000761b7a90:[04]f3 f3 f3 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7aa0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7ab0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7ac0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7ad0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000761b7ae0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==7247==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <iostream>

char globalArray[3] = {'x', 'y', 'z'}; 

int main() {
    std::cout << "Before out of bound write: " << globalArray[3] << std::endl;

    
    globalArray[3] = 'a'; 

    std::cout << "After out of bound write: " << globalArray[3] << std::endl; 

    return 0;
}
```
#### Valgrind Report
```
==5395== Memcheck, a memory error detector
==5395== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5395== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==5395== Command: ./test_valgrind
==5395==
Before out of bound write:
After out of bound write: a
==5395==
==5395== HEAP SUMMARY:
==5395==     in use at exit: 0 bytes in 0 blocks
==5395==   total heap usage: 2 allocs, 2 frees, 73,728 bytes allocated
==5395==
==5395== All heap blocks were freed -- no leaks are possible
==5395==
==5395== For lists of detected and suppressed errors, rerun with: -s
==5395== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==6034==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55cb254a4023 at pc 0x55cb254a1571 bp 0x7ffd49a87700 sp 0x7ffd49a876f0
READ of size 1 at 0x55cb254a4023 thread T0
    #0 0x55cb254a1570 in main /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:6
    #1 0x7f40dab12d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f40dab12e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55cb254a1244 in _start (/mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind+0x1244)

0x55cb254a4023 is located 0 bytes to the right of global variable 'globalArray' defined in 'test_valgrind.cpp:3:6' (0x55cb254a4020) of size 3
SUMMARY: AddressSanitizer: global-buffer-overflow /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:6 in main
Shadow bytes around the buggy address:
  0x0ab9e4a8c7b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab9e4a8c7c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab9e4a8c7d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab9e4a8c7e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab9e4a8c7f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ab9e4a8c800: 00 00 00 00[03]f9 f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0ab9e4a8c810: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab9e4a8c820: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab9e4a8c830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab9e4a8c840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab9e4a8c850: 00 00 00 00 01 f9 f9 f9 f9 f9 f9 f9 00 00 00 00
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
==6034==ABORTING
```

### Use-after-free
#### Source code
```
#include <iostream>

int main() {
    int* ptr = new int(10);  

    std::cout << "Value before delete: " << *ptr << std::endl; 

    delete ptr;
    
    std::cout << "Value after delete: " << *ptr << std::endl; // use after free

    return 0;
}
```
#### Valgrind Report
```
==8406== Memcheck, a memory error detector
==8406== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8406== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==8406== Command: ./test_valgrind
==8406==
Value before delete: 10
==8406== Invalid read of size 4
==8406==    at 0x10929D: main (in /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind)
==8406==  Address 0x4dd2c80 is 0 bytes inside a block of size 4 free'd
==8406==    at 0x484BB6F: operator delete(void*, unsigned long) (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==8406==    by 0x10927C: main (in /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind)
==8406==  Block was alloc'd at
==8406==    at 0x4849013: operator new(unsigned long) (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==8406==    by 0x10921E: main (in /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind)
==8406==
Value after delete: 10
==8406==
==8406== HEAP SUMMARY:
==8406==     in use at exit: 0 bytes in 0 blocks
==8406==   total heap usage: 3 allocs, 3 frees, 73,732 bytes allocated
==8406==
==8406== All heap blocks were freed -- no leaks are possible
==8406==
==8406== For lists of detected and suppressed errors, rerun with: -s
==8406== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
Value before delete: 10
=================================================================
==8753==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55e24eace445 bp 0x7ffd7b279fe0 sp 0x7ffd7b279fd0
READ of size 4 at 0x602000000010 thread T0
    #0 0x55e24eace444 in main /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:11
    #1 0x7fc86a270d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fc86a270e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e24eace244 in _start (/mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind+0x1244)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7fc86a85a24f in operator delete(void*, unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:172
    #1 0x55e24eace3e1 in main /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:8

previously allocated by thread T0 here:
    #0 0x7fc86a8591e7 in operator new(unsigned long) ../../../../src/libsanitizer/asan/asan_new_delete.cpp:99
    #1 0x55e24eace362 in main /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:4

SUMMARY: AddressSanitizer: heap-use-after-free /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:11 in main
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
==8753==ABORTING
```

### Use-after-return
#### Source code
```
#include <iostream>

int* dangerousFunction() {
    int localValue = 100;  
    return &localValue;    
}

int main() {
    int* ptr = dangerousFunction();  

    
    std::cout << "Value after function returns: " << *ptr << std::endl; // Use-after-return

    return 0;
}
```
#### Valgrind Report
```
==9500== Memcheck, a memory error detector
==9500== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9500== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==9500== Command: ./test_valgrind
==9500==
==9500== Invalid read of size 4
==9500==    at 0x10925B: main (in /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind)
==9500==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==9500==
==9500==
==9500== Process terminating with default action of signal 11 (SIGSEGV)
==9500==  Access not within mapped region at address 0x0
==9500==    at 0x10925B: main (in /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind)
==9500==  If you believe this happened as a result of a stack
==9500==  overflow in your program's main thread (unlikely but
==9500==  possible), you can try to increase the size of the
==9500==  main thread stack using the --main-stacksize= flag.
==9500==  The main thread stack size used in this run was 8388608.
==9500==
==9500== HEAP SUMMARY:
==9500==     in use at exit: 73,728 bytes in 2 blocks
==9500==   total heap usage: 2 allocs, 0 frees, 73,728 bytes allocated
==9500==
==9500== LEAK SUMMARY:
==9500==    definitely lost: 0 bytes in 0 blocks
==9500==    indirectly lost: 0 bytes in 0 blocks
==9500==      possibly lost: 0 bytes in 0 blocks
==9500==    still reachable: 73,728 bytes in 2 blocks
==9500==         suppressed: 0 bytes in 0 blocks
==9500== Rerun with --leak-check=full to see details of leaked memory
==9500==
==9500== For lists of detected and suppressed errors, rerun with: -s
==9500== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==9730==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55bde2b9c340 bp 0x000000000001 sp 0x7fffec2d5130 T0)
==9730==The signal is caused by a READ memory access.
==9730==Hint: address points to the zero page.
    #0 0x55bde2b9c340 in main /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:12
    #1 0x7f9a445c1d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f9a445c1e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55bde2b9c1e4 in _start (/mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind+0x11e4)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /mnt/c/Users/88690/Desktop/112-spring-software-testing/lab5/test_valgrind.cpp:12 in main
==9730==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <iostream>

int main() {
    int a[8];
    int b[8];

    // 初始化數組 a 和 b
    for (int i = 0; i < 8; i++) {
        a[i] = 123;
        b[i] = 456;
    }

    // 計算數組 a 到 b 的偏移
    int diff = &b[0] - &a[0];

    // 非法操作：使用計算出的偏移修改 b[0]
    // 這行為未定義，因為 diff 不一定正確指向 b[0] 的索引
    a[diff] = 789;

    std::cout << "b[0] = " << b[0] << std::endl;
    std::cout << "b[1] = " << b[1] << std::endl;

    return 0;
}
```
### Why
a 和 b 是兩個連續的整數數組。當計算 diff （即 &b[0] - &a[0]）時，實際上是在計算從數組 a 到數組 b 的開始的距離。這種計算可能可以利用pointer算術來跨過數組 a 的界限並訪問數組 b，但這裡沒有直接寫入或讀取redzone的行為。
Answer.md
21 KB
