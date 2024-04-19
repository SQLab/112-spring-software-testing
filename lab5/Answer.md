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

char *re;

void use_after_return(){
    char func[3];
    func[2] = 'F';
    re = &func[2];
}

int main(void)
{
         // Use-after-return
        use_after_return();
        printf("func[2] = %c\n", *re);

        return 0;
}

```
#### Valgrind Report
```

==90058== Memcheck, a memory error detector
==90058== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==90058== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==90058== Command: ./lab5_test
==90058==
==90058== Conditional jump or move depends on uninitialised value(s)
==90058==    at 0x48EEE1D: _IO_file_overflow@@GLIBC_2.2.5 (fileops.c:782)
==90058==    by 0x48D93DB: __vfprintf_internal (vfprintf-internal.c:1517)
==90058==    by 0x48C279E: printf (printf.c:33)
==90058==    by 0x10925A: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==90058==
==90058== Syscall param write(buf) points to uninitialised byte(s)
==90058==    at 0x4976887: write (write.c:26)
==90058==    by 0x48ECEEC: _IO_file_write@@GLIBC_2.2.5 (fileops.c:1180)
==90058==    by 0x48EE9E0: new_do_write (fileops.c:448)
==90058==    by 0x48EE9E0: _IO_new_do_write (fileops.c:425)
==90058==    by 0x48EE9E0: _IO_do_write@@GLIBC_2.2.5 (fileops.c:422)
==90058==    by 0x48ED6D4: _IO_new_file_xsputn (fileops.c:1243)
==90058==    by 0x48ED6D4: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==90058==    by 0x48D7FC9: outstring_func (vfprintf-internal.c:239)
==90058==    by 0x48D7FC9: __vfprintf_internal (vfprintf-internal.c:1593)
==90058==    by 0x48C279E: printf (printf.c:33)
==90058==    by 0x10925A: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==90058==  Address 0x4a8e09a is 10 bytes inside a block of size 1,024 alloc'd
==90058==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==90058==    by 0x48E0BA3: _IO_file_doallocate (filedoalloc.c:101)
==90058==    by 0x48EFCDF: _IO_doallocbuf (genops.c:347)
==90058==    by 0x48EEF5F: _IO_file_overflow@@GLIBC_2.2.5 (fileops.c:744)
==90058==    by 0x48ED6D4: _IO_new_file_xsputn (fileops.c:1243)
==90058==    by 0x48ED6D4: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==90058==    by 0x48D714C: outstring_func (vfprintf-internal.c:239)
==90058==    by 0x48D714C: __vfprintf_internal (vfprintf-internal.c:1263)
==90058==    by 0x48C279E: printf (printf.c:33)
==90058==    by 0x10925A: main (in /home/neil/112-spring-software-testing/lab5/lab5_test)
==90058==
func[2] = F
==90058==
==90058== HEAP SUMMARY:
==90058==     in use at exit: 0 bytes in 0 blocks
==90058==   total heap usage: 2 allocs, 2 frees, 1,027 bytes allocated
==90058==
==90058== All heap blocks were freed -- no leaks are possible
==90058==
==90058== Use --track-origins=yes to see where uninitialised values come from
==90058== For lists of detected and suppressed errors, rerun with: -s
==90058== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==89397==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f165ec00022 at pc 0x56488a60542a bp 0x7fff9c8050f0 sp 0x7fff9c8050e0
READ of size 1 at 0x7f165ec00022 thread T0
    #0 0x56488a605429 in main /home/neil/112-spring-software-testing/lab5/lab5_test.c:38
    #1 0x7f1660d1dd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f1660d1de3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56488a6051c4 in _start (/home/neil/112-spring-software-testing/lab5/lab5_test_asan+0x11c4)

Address 0x7f165ec00022 is located in stack of thread T0 at offset 34 in frame
    #0 0x56488a605298 in use_after_return /home/neil/112-spring-software-testing/lab5/lab5_test.c:8

  This frame has 1 object(s):
    [32, 35) 'func' (line 9) <== Memory access at offset 34 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/neil/112-spring-software-testing/lab5/lab5_test.c:38 in main
Shadow bytes around the buggy address:
  0x0fe34bd77fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe34bd77fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe34bd77fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe34bd77fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe34bd77ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fe34bd78000: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0fe34bd78010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe34bd78020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe34bd78030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe34bd78040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe34bd78050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==89397==ABORTING
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
    printf("b[0] = %c\n", a[offset]);
    free(a);
    free(b);

    return 0;
}
```
### Why

Since ASan only checks whether the shadow value of the target address is zero to determine whether it is out-of-bound, it won't be detected regardless of where the initial pointer starts from as long as the final target address is legal. Therefore, out-of-bound writes bypassing the redzone will not be detected.
