# Answer

Name: yi-wei chen
ID: 312552043

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   yes    |  yes |
| Stack out-of-bounds  |   no     |  yes |
| Global out-of-bounds |    no    |  yes |
| Use-after-free       |    yes   | yes  |
| Use-after-return     |   yes    | yes  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
    char * s = malloc(sizeof(char) * 4);
    s[5] = 'a';
    printf("%c\n", s[5]);
    free(s);
    return 0;
}
```
#### Valgrind Report
```
==691593== Memcheck, a memory error detector
==691593== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==691593== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==691593== Command: ./test_val
==691593== 
==691593== Invalid write of size 1
==691593==    at 0x109177: main (in /net/gcs/112/312552043/test_val)
==691593==  Address 0x4a43045 is 1 bytes after a block of size 4 alloc'd
==691593==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==691593==    by 0x10916A: main (in /net/gcs/112/312552043/test_val)
==691593== 
==691593== Invalid read of size 1
==691593==    at 0x109182: main (in /net/gcs/112/312552043/test_val)
==691593==  Address 0x4a43045 is 1 bytes after a block of size 4 alloc'd
==691593==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==691593==    by 0x10916A: main (in /net/gcs/112/312552043/test_val)
==691593== 
a
==691593== 
==691593== HEAP SUMMARY:
==691593==     in use at exit: 0 bytes in 0 blocks
==691593==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==691593== 
==691593== All heap blocks were freed -- no leaks are possible
==691593== 
==691593== For lists of detected and suppressed errors, rerun with: -s
==691593== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==38842==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x000103000715 at pc 0x000100533ca4 bp 0x00016f8cf520 sp 0x00016f8cf518
WRITE of size 1 at 0x000103000715 thread T0
    #0 0x100533ca0 in main test_val.c:7
    #1 0x1a3a6bf24  (<unknown module>)

0x000103000715 is located 1 bytes after 4-byte region [0x000103000710,0x000103000714)
allocated by thread T0 here:
    #0 0x1009deba4 in wrap_malloc+0x94 (libclang_rt.asan_osx_dynamic.dylib:arm64e+0x52ba4)
    #1 0x100533c44 in main test_val.c:6
    #2 0x1a3a6bf24  (<unknown module>)

SUMMARY: AddressSanitizer: heap-buffer-overflow test_val.c:7 in main
Shadow bytes around the buggy address:
  0x000103000480: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000103000500: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000103000580: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000103000600: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000103000680: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
=>0x000103000700: fa fa[04]fa fa fa 00 00 fa fa 00 04 fa fa 00 05
  0x000103000780: fa fa 00 00 fa fa fd fd fa fa fa fa fa fa fa fa
  0x000103000800: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000103000880: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000103000900: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000103000980: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==38842==ABORTING
zsh: abort      ./heap_test

```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
    char s[5];
    for(int i = 0; i < 5;i++){
        s[i] = 0;
    }
    printf("%c\n", s[5]);
    return 0;
}
```
#### Valgrind Report
```
==692366== Memcheck, a memory error detector
==692366== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==692366== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==692366== Command: ./test_val
==692366== 

==692366== 
==692366== HEAP SUMMARY:
==692366==     in use at exit: 0 bytes in 0 blocks
==692366==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==692366== 
==692366== All heap blocks were freed -- no leaks are possible
==692366== 
==692366== For lists of detected and suppressed errors, rerun with: -s
==692366== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==47489==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x00016f44b4a5 at pc 0x0001009b7c50 bp 0x00016f44b470 sp 0x00016f44b468
READ of size 1 at 0x00016f44b4a5 thread T0
    #0 0x1009b7c4c in main test_val.c:10
    #1 0x1a3a6bf24  (<unknown module>)

Address 0x00016f44b4a5 is located in stack of thread T0 at offset 37 in frame
    #0 0x1009b7a48 in main test_val.c:5

  This frame has 1 object(s):
    [32, 37) 's' (line 6) <== Memory access at offset 37 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow test_val.c:10 in main
Shadow bytes around the buggy address:
  0x00016f44b200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00016f44b280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00016f44b300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00016f44b380: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00016f44b400: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x00016f44b480: f1 f1 f1 f1[05]f3 f3 f3 00 00 00 00 00 00 00 00
  0x00016f44b500: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00016f44b580: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00016f44b600: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00016f44b680: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x00016f44b700: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==47489==ABORTING
zsh: abort      ./stack_test

```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char s[5];
int main(){
    for(int i = 0; i < 5;i++){
        s[i] = i + 1;
    }
    printf("%c\n", s[5]);
    return 0;
}
```
#### Valgrind Report
```
==692857== Memcheck, a memory error detector
==692857== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==692857== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==692857== Command: ./test_val
==692857== 

==692857== 
==692857== HEAP SUMMARY:
==692857==     in use at exit: 0 bytes in 0 blocks
==692857==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==692857== 
==692857== All heap blocks were freed -- no leaks are possible
==692857== 
==692857== For lists of detected and suppressed errors, rerun with: -s
==692857== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==187==ERROR: AddressSanitizer: global-buffer-overflow on address 0x555ab841d125 at pc 0x555ab841a235 bp 0x7ffe7faef440 sp 0x7ffe7faef438
READ of size 1 at 0x555ab841d125 thread T0
    #0 0x555ab841a234 in main test_val.c:10
    #1 0x7f4942f12249 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f4942f12304 in __libc_start_main_impl ../csu/libc-start.c:360
    #3 0x555ab841a0d0 in _start (test_val_asan+0x10d0)

0x555ab841d125 is located 0 bytes to the right of global variable 's' defined in 'testw.c:5:6' (0x555ab841d120) of size 5
SUMMARY: AddressSanitizer: global-buffer-overflow test_val.c:10 in main
Shadow bytes around the buggy address:
  0x0aabd707b9d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabd707b9e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabd707b9f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabd707ba00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabd707ba10: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0aabd707ba20: 00 00 00 00[05]f9 f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0aabd707ba30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabd707ba40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabd707ba50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabd707ba60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aabd707ba70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==187==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
    char * s = malloc(sizeof(char) * 5);
    for(int i = 0; i < 5; i++){
        s[i] = 'a';
    }
    free(s);
    printf("%c\n", s[4]);
    return 0;
}
```
#### Valgrind Report
```
==693684== Memcheck, a memory error detector
==693684== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==693684== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==693684== Command: ./test_val
==693684== 
==693684== Invalid read of size 1
==693684==    at 0x1091A6: main (in /net/gcs/112/312552043/test_val)
==693684==  Address 0x4a43044 is 4 bytes inside a block of size 5 free'd
==693684==    at 0x484317B: free (vg_replace_malloc.c:872)
==693684==    by 0x10919D: main (in /net/gcs/112/312552043/test_val)
==693684==  Block was alloc'd at
==693684==    at 0x48407B4: malloc (vg_replace_malloc.c:381)
==693684==    by 0x10916A: main (in /net/gcs/112/312552043/test_val)
==693684== 
a
==693684== 
==693684== HEAP SUMMARY:
==693684==     in use at exit: 0 bytes in 0 blocks
==693684==   total heap usage: 2 allocs, 2 frees, 1,029 bytes allocated
==693684== 
==693684== All heap blocks were freed -- no leaks are possible
==693684== 
==693684== For lists of detected and suppressed errors, rerun with: -s
==693684== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==58754==ERROR: AddressSanitizer: heap-use-after-free on address 0x000105700714 at pc 0x000102ce7d14 bp 0x00016d11b4e0 sp 0x00016d11b4d8
READ of size 1 at 0x000105700714 thread T0
    #0 0x102ce7d10 in main test_val.c:11
    #1 0x1a3a6bf24  (<unknown module>)

0x000105700714 is located 4 bytes inside of 5-byte region [0x000105700710,0x000105700715)
freed by thread T0 here:
    #0 0x103192ce0 in wrap_free+0x98 (libclang_rt.asan_osx_dynamic.dylib:arm64e+0x52ce0)
    #1 0x102ce7cb8 in main test_val.c:10
    #2 0x1a3a6bf24  (<unknown module>)

previously allocated by thread T0 here:
    #0 0x103192ba4 in wrap_malloc+0x94 (libclang_rt.asan_osx_dynamic.dylib:arm64e+0x52ba4)
    #1 0x102ce7c0c in main test_val.c:6
    #2 0x1a3a6bf24  (<unknown module>)

SUMMARY: AddressSanitizer: heap-use-after-free test_val.c:11 in main
Shadow bytes around the buggy address:
  0x000105700480: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000105700500: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000105700580: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000105700600: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000105700680: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
=>0x000105700700: fa fa[fd]fa fa fa 00 00 fa fa 00 04 fa fa 00 05
  0x000105700780: fa fa 00 00 fa fa fd fd fa fa fa fa fa fa fa fa
  0x000105700800: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000105700880: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000105700900: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x000105700980: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==58754==ABORTING
zsh: abort      ./useAfterFree

```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int * a(){
    int a = 0;
    return &a;
}
int main(){
    int *b = a();
    *b = 20;
    printf("%d\n", *b);
    return 0;
}
```
#### Valgrind Report
```
==695654== Memcheck, a memory error detector
==695654== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==695654== Using Valgrind-3.19.0 and LibVEX; rerun with -h for copyright info
==695654== Command: ./test_val
==695654== 
==695654== Invalid write of size 4
==695654==    at 0x109165: main (in /net/gcs/112/312552043/test_val)
==695654==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==695654== 
==695654== 
==695654== Process terminating with default action of signal 11 (SIGSEGV)
==695654==  Access not within mapped region at address 0x0
==695654==    at 0x109165: main (in /net/gcs/112/312552043/test_val)
==695654==  If you believe this happened as a result of a stack
==695654==  overflow in your program's main thread (unlikely but
==695654==  possible), you can try to increase the size of the
==695654==  main thread stack using the --main-stacksize= flag.
==695654==  The main thread stack size used in this run was 16777216.
==695654== 
==695654== HEAP SUMMARY:
==695654==     in use at exit: 0 bytes in 0 blocks
==695654==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==695654== 
==695654== All heap blocks were freed -- no leaks are possible
==695654== 
==695654== For lists of detected and suppressed errors, rerun with: -s
==695654== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==66182==ERROR: AddressSanitizer: stack-use-after-return on address 0x000105a75020 at pc 0x000104293c6c bp 0x00016bb6f4b0 sp 0x00016bb6f4a8
WRITE of size 4 at 0x000105a75020 thread T0
    #0 0x104293c68 in main test_val.c:12
    #1 0x1a3a6bf24  (<unknown module>)

Address 0x000105a75020 is located in stack of thread T0 at offset 32 in frame
    #0 0x1042939d4 in a test_val.c:6

  This frame has 1 object(s):
    [32, 36) 'a' (line 7) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return test_val.c:12 in main
Shadow bytes around the buggy address:
  0x000105a74d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105a74e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105a74e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105a74f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105a74f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x000105a75000: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x000105a75080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105a75100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105a75180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105a75200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000105a75280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==66182==ABORTING
zsh: abort      ASAN_OPTIONS=detect_stack_use_after_return=1 ./useAfterReturn

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>


int main(int argc, char** argv){
    char a[5];
    char b[5];

    for(int i = 0; i < 5; i++){
        a[i] = 'a';
        b[i] = 'b';
    }
    printf("b[0]: %c\n", b[0]);
    unsigned int offset = &b[0] - &a[4];
    a[4 + offset] = 'c';
    printf("b[0]: %c\n", b[0]);
    return 0;
}
```
### Why
bc the offset bypass the redzone between a[4] and b[0],so the content in redzone hasnt been changed, the ASan wont be triggered.

