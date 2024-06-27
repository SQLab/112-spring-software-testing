# Answer

Name: 陳品文
ID: 110550144

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | O        | O    |
| Stack out-of-bounds  | X        | O    |
| Global out-of-bounds | X        | O    |
| Use-after-free       | O        | O    |
| Use-after-return     | X        | O    |

> [!NOTE]
> The test below are performed on **gcc (GCC) 13.2.1 20230801** and **valgrind-3.22.0**,
> with following commands:
> ```
> # valgrind
> $ gcc -Og -g -o xxx xxx.c
> $ valgrind ./xxx
> 
> # asan
> $ gcc -fsanitize=address -Og -g -o xxx xxx.c
> $ ./xxx
> ```
> on Arch Linux(x86_64 GNU/Linux) kernel version 6.8.6-arch1-1.1-g14.

### Heap out-of-bounds
#### Source code
```c
#include <stdlib.h>

int main() {
    int *a = (int *)malloc(2 * sizeof(int));
    a[3] = 1;
    int b = a[3];
    free(a);
}
```
#### Valgrind Report
```
==87812== Memcheck, a memory error detector
==87812== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==87812== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==87812== Command: ./heap_valg
==87812== 
==87812== Invalid write of size 4
==87812==    at 0x10915A: main (heap.c:5)
==87812==  Address 0x4a6b04c is 4 bytes after a block of size 8 alloc'd
==87812==    at 0x4843788: malloc (vg_replace_malloc.c:442)
==87812==    by 0x109156: main (heap.c:4)
==87812== 
==87812== 
==87812== HEAP SUMMARY:
==87812==     in use at exit: 0 bytes in 0 blocks
==87812==   total heap usage: 1 allocs, 1 frees, 8 bytes allocated
==87812== 
==87812== All heap blocks were freed -- no leaks are possible
==87812== 
==87812== For lists of detected and suppressed errors, rerun with: -s
==87812== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==87760==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50200000001c at pc 0x5e2bf3b141cb bp 0x7ffe09cf8400 sp 0x7ffe09cf83f0
WRITE of size 4 at 0x50200000001c thread T0
    #0 0x5e2bf3b141ca in main /home/nelsonchen/Documents/code/lab05/heap_oob/heap.c:5
    #1 0x77d1f3643ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x77d1f3643d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x5e2bf3b140a4 in _start (/home/nelsonchen/Documents/code/lab05/heap_oob/heap_asan+0x10a4) (BuildId: 3e50310273f779b77ef34f3ba349673b011b1088)

0x50200000001c is located 4 bytes after 8-byte region [0x502000000010,0x502000000018)
allocated by thread T0 here:
    #0 0x77d1f38e1359 in __interceptor_malloc /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x5e2bf3b14186 in main /home/nelsonchen/Documents/code/lab05/heap_oob/heap.c:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/nelsonchen/Documents/code/lab05/heap_oob/heap.c:5 in main
Shadow bytes around the buggy address:
  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x502000000000: fa fa 00[fa]fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==87760==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
int main() {
    int a[3];
    a[3] = 1;
    int b = a[3];
}
```
#### Valgrind Report
```
==129684== Memcheck, a memory error detector
==129684== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==129684== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==129684== Command: ./stack_valg
==129684== 
*** stack smashing detected ***: terminated
==129684== 
==129684== Process terminating with default action of signal 6 (SIGABRT): dumping core
==129684==    at 0x491332C: __pthread_kill_implementation (pthread_kill.c:44)
==129684==    by 0x48C26C7: raise (raise.c:26)
==129684==    by 0x48AA4B7: abort (abort.c:79)
==129684==    by 0x48AB394: __libc_message_impl.cold (libc_fatal.c:132)
==129684==    by 0x499A75A: __fortify_fail (fortify_fail.c:24)
==129684==    by 0x499BA75: __stack_chk_fail (stack_chk_fail.c:24)
==129684==    by 0x109175: main (stack.c:5)
==129684== 
==129684== HEAP SUMMARY:
==129684==     in use at exit: 0 bytes in 0 blocks
==129684==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==129684== 
==129684== All heap blocks were freed -- no leaks are possible
==129684== 
==129684== For lists of detected and suppressed errors, rerun with: -s
==129684== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==129507==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7c118cc0902c at pc 0x630142bda254 bp 0x7ffdac1713b0 sp 0x7ffdac1713a0
WRITE of size 4 at 0x7c118cc0902c thread T0
    #0 0x630142bda253 in main /home/nelsonchen/Documents/code/lab05/heap.c:3
    #1 0x7c118f243ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x7c118f243d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x630142bda0a4 in _start (/home/nelsonchen/Documents/code/lab05/stack_oob/stack_asan+0x10a4) (BuildId: 8da1a371260a6fec2893cf765b940fc78b01abcf)

Address 0x7c118cc0902c is located in stack of thread T0 at offset 44 in frame
    #0 0x630142bda188 in main /home/nelsonchen/Documents/code/lab05/heap.c:1

  This frame has 1 object(s):
    [32, 44) 'a' (line 2) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/nelsonchen/Documents/code/lab05/heap.c:3 in main
Shadow bytes around the buggy address:
  0x7c118cc08d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7c118cc08e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7c118cc08e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7c118cc08f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7c118cc08f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7c118cc09000: f1 f1 f1 f1 00[04]f3 f3 00 00 00 00 00 00 00 00
  0x7c118cc09080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7c118cc09100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7c118cc09180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7c118cc09200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7c118cc09280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==129507==ABORTING
```

### Global out-of-bounds
#### Source code
```c
int a[3];

int main() {
    a[3] = 1;
    int b = a[3];
}
```
#### Valgrind Report
```
==89283== Memcheck, a memory error detector
==89283== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==89283== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==89283== Command: ./glob_valg
==89283== 
==89283== 
==89283== HEAP SUMMARY:
==89283==     in use at exit: 0 bytes in 0 blocks
==89283==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==89283== 
==89283== All heap blocks were freed -- no leaks are possible
==89283== 
==89283== For lists of detected and suppressed errors, rerun with: -s
==89283== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==89161==ERROR: AddressSanitizer: global-buffer-overflow on address 0x619811b470ec at pc 0x619811b441b8 bp 0x7ffef22135b0 sp 0x7ffef22135a0
WRITE of size 4 at 0x619811b470ec thread T0
    #0 0x619811b441b7 in main /home/nelsonchen/Documents/code/lab05/glob_oob/glob.c:4
    #1 0x7a090b243ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x7a090b243d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x619811b440a4 in _start (/home/nelsonchen/Documents/code/lab05/glob_oob/glob_asan+0x10a4) (BuildId: ee3c771e6a127d56cc12cfa6f635726ec18e0451)

0x619811b470ec is located 0 bytes after global variable 'a' defined in 'glob.c:1:5' (0x619811b470e0) of size 12
SUMMARY: AddressSanitizer: global-buffer-overflow /home/nelsonchen/Documents/code/lab05/glob_oob/glob.c:4 in main
Shadow bytes around the buggy address:
  0x619811b46e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x619811b46e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x619811b46f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x619811b46f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x619811b47000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x619811b47080: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00[04]f9 f9
  0x619811b47100: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x619811b47180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x619811b47200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x619811b47280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x619811b47300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==89161==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdlib.h>

int main() {
    int *a = (int *)malloc(2 * sizeof(int));
    a[0] = 1;
    free(a);
    a[0] = 2;
    int b = a[0];
}
```
#### Valgrind Report
```
==93265== Memcheck, a memory error detector
==93265== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==93265== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==93265== Command: ./uaf_valg
==93265== 
==93265== Invalid write of size 4
==93265==    at 0x109165: main (uaf.c:7)
==93265==  Address 0x4a6b040 is 0 bytes inside a block of size 8 free'd
==93265==    at 0x48468CF: free (vg_replace_malloc.c:985)
==93265==    by 0x109164: main (uaf.c:6)
==93265==  Block was alloc'd at
==93265==    at 0x4843788: malloc (vg_replace_malloc.c:442)
==93265==    by 0x109153: main (uaf.c:4)
==93265== 
==93265== 
==93265== HEAP SUMMARY:
==93265==     in use at exit: 0 bytes in 0 blocks
==93265==   total heap usage: 1 allocs, 1 frees, 8 bytes allocated
==93265== 
==93265== All heap blocks were freed -- no leaks are possible
==93265== 
==93265== For lists of detected and suppressed errors, rerun with: -s
==93265== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==93224==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x56dd6fa561ed bp 0x7ffc1de77220 sp 0x7ffc1de77210
WRITE of size 4 at 0x502000000010 thread T0
    #0 0x56dd6fa561ec in main /home/nelsonchen/Documents/code/lab05/use_after_free/uaf.c:7
    #1 0x7c88eb243ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x7c88eb243d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x56dd6fa560a4 in _start (/home/nelsonchen/Documents/code/lab05/use_after_free/uaf_asan+0x10a4) (BuildId: 361c918a5772fe1ffb33f0f332461ad04b7908dc)

0x502000000010 is located 0 bytes inside of 8-byte region [0x502000000010,0x502000000018)
freed by thread T0 here:
    #0 0x7c88eb4dfdb2 in __interceptor_free /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x56dd6fa561b0 in main /home/nelsonchen/Documents/code/lab05/use_after_free/uaf.c:6

previously allocated by thread T0 here:
    #0 0x7c88eb4e1359 in __interceptor_malloc /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x56dd6fa56183 in main /home/nelsonchen/Documents/code/lab05/use_after_free/uaf.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /home/nelsonchen/Documents/code/lab05/use_after_free/uaf.c:7 in main
Shadow bytes around the buggy address:
  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x502000000000: fa fa[fd]fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x502000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==93224==ABORTING
```

### Use-after-return
#### Source code
```
int *p;
void init_p() {
    int a[10];
    p = a; 
}

int main() {
    init_p();
    *p = 1;
}
```
#### Valgrind Report
``` 
==131359== Memcheck, a memory error detector
==131359== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==131359== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==131359== Command: ./uar_valg
==131359== 
==131359== 
==131359== HEAP SUMMARY:
==131359==     in use at exit: 0 bytes in 0 blocks
==131359==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==131359== 
==131359== All heap blocks were freed -- no leaks are possible
==131359== 
==131359== For lists of detected and suppressed errors, rerun with: -s
==131359== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==131216==ERROR: AddressSanitizer: stack-use-after-return on address 0x77db6df09030 at pc 0x5bd3dc6972d4 bp 0x7ffe8536de00 sp 0x7ffe8536ddf0
WRITE of size 4 at 0x77db6df09030 thread T0
    #0 0x5bd3dc6972d3 in main /home/nelsonchen/Documents/code/lab05/use_after_return/uar.c:9
    #1 0x77db70443ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x77db70443d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x5bd3dc6970c4 in _start (/home/nelsonchen/Documents/code/lab05/use_after_return/uar_asan+0x10c4) (BuildId: 98fefdde7c9e23bc2f26ae7c50d168eaba77e475)

Address 0x77db6df09030 is located in stack of thread T0 at offset 48 in frame
    #0 0x5bd3dc6971a8 in init_p /home/nelsonchen/Documents/code/lab05/use_after_return/uar.c:2

  This frame has 1 object(s):
    [48, 88) 'a' (line 3) <== Memory access at offset 48 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/nelsonchen/Documents/code/lab05/use_after_return/uar.c:9 in main
Shadow bytes around the buggy address:
  0x77db6df08d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x77db6df08e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x77db6df08e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x77db6df08f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x77db6df08f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x77db6df09000: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x77db6df09080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x77db6df09100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x77db6df09180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x77db6df09200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x77db6df09280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==131216==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
int main() {
  int a[8];
  int b[8];
  a[16] = 1;
}
```
### Why
Asan uses redzone to detect out-of-bound write.
When we use asan, the above code is equivalent to:
```c
int main() {
  char rz1[32];
  int a[8]; // 32 bytes
  char rz2[32];
  int b[8]; // 32 bytes
  char rz3[32];
  int *shadow = (&rz1 >> 3) + kOff;
  shadow[0] = 0xffffffff;
  shadow[2] = 0xffffffff;
  shadow[4] = 0xffffffff;

  a[16] = 1;

  shadow[0] = shadow[2] = shadow[4] = 0;
}
```
We can now see that &(a[64]) = a + 16 * 4 = b = &(b[0]) does not fall inside the redzone.
Since shadow[3] = 0, the out-of-bound write will not be detected.
