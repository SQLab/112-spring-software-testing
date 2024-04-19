# Answer

Name: Yi-Chu
ID: 312555018

## Test Valgrind and ASan

### Environment

 - gcc: 11.4.0
 - vargrind: 3.18.1

### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   Yes    | Yes  |
| Stack out-of-bounds  |   NO     | Yes  |
| Global out-of-bounds |   NO     | Yes  |
| Use-after-free       |   Yes    | Yes  |
| Use-after-return     |   Yes    | Yes  |

### Heap out-of-bounds
#### Source code
```cpp
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
        char *heap = (char *)malloc(3);

        // Heap out-of-bounds read/write
        printf("Heap out-of-bounds read heap[3] = %c", heap[3]);
        heap[3] = 'a';

        return 0;
}
```
#### Valgrind Report
```
==41598== Invalid read of size 1
==41598==    at 0x109214: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==41598==  Address 0x4a8e043 is 0 bytes after a block of size 3 alloc'd
==41598==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==41598==    by 0x109207: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)

==35219== Invalid write of size 1
==35219==    at 0x109238: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==35219==  Address 0x4a8e043 is 0 bytes after a block of size 3 alloc'd
==35219==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==35219==    by 0x109207: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
```
### ASan Report
```
==36978==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000013 at pc 0x55c405e913c2 bp 0x7fffd0865040 sp 0x7fffd0865030
WRITE of size 1 at 0x602000000013 thread T0
    #0 0x55c405e913c1 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:21
    #1 0x7f8ec87d4d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f8ec87d4e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55c405e91184 in _start (/home/neil/112-spring-software-testing/lab5/lab5_test_asan+0x1184)

0x602000000013 is located 0 bytes to the right of 3-byte region [0x602000000010,0x602000000013)
allocated by thread T0 here:
    #0 0x7f8ec8a88887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55c405e9135a in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:15

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/neil/112-spring-software-testing/lab5/lab5_test.c:21 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[03]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==36978==ABORTING
```

### Stack out-of-bounds
#### Source code
```cpp
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
        char stack[3];

        // Stack out-of-bounds read/write
        printf("Stack out-of-bounds read stack[3] = %c", stack[3]);
        stack[3] = 'a';

        return 0;
}
```
#### Valgrind Report
```
==42018==
*** stack smashing detected ***: terminated
==42018==
==42018== Process terminating with default action of signal 6 (SIGABRT)
==42018==    at 0x48F89FC: __pthread_kill_implementation (pthread_kill.c:44)
==42018==    by 0x48F89FC: __pthread_kill_internal (pthread_kill.c:78)
==42018==    by 0x48F89FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==42018==    by 0x48A4475: raise (raise.c:26)
==42018==    by 0x488A7F2: abort (abort.c:79)
==42018==    by 0x48EB675: __libc_message (libc_fatal.c:155)
==42018==    by 0x4998599: __fortify_fail (fortify_fail.c:26)
==42018==    by 0x4998565: __stack_chk_fail (stack_chk_fail.c:24)
==42018==    by 0x109228: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
```
### ASan Report
```
==37224==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd63338af3 at pc 0x55f860aa4469 bp 0x7ffd63338ac0 sp 0x7ffd63338ab0
WRITE of size 1 at 0x7ffd63338af3 thread T0
    #0 0x55f860aa4468 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:25
    #1 0x7f54b0529d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f54b0529e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55f860aa4184 in _start (/home/neil/112-spring-software-testing/lab5/lab5_test_asan+0x1184)

Address 0x7ffd63338af3 is located in stack of thread T0 at offset 35 in frame
    #0 0x55f860aa4358 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:14

  This frame has 1 object(s):
    [32, 35) 'stack' (line 16) <== Memory access at offset 35 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/neil/112-spring-software-testing/lab5/lab5_test.c:25 in main
Shadow bytes around the buggy address:
  0x10002c65f100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c65f110: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c65f120: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c65f130: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c65f140: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10002c65f150: 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1[03]f3
  0x10002c65f160: f3 f3 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c65f170: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c65f180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c65f190: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002c65f1a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==37224==ABORTING
```

### Global out-of-bounds
#### Source code
```cpp
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

char glob[3];

int main(void)
{
        // Global out-of-bounds read/write
        printf("Global out-of-bounds read glob[3] = %c", glob[3]);
        glob[3] = 'a';

        return 0;
}
```
#### Valgrind Report
```

```
### ASan Report
```
==37345==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5589289b20a3 at pc 0x5589289af3c8 bp 0x7fff1a3d4f90 sp 0x7fff1a3d4f80
WRITE of size 1 at 0x5589289b20a3 thread T0
    #0 0x5589289af3c7 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:29
    #1 0x7fecee9f4d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fecee9f4e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5589289af184 in _start (/home/neil/112-spring-software-testing/lab5/lab5_test_asan+0x1184)

0x5589289b20a3 is located 0 bytes to the right of global variable 'glob' defined in 'lab5_test.c:5:6' (0x5589289b20a0) of size 3
SUMMARY: AddressSanitizer: global-buffer-overflow /home/neil/112-spring-software-testing/lab5/lab5_test.c:29 in main
Shadow bytes around the buggy address:
  0x0ab1a512e3c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab1a512e3d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab1a512e3e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab1a512e3f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab1a512e400: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ab1a512e410: 00 00 00 00[03]f9 f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0ab1a512e420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab1a512e430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab1a512e440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab1a512e450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab1a512e460: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==37345==ABORTING
```

### Use-after-free
#### Source code
```cpp
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
        char *heap = (char *)malloc(3);

        // Use-after-free
        heap[2] = 'H';
        free(heap);
        printf("Use-after-free heap[2] = %c", heap[2]);

        return 0;
}
```
#### Valgrind Report
```
==35219== Invalid read of size 1
==35219==    at 0x1092A2: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==35219==  Address 0x4a8e042 is 2 bytes inside a block of size 3 free'd
==35219==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==35219==    by 0x109299: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==35219==  Block was alloc'd at
==35219==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==35219==    by 0x109207: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
```
### ASan Report
```
==37420==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000012 at pc 0x55881a3f4417 bp 0x7fffd5573230 sp 0x7fffd5573220
READ of size 1 at 0x602000000012 thread T0
    #0 0x55881a3f4416 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:34
    #1 0x7f72f8e10d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f72f8e10e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55881a3f41c4 in _start (/home/neil/112-spring-software-testing/lab5/lab5_test_asan+0x11c4)

0x602000000012 is located 2 bytes inside of 3-byte region [0x602000000010,0x602000000013)
freed by thread T0 here:
    #0 0x7f72f90c4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55881a3f43c6 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:33

previously allocated by thread T0 here:
    #0 0x7f72f90c4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55881a3f4397 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:15

SUMMARY: AddressSanitizer: heap-use-after-free /home/neil/112-spring-software-testing/lab5/lab5_test.c:34 in main
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
==37420==ABORTING
```

### Use-after-return
#### Source code
```cpp
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int use_after_return(void){
    char func[3];
    func[2] = 'F';
    return &func;
}

int main(void)
{
        int func_addr;

        // Use-after-return
        func_addr = use_after_return();
        printf("Use-after-free func[2] = %c", *((char*)func_addr + 2));

        return 0;
}

```
#### Valgrind Report
```
==47431== Invalid read of size 1
==47431==    at 0x109233: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==47431==  Address 0xffffffffff000067 is not stack'd, malloc'd or (recently) free'd
==47431==
==47431==
==47431== Process terminating with default action of signal 11 (SIGSEGV)
==47431==  Access not within mapped region at address 0xFFFFFFFFFF000067
==47431==    at 0x109233: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==47431==  If you believe this happened as a result of a stack
==47431==  overflow in your program's main thread (unlikely but
==47431==  possible), you can try to increase the size of the
==47431==  main thread stack using the --main-stacksize= flag.
==47431==  The main thread stack size used in this run was 8388608.
```
### ASan Report
```
==48042==ERROR: AddressSanitizer: SEGV on unknown address (pc 0x55ba27be03d9 bp 0x000000000001 sp 0x7ffc9b4d3700 T0)
==48042==The signal is caused by a READ memory access.
==48042==Hint: this fault was caused by a dereference of a high value address (see register values below).  Dissassemble the provided pc to learn which register was used.
    #0 0x55ba27be03d9 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:38
    #1 0x7feb88d2ed8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7feb88d2ee3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55ba27be01c4 in _start (/home/neil/112-spring-software-testing/lab5/lab5_test_asan+0x11c4)
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```cpp
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void){

    char *a = (char*)malloc(3);
    char *b = (char*)malloc(3);
    int offset = b - a;

    b[0] = 'b';
    a[offset] = 'a';
    printf("b[0] = %c\n", b[0]);
    free(a);
    free(b);

    return 0;
}
```
### Why

Since ASan only checks whether the shadow value of the target address is zero to determine whether it is out-of-bound, it won't be detected regardless of where the initial pointer starts from as long as the final target address is legal. Therefore, out-of-bound writes bypassing the redzone will not be detected.
