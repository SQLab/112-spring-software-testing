# Answer



Name: 詹詠淇
ID: 312551063

## Test Valgrind and ASan

Compiler: gcc
Version: 11.4.0

### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     YES     |   YES   |
| Stack out-of-bounds  |     YES     |   YES   |
| Global out-of-bounds |     NO     |   YES   |
| Use-after-free       |     YES     |   YES   |
| Use-after-return     |     YES     |   YES   |



### Heap out-of-bounds
#### Source code
```


#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(5 * sizeof(int)); // Allocating memory for 5 integers

    if (ptr == NULL) {
        printf("Memory allocation failed.\n");
        return 1;
    }

    // Writing values into the allocated memory
    for (int i = 0; i < 5; i++) {
        ptr[i] = i;
    }

    // Accessing one element beyond the allocated memory
    printf("Value at index 5: %d\n", ptr[5]); // Out-of-bounds access

    free(ptr); // Freeing the allocated memory
    return 0;
}
```
#### Valgrind Report
```
==29987== Memcheck, a memory error detector
==29987== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==29987== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==29987== Command: ./hob.out
==29987== 
==29987== Invalid read of size 4
==29987==    at 0x109214: main (in /home/ubuntu/Desktop/lab5_test/hob.out)
==29987==  Address 0x4a95054 is 0 bytes after a block of size 20 alloc'd
==29987==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==29987==    by 0x1091BE: main (in /home/ubuntu/Desktop/lab5_test/hob.out)
==29987== 
Value at index 5: 0
==29987== 
==29987== HEAP SUMMARY:
==29987==     in use at exit: 0 bytes in 0 blocks
==29987==   total heap usage: 2 allocs, 2 frees, 1,044 bytes allocated
==29987== 
==29987== All heap blocks were freed -- no leaks are possible
==29987== 
==29987== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
==29987== 
==29987== 1 errors in context 1 of 1:
==29987== Invalid read of size 4
==29987==    at 0x109214: main (in /home/ubuntu/Desktop/lab5_test/hob.out)
==29987==  Address 0x4a95054 is 0 bytes after a block of size 20 alloc'd
==29987==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==29987==    by 0x1091BE: main (in /home/ubuntu/Desktop/lab5_test/hob.out)
==29987== 
==29987== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==29984==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000054 at pc 0x5a8569ae131f bp 0x7fffc136b050 sp 0x7fffc136b040
READ of size 4 at 0x603000000054 thread T0
    #0 0x5a8569ae131e in main /home/ubuntu/hob.c:18
    #1 0x742164c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x742164c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5a8569ae11a4 in _start (/home/ubuntu/Desktop/lab5_test/hob_asan.out+0x11a4)

0x603000000054 is located 0 bytes to the right of 20-byte region [0x603000000040,0x603000000054)
allocated by thread T0 here:
    #0 0x7421650b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5a8569ae1277 in main /home/ubuntu/hob.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/ubuntu/hob.c:18 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00[04]fa fa fa fa fa
  0x0c067fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==29984==ABORTING


```

### Stack out-of-bounds
#### Source code
```


#include <stdio.h>

int main() {
    int array[5] = {1, 2, 3, 4, 5};

    // Accessing one element beyond the bounds of the array
    printf("Value at index 5: %d\n", array[5]); // Out-of-bounds access

    return 0;
}
```
#### Valgrind Report
```
==29993== Memcheck, a memory error detector
==29993== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==29993== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==29993== Command: ./sob.out
==29993== 
==29993== Conditional jump or move depends on uninitialised value(s)
==29993==    at 0x48DFAD6: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== Use of uninitialised value of size 8
==29993==    at 0x48C32EB: _itoa_word (_itoa.c:177)
==29993==    by 0x48DEABD: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== Conditional jump or move depends on uninitialised value(s)
==29993==    at 0x48C32FC: _itoa_word (_itoa.c:177)
==29993==    by 0x48DEABD: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== Conditional jump or move depends on uninitialised value(s)
==29993==    at 0x48DF5C3: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== Conditional jump or move depends on uninitialised value(s)
==29993==    at 0x48DEC05: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
Value at index 5: 0
==29993== 
==29993== HEAP SUMMARY:
==29993==     in use at exit: 0 bytes in 0 blocks
==29993==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==29993== 
==29993== All heap blocks were freed -- no leaks are possible
==29993== 
==29993== Use --track-origins=yes to see where uninitialised values come from
==29993== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
==29993== 
==29993== 1 errors in context 1 of 5:
==29993== Conditional jump or move depends on uninitialised value(s)
==29993==    at 0x48DEC05: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== 
==29993== 1 errors in context 2 of 5:
==29993== Conditional jump or move depends on uninitialised value(s)
==29993==    at 0x48DF5C3: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== 
==29993== 1 errors in context 3 of 5:
==29993== Conditional jump or move depends on uninitialised value(s)
==29993==    at 0x48C32FC: _itoa_word (_itoa.c:177)
==29993==    by 0x48DEABD: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== 
==29993== 1 errors in context 4 of 5:
==29993== Use of uninitialised value of size 8
==29993==    at 0x48C32EB: _itoa_word (_itoa.c:177)
==29993==    by 0x48DEABD: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== 
==29993== 1 errors in context 5 of 5:
==29993== Conditional jump or move depends on uninitialised value(s)
==29993==    at 0x48DFAD6: __vfprintf_internal (vfprintf-internal.c:1516)
==29993==    by 0x48C979E: printf (printf.c:33)
==29993==    by 0x1091BF: main (in /home/ubuntu/Desktop/lab5_test/sob.out)
==29993== 
==29993== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==29995==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fff5cce2784 at pc 0x5c0f14059440 bp 0x7fff5cce2740 sp 0x7fff5cce2730
READ of size 4 at 0x7fff5cce2784 thread T0
    #0 0x5c0f1405943f in main /home/ubuntu/sob.c:7
    #1 0x7aebf8a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7aebf8a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c0f14059184 in _start (/home/ubuntu/Desktop/lab5_test/sob_asan.out+0x1184)

Address 0x7fff5cce2784 is located in stack of thread T0 at offset 52 in frame
    #0 0x5c0f14059258 in main /home/ubuntu/sob.c:3

  This frame has 1 object(s):
    [32, 52) 'array' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/ubuntu/sob.c:7 in main
Shadow bytes around the buggy address:
  0x10006b9944a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006b9944b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006b9944c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006b9944d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006b9944e0: 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00
=>0x10006b9944f0:[04]f3 f3 f3 f3 f3 00 00 00 00 00 00 00 00 00 00
  0x10006b994500: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006b994510: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006b994520: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006b994530: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006b994540: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==29995==ABORTING


```

### Global out-of-bounds
#### Source code
```


#include <stdio.h>

int global_array[5] = {1, 2, 3, 4, 5};

int main() {
    // Accessing one element beyond the bounds of the global array
    printf("Value at index 5: %d\n", global_array[5]); // Out-of-bounds access

    return 0;
}
```
#### Valgrind Report
```
==29974== Memcheck, a memory error detector
==29974== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==29974== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==29974== Command: ./gob.out
==29974== 
Value at index 5: 0
==29974== 
==29974== HEAP SUMMARY:
==29974==     in use at exit: 0 bytes in 0 blocks
==29974==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==29974== 
==29974== All heap blocks were freed -- no leaks are possible
==29974== 
==29974== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==29978==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5c1be4b9a034 at pc 0x5c1be4b97242 bp 0x7ffd16fc3260 sp 0x7ffd16fc3250
READ of size 4 at 0x5c1be4b9a034 thread T0
    #0 0x5c1be4b97241 in main /home/ubuntu/gob.c:7
    #1 0x7ecc48c29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ecc48c29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c1be4b97124 in _start (/home/ubuntu/Desktop/lab5_test/gob_asan.out+0x1124)

0x5c1be4b9a034 is located 0 bytes to the right of global variable 'global_array' defined in 'gob.c:3:5' (0x5c1be4b9a020) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/ubuntu/gob.c:7 in main
Shadow bytes around the buggy address:
  0x0b83fc96b3b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b83fc96b3c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b83fc96b3d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b83fc96b3e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b83fc96b3f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0b83fc96b400: 00 00 00 00 00 00[04]f9 f9 f9 f9 f9 00 00 00 00
  0x0b83fc96b410: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0b83fc96b420: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b83fc96b430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b83fc96b440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b83fc96b450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==29978==ABORTING


```

### Use-after-free
#### Source code
```


#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(sizeof(int));

    if (ptr == NULL) {
        printf("Memory allocation failed.\n");
        return 1;
    }

    // Assigning a value to the allocated memory
    *ptr = 10;
    
    // Freeing the allocated memory
    free(ptr);
    
    // Using the memory after it has been freed (use-after-free)
    printf("Value after free: %d\n", *ptr); 

    return 0;
}
```
#### Valgrind Report
```
==30010== Memcheck, a memory error detector
==30010== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==30010== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==30010== Command: ./uaf.out
==30010== 
==30010== Invalid read of size 4
==30010==    at 0x1091FA: main (in /home/ubuntu/Desktop/lab5_test/uaf.out)
==30010==  Address 0x4a95040 is 0 bytes inside a block of size 4 free'd
==30010==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==30010==    by 0x1091F5: main (in /home/ubuntu/Desktop/lab5_test/uaf.out)
==30010==  Block was alloc'd at
==30010==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==30010==    by 0x1091BE: main (in /home/ubuntu/Desktop/lab5_test/uaf.out)
==30010== 
Value after free: 10
==30010== 
==30010== HEAP SUMMARY:
==30010==     in use at exit: 0 bytes in 0 blocks
==30010==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==30010== 
==30010== All heap blocks were freed -- no leaks are possible
==30010== 
==30010== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
==30010== 
==30010== 1 errors in context 1 of 1:
==30010== Invalid read of size 4
==30010==    at 0x1091FA: main (in /home/ubuntu/Desktop/lab5_test/uaf.out)
==30010==  Address 0x4a95040 is 0 bytes inside a block of size 4 free'd
==30010==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==30010==    by 0x1091F5: main (in /home/ubuntu/Desktop/lab5_test/uaf.out)
==30010==  Block was alloc'd at
==30010==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==30010==    by 0x1091BE: main (in /home/ubuntu/Desktop/lab5_test/uaf.out)
==30010== 
==30010== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==30006==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x56d7d20f730b bp 0x7ffc0e4ad720 sp 0x7ffc0e4ad710
READ of size 4 at 0x602000000010 thread T0
    #0 0x56d7d20f730a in main /home/ubuntu/uaf.c:19
    #1 0x7c2718a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7c2718a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56d7d20f71a4 in _start (/home/ubuntu/Desktop/lab5_test/uaf_asan.out+0x11a4)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7c2718eb4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x56d7d20f72a9 in main /home/ubuntu/uaf.c:16

previously allocated by thread T0 here:
    #0 0x7c2718eb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56d7d20f7277 in main /home/ubuntu/uaf.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/ubuntu/uaf.c:19 in main
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
==30006==ABORTING


```

### Use-after-return
#### Source code
```

#include <stdio.h>
#include <stdlib.h>

int *create_array(int size) {
    int array[size];  // Allocating memory on the stack
    for (int i = 0; i < size; i++) {
        array[i] = i + 1;
    }
    return array;  // Returning pointer to the array
}

int main() {
    int *ptr = create_array(5);  // Calling function to create an array
    for (int i = 0; i < 5; i++) {
        printf("%d ", ptr[i]);  // Using the returned pointer
    }
    printf("\n");
    return 0;
}
```
#### Valgrind Report
```
==30019== Memcheck, a memory error detector
==30019== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==30019== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==30019== Command: ./uar.out
==30019== 
==30019== Invalid read of size 4
==30019==    at 0x1092DF: main (in /home/ubuntu/Desktop/lab5_test/uar.out)
==30019==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==30019== 
==30019== 
==30019== Process terminating with default action of signal 11 (SIGSEGV)
==30019==  Access not within mapped region at address 0x0
==30019==    at 0x1092DF: main (in /home/ubuntu/Desktop/lab5_test/uar.out)
==30019==  If you believe this happened as a result of a stack
==30019==  overflow in your program's main thread (unlikely but
==30019==  possible), you can try to increase the size of the
==30019==  main thread stack using the --main-stacksize= flag.
==30019==  The main thread stack size used in this run was 8388608.
==30019== 
==30019== HEAP SUMMARY:
==30019==     in use at exit: 0 bytes in 0 blocks
==30019==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==30019== 
==30019== All heap blocks were freed -- no leaks are possible
==30019== 
==30019== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
==30019== 
==30019== 1 errors in context 1 of 1:
==30019== Invalid read of size 4
==30019==    at 0x1092DF: main (in /home/ubuntu/Desktop/lab5_test/uar.out)
==30019==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==30019== 
==30019== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==30070==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x56e5760023a8 bp 0x000000000000 sp 0x7ffe5d50dee0 T0)
==30070==The signal is caused by a READ memory access.
==30070==Hint: address points to the zero page.
    #0 0x56e5760023a8 in main /home/ubuntu/uar.c:15
    #1 0x7a645f229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7a645f229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56e5760021c4 in _start (/home/ubuntu/Desktop/lab5_test/uar_asan.out+0x11c4)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/ubuntu/uar.c:15 in main
==30070==ABORTING


```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

#include <stdio.h>
#include <stdlib.h>
int main() {
    int* a=(int*)malloc(sizeof(int)*8);
    int* b=(int*)malloc(sizeof(int)*8);
    b[0]=1;
    a[0]=2;
    a[12]=5;
    //a[24]=5;
    printf("%d",a[12]);
    free(a);
    free(b);
    return 0;
}
```
### Why
ASan launches No detection because the address of out-of-bound write is legal to read and write.


