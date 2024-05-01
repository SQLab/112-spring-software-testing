# Answer

Name: 
ID: 

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    YES   | YES  |
| Stack out-of-bounds  |    NO    | YES  |
| Global out-of-bounds |    NO    | YES  |
| Use-after-free       |    YES   | YES  |
| Use-after-return     |    YES   | YES  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *a=(int *)malloc(sizeof(int));
    a[1]=1;
    printf("%d",a[1]);
    free(a);
    return 0;
}
```
#### Valgrind Report
```
==209674== Memcheck, a memory error detector
==209674== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==209674== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==209674== Command: ./Hoob
==209674==
==209674== Invalid write of size 4
==209674==    at 0x1091AB: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Hoob)
==209674==  Address 0x4a8c044 is 0 bytes after a block of size 4 alloc'd
==209674==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==209674==    by 0x10919E: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Hoob)
==209674==
==209674== Invalid read of size 4
==209674==    at 0x1091B9: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Hoob)
==209674==  Address 0x4a8c044 is 0 bytes after a block of size 4 alloc'd
==209674==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==209674==    by 0x10919E: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Hoob)
==209674==
1==209674==
==209674== HEAP SUMMARY:
==209674==     in use at exit: 0 bytes in 0 blocks
==209674==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==209674==
==209674== All heap blocks were freed -- no leaks are possible
==209674==
==209674== For lists of detected and suppressed errors, rerun with: -s
==209674== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==209866==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000014 at pc 0x565177cdd2a2 bp 0x7ffd1a34c2e0 sp 0x7ffd1a34c2d0
WRITE of size 4 at 0x602000000014 thread T0
    #0 0x565177cdd2a1 in main (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Hoob_asan+0x12a1)
    #1 0x7f383f8d3d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f383f8d3e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x565177cdd184 in _start (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Hoob_asan+0x1184)

0x602000000014 is located 0 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x7f383fb87887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x565177cdd25e in main (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Hoob_asan+0x125e)
    #2 0x7f383f8d3d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Hoob_asan+0x12a1) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[04]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==209866==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int a[3]={1,2,3};
    printf("%d",a[5]);
    a[5]=1;
    return 0;
}
```
#### Valgrind Report
```
==213097== Memcheck, a memory error detector
==213097== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==213097== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==213097== Command: ./Soob
==213097==
1==213097==
==213097== HEAP SUMMARY:
==213097==     in use at exit: 0 bytes in 0 blocks
==213097==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==213097==
==213097== All heap blocks were freed -- no leaks are possible
==213097==
==213097== For lists of detected and suppressed errors, rerun with: -s
==213097== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==210284==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffee594b79c at pc 0x563f91e093e0 bp 0x7ffee594b760 sp 0x7ffee594b750
READ of size 4 at 0x7ffee594b79c thread T0
    #0 0x563f91e093df in main (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Soob_asan+0x13df)
    #1 0x7faa9a6a4d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7faa9a6a4e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x563f91e09184 in _start (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Soob_asan+0x1184)

Address 0x7ffee594b79c is located in stack of thread T0 at offset 44 in frame
    #0 0x563f91e09258 in main (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Soob_asan+0x1258)

  This frame has 1 object(s):
    [32, 44) 'a' (line 5) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Soob_asan+0x13df) in main
Shadow bytes around the buggy address:
  0x10005cb216a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005cb216b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005cb216c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005cb216d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005cb216e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x10005cb216f0: f1 f1 00[04]f3 f3 00 00 00 00 00 00 00 00 00 00
  0x10005cb21700: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005cb21710: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005cb21720: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005cb21730: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005cb21740: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==210284==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
int a[3]={1,2,3};
int main() {
    a[3]=1;
    printf("%d",a[3]);
    return 0;
}
```
#### Valgrind Report
```
==210405== Memcheck, a memory error detector
==210405== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==210405== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==210405== Command: ./Goob
==210405==
1==210405==
==210405== HEAP SUMMARY:
==210405==     in use at exit: 0 bytes in 0 blocks
==210405==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==210405==
==210405== All heap blocks were freed -- no leaks are possible
==210405==
==210405== For lists of detected and suppressed errors, rerun with: -s
==210405== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
SUMMARY: AddressSanitizer: global-buffer-overflow (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Goob_asan+0x122a) in main
Shadow bytes around the buggy address:
  0x0ac18363e3b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac18363e3c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac18363e3d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac18363e3e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac18363e3f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ac18363e400: 00 00 00 00 00[04]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0ac18363e410: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ac18363e420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac18363e430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac18363e440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac18363e450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==210447==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *a=(int *)malloc(sizeof(int)*4);
    a[1]=1;
    free(a);
    printf("%d",a[1]);
    a[1]=2;
    return 0;
}
```
#### Valgrind Report
```
==210611== Memcheck, a memory error detector
==210611== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==210611== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==210611== Command: ./Uafree
==210611==
==210611== Invalid read of size 4
==210611==    at 0x1091C5: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree)
==210611==  Address 0x4a8c044 is 4 bytes inside a block of size 16 free'd
==210611==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==210611==    by 0x1091BC: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree)
==210611==  Block was alloc'd at
==210611==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==210611==    by 0x10919E: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree)
==210611==
==210611== Invalid write of size 4
==210611==    at 0x1091E5: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree)
==210611==  Address 0x4a8c044 is 4 bytes inside a block of size 16 free'd
==210611==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==210611==    by 0x1091BC: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree)
==210611==  Block was alloc'd at
==210611==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==210611==    by 0x10919E: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree)
==210611==
1==210611==
==210611== HEAP SUMMARY:
==210611==     in use at exit: 0 bytes in 0 blocks
==210611==   total heap usage: 2 allocs, 2 frees, 1,040 bytes allocated
==210611==
==210611== All heap blocks were freed -- no leaks are possible
==210611==
==210611== For lists of detected and suppressed errors, rerun with: -s
==210611== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==210657==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000014 at pc 0x55df481b92f3 bp 0x7ffcd1843060 sp 0x7ffcd1843050
READ of size 4 at 0x602000000014 thread T0
    #0 0x55df481b92f2 in main (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree+0x12f2)
    #1 0x7f44915fbd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f44915fbe3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55df481b9184 in _start (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree+0x1184)

0x602000000014 is located 4 bytes inside of 16-byte region [0x602000000010,0x602000000020)
freed by thread T0 here:
    #0 0x7f44918af537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55df481b92b3 in main (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree+0x12b3)
    #2 0x7f44915fbd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7f44918af887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55df481b925e in main (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree+0x125e)
    #2 0x7f44915fbd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uafree+0x12f2) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fd fa fa fa fa fa fa fa fa fa fa fa fa
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
==210657==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int * fun(){
    int a[]={1,2,3};
    return a;
}

int main() {
    printf("%d",fun()[1]);
    return 0;
}
```
#### Valgrind Report
```
==211542== Memcheck, a memory error detector
==211542== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==211542== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==211542== Command: ./Uar
==211542==
==211542== Invalid read of size 4
==211542==    at 0x1091CA: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uar)
==211542==  Address 0x4 is not stack'd, malloc'd or (recently) free'd
==211542==
==211542==
==211542== Process terminating with default action of signal 11 (SIGSEGV)
==211542==  Access not within mapped region at address 0x4
==211542==    at 0x1091CA: main (in /mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uar)
==211542==  If you believe this happened as a result of a stack
==211542==  overflow in your program's main thread (unlikely but
==211542==  possible), you can try to increase the size of the
==211542==  main thread stack using the --main-stacksize= flag.
==211542==  The main thread stack size used in this run was 8388608.
==211542==
==211542== HEAP SUMMARY:
==211542==     in use at exit: 0 bytes in 0 blocks
==211542==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==211542==
==211542== All heap blocks were freed -- no leaks are possible
==211542==
==211542== For lists of detected and suppressed errors, rerun with: -s
==211542== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==211557==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000004 (pc 0x55e9db7a2428 bp 0x7ffd50d40d50 sp 0x7ffd50d40d50 T0)
==211557==The signal is caused by a READ memory access.
==211557==Hint: address points to the zero page.
    #0 0x55e9db7a2428 in main (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uar+0x1428)
    #1 0x7fb53aae8d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb53aae8e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e9db7a2184 in _start (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uar+0x1184)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/mnt/c/Users/samuel/Documents/softwaretesting/112-spring-software-testing/lab5/Uar+0x1428) in main
==211557==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>
int main() {
    int a[8], b[8];
    printf("%p, %p\n",a,b);
    a[17]=1;//=b[1]
    printf("%d",a[17]);
    return 0;
}
```
### Why

Because the address of a[17] is equals to b[1]. Even it is out-of-bound read/write, it is still legal to read and write.