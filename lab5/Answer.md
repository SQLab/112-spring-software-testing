# Answer

Name: 林佑庭
ID: 312551098

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    V     |   V  |
| Stack out-of-bounds  |    X     |   V  |
| Global out-of-bounds |    X     |   V  |
| Use-after-free       |    V     |   V  |
| Use-after-return     |    X     |   V  |

### Heap out-of-bounds
#### Source code
```
int main() {
    int *array = malloc(10 * sizeof(int));
    array[10] = 0;  // out-of-bounds write
    int x = array[10];  // out-of-bounds read
    free(array);
    return 0;
}
```
#### Valgrind Report
```
==89866== Memcheck, a memory error detector
==89866== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==89866== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==89866== Command: ./test
==89866== 
==89866== Invalid write of size 4
==89866==    at 0x10918B: main (in /home/eusden/112-spring-software-testing/lab5/test)
==89866==  Address 0x4a92068 is 0 bytes after a block of size 40 alloc'd
==89866==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==89866==    by 0x10917E: main (in /home/eusden/112-spring-software-testing/lab5/test)
==89866== 
==89866== Invalid read of size 4
==89866==    at 0x109195: main (in /home/eusden/112-spring-software-testing/lab5/test)
==89866==  Address 0x4a92068 is 0 bytes after a block of size 40 alloc'd
==89866==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==89866==    by 0x10917E: main (in /home/eusden/112-spring-software-testing/lab5/test)
==89866== 
==89866== 
==89866== HEAP SUMMARY:
==89866==     in use at exit: 0 bytes in 0 blocks
==89866==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==89866== 
==89866== All heap blocks were freed -- no leaks are possible
==89866== 
==89866== For lists of detected and suppressed errors, rerun with: -s
==89866== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==90843==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x558affc1121f bp 0x7ffce0430ad0 sp 0x7ffce0430ac0
WRITE of size 4 at 0x604000000038 thread T0
    #0 0x558affc1121e in main /home/eusden/112-spring-software-testing/lab5/heap_out_of_bound.c:5
    #1 0x7f94b377ad8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f94b377ae3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x558affc11104 in _start (/home/eusden/112-spring-software-testing/lab5/test+0x1104)

0x604000000038 is located 0 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7f94b3a2e887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x558affc111da in main /home/eusden/112-spring-software-testing/lab5/heap_out_of_bound.c:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/eusden/112-spring-software-testing/lab5/heap_out_of_bound.c:5 in main
Shadow bytes around the buggy address:
  0x0c087fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c087fff8000: fa fa 00 00 00 00 00[fa]fa fa fa fa fa fa fa fa
  0x0c087fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==90843==ABORTING
```

### Stack out-of-bounds
#### Source code
```
int main() {
    int array[10];
    array[10] = 0;  // out-of-bounds write
    int x = array[10];  // out-of-bounds read
    return 0;
}
```
#### Valgrind Report
```
==103261== Memcheck, a memory error detector
==103261== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==103261== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==103261== Command: ./test
==103261== 
*** stack smashing detected ***: terminated
==103261== 
==103261== Process terminating with default action of signal 6 (SIGABRT)
==103261==    at 0x48FC9FC: __pthread_kill_implementation (pthread_kill.c:44)
==103261==    by 0x48FC9FC: __pthread_kill_internal (pthread_kill.c:78)
==103261==    by 0x48FC9FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==103261==    by 0x48A8475: raise (raise.c:26)
==103261==    by 0x488E7F2: abort (abort.c:79)
==103261==    by 0x48EF675: __libc_message (libc_fatal.c:155)
==103261==    by 0x499C599: __fortify_fail (fortify_fail.c:26)
==103261==    by 0x499C565: __stack_chk_fail (stack_chk_fail.c:24)
==103261==    by 0x109187: main (stack_out_of_bound.c:8)
==103261== 
==103261== HEAP SUMMARY:
==103261==     in use at exit: 0 bytes in 0 blocks
==103261==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==103261== 
==103261== All heap blocks were freed -- no leaks are possible
==103261== 
==103261== For lists of detected and suppressed errors, rerun with: -s
==103261== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted
```
### ASan Report
```
=================================================================
==103440==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffce2b14f88 at pc 0x559d13a7c2ce bp 0x7ffce2b14f20 sp 0x7ffce2b14f10
WRITE of size 4 at 0x7ffce2b14f88 thread T0
    #0 0x559d13a7c2cd in main /home/eusden/112-spring-software-testing/lab5/stack_out_of_bound.c:5
    #1 0x7ff425512d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ff425512e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x559d13a7c104 in _start (/home/eusden/112-spring-software-testing/lab5/test+0x1104)

Address 0x7ffce2b14f88 is located in stack of thread T0 at offset 88 in frame
    #0 0x559d13a7c1d8 in main /home/eusden/112-spring-software-testing/lab5/stack_out_of_bound.c:3

  This frame has 1 object(s):
    [48, 88) 'array' (line 4) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/eusden/112-spring-software-testing/lab5/stack_out_of_bound.c:5 in main
Shadow bytes around the buggy address:
  0x10001c55a9a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001c55a9b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001c55a9c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001c55a9d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001c55a9e0: 00 00 00 00 00 00 f1 f1 f1 f1 f1 f1 00 00 00 00
=>0x10001c55a9f0: 00[f3]f3 f3 f3 f3 00 00 00 00 00 00 00 00 00 00
  0x10001c55aa00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001c55aa10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001c55aa20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001c55aa30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001c55aa40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==103440==ABORTING
```

### Global out-of-bounds
#### Source code
```
int array[10];

int main() {
    array[10] = 0;  // out-of-bounds write
    int x = array[10];  // out-of-bounds read
    return 0;
}
```
#### Valgrind Report
```
==104062== Memcheck, a memory error detector
==104062== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==104062== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==104062== Command: ./test
==104062== 
==104062== 
==104062== HEAP SUMMARY:
==104062==     in use at exit: 0 bytes in 0 blocks
==104062==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==104062== 
==104062== All heap blocks were freed -- no leaks are possible
==104062== 
==104062== For lists of detected and suppressed errors, rerun with: -s
==104062== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==104230==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55eb3521a0c8 at pc 0x55eb35217203 bp 0x7ffc48990ad0 sp 0x7ffc48990ac0
WRITE of size 4 at 0x55eb3521a0c8 thread T0
    #0 0x55eb35217202 in main /home/eusden/112-spring-software-testing/lab5/src/global_out_of_bound.c:6
    #1 0x7f836da17d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f836da17e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55eb35217104 in _start (/home/eusden/112-spring-software-testing/lab5/src/test+0x1104)

0x55eb3521a0c8 is located 0 bytes to the right of global variable 'array' defined in 'global_out_of_bound.c:3:5' (0x55eb3521a0a0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/eusden/112-spring-software-testing/lab5/src/global_out_of_bound.c:6 in main
Shadow bytes around the buggy address:
  0x0abde6a3b3c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abde6a3b3d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abde6a3b3e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abde6a3b3f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abde6a3b400: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0abde6a3b410: 00 00 00 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9
  0x0abde6a3b420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abde6a3b430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abde6a3b440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abde6a3b450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abde6a3b460: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==104230==ABORTING
```

### Use-after-free
#### Source code
```
int main() {
    int *array = malloc(10 * sizeof(int));
    array[0] = 0;
    free(array);
    int x = array[0];  // use after free    
    return 0;
}
```
#### Valgrind Report
```
==110912== Memcheck, a memory error detector
==110912== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==110912== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==110912== Command: ./test
==110912== 
==110912== Invalid read of size 4
==110912==    at 0x10919D: main (use_after_free.c:7)
==110912==  Address 0x4a92040 is 0 bytes inside a block of size 40 free'd
==110912==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==110912==    by 0x109198: main (use_after_free.c:6)
==110912==  Block was alloc'd at
==110912==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==110912==    by 0x10917E: main (use_after_free.c:4)
==110912== 
==110912== 
==110912== HEAP SUMMARY:
==110912==     in use at exit: 0 bytes in 0 blocks
==110912==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==110912== 
==110912== All heap blocks were freed -- no leaks are possible
==110912== 
==110912== For lists of detected and suppressed errors, rerun with: -s
==110912== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==111331==ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000010 at pc 0x56463d3b4287 bp 0x7fff858f2570 sp 0x7fff858f2560
READ of size 4 at 0x604000000010 thread T0
    #0 0x56463d3b4286 in main /home/eusden/112-spring-software-testing/lab5/src/use_after_free.c:7
    #1 0x7f7d6fba3d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f7d6fba3e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56463d3b4124 in _start (/home/eusden/112-spring-software-testing/lab5/src/test+0x1124)

0x604000000010 is located 0 bytes inside of 40-byte region [0x604000000010,0x604000000038)
freed by thread T0 here:
    #0 0x7f7d6fe57537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x56463d3b424f in main /home/eusden/112-spring-software-testing/lab5/src/use_after_free.c:6
    #2 0x7f7d6fba3d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7f7d6fe57887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56463d3b41fe in main /home/eusden/112-spring-software-testing/lab5/src/use_after_free.c:4
    #2 0x7f7d6fba3d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free /home/eusden/112-spring-software-testing/lab5/src/use_after_free.c:7 in main
Shadow bytes around the buggy address:
  0x0c087fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c087fff8000: fa fa[fd]fd fd fd fd fa fa fa fa fa fa fa fa fa
  0x0c087fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c087fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==111331==ABORTING
```

### Use-after-return
#### Source code
```
int* func() {
    int array[10];
    return array;
}

int main() {
    int* array = func();
    array[0] = 0;  // use after return
    return 0;
}
```
#### Valgrind Report
```
==105444== Memcheck, a memory error detector
==105444== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==105444== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==105444== Command: ./test
==105444== 
==105444== 
==105444== HEAP SUMMARY:
==105444==     in use at exit: 0 bytes in 0 blocks
==105444==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==105444== 
==105444== All heap blocks were freed -- no leaks are possible
==105444== 
==105444== For lists of detected and suppressed errors, rerun with: -s
==105444== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==110007==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55e61c9941c4 bp 0x000000000001 sp 0x7ffd5f44f8b0 T0)
==110007==The signal is caused by a WRITE memory access.
==110007==Hint: address points to the zero page.
    #0 0x55e61c9941c4 in main /home/eusden/112-spring-software-testing/lab5/src/use_after_return.c:10
    #1 0x7f84a7ce4d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f84a7ce4e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e61c9940c4 in _start (/home/eusden/112-spring-software-testing/lab5/src/test+0x10c4)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/eusden/112-spring-software-testing/lab5/src/use_after_return.c:10 in main
==110007==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
int main() {
    int a[8] = {0};
    int b[8] = {0};

    a[16] = 1;  // Bypassing the redzone

    if (b[0] == 1) {
        printf("Redzone isn't working\n");
    }

    return 0;
}

```
### Why

Since ASAN set the redzone with size 32 bytes. To bypass the redzone, we can simply access the region of array b by access the position of array a + the size of array a ( 8 \* sizeof(int) ) + 32 bytes ( 8 \* sizeof(int) ). 

| redzone | array a  | redzone  | array b  | redzone  |
| --------| -------- | -------- | -------- | -------  |
| 32 bytes| 32 bytes | 32 bytes | 32 bytes | 32 bytes |

In the source code, we modified the array b's first element by access a[16]. 
In other words, a[16:23] has the same region to b[0:7].

Therefore, the results would be like:
```
Redzone isn't working
```
Which means ASAN didn't found any error.



