# Answer

Name: Ping-Ting Liu

ID: 110550159

## Test Valgrind and ASan

### Environment

- gcc/g++: `13.2.1`
- valgrind: `3.22.0`

### Result

|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | yes      | yes  |
| Stack out-of-bounds  | no       | yes  |
| Global out-of-bounds | no       | yes  |
| Use-after-free       | yes      | yes  |
| Use-after-return     | yes      | yes  |

### Heap out-of-bounds

#### Source code

```cpp
#include <cstdlib>
int main () {
    char *data = (char*) malloc(10);
    data[10] = 'c';
}
```

#### Valgrind Report

```
==155809== Memcheck, a memory error detector
==155809== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==155809== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==155809== Command: ./main
==155809== 
==155809== Invalid write of size 1
==155809==    at 0x109157: main (in /home/daniel/src/cpp/main)
==155809==  Address 0x4e0d08a is 0 bytes after a block of size 10 alloc'd
==155809==    at 0x4843788: malloc (vg_replace_malloc.c:442)
==155809==    by 0x10914A: main (in /home/daniel/src/cpp/main)
==155809== 
==155809== 
==155809== HEAP SUMMARY:
==155809==     in use at exit: 10 bytes in 1 blocks
==155809==   total heap usage: 2 allocs, 1 frees, 73,738 bytes allocated
==155809== 
==155809== LEAK SUMMARY:
==155809==    definitely lost: 10 bytes in 1 blocks
==155809==    indirectly lost: 0 bytes in 0 blocks
==155809==      possibly lost: 0 bytes in 0 blocks
==155809==    still reachable: 0 bytes in 0 blocks
==155809==         suppressed: 0 bytes in 0 blocks
==155809== Rerun with --leak-check=full to see details of leaked memory
==155809== 
==155809== For lists of detected and suppressed errors, rerun with: -s
==155809== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

#### ASan Report

```
=================================================================
==155387==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50200000001a at pc 0x62bf358291bb bp 0x7ffea9a97510 sp 0x7ffea9a97500
WRITE of size 1 at 0x50200000001a thread T0
    #0 0x62bf358291ba in main (/home/daniel/src/cpp/main_asan+0x11ba) (BuildId: b42b3f359feead22ffc33d120105d2962afcc72f)
    #1 0x7554a2843ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #2 0x7554a2843d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #3 0x62bf35829094 in _start (/home/daniel/src/cpp/main_asan+0x1094) (BuildId: b42b3f359feead22ffc33d120105d2962afcc72f)

0x50200000001a is located 0 bytes after 10-byte region [0x502000000010,0x50200000001a)
allocated by thread T0 here:
    #0 0x7554a2ee1359 in __interceptor_malloc /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x62bf3582917a in main (/home/daniel/src/cpp/main_asan+0x117a) (BuildId: b42b3f359feead22ffc33d120105d2962afcc72f)
    #2 0x7554a2843ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/daniel/src/cpp/main_asan+0x11ba) (BuildId: b42b3f359feead22ffc33d120105d2962afcc72f) in main
Shadow bytes around the buggy address:
  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x502000000000: fa fa 00[02]fa fa fa fa fa fa fa fa fa fa fa fa
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
==155387==ABORTING
```

### Stack out-of-bounds

#### Source code

```c
int main () {
    char data[10];
    char c = data[10];
}
```

#### Valgrind Report

```
==158026== Memcheck, a memory error detector
==158026== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==158026== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==158026== Command: ./main
==158026== 
==158026== 
==158026== HEAP SUMMARY:
==158026==     in use at exit: 0 bytes in 0 blocks
==158026==   total heap usage: 1 allocs, 1 frees, 73,728 bytes allocated
==158026== 
==158026== All heap blocks were freed -- no leaks are possible
==158026== 
==158026== For lists of detected and suppressed errors, rerun with: -s
==158026== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

#### ASan Report

```
=================================================================
==158316==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x73344ac0902a at pc 0x5f88d4d6922e bp 0x7ffe9251ff00 sp 0x7ffe9251fef0
READ of size 1 at 0x73344ac0902a thread T0
    #0 0x5f88d4d6922d in main (/home/daniel/src/cpp/main_asan+0x122d) (BuildId: 58b258d50745f487e397412757b31074d0cf4583)
    #1 0x73344ce43ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #2 0x73344ce43d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #3 0x5f88d4d690a4 in _start (/home/daniel/src/cpp/main_asan+0x10a4) (BuildId: 58b258d50745f487e397412757b31074d0cf4583)

Address 0x73344ac0902a is located in stack of thread T0 at offset 42 in frame
    #0 0x5f88d4d69188 in main (/home/daniel/src/cpp/main_asan+0x1188) (BuildId: 58b258d50745f487e397412757b31074d0cf4583)

  This frame has 1 object(s):
    [32, 42) 'data' (line 2) <== Memory access at offset 42 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/daniel/src/cpp/main_asan+0x122d) (BuildId: 58b258d50745f487e397412757b31074d0cf4583) in main
Shadow bytes around the buggy address:
  0x73344ac08d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x73344ac08e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x73344ac08e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x73344ac08f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x73344ac08f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x73344ac09000: f1 f1 f1 f1 00[02]f3 f3 00 00 00 00 00 00 00 00
  0x73344ac09080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x73344ac09100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x73344ac09180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x73344ac09200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x73344ac09280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==158316==ABORTING
```

### Global out-of-bounds

#### Source code

```c
char data[10];
int main () {
    char c = data[10];
}
```

#### Valgrind Report

```
==159883== Memcheck, a memory error detector
==159883== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==159883== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==159883== Command: ./main
==159883== 
==159883== 
==159883== HEAP SUMMARY:
==159883==     in use at exit: 0 bytes in 0 blocks
==159883==   total heap usage: 1 allocs, 1 frees, 73,728 bytes allocated
==159883== 
==159883== All heap blocks were freed -- no leaks are possible
==159883== 
==159883== For lists of detected and suppressed errors, rerun with: -s
==159883== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

#### ASan Report

```
=================================================================
==162603==ERROR: AddressSanitizer: global-buffer-overflow on address 0x6235d5eb20ea at pc 0x6235d5eaf1b8 bp 0x7ffc06a8d730 sp 0x7ffc06a8d720
READ of size 1 at 0x6235d5eb20ea thread T0
    #0 0x6235d5eaf1b7 in main (/home/daniel/src/cpp/main_asan+0x11b7) (BuildId: 868da68d4277e920fce065ff60102d34bc61b9d2)
    #1 0x7f26ab243ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #2 0x7f26ab243d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #3 0x6235d5eaf0a4 in _start (/home/daniel/src/cpp/main_asan+0x10a4) (BuildId: 868da68d4277e920fce065ff60102d34bc61b9d2)

0x6235d5eb20ea is located 0 bytes after global variable 'data' defined in 'main.cpp:1:6' (0x6235d5eb20e0) of size 10
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/daniel/src/cpp/main_asan+0x11b7) (BuildId: 868da68d4277e920fce065ff60102d34bc61b9d2) in main
Shadow bytes around the buggy address:
  0x6235d5eb1e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x6235d5eb1e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x6235d5eb1f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x6235d5eb1f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x6235d5eb2000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x6235d5eb2080: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00[02]f9 f9
  0x6235d5eb2100: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x6235d5eb2180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x6235d5eb2200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x6235d5eb2280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x6235d5eb2300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==162603==ABORTING
```

### Use-after-free

#### Source code

```cpp
#include <cstdlib>
int main () {
    char *buf = (char*)malloc(10);
    free(buf);
    char c = buf[0];
}
```

#### Valgrind Report

```
==161369== Memcheck, a memory error detector
==161369== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==161369== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==161369== Command: ./main
==161369== 
==161369== Invalid read of size 1
==161369==    at 0x10916F: main (in /home/daniel/src/cpp/main)
==161369==  Address 0x4e0d080 is 0 bytes inside a block of size 10 free'd
==161369==    at 0x48468CF: free (vg_replace_malloc.c:985)
==161369==    by 0x10916A: main (in /home/daniel/src/cpp/main)
==161369==  Block was alloc'd at
==161369==    at 0x4843788: malloc (vg_replace_malloc.c:442)
==161369==    by 0x10915A: main (in /home/daniel/src/cpp/main)
==161369== 
==161369== 
==161369== HEAP SUMMARY:
==161369==     in use at exit: 0 bytes in 0 blocks
==161369==   total heap usage: 2 allocs, 2 frees, 73,738 bytes allocated
==161369== 
==161369== All heap blocks were freed -- no leaks are possible
==161369== 
==161369== For lists of detected and suppressed errors, rerun with: -s
==161369== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

#### ASan Report

```
=================================================================
==162194==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x6431da7461cf bp 0x7ffdf0964170 sp 0x7ffdf0964160
READ of size 1 at 0x502000000010 thread T0
    #0 0x6431da7461ce in main (/home/daniel/src/cpp/main_asan+0x11ce) (BuildId: 47e4828f2b9069e8c8ba1e8e301e8f498f2a9eeb)
    #1 0x7e8a40843ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #2 0x7e8a40843d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #3 0x6431da7460a4 in _start (/home/daniel/src/cpp/main_asan+0x10a4) (BuildId: 47e4828f2b9069e8c8ba1e8e301e8f498f2a9eeb)

0x502000000010 is located 0 bytes inside of 10-byte region [0x502000000010,0x50200000001a)
freed by thread T0 here:
    #0 0x7e8a40edfdb2 in __interceptor_free /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x6431da74619a in main (/home/daniel/src/cpp/main_asan+0x119a) (BuildId: 47e4828f2b9069e8c8ba1e8e301e8f498f2a9eeb)
    #2 0x7e8a40843ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)

previously allocated by thread T0 here:
    #0 0x7e8a40ee1359 in __interceptor_malloc /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x6431da74618a in main (/home/daniel/src/cpp/main_asan+0x118a) (BuildId: 47e4828f2b9069e8c8ba1e8e301e8f498f2a9eeb)
    #2 0x7e8a40843ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)

SUMMARY: AddressSanitizer: heap-use-after-free (/home/daniel/src/cpp/main_asan+0x11ce) (BuildId: 47e4828f2b9069e8c8ba1e8e301e8f498f2a9eeb) in main
Shadow bytes around the buggy address:
  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x502000000000: fa fa[fd]fd fa fa fa fa fa fa fa fa fa fa fa fa
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
==162194==ABORTING
```

### Use-after-return

#### Source code

```c
int *f() {
    int a[100];
    return a + 50;
}

int main () {
    int a = *f();
}
```

#### Valgrind Report

```
==164801== Memcheck, a memory error detector
==164801== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==164801== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==164801== Command: ./main
==164801== 
==164801== Invalid read of size 4
==164801==    at 0x109183: main (in /home/daniel/src/cpp/main)
==164801==  Address 0x1ffeffff28 is on thread 1's stack
==164801==  232 bytes below stack pointer
==164801== 
==164801== 
==164801== HEAP SUMMARY:
==164801==     in use at exit: 0 bytes in 0 blocks
==164801==   total heap usage: 1 allocs, 1 frees, 73,728 bytes allocated
==164801== 
==164801== All heap blocks were freed -- no leaks are possible
==164801== 
==164801== For lists of detected and suppressed errors, rerun with: -s
==164801== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

#### ASan Report

```
==165324==ERROR: AddressSanitizer: stack-use-after-return on address 0x758f23b090f8 at pc 0x5cfe028b72db bp 0x7fffa9372250 sp 0x7fffa9372240
READ of size 4 at 0x758f23b090f8 thread T0
    #0 0x5cfe028b72da in main (/home/daniel/src/cpp/main_asan+0x12da) (BuildId: bd13622c481f560c58d8f822640a3236e5e448a9)
    #1 0x758f25a43ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #2 0x758f25a43d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: c0caa0b7709d3369ee575fcd7d7d0b0fc48733af)
    #3 0x5cfe028b70a4 in _start (/home/daniel/src/cpp/main_asan+0x10a4) (BuildId: bd13622c481f560c58d8f822640a3236e5e448a9)

Address 0x758f23b090f8 is located in stack of thread T0 at offset 248 in frame
    #0 0x5cfe028b7188 in f() (/home/daniel/src/cpp/main_asan+0x1188) (BuildId: bd13622c481f560c58d8f822640a3236e5e448a9)

  This frame has 1 object(s):
    [48, 448) 'a' (line 2) <== Memory access at offset 248 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (/home/daniel/src/cpp/main_asan+0x12da) (BuildId: bd13622c481f560c58d8f822640a3236e5e448a9) in main
Shadow bytes around the buggy address:
  0x758f23b08e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x758f23b08e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x758f23b08f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x758f23b08f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x758f23b09000: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
=>0x758f23b09080: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5[f5]
  0x758f23b09100: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x758f23b09180: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x758f23b09200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x758f23b09280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x758f23b09300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==165324==ABORTING
```

## ASan Out-of-bound Write bypass Redzone

### Source code

```c
int main () {
    char a[8];
    char b[8];
    a[32] = 0;
}
```

### Run Result

Runs normally without any error.

### Why

Since local array `a` and `b` will be surrounded by red-zones and be aligned to 32-byte address, the size of the red-zone between `a` and `b` is 32 - 8 = 24 bytes. Therefore, accessing `a[32]` is actually accessing `b[0]`. ASan detected out-of-bound access by checking if red-zone is accessed. If a OOB access skips red-zones, it will not be detected by ASan.
