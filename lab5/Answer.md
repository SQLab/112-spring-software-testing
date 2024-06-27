# Answer

Name: 莊博傑
ID: 312551016

## Test Valgrind and ASan

### 版本

使用 gcc 9.4。

```
$ gcc -v
Using built-in specs.
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-linux-gnu/9/lto-wrapper
OFFLOAD_TARGET_NAMES=nvptx-none:hsa
OFFLOAD_TARGET_DEFAULT=1
Target: x86_64-linux-gnu
Configured with: ../src/configure -v --with-pkgversion='Ubuntu 9.4.0-1ubuntu1~20.04.2' --with-bugurl=file:///usr/share/doc/gcc-9/README.Bugs --enable-languages=c,ada,c++,go,brig,d,fortran,objc,obj-c++,gm2 --prefix=/usr --with-gcc-major-version-only --program-suffix=-9 --program-prefix=x86_64-linux-gnu- --enable-shared --enable-linker-build-id --libexecdir=/usr/lib --without-included-gettext --enable-threads=posix --libdir=/usr/lib --enable-nls --enable-clocale=gnu --enable-libstdcxx-debug --enable-libstdcxx-time=yes --with-default-libstdcxx-abi=new --enable-gnu-unique-object --disable-vtable-verify --enable-plugin --enable-default-pie --with-system-zlib --with-target-system-zlib=auto --enable-objc-gc=auto --enable-multiarch --disable-werror --with-arch-32=i686 --with-abi=m64 --with-multilib-list=m32,m64,mx32 --enable-multilib --with-tune=generic --enable-offload-targets=nvptx-none=/build/gcc-9-9QDOt0/gcc-9-9.4.0/debian/tmp-nvptx/usr,hsa --without-cuda-driver --enable-checking=release --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu
Thread model: posix
gcc version 9.4.0 (Ubuntu 9.4.0-1ubuntu1~20.04.2)
```

### Result

|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | V        | V    |
| Stack out-of-bounds  | X        | V    |
| Global out-of-bounds | X        | V    |
| Use-after-free       | V        | V    |
| Use-after-return     | X        | X    |

### Heap out-of-bounds

#### Source code

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *s = (char *)malloc(10);
    s[10] = 'A';
    putchar(s[10]);
    return 0;
}
```

#### Valgrind Report

```
==26268== Memcheck, a memory error detector
==26268== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==26268== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==26268== Command: ./a.out
==26268==
==26268== Invalid write of size 1
==26268==    at 0x10918B: main (in /home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out)
==26268==  Address 0x4a5304a is 0 bytes after a block of size 10 alloc'd
==26268==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==26268==    by 0x10917E: main (in /home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out)
==26268==
==26268== Invalid read of size 1
==26268==    at 0x109196: main (in /home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out)
==26268==  Address 0x4a5304a is 0 bytes after a block of size 10 alloc'd
==26268==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==26268==    by 0x10917E: main (in /home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out)
==26268==
A==26268==
==26268== HEAP SUMMARY:
==26268==     in use at exit: 10 bytes in 1 blocks
==26268==   total heap usage: 2 allocs, 1 frees, 1,034 bytes allocated
==26268==
==26268== LEAK SUMMARY:
==26268==    definitely lost: 10 bytes in 1 blocks
==26268==    indirectly lost: 0 bytes in 0 blocks
==26268==      possibly lost: 0 bytes in 0 blocks
==26268==    still reachable: 0 bytes in 0 blocks
==26268==         suppressed: 0 bytes in 0 blocks
==26268== Rerun with --leak-check=full to see details of leaked memory
==26268==
==26268== For lists of detected and suppressed errors, rerun with: -s
==26268== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```

### ASan Report

```
=================================================================
==26632==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000001a at pc 0x561a87aa923f bp 0x7ffe1e9cf9f0 sp 0x7ffe1e9cf9e0
WRITE of size 1 at 0x60200000001a thread T0
    #0 0x561a87aa923e in main (/home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out+0x123e)
    #1 0x7f54e8530082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x561a87aa912d in _start (/home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out+0x112d)

0x60200000001a is located 0 bytes to the right of 10-byte region [0x602000000010,0x60200000001a)
allocated by thread T0 here:
    #0 0x7f54e880b808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x561a87aa91fe in main (/home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out+0x11fe)
    #2 0x7f54e8530082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out+0x123e) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00[02]fa fa fa fa fa fa fa fa fa fa fa fa
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
==26632==ABORTING
```

### Stack out-of-bounds

#### Source code

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *s = "0123456789";
    s[11] = 'A';
    putchar(s[11]);
    return 0;
}
```

#### Valgrind Report

```
==27632== Memcheck, a memory error detector
==27632== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==27632== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==27632== Command: ./a.out
==27632==
==27632==
==27632== Process terminating with default action of signal 11 (SIGSEGV)
==27632==  Bad permissions for mapped region at address 0x10A00F
==27632==    at 0x109168: main (stack_oob.c:7)
==27632==
==27632== HEAP SUMMARY:
==27632==     in use at exit: 0 bytes in 0 blocks
==27632==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==27632==
==27632== All heap blocks were freed -- no leaks are possible
==27632==
==27632== For lists of detected and suppressed errors, rerun with: -s
==27632== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
[1]    27632 segmentation fault  valgrind ./a.out
```

### ASan Report

```
=================================================================
==27860==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55eeda5a902b at pc 0x55eeda5a825c bp 0x7ffcadb38d90 sp 0x7ffcadb38d80
WRITE of size 1 at 0x55eeda5a902b thread T0
    #0 0x55eeda5a825b in main code/stack_oob.c:7
    #1 0x7fc84aa27082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55eeda5a814d in _start (/home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out+0x114d)

0x55eeda5a902b is located 0 bytes to the right of global variable '*.LC0' defined in 'code/stack_oob.c' (0x55eeda5a9020) of size 11
  '*.LC0' is ascii string '0123456789'
SUMMARY: AddressSanitizer: global-buffer-overflow code/stack_oob.c:7 in main
Shadow bytes around the buggy address:
  0x0abe5b4ad1b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abe5b4ad1c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abe5b4ad1d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abe5b4ad1e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abe5b4ad1f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0abe5b4ad200: 00 00 00 00 00[03]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0abe5b4ad210: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abe5b4ad220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abe5b4ad230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abe5b4ad240: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abe5b4ad250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==27860==ABORTING
```

### Global out-of-bounds

#### Source code

```c
#include <stdio.h>
#include <stdlib.h>

char *s = "0123456789";

int main()
{
    s[11] = 'A';
    putchar(s[11]);
    return 0;
}
```

#### Valgrind Report

```
==28275== Memcheck, a memory error detector
==28275== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28275== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==28275== Command: ./a.out
==28275==
==28275==
==28275== Process terminating with default action of signal 11 (SIGSEGV)
==28275==  Bad permissions for mapped region at address 0x10A00F
==28275==    at 0x10915C: main (global_oob.c:8)
==28275==
==28275== HEAP SUMMARY:
==28275==     in use at exit: 0 bytes in 0 blocks
==28275==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==28275==
==28275== All heap blocks were freed -- no leaks are possible
==28275==
==28275== For lists of detected and suppressed errors, rerun with: -s
==28275== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
[1]    28275 segmentation fault  valgrind ./a.out
```

### ASan Report

```
=================================================================
==28554==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55ce74e1b02b at pc 0x55ce74e1a250 bp 0x7ffd66b094b0 sp 0x7ffd66b094a0
WRITE of size 1 at 0x55ce74e1b02b thread T0
    #0 0x55ce74e1a24f in main code/global_oob.c:8
    #1 0x7fc3d7a2f082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55ce74e1a14d in _start (/home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out+0x114d)

0x55ce74e1b02b is located 0 bytes to the right of global variable '*.LC0' defined in 'code/global_oob.c' (0x55ce74e1b020) of size 11
  '*.LC0' is ascii string '0123456789'
SUMMARY: AddressSanitizer: global-buffer-overflow code/global_oob.c:8 in main
Shadow bytes around the buggy address:
  0x0aba4e9bb5b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aba4e9bb5c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aba4e9bb5d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aba4e9bb5e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aba4e9bb5f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0aba4e9bb600: 00 00 00 00 00[03]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0aba4e9bb610: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aba4e9bb620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aba4e9bb630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aba4e9bb640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aba4e9bb650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==28554==ABORTING
```

### Use-after-free

#### Source code

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *s = (char *)malloc(10);
    free(s);
    s[11] = 'A';
    putchar(s[11]);
    return 0;
}
```

#### Valgrind Report

```
==28875== Memcheck, a memory error detector
==28875== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28875== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==28875== Command: ./a.out
==28875==
==28875== Invalid write of size 1
==28875==    at 0x1091B7: main (uaf.c:8)
==28875==  Address 0x4a5304b is 1 bytes after a block of size 10 free'd
==28875==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==28875==    by 0x1091AE: main (uaf.c:7)
==28875==  Block was alloc'd at
==28875==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==28875==    by 0x10919E: main (uaf.c:6)
==28875==
==28875== Invalid read of size 1
==28875==    at 0x1091C2: main (uaf.c:9)
==28875==  Address 0x4a5304b is 1 bytes after a block of size 10 free'd
==28875==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==28875==    by 0x1091AE: main (uaf.c:7)
==28875==  Block was alloc'd at
==28875==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==28875==    by 0x10919E: main (uaf.c:6)
==28875==
A==28875==
==28875== HEAP SUMMARY:
==28875==     in use at exit: 0 bytes in 0 blocks
==28875==   total heap usage: 2 allocs, 2 frees, 1,034 bytes allocated
==28875==
==28875== All heap blocks were freed -- no leaks are possible
==28875==
==28875== For lists of detected and suppressed errors, rerun with: -s
==28875== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```

### ASan Report

```
=================================================================
==29110==ERROR: AddressSanitizer: heap-use-after-free on address 0x60200000001b at pc 0x563484af626b bp 0x7ffef105bfb0 sp 0x7ffef105bfa0
WRITE of size 1 at 0x60200000001b thread T0
    #0 0x563484af626a in main code/uaf.c:8
    #1 0x7f6e730f6082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x563484af614d in _start (/home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out+0x114d)

0x60200000001b is located 1 bytes to the right of 10-byte region [0x602000000010,0x60200000001a)
freed by thread T0 here:
    #0 0x7f6e733d140f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x563484af622e in main code/uaf.c:7
    #2 0x7f6e730f6082 in __libc_start_main ../csu/libc-start.c:308

previously allocated by thread T0 here:
    #0 0x7f6e733d1808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x563484af621e in main code/uaf.c:6
    #2 0x7f6e730f6082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-use-after-free code/uaf.c:8 in main
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
==29110==ABORTING
```

### Use-after-return

#### Source code

```c
#include <stdio.h>
#include <stdlib.h>

int *foo()
{
    int buf[0x100];
    return &buf[0x50];
}

int main()
{
    int *f = foo();
    *f = 0xc8763;
    printf("%d\n", *f);
    return 0;
}
```

#### Valgrind Report

```
==29614== Memcheck, a memory error detector
==29614== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==29614== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==29614== Command: ./a.out
==29614==
==29614== Invalid write of size 4
==29614==    at 0x1091C0: main (uar.c:13)
==29614==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==29614==
==29614==
==29614== Process terminating with default action of signal 11 (SIGSEGV)
==29614==  Access not within mapped region at address 0x0
==29614==    at 0x1091C0: main (uar.c:13)
==29614==  If you believe this happened as a result of a stack
==29614==  overflow in your program's main thread (unlikely but
==29614==  possible), you can try to increase the size of the
==29614==  main thread stack using the --main-stacksize= flag.
==29614==  The main thread stack size used in this run was 8388608.
==29614==
==29614== HEAP SUMMARY:
==29614==     in use at exit: 0 bytes in 0 blocks
==29614==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==29614==
==29614== All heap blocks were freed -- no leaks are possible
==29614==
==29614== For lists of detected and suppressed errors, rerun with: -s
==29614== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
[1]    29614 segmentation fault  valgrind ./a.out
```

### ASan Report

```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==33199==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x5577e08e334c bp 0x7ffd05153f30 sp 0x7ffd05153f20 T0)
==33199==The signal is caused by a WRITE memory access.
==33199==Hint: address points to the zero page.
    #0 0x5577e08e334b in main code/uar.c:13
    #1 0x7f3b3b90a082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x5577e08e316d in _start (/home/bogay/workspace/nycu/112-spring-software-testing/lab5/a.out+0x116d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV code/uar.c:13 in main
==33199==ABORTING
```

## ASan Out-of-bound Write bypass Redzone

### Source code

```c
#include <stdio.h>

int main()
{
    char a[8] = {};
    char b[8] = {};

    a[8 + 24] = 'A';
    printf("%c %c\n", a[8 + 24], b[0]);

    return 0;
}
```

### Why

因為過程中沒有對 redzone 做讀寫，就不會觸發到 ASan 的檢查機制，程式仍然會正常執行。
