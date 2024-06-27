# Answer

Name: 游宗穎
ID: B122556

## Test Valgrind and ASan

### Result

|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | +        | +    |
| Stack out-of-bounds  | -        | +    |
| Global out-of-bounds | -        | +    |
| Use-after-free       | +        | +    |
| Use-after-return     | +        | +    |

### Heap out-of-bounds

#### Source code

```c
#include <stdlib.h>

int main() {
    char *p = (char*)malloc(5);
    p[5] = 0;
    free(p);
    return 0;
}
```

#### Valgrind Report

```log
==28356== Memcheck, a memory error detector
==28356== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==28356== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==28356== Command: ./heap_out_of_bound
==28356== 
==28356== Invalid write of size 1
==28356==    at 0x109167: main (in /tmp/test/heap_out_of_bound)
==28356==  Address 0x4a6c045 is 0 bytes after a block of size 5 alloc'd
==28356==    at 0x4843788: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==28356==    by 0x10915A: main (in /tmp/test/heap_out_of_bound)
==28356== 
==28356== 
==28356== HEAP SUMMARY:
==28356==     in use at exit: 0 bytes in 0 blocks
==28356==   total heap usage: 1 allocs, 1 frees, 5 bytes allocated
==28356== 
==28356== All heap blocks were freed -- no leaks are possible
==28356== 
==28356== For lists of detected and suppressed errors, rerun with: -s
==28356== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

### ASan Report

```log
=================================================================
==28115==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x502000000015 at pc 0x64dc5e5531cb bp 0x7ffc92c55940 sp 0x7ffc92c55930
WRITE of size 1 at 0x502000000015 thread T0
    #0 0x64dc5e5531ca in main (/tmp/test/heap_out_of_bound+0x11ca) (BuildId: 7d6fc6184e23cf734d56ab1953cba95461898881)
    #1 0x779f06c43ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x779f06c43d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x64dc5e5530a4 in _start (/tmp/test/heap_out_of_bound+0x10a4) (BuildId: 7d6fc6184e23cf734d56ab1953cba95461898881)

0x502000000015 is located 0 bytes after 5-byte region [0x502000000010,0x502000000015)
allocated by thread T0 here:
    #0 0x779f06ee1359 in __interceptor_malloc /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x64dc5e55318a in main (/tmp/test/heap_out_of_bound+0x118a) (BuildId: 7d6fc6184e23cf734d56ab1953cba95461898881)
    #2 0x779f06c43ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)

SUMMARY: AddressSanitizer: heap-buffer-overflow (/tmp/test/heap_out_of_bound+0x11ca) (BuildId: 7d6fc6184e23cf734d56ab1953cba95461898881) in main
Shadow bytes around the buggy address:
  0x501ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x501fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x502000000000: fa fa[05]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==28115==ABORTING
```

### Stack out-of-bounds

#### Source code

```c
#include <stdlib.h>

int main() {
    char arr[5];
    arr[5] = 0;
    return 0;
}
```

#### Valgrind Report

```log
==28743== Memcheck, a memory error detector
==28743== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==28743== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==28743== Command: ./stack_out_of_bound
==28743== 
==28743== 
==28743== HEAP SUMMARY:
==28743==     in use at exit: 0 bytes in 0 blocks
==28743==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==28743== 
==28743== All heap blocks were freed -- no leaks are possible
==28743== 
==28743== For lists of detected and suppressed errors, rerun with: -s
==28743== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### ASan Report

```log
=================================================================
==28926==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x78cb5b009025 at pc 0x6247cad1722e bp 0x7ffc953b5e20 sp 0x7ffc953b5e10
WRITE of size 1 at 0x78cb5b009025 thread T0
    #0 0x6247cad1722d in main (/tmp/test/stack_out_of_bound+0x122d) (BuildId: f3ffede9d55992e14dae01df26409a1a90a0fcd8)
    #1 0x78cb5d643ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x78cb5d643d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x6247cad170a4 in _start (/tmp/test/stack_out_of_bound+0x10a4) (BuildId: f3ffede9d55992e14dae01df26409a1a90a0fcd8)

Address 0x78cb5b009025 is located in stack of thread T0 at offset 37 in frame
    #0 0x6247cad17188 in main (/tmp/test/stack_out_of_bound+0x1188) (BuildId: f3ffede9d55992e14dae01df26409a1a90a0fcd8)

  This frame has 1 object(s):
    [32, 37) 'arr' (line 4) <== Memory access at offset 37 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/tmp/test/stack_out_of_bound+0x122d) (BuildId: f3ffede9d55992e14dae01df26409a1a90a0fcd8) in main
Shadow bytes around the buggy address:
  0x78cb5b008d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x78cb5b008e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x78cb5b008e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x78cb5b008f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x78cb5b008f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x78cb5b009000: f1 f1 f1 f1[05]f3 f3 f3 00 00 00 00 00 00 00 00
  0x78cb5b009080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x78cb5b009100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x78cb5b009180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x78cb5b009200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x78cb5b009280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==28926==ABORTING
```

### Global out-of-bounds

#### Source code

```c
#include <stdlib.h>

char arr[5];

int main() {
    arr[5] = 0;
    return 0;
}
```

#### Valgrind Report

```log
==30231== Memcheck, a memory error detector
==30231== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==30231== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==30231== Command: ./global_out_of_bound
==30231== 
==30231== 
==30231== HEAP SUMMARY:
==30231==     in use at exit: 0 bytes in 0 blocks
==30231==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==30231== 
==30231== All heap blocks were freed -- no leaks are possible
==30231== 
==30231== For lists of detected and suppressed errors, rerun with: -s
==30231== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### ASan Report

```log
=================================================================
==30097==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5dba61ffd0e5 at pc 0x5dba61ffa1b4 bp 0x7ffd680e5cf0 sp 0x7ffd680e5ce0
WRITE of size 1 at 0x5dba61ffd0e5 thread T0
    #0 0x5dba61ffa1b3 in main (/tmp/test/global_out_of_bound+0x11b3) (BuildId: 5f6062a83e7ebe6c26f91f46e8e29b0c6c526bcb)
    #1 0x7321e3a43ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x7321e3a43d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x5dba61ffa0a4 in _start (/tmp/test/global_out_of_bound+0x10a4) (BuildId: 5f6062a83e7ebe6c26f91f46e8e29b0c6c526bcb)

0x5dba61ffd0e5 is located 0 bytes after global variable 'arr' defined in 'global_out_of_bound.c:3:6' (0x5dba61ffd0e0) of size 5
SUMMARY: AddressSanitizer: global-buffer-overflow (/tmp/test/global_out_of_bound+0x11b3) (BuildId: 5f6062a83e7ebe6c26f91f46e8e29b0c6c526bcb) in main
Shadow bytes around the buggy address:
  0x5dba61ffce00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x5dba61ffce80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x5dba61ffcf00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x5dba61ffcf80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x5dba61ffd000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x5dba61ffd080: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00[05]f9 f9 f9
  0x5dba61ffd100: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x5dba61ffd180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x5dba61ffd200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x5dba61ffd280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x5dba61ffd300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==30097==ABORTING
```

### Use-after-free

#### Source code

```c
#include <stdlib.h>

int main() {
    char *p = (char*)malloc(5);
    free(p);
    p[0] = 0;
    return 0;
}
```

#### Valgrind Report

```log
==30705== Memcheck, a memory error detector
==30705== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==30705== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==30705== Command: ./use_after_free
==30705== 
==30705== Invalid write of size 1
==30705==    at 0x10916F: main (in /tmp/test/use_after_free)
==30705==  Address 0x4a6c040 is 0 bytes inside a block of size 5 free'd
==30705==    at 0x48468CF: free (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==30705==    by 0x10916A: main (in /tmp/test/use_after_free)
==30705==  Block was alloc'd at
==30705==    at 0x4843788: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==30705==    by 0x10915A: main (in /tmp/test/use_after_free)
==30705== 
==30705== 
==30705== HEAP SUMMARY:
==30705==     in use at exit: 0 bytes in 0 blocks
==30705==   total heap usage: 1 allocs, 1 frees, 5 bytes allocated
==30705== 
==30705== All heap blocks were freed -- no leaks are possible
==30705== 
==30705== For lists of detected and suppressed errors, rerun with: -s
==30705== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

### ASan Report

```log
=================================================================
==30822==ERROR: AddressSanitizer: heap-use-after-free on address 0x502000000010 at pc 0x5ea313d7d1cf bp 0x7ffc563c18b0 sp 0x7ffc563c18a0
WRITE of size 1 at 0x502000000010 thread T0
    #0 0x5ea313d7d1ce in main (/tmp/test/use_after_free+0x11ce) (BuildId: 2fce0c5c9304d532e4527459c9e54bcf67af8203)
    #1 0x7f6ab8243ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x7f6ab8243d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x5ea313d7d0a4 in _start (/tmp/test/use_after_free+0x10a4) (BuildId: 2fce0c5c9304d532e4527459c9e54bcf67af8203)

0x502000000010 is located 0 bytes inside of 5-byte region [0x502000000010,0x502000000015)
freed by thread T0 here:
    #0 0x7f6ab84dfdb2 in __interceptor_free /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x5ea313d7d19a in main (/tmp/test/use_after_free+0x119a) (BuildId: 2fce0c5c9304d532e4527459c9e54bcf67af8203)
    #2 0x7f6ab8243ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)

previously allocated by thread T0 here:
    #0 0x7f6ab84e1359 in __interceptor_malloc /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x5ea313d7d18a in main (/tmp/test/use_after_free+0x118a) (BuildId: 2fce0c5c9304d532e4527459c9e54bcf67af8203)
    #2 0x7f6ab8243ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)

SUMMARY: AddressSanitizer: heap-use-after-free (/tmp/test/use_after_free+0x11ce) (BuildId: 2fce0c5c9304d532e4527459c9e54bcf67af8203) in main
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
==30822==ABORTING
```

### Use-after-return

#### Source code

```c
#include <stdlib.h>

char* foo() {
    char c = 0;
    return &c;
}

int main() {
    char c = *foo();
    return 0;
}
```

#### Valgrind Report

```log
==31459== Memcheck, a memory error detector
==31459== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==31459== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==31459== Command: ./use_after_return
==31459== 
==31459== Invalid read of size 1
==31459==    at 0x109181: main (in /tmp/test/use_after_return)
==31459==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==31459== 
==31459== 
==31459== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==31459==  Access not within mapped region at address 0x0
==31459==    at 0x109181: main (in /tmp/test/use_after_return)
==31459==  If you believe this happened as a result of a stack
==31459==  overflow in your program's main thread (unlikely but
==31459==  possible), you can try to increase the size of the
==31459==  main thread stack using the --main-stacksize= flag.
==31459==  The main thread stack size used in this run was 8388608.
==31459== 
==31459== HEAP SUMMARY:
==31459==     in use at exit: 0 bytes in 0 blocks
==31459==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==31459== 
==31459== All heap blocks were freed -- no leaks are possible
==31459== 
==31459== For lists of detected and suppressed errors, rerun with: -s
==31459== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
[1]    31459 segmentation fault  valgrind ./use_after_return
```

### ASan Report

```log
AddressSanitizer:DEADLYSIGNAL
=================================================================
==31298==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x62db5c2c32d8 bp 0x7ffe2ea96a90 sp 0x7ffe2ea96a80 T0)
==31298==The signal is caused by a READ memory access.
==31298==Hint: address points to the zero page.
    #0 0x62db5c2c32d8 in main (/tmp/test/use_after_return+0x12d8) (BuildId: 205d2e1345a2b4026fa32b7fdbc7546df0fb600a)
    #1 0x75ee1d843ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x75ee1d843d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x62db5c2c30b4 in _start (/tmp/test/use_after_return+0x10b4) (BuildId: 205d2e1345a2b4026fa32b7fdbc7546df0fb600a)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/tmp/test/use_after_return+0x12d8) (BuildId: 205d2e1345a2b4026fa32b7fdbc7546df0fb600a) in main
==31298==ABORTING
```

## ASan Out-of-bound Write bypass Redzone

### Source code

```c
#include <stdlib.h>

int main() {
    char *p_a = (char*)malloc(8);
    char *p_b = (char*)malloc(8);
    int diff = p_b - p_a;
    p_a[diff] = 10;
    free(p_a);
    free(p_b);
    return 0;
}
```

### Why

上面程式碼中，雖然存取超過了 `p_a` 的範圍，但超過的位置剛好在 `p_b` 的範圍中，略過了 asan 檢測的 red zone，所以沒有被檢測出來。
