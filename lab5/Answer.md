# Answer

Name: 許庭涵
ID: 312555008

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
### Valgrind
```
valgrind --version
valgrind-3.18.1
```


## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    Yes   |   Yes   |
| Stack out-of-bounds  |    No    |   Yes   |
| Global out-of-bounds |    No    |   Yes   |
| Use-after-free       |    Yes   |   Yes   |
| Use-after-return     |    No    |   Yes   |

### Heap out-of-bounds
#### Source code
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(){
    int *ptr = malloc(3 * sizeof(int)); 
    ptr[3] = 10; 
    printf("%d\n",ptr[3]);
    return 0;
}
```
#### Valgrind Report
```
==3827== Memcheck, a memory error detector
==3827== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3827== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3827== Command: ./heap
==3827==
==3827== Invalid write of size 4
==3827==    at 0x10918B: main (heap_out_of_bounds.c:6)
==3827==  Address 0x4a8e04c is 0 bytes after a block of size 12 alloc'd
==3827==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3827==    by 0x10917E: main (heap_out_of_bounds.c:5)
==3827==
==3827== Invalid read of size 4
==3827==    at 0x109199: main (heap_out_of_bounds.c:7)
==3827==  Address 0x4a8e04c is 0 bytes after a block of size 12 alloc'd
==3827==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==3827==    by 0x10917E: main (heap_out_of_bounds.c:5)
==3827==
10
==3827== 
==3827== HEAP SUMMARY:
==3827==     in use at exit: 12 bytes in 1 blocks
==3827==   total heap usage: 2 allocs, 1 frees, 1,036 bytes allocated
==3827==
==3827== LEAK SUMMARY:
==3827==    definitely lost: 12 bytes in 1 blocks
==3827==    indirectly lost: 0 bytes in 0 blocks
==3827==      possibly lost: 0 bytes in 0 blocks
==3827==    still reachable: 0 bytes in 0 blocks
==3827==         suppressed: 0 bytes in 0 blocks
==3827== Rerun with --leak-check=full to see details of leaked memory
==3827==
==3827== For lists of detected and suppressed errors, rerun with: -s
==3827== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==26828==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60200000001c at pc 0x56271f5fb282 bp 0x7fffcac8f100 sp 0x7fffcac8f0f0
WRITE of size 4 at 0x60200000001c thread T0
    #0 0x56271f5fb281 in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/heap_out_of_bounds.c:6
    #1 0x7f1ae17e2d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f1ae17e2e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56271f5fb164 in _start (/mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/heap_a+0x1164)

0x60200000001c is located 0 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x7f1ae1a96887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56271f5fb23e in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/heap_out_of_bounds.c:5
    #2 0x7f1ae17e2d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/heap_out_of_bounds.c:6 in main
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
==26828==ABORTING
```
#### Result
```
ASan 能 , valgrind 能
```

### Stack out-of-bounds
#### Source code
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(){
    int ptr[3] = {1,2,3};

    printf("ptr[3] = %d\n",ptr[3]);
    return 0;
}
```
#### Valgrind Report
```
==8182== Memcheck, a memory error detector
==8182== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8182== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==8182== Command: ./stack
==8182==
ptr[3] = 1952034816
==8182== 
==8182== HEAP SUMMARY:
==8182==     in use at exit: 0 bytes in 0 blocks
==8182==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==8182==
==8182== All heap blocks were freed -- no leaks are possible
==8182==
==8182== For lists of detected and suppressed errors, rerun with: -s
==8182== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==27081==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc5f9bdd3c at pc 0x55bc201983c0 bp 0x7ffc5f9bdd00 sp 0x7ffc5f9bdcf0
READ of size 4 at 0x7ffc5f9bdd3c thread T0
    #0 0x55bc201983bf in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/stack_out_of_bounds.c:7
    #1 0x7f016ddaed8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f016ddaee3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55bc20198184 in _start (/mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/stack_a+0x1184)

Address 0x7ffc5f9bdd3c is located in stack of thread T0 at offset 44 in frame
    #0 0x55bc20198258 in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/stack_out_of_bounds.c:4

  This frame has 1 object(s):
    [32, 44) 'ptr' (line 5) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/stack_out_of_bounds.c:7 in main
Shadow bytes around the buggy address:
  0x10000bf2fb50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000bf2fb60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000bf2fb70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000bf2fb80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000bf2fb90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10000bf2fba0: 00 00 f1 f1 f1 f1 00[04]f3 f3 00 00 00 00 00 00
  0x10000bf2fbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000bf2fbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000bf2fbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000bf2fbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10000bf2fbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==27081==ABORTING
```
#### Result
```
ASan 能 , valgrind 不能
```

### Global out-of-bounds
#### Source code
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int ptr[3] = {1,2,3};
int main(){

    printf("ptr[3] = %d\n",ptr[3]);
    return 0;
}

```
#### Valgrind Report
```
==9613== Memcheck, a memory error detector
==9613== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9613== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==9613== Command: ./global
==9613==
ptr[3] = 0
==9613== 
==9613== HEAP SUMMARY:
==9613==     in use at exit: 0 bytes in 0 blocks
==9613==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==9613==
==9613== All heap blocks were freed -- no leaks are possible
==9613==
==9613== For lists of detected and suppressed errors, rerun with: -s
==9613== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==27595==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55617754b02c at pc 0x55617754822b bp 0x7ffc3851f2e0 sp 0x7ffc3851f2d0
READ of size 4 at 0x55617754b02c thread T0
    #0 0x55617754822a in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/global_out_of_bounds.c:6
    #1 0x7fef18b63d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fef18b63e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x556177548124 in _start (/mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/global_a+0x1124)

0x55617754b02c is located 0 bytes to the right of global variable 'ptr' defined in 'global_out_of_bounds.c:4:5' (0x55617754b020) of size 12
SUMMARY: AddressSanitizer: global-buffer-overflow /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/global_out_of_bounds.c:6 in main
Shadow bytes around the buggy address:
  0x0aacaeea15b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacaeea15c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacaeea15d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacaeea15e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacaeea15f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0aacaeea1600: 00 00 00 00 00[04]f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0aacaeea1610: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0aacaeea1620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacaeea1630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacaeea1640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacaeea1650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==27595==ABORTING
```
#### Result
```
ASan 能 , valgrind 不能
```

### Use-after-free
#### Source code
```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(){
    char *ptr = malloc(sizeof(char));
    *ptr = 'A';
    free(ptr);
    printf("%c\n",ptr[0]);
    return 0;
}
```
#### Valgrind Report
```
==19987== Memcheck, a memory error detector
==19987== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==19987== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==19987== Command: ./free
==19987==
==19987== Invalid read of size 1
==19987==    at 0x1091BA: main (use_after_free.c:8)
==19987==  Address 0x4a8e040 is 0 bytes inside a block of size 1 free'd
==19987==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==19987==    by 0x1091B5: main (use_after_free.c:7)
==19987==  Block was alloc'd at
==19987==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==19987==    by 0x10919E: main (use_after_free.c:5)
==19987==
A
==19987== 
==19987== HEAP SUMMARY:
==19987==     in use at exit: 0 bytes in 0 blocks
==19987==   total heap usage: 2 allocs, 2 frees, 1,025 bytes allocated
==19987==
==19987== All heap blocks were freed -- no leaks are possible
==19987==
==19987== For lists of detected and suppressed errors, rerun with: -s
==19987== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==27377==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5598303142de bp 0x7ffeda82f850 sp 0x7ffeda82f840
READ of size 1 at 0x602000000010 thread T0
    #0 0x5598303142dd in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/use_after_free.c:8
    #1 0x7fd3c5d00d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd3c5d00e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x559830314184 in _start (/mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/free_a+0x1184)

0x602000000010 is located 0 bytes inside of 1-byte region [0x602000000010,0x602000000011)
freed by thread T0 here:
    #0 0x7fd3c5fb4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5598303142a9 in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/use_after_free.c:7
    #2 0x7fd3c5d00d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7fd3c5fb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55983031425e in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/use_after_free.c:5
    #2 0x7fd3c5d00d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/use_after_free.c:8 in main
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
==27377==ABORTING
```
#### Result
```
ASan 能 , valgrind 能
```

### Use-after-return
#### Source code
```C
// need to run the test with ASAN_OPTIONS=detect_stack_use_after_return=1
// ASAN_OPTIONS=detect_stack_use_after_return=1 ./a.out
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char* ptr;

void foo() {
    char arr[10];
    ptr = &arr[0];
}

int main() {
    foo();
    *ptr = 1;
    return 0;
}
```
#### Valgrind Report
```
==34444== Memcheck, a memory error detector
==34444== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==34444== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==34444== Command: ./return
==34444==
==34444== 
==34444== HEAP SUMMARY:
==34444==     in use at exit: 0 bytes in 0 blocks
==34444==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==34444==
==34444== All heap blocks were freed -- no leaks are possible
==34444==
==34444== For lists of detected and suppressed errors, rerun with: -s
==34444== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==34223==ERROR: AddressSanitizer: stack-use-after-return on address 0x7fb52f76c020 at pc 0x55de5475e32f bp 0x7ffec18f3ec0 sp 0x7ffec18f3eb0
WRITE of size 1 at 0x7fb52f76c020 thread T0
    #0 0x55de5475e32e in main /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/use_after_return.c:13
    #1 0x7fb532f09d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb532f09e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55de5475e144 in _start (/mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/return_a+0x1144)

Address 0x7fb52f76c020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55de5475e218 in foo /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/use_after_return.c:6

  This frame has 1 object(s):
    [32, 42) 'arr' (line 7) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /mnt/d/nycu_1/softwareprogramming/112-spring-software-testing-lab5/112-spring-software-testing-lab5/lab5/use_after_return.c:13 in main
Shadow bytes around the buggy address:
  0x0ff725ee57b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff725ee57c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff725ee57d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff725ee57e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff725ee57f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ff725ee5800: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0ff725ee5810: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff725ee5820: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff725ee5830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff725ee5840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff725ee5850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==34223==ABORTING

```
### Result
```
ASan 能 , valgrind 不能
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```C
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    int a[8];
    int b[8];
    printf("b[0] before : %d\n",b[0]);
    a[b-a] = 1;
    printf("b[0] after : %d\n",b[0]);
    return 0;
}
```
### Why
經過測試之後發現a和b中間redzone的大小就是a-b，因此a[b-a]就是b起始的位置(b[0])。
執行後得到b[0]在a[b-a]賦值之前為亂數，經過a[b-a] = 1後b[0]也是1。
```
b[0] before : 1657625520
b[0] after  : 1
```
也因為a[b-a]不在redzone裡面，因此ASAN抓不到。
