# Answer

Name: 蔡怡葶
ID: 312552050

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |V         |V     |
| Stack out-of-bounds  |X         |V     |
| Global out-of-bounds |X         |V     |
| Use-after-free       |V         |V     |
| Use-after-return     |V         |V     |

### Heap out-of-bounds
#### Source code
```C=
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *s = malloc(4*sizeof(char));
    s[4] = 'a';
    printf("%c\n", s[4]);
    free(s);
    return 0;
}
```
#### Valgrind Report
```
==5270== Memcheck, a memory error detector
==5270== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5270== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==5270== Command: ./test_valgrind.o
==5270== 
==5270== Invalid write of size 1
==5270==    at 0x1091AB: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==5270==  Address 0x4a98044 is 0 bytes after a block of size 4 alloc'd
==5270==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5270==    by 0x10919E: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==5270== 
==5270== Invalid read of size 1
==5270==    at 0x1091B6: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==5270==  Address 0x4a98044 is 0 bytes after a block of size 4 alloc'd
==5270==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5270==    by 0x10919E: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==5270== 
a
==5270== 
==5270== HEAP SUMMARY:
==5270==     in use at exit: 0 bytes in 0 blocks
==5270==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==5270== 
==5270== All heap blocks were freed -- no leaks are possible
==5270== 
==5270== For lists of detected and suppressed errors, rerun with: -s
==5270== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==5276==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000014 at pc 0x5931c2d5f28e bp 0x7ffd3910f2a0 sp 0x7ffd3910f290
WRITE of size 1 at 0x602000000014 thread T0
    #0 0x5931c2d5f28d in main /home/yeeeee/112-spring-software-testing/lab5/test.c:7
    #1 0x76cadb429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x76cadb429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5931c2d5f164 in _start (/home/yeeeee/112-spring-software-testing/lab5/test_asan.o+0x1164)

0x602000000014 is located 0 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x76cadb8b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5931c2d5f237 in main /home/yeeeee/112-spring-software-testing/lab5/test.c:6

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/yeeeee/112-spring-software-testing/lab5/test.c:7 in main
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
==5276==ABORTING
```

### Stack out-of-bounds
#### Source code
```C=
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
==6754== Memcheck, a memory error detector
==6754== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6754== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6754== Command: ./test_valgrind.o
==6754== 
a
*** stack smashing detected ***: terminated
==6754== 
==6754== Process terminating with default action of signal 6 (SIGABRT)
==6754==    at 0x49029FC: __pthread_kill_implementation (pthread_kill.c:44)
==6754==    by 0x49029FC: __pthread_kill_internal (pthread_kill.c:78)
==6754==    by 0x49029FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==6754==    by 0x48AE475: raise (raise.c:26)
==6754==    by 0x48947F2: abort (abort.c:79)
==6754==    by 0x48F5675: __libc_message (libc_fatal.c:155)
==6754==    by 0x49A2599: __fortify_fail (fortify_fail.c:26)
==6754==    by 0x49A2565: __stack_chk_fail (stack_chk_fail.c:24)
==6754==    by 0x1091BD: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==6754== 
==6754== HEAP SUMMARY:
==6754==     in use at exit: 1,024 bytes in 1 blocks
==6754==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==6754== 
==6754== LEAK SUMMARY:
==6754==    definitely lost: 0 bytes in 0 blocks
==6754==    indirectly lost: 0 bytes in 0 blocks
==6754==      possibly lost: 0 bytes in 0 blocks
==6754==    still reachable: 1,024 bytes in 1 blocks
==6754==         suppressed: 0 bytes in 0 blocks
==6754== Rerun with --leak-check=full to see details of leaked memory
==6754== 
==6754== For lists of detected and suppressed errors, rerun with: -s
==6754== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==6767==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd8acd2654 at pc 0x5c7dcc3bb321 bp 0x7ffd8acd2620 sp 0x7ffd8acd2610
WRITE of size 1 at 0x7ffd8acd2654 thread T0
    #0 0x5c7dcc3bb320 in main /home/yeeeee/112-spring-software-testing/lab5/test.c:7
    #1 0x700708429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x700708429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c7dcc3bb164 in _start (/home/yeeeee/112-spring-software-testing/lab5/test_asan.o+0x1164)

Address 0x7ffd8acd2654 is located in stack of thread T0 at offset 36 in frame
    #0 0x5c7dcc3bb238 in main /home/yeeeee/112-spring-software-testing/lab5/test.c:5

  This frame has 1 object(s):
    [32, 36) 's' (line 6) <== Memory access at offset 36 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/yeeeee/112-spring-software-testing/lab5/test.c:7 in main
Shadow bytes around the buggy address:
  0x100031592470: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100031592480: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100031592490: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000315924a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000315924b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x1000315924c0: 00 00 00 00 00 00 f1 f1 f1 f1[04]f3 f3 f3 00 00
  0x1000315924d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000315924e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000315924f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100031592500: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100031592510: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==6767==ABORTING
```

### Global out-of-bounds
#### Source code
```C=
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char s[4];

int main() {
    s[4] = 'a';
    printf("%c\n", s[4]);
    return 0;
}
```
#### Valgrind Report
```
==6876== Memcheck, a memory error detector
==6876== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6876== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6876== Command: ./test_valgrind.o
==6876== 
a
==6876== 
==6876== HEAP SUMMARY:
==6876==     in use at exit: 0 bytes in 0 blocks
==6876==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==6876== 
==6876== All heap blocks were freed -- no leaks are possible
==6876== 
==6876== For lists of detected and suppressed errors, rerun with: -s
==6876== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==6882==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5a36240e00e4 at pc 0x5a36240dd245 bp 0x7ffec369f100 sp 0x7ffec369f0f0
WRITE of size 1 at 0x5a36240e00e4 thread T0
    #0 0x5a36240dd244 in main /home/yeeeee/112-spring-software-testing/lab5/test.c:8
    #1 0x7354fca29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7354fca29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5a36240dd124 in _start (/home/yeeeee/112-spring-software-testing/lab5/test_asan.o+0x1124)

0x5a36240e00e4 is located 0 bytes to the right of global variable 's' defined in 'test.c:5:6' (0x5a36240e00e0) of size 4
SUMMARY: AddressSanitizer: global-buffer-overflow /home/yeeeee/112-spring-software-testing/lab5/test.c:8 in main
Shadow bytes around the buggy address:
  0x0b4744813fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b4744813fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b4744813fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b4744813ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b4744814000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0b4744814010: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00[04]f9 f9 f9
  0x0b4744814020: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b4744814030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b4744814040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b4744814050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b4744814060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==6882==ABORTING
```

### Use-after-free
#### Source code
```C=
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *s = malloc(4*sizeof(char));
    free(s);
    printf("%c\n", s[3]);
    return 0;
}
```
#### Valgrind Report
```
==6913== Memcheck, a memory error detector
==6913== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6913== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6913== Command: ./test_valgrind.o
==6913== 
==6913== Invalid read of size 1
==6913==    at 0x1091B7: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==6913==  Address 0x4a98043 is 3 bytes inside a block of size 4 free'd
==6913==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==6913==    by 0x1091AE: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==6913==  Block was alloc'd at
==6913==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==6913==    by 0x10919E: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==6913== 

==6913== 
==6913== HEAP SUMMARY:
==6913==     in use at exit: 0 bytes in 0 blocks
==6913==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==6913== 
==6913== All heap blocks were freed -- no leaks are possible
==6913== 
==6913== For lists of detected and suppressed errors, rerun with: -s
==6913== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==6919==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000013 at pc 0x5c279cf78289 bp 0x7ffcb8ee7180 sp 0x7ffcb8ee7170
READ of size 1 at 0x602000000013 thread T0
    #0 0x5c279cf78288 in main /home/yeeeee/112-spring-software-testing/lab5/test.c:8
    #1 0x7920c9029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7920c9029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c279cf78164 in _start (/home/yeeeee/112-spring-software-testing/lab5/test_asan.o+0x1164)

0x602000000013 is located 3 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7920c94b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5c279cf78242 in main /home/yeeeee/112-spring-software-testing/lab5/test.c:7

previously allocated by thread T0 here:
    #0 0x7920c94b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5c279cf78237 in main /home/yeeeee/112-spring-software-testing/lab5/test.c:6

SUMMARY: AddressSanitizer: heap-use-after-free /home/yeeeee/112-spring-software-testing/lab5/test.c:8 in main
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
==6919==ABORTING
```

### Use-after-return
#### Source code
```C=
#include <stdio.h>
#include <stdlib.h>

char* func(){
    char* ptr;
    return ptr;
}

int main() {
    char* ptr = func();
    *ptr = 'b';
    return 0;
}
```
#### Valgrind Report
```
==7723== Memcheck, a memory error detector
==7723== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7723== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7723== Command: ./test_valgrind.o
==7723== 
==7723== Use of uninitialised value of size 8
==7723==    at 0x109155: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==7723== 
==7723== Invalid write of size 1
==7723==    at 0x109155: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==7723==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==7723== 
==7723== 
==7723== Process terminating with default action of signal 11 (SIGSEGV)
==7723==  Access not within mapped region at address 0x0
==7723==    at 0x109155: main (in /home/yeeeee/112-spring-software-testing/lab5/test_valgrind.o)
==7723==  If you believe this happened as a result of a stack
==7723==  overflow in your program's main thread (unlikely but
==7723==  possible), you can try to increase the size of the
==7723==  main thread stack using the --main-stacksize= flag.
==7723==  The main thread stack size used in this run was 8388608.
==7723== 
==7723== HEAP SUMMARY:
==7723==     in use at exit: 0 bytes in 0 blocks
==7723==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==7723== 
==7723== All heap blocks were freed -- no leaks are possible
==7723== 
==7723== Use --track-origins=yes to see where uninitialised values come from
==7723== For lists of detected and suppressed errors, rerun with: -s
==7723== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==7734==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5bfe61d7e1c1 bp 0x000000000001 sp 0x7ffd115a9e90 T0)
==7734==The signal is caused by a WRITE memory access.
==7734==Hint: address points to the zero page.
    #0 0x5bfe61d7e1c1 in main /home/yeeeee/112-spring-software-testing/lab5/test.c:11
    #1 0x7f6486229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f6486229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5bfe61d7e0c4 in _start (/home/yeeeee/112-spring-software-testing/lab5/test_asan.o+0x10c4)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/yeeeee/112-spring-software-testing/lab5/test.c:11 in main
==7734==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```C=
#include <stdio.h>
#include <stdlib.h>

int main() {
    int a[8],b[8];
    int dist = (int)(b-a);
    if(dist > 0){
    	a[dist] = 1;
    }
    else{
    	dist = (-1)*dist;
    	b[dist] = 1;
    }
    return 0;
}
```
### Why
```
ASan insert a redzone before and after the variable memory segment.
If the program read or write the redzone, an exception will be thrown.
But ASan doesn't know which stack read that memory segment.
So in this example.
We set up two stacks and calculate the distance between them in the memory segment.
And manipulate the value in the other stack through one of the stacks.
ASan doesn't find any error.
```
