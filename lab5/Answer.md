# Answer

Name: 陳翰泓
ID: 312551178

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     Y    |   Y  |
| Stack out-of-bounds  |     N    |   Y  |
| Global out-of-bounds |     N    |   Y  |
| Use-after-free       |     Y    |   Y  |
| Use-after-return     |     Y    |   Y  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
int main(){
    int *s = (int *)malloc(sizeof(int) * 16);
    s[15] = 1234;
    printf("String at s[15]: %d\n", s[15]);
    s[16] = 12;
    printf("String at s[16]: %d\n", s[16]);
    s[17] = 22;
    free(s);
    return 0;
}
```
#### Valgrind Report
```
==88987== Memcheck, a memory error detector
==88987== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==88987== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==88987== Command: ./heapOutOfBounds
==88987== 
String at s[15]: 1234
==88987== Invalid write of size 4
==88987==    at 0x1091D6: main (in /home/chh/112-spring-software-testing/lab5/heapOutOfBounds)
==88987==  Address 0x4a48080 is 0 bytes after a block of size 64 alloc'd
==88987==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==88987==    by 0x10919E: main (in /home/chh/112-spring-software-testing/lab5/heapOutOfBounds)
==88987== 
==88987== Invalid read of size 4
==88987==    at 0x1091E4: main (in /home/chh/112-spring-software-testing/lab5/heapOutOfBounds)
==88987==  Address 0x4a48080 is 0 bytes after a block of size 64 alloc'd
==88987==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==88987==    by 0x10919E: main (in /home/chh/112-spring-software-testing/lab5/heapOutOfBounds)
==88987== 
String at s[16]: 12
==88987== Invalid write of size 4
==88987==    at 0x109201: main (in /home/chh/112-spring-software-testing/lab5/heapOutOfBounds)
==88987==  Address 0x4a48084 is 4 bytes after a block of size 64 alloc'd
==88987==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==88987==    by 0x10919E: main (in /home/chh/112-spring-software-testing/lab5/heapOutOfBounds)
==88987== 
==88987== 
==88987== HEAP SUMMARY:
==88987==     in use at exit: 0 bytes in 0 blocks
==88987==   total heap usage: 2 allocs, 2 frees, 1,088 bytes allocated
==88987== 
==88987== All heap blocks were freed -- no leaks are possible
==88987== 
==88987== For lists of detected and suppressed errors, rerun with: -s
==88987== ERROR SUMMARY: 3 errors from 3 contexts (suppressed: 0 from 0)
```
### ASan Report
```
String at s[15]: 1234
=================================================================
==89173==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x606000000060 at pc 0x56407b47933b bp 0x7ffdd32606e0 sp 0x7ffdd32606d0
WRITE of size 4 at 0x606000000060 thread T0
    #0 0x56407b47933a in main (/home/chh/112-spring-software-testing/lab5/heapOutOfBounds_san+0x133a)
    #1 0x7ff03b1cb082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x56407b47918d in _start (/home/chh/112-spring-software-testing/lab5/heapOutOfBounds_san+0x118d)

0x606000000060 is located 0 bytes to the right of 64-byte region [0x606000000020,0x606000000060)
allocated by thread T0 here:
    #0 0x7ff03b4a6808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x56407b47925e in main (/home/chh/112-spring-software-testing/lab5/heapOutOfBounds_san+0x125e)
    #2 0x7ff03b1cb082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/chh/112-spring-software-testing/lab5/heapOutOfBounds_san+0x133a) in main
Shadow bytes around the buggy address:
  0x0c0c7fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c0c7fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c0c7fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c0c7fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c0c7fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c0c7fff8000: fa fa fa fa 00 00 00 00 00 00 00 00[fa]fa fa fa
  0x0c0c7fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c0c7fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c0c7fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c0c7fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c0c7fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==89173==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
int main(){
    int s[5] = {1, 2, 3, 4, 5};
    int value = s[6];
    return 0;
}
```
#### Valgrind Report
```
==5710== Memcheck, a memory error detector
==5710== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5710== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==5710== Command: ./stackOutOfBounds
==5710== 
==5710== 
==5710== HEAP SUMMARY:
==5710==     in use at exit: 0 bytes in 0 blocks
==5710==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==5710== 
==5710== All heap blocks were freed -- no leaks are possible
==5710== 
==5710== For lists of detected and suppressed errors, rerun with: -s
==5710== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==5423==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffcaf4373b8 at pc 0x55dd7287c3f1 bp 0x7ffcaf437360 sp 0x7ffcaf437350
READ of size 4 at 0x7ffcaf4373b8 thread T0
    #0 0x55dd7287c3f0 in main (/home/chh/112-spring-software-testing/lab5/stackOutOfBounds_san+0x13f0)
    #1 0x7f5ac1e90082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55dd7287c12d in _start (/home/chh/112-spring-software-testing/lab5/stackOutOfBounds_san+0x112d)

Address 0x7ffcaf4373b8 is located in stack of thread T0 at offset 56 in frame
    #0 0x55dd7287c1f8 in main (/home/chh/112-spring-software-testing/lab5/stackOutOfBounds_san+0x11f8)

  This frame has 1 object(s):
    [32, 52) 's' (line 4) <== Memory access at offset 56 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/chh/112-spring-software-testing/lab5/stackOutOfBounds_san+0x13f0) in main
Shadow bytes around the buggy address:
  0x100015e7ee20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100015e7ee30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100015e7ee40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100015e7ee50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100015e7ee60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100015e7ee70: f1 f1 f1 f1 00 00 04[f3]f3 f3 f3 f3 00 00 00 00
  0x100015e7ee80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100015e7ee90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100015e7eea0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100015e7eeb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100015e7eec0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==5423==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
int s[5] = {1, 2, 3, 4, 5};
int main(){
    int value = s[6];

    return 0;
}
```
#### Valgrind Report
```
==24517== Memcheck, a memory error detector
==24517== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==24517== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==24517== Command: ./globalOutOfBounds
==24517== 
==24517== 
==24517== HEAP SUMMARY:
==24517==     in use at exit: 0 bytes in 0 blocks
==24517==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==24517== 
==24517== All heap blocks were freed -- no leaks are possible
==24517== 
==24517== For lists of detected and suppressed errors, rerun with: -s
==24517== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==23689==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55c4fa6b2038 at pc 0x55c4fa6af207 bp 0x7fff8b3799a0 sp 0x7fff8b379990
READ of size 4 at 0x55c4fa6b2038 thread T0
    #0 0x55c4fa6af206 in main (/home/chh/112-spring-software-testing/lab5/globalOutOfBounds_san+0x1206)
    #1 0x7fae2e9ee082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55c4fa6af10d in _start (/home/chh/112-spring-software-testing/lab5/globalOutOfBounds_san+0x110d)

0x55c4fa6b2038 is located 4 bytes to the right of global variable 's' defined in 'globalOutOfBounds.c:3:5' (0x55c4fa6b2020) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/chh/112-spring-software-testing/lab5/globalOutOfBounds_san+0x1206) in main
Shadow bytes around the buggy address:
  0x0ab91f4ce3b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab91f4ce3c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab91f4ce3d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab91f4ce3e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab91f4ce3f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ab91f4ce400: 00 00 00 00 00 00 04[f9]f9 f9 f9 f9 00 00 00 00
  0x0ab91f4ce410: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x0ab91f4ce420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab91f4ce430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab91f4ce440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab91f4ce450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==23689==ABORTING
```

### Use-after-free
#### Source code
```

```
#### Valgrind Report
```
==25188== Memcheck, a memory error detector
==25188== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==25188== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==25188== Command: ./usedAfterFree
==25188== 
==25188== Invalid read of size 4
==25188==    at 0x1091C5: main (in /home/chh/112-spring-software-testing/lab5/usedAfterFree)
==25188==  Address 0x4a4807c is 60 bytes inside a block of size 64 free'd
==25188==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==25188==    by 0x1091BC: main (in /home/chh/112-spring-software-testing/lab5/usedAfterFree)
==25188==  Block was alloc'd at
==25188==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==25188==    by 0x10919E: main (in /home/chh/112-spring-software-testing/lab5/usedAfterFree)
==25188== 
String at s[15]: 1234
==25188== 
==25188== HEAP SUMMARY:
==25188==     in use at exit: 0 bytes in 0 blocks
==25188==   total heap usage: 2 allocs, 2 frees, 1,088 bytes allocated
==25188== 
==25188== All heap blocks were freed -- no leaks are possible
==25188== 
==25188== For lists of detected and suppressed errors, rerun with: -s
==25188== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==25627==ERROR: AddressSanitizer: heap-use-after-free on address 0x60600000005c at pc 0x56391011b2f3 bp 0x7fff12588de0 sp 0x7fff12588dd0
READ of size 4 at 0x60600000005c thread T0
    #0 0x56391011b2f2 in main (/home/chh/112-spring-software-testing/lab5/usedAfterFree+0x12f2)
    #1 0x7f6f0be34082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x56391011b18d in _start (/home/chh/112-spring-software-testing/lab5/usedAfterFree+0x118d)

0x60600000005c is located 60 bytes inside of 64-byte region [0x606000000020,0x606000000060)
freed by thread T0 here:
    #0 0x7f6f0c10f40f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x56391011b2b3 in main (/home/chh/112-spring-software-testing/lab5/usedAfterFree+0x12b3)
    #2 0x7f6f0be34082 in __libc_start_main ../csu/libc-start.c:308

previously allocated by thread T0 here:
    #0 0x7f6f0c10f808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x56391011b25e in main (/home/chh/112-spring-software-testing/lab5/usedAfterFree+0x125e)
    #2 0x7f6f0be34082 in __libc_start_main ../csu/libc-start.c:308

SUMMARY: AddressSanitizer: heap-use-after-free (/home/chh/112-spring-software-testing/lab5/usedAfterFree+0x12f2) in main
Shadow bytes around the buggy address:
  0x0c0c7fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c0c7fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c0c7fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c0c7fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c0c7fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c0c7fff8000: fa fa fa fa fd fd fd fd fd fd fd[fd]fa fa fa fa
  0x0c0c7fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c0c7fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c0c7fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c0c7fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c0c7fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==25627==ABORTING
```

### Use-after-return
#### Source code

```
//if run stack
//export ASAN_OPTIONS=detect_stack_use_after_return=1
//if run heap
//export ASAN_OPTIONS=detect_heap_use_after_return=1
#include <stdio.h>
#include <stdlib.h>
int* res;
void foo(){
    int a = 3;
    res = &a;
    return;
}
int main(){
    foo();
    printf("res: %d\n", *res);
    return 0;
}
```
#### Valgrind Report
```
==36639== Memcheck, a memory error detector
==36639== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==36639== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==36639== Command: ./useAfterReturn
==36639== 
==36639== Conditional jump or move depends on uninitialised value(s)
==36639==    at 0x48CA958: __vfprintf_internal (vfprintf-internal.c:1687)
==36639==    by 0x48B4D3E: printf (printf.c:33)
==36639==    by 0x1091DA: main (in /home/chh/112-spring-software-testing/lab5/useAfterReturn)
==36639== 
==36639== Use of uninitialised value of size 8
==36639==    at 0x48AE69B: _itoa_word (_itoa.c:179)
==36639==    by 0x48CA574: __vfprintf_internal (vfprintf-internal.c:1687)
==36639==    by 0x48B4D3E: printf (printf.c:33)
==36639==    by 0x1091DA: main (in /home/chh/112-spring-software-testing/lab5/useAfterReturn)
==36639== 
==36639== Conditional jump or move depends on uninitialised value(s)
==36639==    at 0x48AE6AD: _itoa_word (_itoa.c:179)
==36639==    by 0x48CA574: __vfprintf_internal (vfprintf-internal.c:1687)
==36639==    by 0x48B4D3E: printf (printf.c:33)
==36639==    by 0x1091DA: main (in /home/chh/112-spring-software-testing/lab5/useAfterReturn)
==36639== 
==36639== Conditional jump or move depends on uninitialised value(s)
==36639==    at 0x48CB228: __vfprintf_internal (vfprintf-internal.c:1687)
==36639==    by 0x48B4D3E: printf (printf.c:33)
==36639==    by 0x1091DA: main (in /home/chh/112-spring-software-testing/lab5/useAfterReturn)
==36639== 
==36639== Conditional jump or move depends on uninitialised value(s)
==36639==    at 0x48CA6EE: __vfprintf_internal (vfprintf-internal.c:1687)
==36639==    by 0x48B4D3E: printf (printf.c:33)
==36639==    by 0x1091DA: main (in /home/chh/112-spring-software-testing/lab5/useAfterReturn)
==36639== 
res: 3
==36639== 
==36639== HEAP SUMMARY:
==36639==     in use at exit: 0 bytes in 0 blocks
==36639==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==36639== 
==36639== All heap blocks were freed -- no leaks are possible
==36639== 
==36639== Use --track-origins=yes to see where uninitialised values come from
==36639== For lists of detected and suppressed errors, rerun with: -s
==36639== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==36373==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f052411a020 at pc 0x559f6946c3ab bp 0x7ffe9c05c5d0 sp 0x7ffe9c05c5c0
READ of size 4 at 0x7f052411a020 thread T0
    #0 0x559f6946c3aa in main (/home/chh/112-spring-software-testing/lab5/useAfterReturn+0x13aa)
    #1 0x7f052794a082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x559f6946c18d in _start (/home/chh/112-spring-software-testing/lab5/useAfterReturn+0x118d)

Address 0x7f052411a020 is located in stack of thread T0 at offset 32 in frame
    #0 0x559f6946c258 in foo (/home/chh/112-spring-software-testing/lab5/useAfterReturn+0x1258)

  This frame has 1 object(s):
    [32, 36) 'a' (line 5) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (/home/chh/112-spring-software-testing/lab5/useAfterReturn+0x13aa) in main
Shadow bytes around the buggy address:
  0x0fe12481b3b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe12481b3c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe12481b3d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe12481b3e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe12481b3f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fe12481b400: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0fe12481b410: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe12481b420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe12481b430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe12481b440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe12481b450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==36373==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>
int main(){
    int a[8] = {1, 2, 3, 4, 5, 6, 7, 8};
    int b[8] = {9, 10, 11, 12, 13, 14, 15, 16};
    printf("a[16] = %d\n", a[16]);
    return 0;
}
```
### Why
因為red zone會在int[8]的前後，且1個shadowbyte表 8個application bytes，所以從第一個int[8]結束向後數8個位置都會是red zone涵蓋範圍，此時取第a[16]就會到第二個陣列的第一個位置(index = 0)所以會印出來9，也因為沒有碰到red zone而不會報出錯誤訊息
