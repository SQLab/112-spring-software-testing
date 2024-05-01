# Answer

Name: 
ID: 

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |

| Heap out-of-bounds   |    Yes   | Yes  |
| Stack out-of-bounds  |    No    | Yes  |
| Global out-of-bounds |    No    | Yes  |
| Use-after-free       |    Yes   | Yes  |
| Use-after-return     |    Yes   | Yes  |


### Heap out-of-bounds
#### Source code
```

#include <iostream>
using namespace std;
int main(){
    int *arr = (int*)malloc(3*sizeof(int));
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
}
```
#### Valgrind Report
```
==1863== Memcheck, a memory error detector
==1863== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1863== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==1863== Command: ./a
==1863==
==1863== Invalid write of size 4
==1863==    at 0x1091D1: main (in /mnt/e/veture7275/.data/home/veture7275/st/a)
==1863==  Address 0x4da7c8c is 0 bytes after a block of size 12 alloc'd
==1863==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==1863==    by 0x10919E: main (in /mnt/e/veture7275/.data/home/veture7275/st/a)
==1863==
==1863== 
==1863== HEAP SUMMARY:
==1863==     in use at exit: 12 bytes in 1 blocks
==1863==   total heap usage: 2 allocs, 1 frees, 72,716 bytes allocated
==1863==
==1863== LEAK SUMMARY:
==1863==    definitely lost: 12 bytes in 1 blocks
==1863==    indirectly lost: 0 bytes in 0 blocks
==1863==      possibly lost: 0 bytes in 0 blocks
==1863==    still reachable: 0 bytes in 0 blocks
==1863==         suppressed: 0 bytes in 0 blocks
==1863== Rerun with --leak-check=full to see details of leaked memory
==1863==
==1863== For lists of detected and suppressed errors, rerun with: -s
==1863== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==1905==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000001c at pc 0x561224f8d38f bp 0x7ffcc381f790 sp 0x7ffcc381f780
WRITE of size 4 at 0x60200000001c thread T0
    #0 0x561224f8d38e in main /mnt/e/veture7275/.data/home/veture7275/st/hob.cpp:8
    #1 0x7fccfdc44082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x561224f8d1ad in _start (/mnt/e/veture7275/.data/home/veture7275/st/as+0x11ad)

0x60200000001c is located 0 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x7fccfe26b808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x561224f8d2c6 in main /mnt/e/veture7275/.data/home/veture7275/st/hob.cpp:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /mnt/e/veture7275/.data/home/veture7275/st/hob.cpp:8 in main
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
==1905==ABORTING


```

### Stack out-of-bounds
#### Source code
```

#include <iostream>
using namespace std;
int main(){
    int arr[3];
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
}
```
#### Valgrind Report
```
==1990== Memcheck, a memory error detector
==1990== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1990== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==1990== Command: ./a
==1990==
*** stack smashing detected ***: terminated
==1990== 
==1990== Process terminating with default action of signal 6 (SIGABRT)
==1990==    at 0x4A7800B: raise (raise.c:51)
==1990==    by 0x4A57858: abort (abort.c:79)
==1990==    by 0x4AC226D: __libc_message (libc_fatal.c:155)
==1990==    by 0x4B64CD9: __fortify_fail (fortify_fail.c:26)
==1990==    by 0x4B64CA5: __stack_chk_fail (stack_chk_fail.c:24)
==1990==    by 0x1091D8: main (in /mnt/e/veture7275/.data/home/veture7275/st/a)
==1990==
==1990== HEAP SUMMARY:
==1990==     in use at exit: 0 bytes in 0 blocks
==1990==   total heap usage: 1 allocs, 1 frees, 72,704 bytes allocated
==1990==
==1990== All heap blocks were freed -- no leaks are possible
==1990==
==1990== For lists of detected and suppressed errors, rerun with: -s
==1990== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==2005==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe6c9bd3fc at pc 0x558cd2ea2441 bp 0x7ffe6c9bd3c0 sp 0x7ffe6c9bd3b0
WRITE of size 4 at 0x7ffe6c9bd3fc thread T0
    #0 0x558cd2ea2440 in main /mnt/e/veture7275/.data/home/veture7275/st/sob.cpp:8
    #1 0x7f0791d07082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x558cd2ea21cd in _start (/mnt/e/veture7275/.data/home/veture7275/st/as+0x11cd)

Address 0x7ffe6c9bd3fc is located in stack of thread T0 at offset 44 in frame
    #0 0x558cd2ea22e4 in main /mnt/e/veture7275/.data/home/veture7275/st/sob.cpp:3

  This frame has 1 object(s):
    [32, 44) 'arr' (line 4) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /mnt/e/veture7275/.data/home/veture7275/st/sob.cpp:8 in main
Shadow bytes around the buggy address:
  0x10004d92fa20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004d92fa30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004d92fa40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004d92fa50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004d92fa60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10004d92fa70: 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00[04]
  0x10004d92fa80: f3 f3 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004d92fa90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004d92faa0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004d92fab0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004d92fac0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==2005==ABORTING
```
### Global out-of-bounds
#### Source code
```
#include <iostream>
using namespace std;
int arr[3];
int main(){
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
}


```
#### Valgrind Report
```

==5097== Memcheck, a memory error detector
==5097== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5097== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==5097== Command: ./a
==5097==
==5097== 
==5097== HEAP SUMMARY:
==5097==     in use at exit: 0 bytes in 0 blocks
==5097==   total heap usage: 1 allocs, 1 frees, 72,704 bytes allocated
==5097==
==5097== All heap blocks were freed -- no leaks are possible
==5097==
==5097== For lists of detected and suppressed errors, rerun with: -s
==5097== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)


```
### ASan Report
```

SUMMARY: AddressSanitizer: global-buffer-overflow /mnt/e/veture7275/.data/home/veture7275/st/gob.cpp:8 in main
Shadow bytes around the buggy address:
  0x0acafbef53c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0acafbef53d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0acafbef53e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0acafbef53f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0acafbef5400: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0acafbef5410: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00[04]f9 f9
  0x0acafbef5420: f9 f9 f9 f9 01 f9 f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0acafbef5430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0acafbef5440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0acafbef5450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0acafbef5460: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==5103==ABORTING

```

### Use-after-free
#### Source code
```

#include <iostream>
using namespace std;
int main(){
    int *arr = (int*)malloc(3*sizeof(int));
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    free(arr);
    cout << arr[2] << endl;
}
```
#### Valgrind Report
```
==5213== Memcheck, a memory error detector
==5213== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5213== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==5213== Command: ./a
==5213==
==5213== Invalid read of size 4
==5213==    at 0x10923D: main (in /mnt/e/veture7275/.data/home/veture7275/st/a)
==5213==  Address 0x4da7c88 is 8 bytes inside a block of size 12 free'd
==5213==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==5213==    by 0x109234: main (in /mnt/e/veture7275/.data/home/veture7275/st/a)
==5213==  Block was alloc'd at
==5213==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==5213==    by 0x1091FE: main (in /mnt/e/veture7275/.data/home/veture7275/st/a)
==5213==
3
==5213== 
==5213== HEAP SUMMARY:
==5213==     in use at exit: 0 bytes in 0 blocks
==5213==   total heap usage: 3 allocs, 3 frees, 73,740 bytes allocated
==5213==
==5213== All heap blocks were freed -- no leaks are possible
==5213==
==5213== For lists of detected and suppressed errors, rerun with: -s
==5213== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)


```
### ASan Report
```
==5231==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000018 at pc 0x5567de7c9375 bp 0x7ffe381cbfc0 sp 0x7ffe381cbfb0
READ of size 4 at 0x602000000018 thread T0
    #0 0x5567de7c9374 in main /mnt/e/veture7275/.data/home/veture7275/st/uaf.cpp:9
    #1 0x7fef498a3082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5567de7c920d in _start (/mnt/e/veture7275/.data/home/veture7275/st/as+0x120d)

0x602000000018 is located 8 bytes inside of 12-byte region [0x602000000010,0x60200000001c)
freed by thread T0 here:
    #0 0x7fef49eca40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x5567de7c932e in main /mnt/e/veture7275/.data/home/veture7275/st/uaf.cpp:8

previously allocated by thread T0 here:
    #0 0x7fef49eca808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x5567de7c9323 in main /mnt/e/veture7275/.data/home/veture7275/st/uaf.cpp:4

SUMMARY: AddressSanitizer: heap-use-after-free /mnt/e/veture7275/.data/home/veture7275/st/uaf.cpp:9 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa fd[fd]fa fa fa fa fa fa fa fa fa fa fa fa
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
==5231==ABORTING


```

### Use-after-return
#### Source code
```

#include <iostream>
using namespace std;
int*add(){
    int val = 100;
    return &val;
}
int main(){
    int* a = add();
    cout << *a << endl;
}
```
#### Valgrind Report
```
==5356== Memcheck, a memory error detector
==5356== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5356== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==5356== Command: ./a
==5356==
==5356== Invalid read of size 4
==5356==    at 0x10921F: main (in /mnt/e/veture7275/.data/home/veture7275/st/a)
==5356==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==5356==
==5356==
==5356== Process terminating with default action of signal 11 (SIGSEGV)
==5356==  Access not within mapped region at address 0x0
==5356==    at 0x10921F: main (in /mnt/e/veture7275/.data/home/veture7275/st/a)
==5356==  If you believe this happened as a result of a stack
==5356==  overflow in your program's main thread (unlikely but
==5356==  possible), you can try to increase the size of the
==5356==  main thread stack using the --main-stacksize= flag.
==5356==  The main thread stack size used in this run was 8388608.
==5356==
==5356== HEAP SUMMARY:
==5356==     in use at exit: 0 bytes in 0 blocks
==5356==   total heap usage: 1 allocs, 1 frees, 72,704 bytes allocated
==5356==
==5356== All heap blocks were freed -- no leaks are possible
==5356==
==5356== For lists of detected and suppressed errors, rerun with: -s
==5356== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)


```
### ASan Report
```

==5370==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55751bec730b bp 0x000000000000 sp 0x7ffe5776b3e0 T0)==5370==The signal is caused by a READ memory access.
==5370==Hint: address points to the zero page.
    #0 0x55751bec730a in main /mnt/e/veture7275/.data/home/veture7275/st/uar.cpp:9
    #1 0x7fdb0129c082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55751bec71cd in _start (/mnt/e/veture7275/.data/home/veture7275/st/as+0x11cd)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /mnt/e/veture7275/.data/home/veture7275/st/uar.cpp:9 in main
==5370==ABORTING

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

#include <iostream>
using namespace std;
int main(){
    char *a = (char*)malloc(5);
    char *b = (char*)malloc(5);
    int dis = b-a;
    b[0] = 'a';
    a[dis] = 'b';
    cout << b[0] << endl;
}
```
### Why
沒辦法偵測出來，因為ASan只會對目標位置做檢查，並不會對經過的位置做檢查。