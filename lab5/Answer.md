# Answer

Name: 潘甫翰

ID: a121100

## Enivonment

```
$ gcc --version
gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0
Copyright (C) 2021 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

$ valgrind --version
valgrind-3.18.1
```

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    O      |   O   |
| Stack out-of-bounds  |     X     |   O   |
| Global out-of-bounds |     X     |   O   |
| Use-after-free       |     O     |   O   |
| Use-after-return     |     O     |   X   |

### Heap out-of-bounds
#### Source code
```c
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
==47021== Memcheck, a memory error detector
==47021== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==47021== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==47021== Command: ./heap_oob
==47021== 
==47021== Invalid write of size 1
==47021==    at 0x1091AB: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/heap_oob)
==47021==  Address 0x4aa9044 is 0 bytes after a block of size 4 alloc'd
==47021==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==47021==    by 0x10919E: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/heap_oob)
==47021== 
==47021== Invalid read of size 1
==47021==    at 0x1091B6: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/heap_oob)
==47021==  Address 0x4aa9044 is 0 bytes after a block of size 4 alloc'd
==47021==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==47021==    by 0x10919E: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/heap_oob)
==47021== 
a
==47021== 
==47021== HEAP SUMMARY:
==47021==     in use at exit: 0 bytes in 0 blocks
==47021==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==47021== 
==47021== All heap blocks were freed -- no leaks are possible
==47021== 
==47021== For lists of detected and suppressed errors, rerun with: -s
==47021== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==58300==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000014 at pc 0x5b56ab6be29f bp 0x7fff0a5556d0 sp 0x7fff0a5556c0
WRITE of size 1 at 0x602000000014 thread T0
    #0 0x5b56ab6be29e in main (/home/shark/software_testing/112-spring-software-testing/lab5/test/heap_oob_asan+0x129e)
    #1 0x70c47c629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x70c47c629e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b56ab6be184 in _start (/home/shark/software_testing/112-spring-software-testing/lab5/test/heap_oob_asan+0x1184)

0x602000000014 is located 0 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x70c47cab4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5b56ab6be25e in main (/home/shark/software_testing/112-spring-software-testing/lab5/test/heap_oob_asan+0x125e)
    #2 0x70c47c629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/shark/software_testing/112-spring-software-testing/lab5/test/heap_oob_asan+0x129e) in main
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
==58300==ABORTING
```

**Valgring 能， ASAN 能。**

### Stack out-of-bounds
#### Source code
```c
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
==59421== Memcheck, a memory error detector
==59421== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==59421== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==59421== Command: ./stack_oob
==59421== 
a
*** stack smashing detected ***: terminated
==59421== 
==59421== Process terminating with default action of signal 6 (SIGABRT)
==59421==    at 0x49139FC: __pthread_kill_implementation (pthread_kill.c:44)
==59421==    by 0x49139FC: __pthread_kill_internal (pthread_kill.c:78)
==59421==    by 0x49139FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==59421==    by 0x48BF475: raise (raise.c:26)
==59421==    by 0x48A57F2: abort (abort.c:79)
==59421==    by 0x4906675: __libc_message (libc_fatal.c:155)
==59421==    by 0x49B3599: __fortify_fail (fortify_fail.c:26)
==59421==    by 0x49B3565: __stack_chk_fail (stack_chk_fail.c:24)
==59421==    by 0x1091BD: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/stack_oob)
==59421== 
==59421== HEAP SUMMARY:
==59421==     in use at exit: 1,024 bytes in 1 blocks
==59421==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==59421== 
==59421== LEAK SUMMARY:
==59421==    definitely lost: 0 bytes in 0 blocks
==59421==    indirectly lost: 0 bytes in 0 blocks
==59421==      possibly lost: 0 bytes in 0 blocks
==59421==    still reachable: 1,024 bytes in 1 blocks
==59421==         suppressed: 0 bytes in 0 blocks
==59421== Rerun with --leak-check=full to see details of leaked memory
==59421== 
==59421== For lists of detected and suppressed errors, rerun with: -s
==59421== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
[1]    59421 IOT instruction (core dumped)  valgrind --tool=memcheck ./stack_oob
```

### ASan Report
```
=================================================================
==62523==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd7ec30c54 at pc 0x58d039ed9321 bp 0x7ffd7ec30c20 sp 0x7ffd7ec30c10
WRITE of size 1 at 0x7ffd7ec30c54 thread T0
    #0 0x58d039ed9320 in main /home/shark/software_testing/112-spring-software-testing/lab5/test/stack_oob.c:6
    #1 0x79fc47029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x79fc47029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x58d039ed9164 in _start (/home/shark/software_testing/112-spring-software-testing/lab5/test/stack_oob_asan+0x1164)

Address 0x7ffd7ec30c54 is located in stack of thread T0 at offset 36 in frame
    #0 0x58d039ed9238 in main /home/shark/software_testing/112-spring-software-testing/lab5/test/stack_oob.c:4

  This frame has 1 object(s):
    [32, 36) 's' (line 5) <== Memory access at offset 36 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/shark/software_testing/112-spring-software-testing/lab5/test/stack_oob.c:6 in main
Shadow bytes around the buggy address:
  0x10002fd7e130: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002fd7e140: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002fd7e150: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002fd7e160: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002fd7e170: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10002fd7e180: 00 00 00 00 00 00 f1 f1 f1 f1[04]f3 f3 f3 00 00
  0x10002fd7e190: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002fd7e1a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002fd7e1b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002fd7e1c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002fd7e1d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==62523==ABORTING
```
**Valgring 不能， ASAN 能。**

### Global out-of-bounds
#### Source code
```c
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
==61520== Memcheck, a memory error detector
==61520== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==61520== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==61520== Command: ./global_oob
==61520== 
a
==61520== 
==61520== HEAP SUMMARY:
==61520==     in use at exit: 0 bytes in 0 blocks
==61520==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==61520== 
==61520== All heap blocks were freed -- no leaks are possible
==61520== 
==61520== For lists of detected and suppressed errors, rerun with: -s
==61520== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
=================================================================
==62888==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5cd7968840e4 at pc 0x5cd796881245 bp 0x7ffd6e5e3d10 sp 0x7ffd6e5e3d00
WRITE of size 1 at 0x5cd7968840e4 thread T0
    #0 0x5cd796881244 in main /home/shark/software_testing/112-spring-software-testing/lab5/test/global_oob.c:6
    #1 0x787838a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x787838a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5cd796881124 in _start (/home/shark/software_testing/112-spring-software-testing/lab5/test/global_oob_asan+0x1124)

0x5cd7968840e4 is located 0 bytes to the right of global variable 's' defined in 'global_oob.c:4:6' (0x5cd7968840e0) of size 4
SUMMARY: AddressSanitizer: global-buffer-overflow /home/shark/software_testing/112-spring-software-testing/lab5/test/global_oob.c:6 in main
Shadow bytes around the buggy address:
  0x0b9b72d087c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b9b72d087d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b9b72d087e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b9b72d087f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b9b72d08800: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0b9b72d08810: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00[04]f9 f9 f9
  0x0b9b72d08820: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b9b72d08830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b9b72d08840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b9b72d08850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b9b72d08860: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==62888==ABORTING
```

**Valgring 不能， ASAN 能。**

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
==88811== Memcheck, a memory error detector
==88811== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==88811== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==88811== Command: ./uaf
==88811== 
==88811== Invalid read of size 1
==88811==    at 0x1091B7: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/uaf)
==88811==  Address 0x4aa9044 is 0 bytes after a block of size 4 free'd
==88811==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==88811==    by 0x1091AE: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/uaf)
==88811==  Block was alloc'd at
==88811==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==88811==    by 0x10919E: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/uaf)
==88811== 

==88811== 
==88811== HEAP SUMMARY:
==88811==     in use at exit: 0 bytes in 0 blocks
==88811==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==88811== 
==88811== All heap blocks were freed -- no leaks are possible
==88811== 
==88811== For lists of detected and suppressed errors, rerun with: -s
==88811== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==90396==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000014 at pc 0x645a8d36f289 bp 0x7ffc59a38240 sp 0x7ffc59a38230
READ of size 1 at 0x602000000014 thread T0
    #0 0x645a8d36f288 in main /home/shark/software_testing/112-spring-software-testing/lab5/test/uaf.c:7
    #1 0x7faa4bc29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7faa4bc29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x645a8d36f164 in _start (/home/shark/software_testing/112-spring-software-testing/lab5/test/uaf_asan+0x1164)

0x602000000014 is located 0 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7faa4c0b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x645a8d36f242 in main /home/shark/software_testing/112-spring-software-testing/lab5/test/uaf.c:6

previously allocated by thread T0 here:
    #0 0x7faa4c0b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x645a8d36f237 in main /home/shark/software_testing/112-spring-software-testing/lab5/test/uaf.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/shark/software_testing/112-spring-software-testing/lab5/test/uaf.c:7 in main
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
==90396==ABORTING
```

**Valgring 能， ASAN 能。**

### Use-after-return
#### Source code
```c
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
==93624== Memcheck, a memory error detector
==93624== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==93624== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==93624== Command: ./ua_ret
==93624== 
==93624== Conditional jump or move depends on uninitialised value(s)
==93624==    at 0x48F3AD6: __vfprintf_internal (vfprintf-internal.c:1516)
==93624==    by 0x48DD79E: printf (printf.c:33)
==93624==    by 0x1091DD: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/ua_ret)
==93624== 
==93624== Use of uninitialised value of size 8
==93624==    at 0x48D72EB: _itoa_word (_itoa.c:177)
==93624==    by 0x48F2ABD: __vfprintf_internal (vfprintf-internal.c:1516)
==93624==    by 0x48DD79E: printf (printf.c:33)
==93624==    by 0x1091DD: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/ua_ret)
==93624== 
==93624== Conditional jump or move depends on uninitialised value(s)
==93624==    at 0x48D72FC: _itoa_word (_itoa.c:177)
==93624==    by 0x48F2ABD: __vfprintf_internal (vfprintf-internal.c:1516)
==93624==    by 0x48DD79E: printf (printf.c:33)
==93624==    by 0x1091DD: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/ua_ret)
==93624== 
==93624== Conditional jump or move depends on uninitialised value(s)
==93624==    at 0x48F35C3: __vfprintf_internal (vfprintf-internal.c:1516)
==93624==    by 0x48DD79E: printf (printf.c:33)
==93624==    by 0x1091DD: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/ua_ret)
==93624== 
==93624== Conditional jump or move depends on uninitialised value(s)
==93624==    at 0x48F2C05: __vfprintf_internal (vfprintf-internal.c:1516)
==93624==    by 0x48DD79E: printf (printf.c:33)
==93624==    by 0x1091DD: main (in /home/shark/software_testing/112-spring-software-testing/lab5/test/ua_ret)
==93624== 
123
==93624== 
==93624== HEAP SUMMARY:
==93624==     in use at exit: 0 bytes in 0 blocks
==93624==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==93624== 
==93624== All heap blocks were freed -- no leaks are possible
==93624== 
==93624== Use --track-origins=yes to see where uninitialised values come from
==93624== For lists of detected and suppressed errors, rerun with: -s
==93624== ERROR SUMMARY: 9 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
$ ./ua_ret_asan
123
```

**Valgring 能， ASAN 不能。**

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int x[10];
    int y[10];
    for (int i = 0; i < 10; i++) {
        x[i] = 100;
        y[i] = 200;
    }
    int r = &y[0] - &x[0];
    x[r] = 300;

    printf("y[0] = %d\n", y[0]);
    printf("y[1] = %d\n", y[1]);
    return 0;
}
```
### Why

因為覆蓋到的直剛好跨過 redzone ，並沒有落在 redzone 上。

