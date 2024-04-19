# Answer

Name: 孟羽真
ID: 312581010

## Version
* valgrind-3.19.0
* gcc (Debian 12.2.0-14) 12.2.0

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |yes       |yes   |
| Stack out-of-bounds  |no        |yes   |
| Global out-of-bounds |no        |yes   |
| Use-after-free       |yes       |yes   |
| Use-after-return     |yes       |yes   |

### Heap out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){

    char *buffer = (char *)malloc(5);
    buffer[5] = 'k';
    return 0;

}
```
#### Valgrind Report
```
==260== Memcheck, a memory error detector
==260== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==260== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==260== Command: ./mem_op
==260== 
==260== Invalid write of size 1
==260==    at 0x109157: main (in /home/docker/112-spring-software-testing/lab5/mem_op)
==260==  Address 0x4a3c045 is 0 bytes after a block of size 5 alloc'd
==260==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==260==    by 0x10914A: main (in /home/docker/112-spring-software-testing/lab5/mem_op)
==260== 
==260== 
==260== HEAP SUMMARY:
==260==     in use at exit: 5 bytes in 1 blocks
==260==   total heap usage: 1 allocs, 0 frees, 5 bytes allocated
==260== 
==260== LEAK SUMMARY:
==260==    definitely lost: 5 bytes in 1 blocks
==260==    indirectly lost: 0 bytes in 0 blocks
==260==      possibly lost: 0 bytes in 0 blocks
==260==    still reachable: 0 bytes in 0 blocks
==260==         suppressed: 0 bytes in 0 blocks
==260== Rerun with --leak-check=full to see details of leaked memory
==260== 
==260== For lists of detected and suppressed errors, rerun with: -s
==260== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==253==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000015 at pc 0x55aa034731bb bp 0x7fffe6eaa880 sp 0x7fffe6eaa878
WRITE of size 1 at 0x602000000015 thread T0
    #0 0x55aa034731ba in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x11ba)
    #1 0x7fb46d8a3249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb46d8a3304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55aa034730a0 in _start (/home/docker/112-spring-software-testing/lab5/mem_op+0x10a0)

0x602000000015 is located 0 bytes to the right of 5-byte region [0x602000000010,0x602000000015)
allocated by thread T0 here:
    #0 0x7fb46db159cf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x55aa0347317a in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x117a)
    #2 0x7fb46d8a3249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/docker/112-spring-software-testing/lab5/mem_op+0x11ba) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[05]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==253==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){

    int data[5] = {1, 2, 3, 4, 5};
    int value = data[10];  
    return 0;

}
```
#### Valgrind Report
```
==400== Memcheck, a memory error detector
==400== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==400== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==400== Command: ./mem_op
==400== 
==400== 
==400== HEAP SUMMARY:
==400==     in use at exit: 0 bytes in 0 blocks
==400==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==400== 
==400== All heap blocks were freed -- no leaks are possible
==400== 
==400== For lists of detected and suppressed errors, rerun with: -s
==400== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==390==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe31397348 at pc 0x560368785363 bp 0x7ffe313972e0 sp 0x7ffe313972d8
READ of size 4 at 0x7ffe31397348 thread T0
    #0 0x560368785362 in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x1362)
    #1 0x7f2ee26f9249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f2ee26f9304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5603687850b0 in _start (/home/docker/112-spring-software-testing/lab5/mem_op+0x10b0)

Address 0x7ffe31397348 is located in stack of thread T0 at offset 72 in frame
    #0 0x560368785188 in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x1188)

  This frame has 1 object(s):
    [32, 52) 'data' (line 7) <== Memory access at offset 72 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/docker/112-spring-software-testing/lab5/mem_op+0x1362) in main
Shadow bytes around the buggy address:
  0x10004626ae10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004626ae20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004626ae30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004626ae40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004626ae50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10004626ae60: f1 f1 f1 f1 00 00 04 f3 f3[f3]f3 f3 00 00 00 00
  0x10004626ae70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004626ae80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004626ae90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004626aea0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10004626aeb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==390==ABORTING
```

### Global out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int data[5] = {1, 2, 3, 4, 5};

int main(){

    int value = data[10];  
    return 0;

}
```
#### Valgrind Report
```
==419== Memcheck, a memory error detector
==419== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==419== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==419== Command: ./mem_op
==419== 
==419== 
==419== HEAP SUMMARY:
==419==     in use at exit: 0 bytes in 0 blocks
==419==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==419== 
==419== All heap blocks were freed -- no leaks are possible
==419== 
==419== For lists of detected and suppressed errors, rerun with: -s
==419== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==412==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55653aba4088 at pc 0x55653aba11b3 bp 0x7ffe3717aaa0 sp 0x7ffe3717aa98
READ of size 4 at 0x55653aba4088 thread T0
    #0 0x55653aba11b2 in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x11b2)
    #1 0x7f5374614249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f5374614304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55653aba10b0 in _start (/home/docker/112-spring-software-testing/lab5/mem_op+0x10b0)

0x55653aba4088 is located 20 bytes to the right of global variable 'data' defined in 'mem_op.c:5:5' (0x55653aba4060) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/docker/112-spring-software-testing/lab5/mem_op+0x11b2) in main
Shadow bytes around the buggy address:
  0x0aad2756c7c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad2756c7d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad2756c7e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad2756c7f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad2756c800: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 04 f9
=>0x0aad2756c810: f9[f9]f9 f9 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0aad2756c820: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad2756c830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad2756c840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad2756c850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aad2756c860: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==412==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){

    char *buffer = (char *)malloc(0x05);
    strcpy(buffer, "jett");
    free(buffer);
    printf("buffer[0x01] = %c\n", buffer[0x01]);
    return 0;

}
```
#### Valgrind Report
```
==209== Memcheck, a memory error detector
==209== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==209== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==209== Command: ./mem_op
==209== 
==209== Invalid read of size 1
==209==    at 0x109191: main (in /home/docker/112-spring-software-testing/lab5/mem_op)
==209==  Address 0x4a3c041 is 1 bytes inside a block of size 5 free'd
==209==    at 0x484317B: free (vg_replace_malloc.c:872)
==209==    by 0x109188: main (in /home/docker/112-spring-software-testing/lab5/mem_op)
==209==  Block was alloc'd at
==209==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==209==    by 0x10916A: main (in /home/docker/112-spring-software-testing/lab5/mem_op)
==209== 
buffer[0x01] = e
==209== 
==209== HEAP SUMMARY:
==209==     in use at exit: 0 bytes in 0 blocks
==209==   total heap usage: 2 allocs, 2 frees, 1,029 bytes allocated
==209== 
==209== All heap blocks were freed -- no leaks are possible
==209== 
==209== For lists of detected and suppressed errors, rerun with: -s
==209== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==221==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000011 at pc 0x55b22a263232 bp 0x7ffdff6481f0 sp 0x7ffdff6481e8
READ of size 1 at 0x602000000011 thread T0
    #0 0x55b22a263231 in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x1231)
    #1 0x7f0e01bb0249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f0e01bb0304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55b22a2630f0 in _start (/home/docker/112-spring-software-testing/lab5/mem_op+0x10f0)

0x602000000011 is located 1 bytes inside of 5-byte region [0x602000000010,0x602000000015)
freed by thread T0 here:
    #0 0x7f0e01e216a8 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x55b22a2631f5 in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x11f5)
    #2 0x7f0e01bb0249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7f0e01e229cf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x55b22a2631ca in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x11ca)
    #2 0x7f0e01bb0249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/docker/112-spring-software-testing/lab5/mem_op+0x1231) in main
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
==221==ABORTING
```

### Use-after-return
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int* get_data() {
    int data[5] = {1, 2, 3, 4, 5};
    return data;
}

int main () {
    int* values = get_data();
    printf("values[0]: %d\n", values[0]);
}
```
#### Valgrind Report
```
==921== Memcheck, a memory error detector
==921== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==921== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==921== Command: ./mem_op
==921== 
==921== Invalid read of size 4
==921==    at 0x109181: main (in /home/docker/112-spring-software-testing/lab5/mem_op)
==921==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==921== 
==921== 
==921== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==921==  Access not within mapped region at address 0x0
==921==    at 0x109181: main (in /home/docker/112-spring-software-testing/lab5/mem_op)
==921==  If you believe this happened as a result of a stack
==921==  overflow in your program's main thread (unlikely but
==921==  possible), you can try to increase the size of the
==921==  main thread stack using the --main-stacksize= flag.
==921==  The main thread stack size used in this run was 8388608.
==921== 
==921== HEAP SUMMARY:
==921==     in use at exit: 0 bytes in 0 blocks
==921==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==921== 
==921== All heap blocks were freed -- no leaks are possible
==921== 
==921== For lists of detected and suppressed errors, rerun with: -s
==921== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==939==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5558fcb2f407 bp 0x7ffeef8a53a0 sp 0x7ffeef8a5390 T0)
==939==The signal is caused by a READ memory access.
==939==Hint: address points to the zero page.
    #0 0x5558fcb2f407 in main (/home/docker/112-spring-software-testing/lab5/mem_op+0x1407)
    #1 0x7f34d2f86249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f34d2f86304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5558fcb2f0e0 in _start (/home/docker/112-spring-software-testing/lab5/mem_op+0x10e0)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/docker/112-spring-software-testing/lab5/mem_op+0x1407) in main
==939==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){

    int a[8];
    int b[8];
    a[40] = 10;

    return 0;

}
```
### Why
Since ASan checks whether the address of the data falls within the redzone to detect out-of-bound situations, it cannot accurately detect when the data access exceeds the redzone boundary
