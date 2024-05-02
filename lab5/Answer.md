# Answer


Name: 游嘉鈞
ID: 311555030

## Version
### gcc
```

gcc -v
Using built-in specs.
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-linux-gnu/11/lto-wrapper
OFFLOAD_TARGET_NAMES=nvptx-none:amdgcn-amdhsa
OFFLOAD_TARGET_DEFAULT=1
Target: x86_64-linux-gnu
Configured with: ../src/configure -v --with-pkgversion='Ubuntu 11.4.0-1ubuntu1~22.04' --with-bugurl=file:///usr/share/doc/gcc-11/README.Bugs --enable-languages=c,ada,c++,go,brig,d,fortran,objc,obj-c++,m2 --prefix=/usr --with-gcc-major-version-only --program-suffix=-11 --program-prefix=x86_64-linux-gnu- --enable-shared --enable-linker-build-id --libexecdir=/usr/lib --without-included-gettext --enable-threads=posix --libdir=/usr/lib --enable-nls --enable-bootstrap --enable-clocale=gnu --enable-libstdcxx-debug --enable-libstdcxx-time=yes --with-default-libstdcxx-abi=new --enable-gnu-unique-object --disable-vtable-verify --enable-plugin --enable-default-pie --with-system-zlib --enable-libphobos-checking=release --with-target-system-zlib=auto --enable-objc-gc=auto --enable-multiarch --disable-werror --enable-cet --with-arch-32=i686 --with-abi=m64 --with-multilib-list=m32,m64,mx32 --enable-multilib --with-tune=generic --enable-offload-targets=nvptx-none=/build/gcc-11-XeT9lY/gcc-11-11.4.0/debian/tmp-nvptx/usr,amdgcn-amdhsa=/build/gcc-11-XeT9lY/gcc-11-11.4.0/debian/tmp-gcn/usr --without-cuda-driver --enable-checking=release --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu --with-build-config=bootstrap-lto-lean --enable-link-serialization=2
Thread model: posix
Supported LTO compression algorithms: zlib zstd
gcc version 11.4.0 (Ubuntu 11.4.0-1ubuntu1~22.04)
```

Name: 
ID: 


## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |

| Heap out-of-bounds   |   Yes      |    Yes  |
| Stack out-of-bounds  |   No      |    Yes   |
| Global out-of-bounds |   No      |    Yes   |
| Use-after-free       |   Yes       |   Yes   |
| Use-after-return     |   No       |   Yes   |

| Heap out-of-bounds   |          |      |
| Stack out-of-bounds  |          |      |
| Global out-of-bounds |          |      |
| Use-after-free       |          |      |
| Use-after-return     |          |      |


### Heap out-of-bounds
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
void main(void)
{
    int *a = (int *)malloc(sizeof(int)*100);
    a[0] = 0;
    int result = a[101];
    printf("Result is %d.", result);
}
```
#### Valgrind Report
```
==23478== Memcheck, a memory error detector
==23478== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==23478== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==23478== Command: ./test_valgrind
==23478== 
==23478== Invalid read of size 4
==23478==    at 0x1091B1: main (in /home/user/test_valgrind)
==23478==  Address 0x4a971d4 is 4 bytes after a block of size 400 alloc'd
==23478==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==23478==    by 0x10919E: main (in /home/user/test_valgrind)
==23478== 
Result is 0.==23478== 
==23478== HEAP SUMMARY:
==23478==     in use at exit: 0 bytes in 0 blocks
==23478==   total heap usage: 2 allocs, 2 frees, 1,424 bytes allocated
==23478== 
==23478== All heap blocks were freed -- no leaks are possible
==23478== 
==23478== For lists of detected and suppressed errors, rerun with: -s
==23478== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==22957==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x6140000001d4 at pc 0x56158c9c92b4 bp 0x7fffd7acec40 sp 0x7fffd7acec30
READ of size 4 at 0x6140000001d4 thread T0
    #0 0x56158c9c92b3 in main /home/user/test_valgrind.c:9
    #1 0x7ff23f229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ff23f229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56158c9c9164 in _start (/home/user/test_valgrind+0x1164)

0x6140000001d4 is located 4 bytes to the right of 400-byte region [0x614000000040,0x6140000001d0)
allocated by thread T0 here:
    #0 0x7ff23f6b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56158c9c923a in main /home/user/test_valgrind.c:7

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/user/test_valgrind.c:9 in main
Shadow bytes around the buggy address:
  0x0c287fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff8000: fa fa fa fa fa fa fa fa 00 00 00 00 00 00 00 00
  0x0c287fff8010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c287fff8020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c287fff8030: 00 00 00 00 00 00 00 00 00 00[fa]fa fa fa fa fa
  0x0c287fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8060: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8070: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c287fff8080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==22957==ABORTING
```
#### Result
```
ASan 能 , Valgrind 能


```
#### Valgrind Report
```

```
### ASan Report
```


```

### Stack out-of-bounds
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
void main(void)
{
    int a[3];
    int i;
    for(i=0; i<3; i++)
    {
        a[i] = i;
    }
    int result = a[3];
    printf("Result is %d.", result);
}
```
#### Valgrind Report
```
==24087== Memcheck, a memory error detector
==24087== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==24087== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==24087== Command: ./test_valgrind
==24087== 
Result is -1630458880.==24087== 
==24087== HEAP SUMMARY:
==24087==     in use at exit: 0 bytes in 0 blocks
==24087==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==24087== 
==24087== All heap blocks were freed -- no leaks are possible
==24087== 
==24087== For lists of detected and suppressed errors, rerun with: -s
==24087== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==24551==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd72d6552c at pc 0x55bb8ced436d bp 0x7ffd72d654f0 sp 0x7ffd72d654e0
READ of size 4 at 0x7ffd72d6552c thread T0
    #0 0x55bb8ced436c in main /home/user/test_valgrind.c:13
    #1 0x7f1c65229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f1c65229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55bb8ced4184 in _start (/home/user/test_valgrind+0x1184)

Address 0x7ffd72d6552c is located in stack of thread T0 at offset 44 in frame
    #0 0x55bb8ced4258 in main /home/user/test_valgrind.c:6

  This frame has 1 object(s):
    [32, 44) 'a' (line 7) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/user/test_valgrind.c:13 in main
Shadow bytes around the buggy address:
  0x10002e5a4a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e5a4a60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e5a4a70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e5a4a80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e5a4a90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10002e5a4aa0: f1 f1 f1 f1 00[04]f3 f3 00 00 00 00 00 00 00 00
  0x10002e5a4ab0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e5a4ac0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e5a4ad0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e5a4ae0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002e5a4af0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==24551==ABORTING
```
#### Result
```
ASan 能 , Valgrind 不能


```
#### Valgrind Report
```

```
### ASan Report
```


```

### Global out-of-bounds
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int a[3];
void main(void)
{
    int i;
    for(i=0; i<3; i++)
    {
        a[i] = i;
    }
    int result = a[3];
    printf("Result is %d.", result);
}
```
#### Valgrind Report
```
==25101== Memcheck, a memory error detector
==25101== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==25101== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==25101== Command: ./test_valgrind
==25101== 
Result is 0.==25101== 
==25101== HEAP SUMMARY:
==25101==     in use at exit: 0 bytes in 0 blocks
==25101==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==25101== 
==25101== All heap blocks were freed -- no leaks are possible
==25101== 
==25101== For lists of detected and suppressed errors, rerun with: -s
==25101== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==24897==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55d7bd42c0ec at pc 0x55d7bd4292ab bp 0x7ffd50bf5e40 sp 0x7ffd50bf5e30
READ of size 4 at 0x55d7bd42c0ec thread T0
    #0 0x55d7bd4292aa in main /home/user/test_valgrind.c:13
    #1 0x7f62e6029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f62e6029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55d7bd429144 in _start (/home/user/test_valgrind+0x1144)

0x55d7bd42c0ec is located 0 bytes to the right of global variable 'a' defined in 'test_valgrind.c:5:5' (0x55d7bd42c0e0) of size 12
SUMMARY: AddressSanitizer: global-buffer-overflow /home/user/test_valgrind.c:13 in main
Shadow bytes around the buggy address:
  0x0abb77a7d7c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abb77a7d7d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abb77a7d7e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abb77a7d7f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abb77a7d800: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0abb77a7d810: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00[04]f9 f9
  0x0abb77a7d820: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abb77a7d830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abb77a7d840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abb77a7d850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abb77a7d860: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==24897==ABORTING
```
#### Result
```
ASan 能 , Valgrind 不能


```
#### Valgrind Report
```

```
### ASan Report
```

```

### Use-after-free
#### Source code
```

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void main(void)
{
    int *a = (int *) malloc(sizeof(int)*3);
    int i;
    for(i=0; i<3; i++)
    {
        a[i] = i;
    }
    free(a);
    int result = a[2];
    printf("Result is %d.", result);
}
```
#### Valgrind Report
```
==25399== Memcheck, a memory error detector
==25399== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==25399== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==25399== Command: ./test_valgrind
==25399== 
==25399== Invalid read of size 4
==25399==    at 0x1091DF: main (in /home/user/test_valgrind)
==25399==  Address 0x4a97048 is 8 bytes inside a block of size 12 free'd
==25399==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==25399==    by 0x1091DA: main (in /home/user/test_valgrind)
==25399==  Block was alloc'd at
==25399==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==25399==    by 0x10919E: main (in /home/user/test_valgrind)
==25399== 
Result is 2.==25399== 
==25399== HEAP SUMMARY:
==25399==     in use at exit: 0 bytes in 0 blocks
==25399==   total heap usage: 2 allocs, 2 frees, 1,036 bytes allocated
==25399== 
==25399== All heap blocks were freed -- no leaks are possible
==25399== 
==25399== For lists of detected and suppressed errors, rerun with: -s
==25399== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==25523==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000018 at pc 0x56258721f2e2 bp 0x7ffd4074c0b0 sp 0x7ffd4074c0a0
READ of size 4 at 0x602000000018 thread T0
    #0 0x56258721f2e1 in main /home/user/test_valgrind.c:14
    #1 0x7fd049829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd049829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56258721f184 in _start (/home/user/test_valgrind+0x1184)

0x602000000018 is located 8 bytes inside of 12-byte region [0x602000000010,0x60200000001c)
freed by thread T0 here:
    #0 0x7fd049cb4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x56258721f29e in main /home/user/test_valgrind.c:13

previously allocated by thread T0 here:
    #0 0x7fd049cb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56258721f257 in main /home/user/test_valgrind.c:7

SUMMARY: AddressSanitizer: heap-use-after-free /home/user/test_valgrind.c:14 in main
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
==25523==ABORTING
```
#### Result
```
ASan 能 , Valgrind 能


```
#### Valgrind Report
```

```
### ASan Report
```


```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int *b;
void calculate()
{   
    int a[10];
    b = &a[0];
}

void main(void)
{
    calculate();
    *b = 10;
}
```
#### Valgrind Report
```
==26796== Memcheck, a memory error detector
==26796== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==26796== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==26796== Command: ./test_valgrind
==26796== 
==26796== 
==26796== HEAP SUMMARY:
==26796==     in use at exit: 0 bytes in 0 blocks
==26796==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==26796== 
==26796== All heap blocks were freed -- no leaks are possible
==26796== 
==26796== For lists of detected and suppressed errors, rerun with: -s
==26796== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==44486==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f6437cae030 at pc 0x56330169235b bp 0x7ffc7bcad570 sp 0x7ffc7bcad560
WRITE of size 4 at 0x7f6437cae030 thread T0
    #0 0x56330169235a in main /home/user/test_valgrind.c:15
    #1 0x7f643b229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f643b229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x563301692144 in _start (/home/user/test_valgrind+0x1144)

Address 0x7f6437cae030 is located in stack of thread T0 at offset 48 in frame
    #0 0x563301692218 in calculate /home/user/test_valgrind.c:7

  This frame has 1 object(s):
    [48, 88) 'a' (line 8) <== Memory access at offset 48 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/user/test_valgrind.c:15 in main
Shadow bytes around the buggy address:
  0x0fed06f8dbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fed06f8dbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fed06f8dbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fed06f8dbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fed06f8dbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fed06f8dc00: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0fed06f8dc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fed06f8dc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fed06f8dc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fed06f8dc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fed06f8dc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==44486==ABORTING
```
#### Result
```
ASan 能 , Valgrind 不能


```
#### Valgrind Report
```

```
### ASan Report
```


```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void main(void)
{
    int a[8];
    int b[8];
    b[0] = 5;
    printf("Before changing, b[0]'s value is %d.\n",b[0]);
    a[b-a] = 10;
    printf("After changing, b[0]'s value is %d.\n",b[0]);
}
```
### Why
```
程式執行結果為:
Before changing, b[0]'s value is 5.
After changing, b[0]'s value is 10.
從執行結果可得知，在A的陣列做Out-of-bound Write是成功的。
由於b[0]的位址不是在redzone中，且a[b-a]的位址剛好為b[0]的位址，所以在a[b-a]做寫入新的data時，ASan並不會察覺。
```


```
### Why


