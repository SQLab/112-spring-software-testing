# Answer

Name: 林冠甫
ID: 312552038

## Environment
```
gcc:
    gcc version 12.2.0 (Debian 12.2.0-14)
valgrind:
    valgrind-3.19.0
```
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
==105== Memcheck, a memory error detector
==105== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==105== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==105== Command: ./test_valgrind
==105==
==105== Invalid write of size 1
==105==    at 0x109177: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==105==  Address 0x4a3f044 is 0 bytes after a block of size 4 alloc'd
==105==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==105==    by 0x10916A: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==105==
==105== Invalid read of size 1
==105==    at 0x109182: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==105==  Address 0x4a3f044 is 0 bytes after a block of size 4 alloc'd
==105==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==105==    by 0x10916A: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==105==
a
==105==
==105== HEAP SUMMARY:
==105==     in use at exit: 0 bytes in 0 blocks
==105==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==105==
==105== All heap blocks were freed -- no leaks are possible
==105==
==105== For lists of detected and suppressed errors, rerun with: -s
==105== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==107==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000014 at pc 0x560c4c92e205 bp 0x7fffde4c56f0 sp 0x7fffde4c56e8
WRITE of size 1 at 0x602000000014 thread T0
    #0 0x560c4c92e204 in main /home/kf/112-spring-software-testing/lab5/test.c:7
    #1 0x7f8d7ccc0249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f8d7ccc0304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x560c4c92e0e0 in _start (/home/kf/112-spring-software-testing/lab5/test_asan+0x10e0)

0x602000000014 is located 0 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x7f8d7cf329cf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x560c4c92e1b3 in main /home/kf/112-spring-software-testing/lab5/test.c:6

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/kf/112-spring-software-testing/lab5/test.c:7 in main
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
==107==ABORTING
```
**Asan能，valgrind能**
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
==147== Memcheck, a memory error detector
==147== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==147== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==147== Command: ./test_valgrind
==147==
a
==147==
==147== HEAP SUMMARY:
==147==     in use at exit: 0 bytes in 0 blocks
==147==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==147==
==147== All heap blocks were freed -- no leaks are possible
==147==
==147== For lists of detected and suppressed errors, rerun with: -s
==147== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==148==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe270c7314 at pc 0x5605b5185268 bp 0x7ffe270c72e0 sp 0x7ffe270c72d8
WRITE of size 1 at 0x7ffe270c7314 thread T0
    #0 0x5605b5185267 in main /home/kf/112-spring-software-testing/lab5/test.c:7
    #1 0x7f10d2bad249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f10d2bad304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5605b51850d0 in _start (/home/kf/112-spring-software-testing/lab5/test_asan+0x10d0)

Address 0x7ffe270c7314 is located in stack of thread T0 at offset 36 in frame
    #0 0x5605b51851a8 in main /home/kf/112-spring-software-testing/lab5/test.c:5

  This frame has 1 object(s):
    [32, 36) 's' (line 6) <== Memory access at offset 36 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/kf/112-spring-software-testing/lab5/test.c:7 in main
Shadow bytes around the buggy address:
  0x100044e10e10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044e10e20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044e10e30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044e10e40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044e10e50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x100044e10e60: f1 f1[04]f3 f3 f3 00 00 00 00 00 00 00 00 00 00
  0x100044e10e70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044e10e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044e10e90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044e10ea0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100044e10eb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==148==ABORTING
```
**Asan能，valgrind不能**
### Global out-of-bounds
#### Source code
```
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
==164== Memcheck, a memory error detector
==164== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==164== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==164== Command: ./test_valgrind
==164==
a
==164==
==164== HEAP SUMMARY:
==164==     in use at exit: 0 bytes in 0 blocks
==164==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==164==
==164== All heap blocks were freed -- no leaks are possible
==164==
==164== For lists of detected and suppressed errors, rerun with: -s
==164== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==165==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55b76e60d124 at pc 0x55b76e60a1dc bp 0x7fff3974a6e0 sp 0x7fff3974a6d8
WRITE of size 1 at 0x55b76e60d124 thread T0
    #0 0x55b76e60a1db in main /home/kf/112-spring-software-testing/lab5/test.c:8
    #1 0x7f6fa670c249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f6fa670c304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55b76e60a0c0 in _start (/home/kf/112-spring-software-testing/lab5/test_asan+0x10c0)

0x55b76e60d124 is located 0 bytes to the right of global variable 's' defined in 'test.c:5:6' (0x55b76e60d120) of size 4
SUMMARY: AddressSanitizer: global-buffer-overflow /home/kf/112-spring-software-testing/lab5/test.c:8 in main
Shadow bytes around the buggy address:
  0x0ab76dcb99d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab76dcb99e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab76dcb99f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab76dcb9a00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab76dcb9a10: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ab76dcb9a20: 00 00 00 00[04]f9 f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0ab76dcb9a30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab76dcb9a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab76dcb9a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab76dcb9a60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab76dcb9a70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==165==ABORTING
```
**Asan能，valgrind不能**
### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *s = malloc(4*sizeof(char));
    free(s);
    printf("%c\n", s[4]);
    return 0;
}
```
#### Valgrind Report
```
==180== Memcheck, a memory error detector
==180== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==180== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==180== Command: ./test_valgrind
==180==
==180== Invalid read of size 1
==180==    at 0x109183: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==180==  Address 0x4a3f044 is 0 bytes after a block of size 4 free'd
==180==    at 0x484317B: free (vg_replace_malloc.c:872)
==180==    by 0x10917A: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==180==  Block was alloc'd at
==180==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==180==    by 0x10916A: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==180==

==180==
==180== HEAP SUMMARY:
==180==     in use at exit: 0 bytes in 0 blocks
==180==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==180==
==180== All heap blocks were freed -- no leaks are possible
==180==
==180== For lists of detected and suppressed errors, rerun with: -s
==180== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==181==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000014 at pc 0x55561b06c200 bp 0x7ffd32e78770 sp 0x7ffd32e78768
READ of size 1 at 0x602000000014 thread T0
    #0 0x55561b06c1ff in main /home/kf/112-spring-software-testing/lab5/test.c:8
    #1 0x7f8582668249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f8582668304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x55561b06c0e0 in _start (/home/kf/112-spring-software-testing/lab5/test_asan+0x10e0)

0x602000000014 is located 0 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f85828d96a8 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x55561b06c1be in main /home/kf/112-spring-software-testing/lab5/test.c:7

previously allocated by thread T0 here:
    #0 0x7f85828da9cf in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x55561b06c1b3 in main /home/kf/112-spring-software-testing/lab5/test.c:6

SUMMARY: AddressSanitizer: heap-use-after-free /home/kf/112-spring-software-testing/lab5/test.c:8 in main
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
==181==ABORTING
```
**Asan能，valgrind能**
### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int *ptr;

void *func() {
    int a = 123;
    ptr = &a; 
}

int main() {
    func();
    printf("%d\n", *ptr);
    return 0;
}
```
#### Valgrind Report
```
==224== Memcheck, a memory error detector
==224== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==224== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==224== Command: ./test_valgrind
==224==
==224== Conditional jump or move depends on uninitialised value(s)
==224==    at 0x48B8027: __vfprintf_internal (vfprintf-process-arg.c:58)
==224==    by 0x48AD65A: printf (printf.c:33)
==224==    by 0x10917E: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==224==
==224== Use of uninitialised value of size 8
==224==    at 0x48ACAAB: _itoa_word (_itoa.c:177)
==224==    by 0x48B7E58: __vfprintf_internal (vfprintf-process-arg.c:164)
==224==    by 0x48AD65A: printf (printf.c:33)
==224==    by 0x10917E: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==224==
==224== Conditional jump or move depends on uninitialised value(s)
==224==    at 0x48ACABC: _itoa_word (_itoa.c:177)
==224==    by 0x48B7E58: __vfprintf_internal (vfprintf-process-arg.c:164)
==224==    by 0x48AD65A: printf (printf.c:33)
==224==    by 0x10917E: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==224==
==224== Conditional jump or move depends on uninitialised value(s)
==224==    at 0x48B86F6: __vfprintf_internal (vfprintf-process-arg.c:174)
==224==    by 0x48AD65A: printf (printf.c:33)
==224==    by 0x10917E: main (in /home/kf/112-spring-software-testing/lab5/test_valgrind)
==224==
123
==224==
==224== HEAP SUMMARY:
==224==     in use at exit: 0 bytes in 0 blocks
==224==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==224==
==224== All heap blocks were freed -- no leaks are possible
==224==
==224== Use --track-origins=yes to see where uninitialised values come from
==224== For lists of detected and suppressed errors, rerun with: -s
==224== ERROR SUMMARY: 8 errors from 4 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==228==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f3ed0300020 at pc 0x5642bc2fe2de bp 0x7ffe642a7420 sp 0x7ffe642a7418
READ of size 4 at 0x7f3ed0300020 thread T0
    #0 0x5642bc2fe2dd in main /home/kf/112-spring-software-testing/lab5/test.c:14
    #1 0x7f3ed249e249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f3ed249e304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x5642bc2fe0e0 in _start (/home/kf/112-spring-software-testing/lab5/test_asan+0x10e0)

Address 0x7f3ed0300020 is located in stack of thread T0 at offset 32 in frame
    #0 0x5642bc2fe1b8 in func /home/kf/112-spring-software-testing/lab5/test.c:7

  This frame has 1 object(s):
    [32, 36) 'a' (line 8) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/kf/112-spring-software-testing/lab5/test.c:14 in main
Shadow bytes around the buggy address:
  0x0fe85a057fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe85a057fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe85a057fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe85a057fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe85a057ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fe85a058000: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0fe85a058010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe85a058020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe85a058030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe85a058040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe85a058050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==228==ABORTING
```
**Asan能，valgrind能**
## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int a[8];
    int b[8];
    for (int i=0; i<8; i++) {
        a[i] = 123;
        b[i] = 456;
    }
    int diff = &b[0] - &a[0];
    a[diff] = 789;
    printf("b[0] = %d\n", b[0]);
    printf("b[1] = %d\n", b[1]);
    return 0;
}
```
### Why
```
因為透過diff去更改b[0]的值過程中並沒有對redzone做讀寫，所以ASan不能偵測到
```
**Asan不能**