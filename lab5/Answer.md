# Answer

Name: 洪佳瑜
ID: 311552005
Compiler: gcc (Ubuntu 9.4.0-1ubuntu1~20.04.2) 9.4.0

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    o     |   o  |
| Stack out-of-bounds  |    x     |   o  |
| Global out-of-bounds |    x     |   o  |
| Use-after-free       |    o     |   o  |
| Use-after-return     |    o     |   o  |

### Heap out-of-bounds
#### Source code
```
int main() {
    int *ptr = malloc(3 * sizeof(int));
    if (ptr == NULL) {
        return 1;
    }

    printf("%d\n", ptr[4]);
    free(ptr);
    return 0;
}
```
#### Valgrind Report
```
==86334== Memcheck, a memory error detector
==86334== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==86334== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==86334== Command: ./1
==86334== 
==86334== Invalid read of size 4
==86334==    at 0x1091B9: main (in /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/1)
==86334==  Address 0x4a4f050 is 4 bytes after a block of size 12 alloc'd
==86334==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==86334==    by 0x10919E: main (in /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/1)
==86334== 
0
==86334== 
==86334== HEAP SUMMARY:
==86334==     in use at exit: 0 bytes in 0 blocks
==86334==   total heap usage: 2 allocs, 2 frees, 1,036 bytes allocated
==86334== 
==86334== All heap blocks were freed -- no leaks are possible
==86334== 
==86334== For lists of detected and suppressed errors, rerun with: -s
==86334== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==86202==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000020 at pc 0x557e91eb8290 bp 0x7fff4468d4a0 sp 0x7fff4468d490
READ of size 4 at 0x602000000020 thread T0
    #0 0x557e91eb828f in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/1.c:10
    #1 0x7f4d5a5f4082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x557e91eb816d in _start (/home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/1_asan+0x116d)

0x602000000020 is located 4 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x7f4d5a8cf808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x557e91eb8237 in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/1.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/1.c:10 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00 04[fa]fa fa fa fa fa fa fa fa fa fa fa
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
==86202==ABORTING
```

### Stack out-of-bounds
#### Source code
```
int main()
{
    int a[3];
    a[3] = 2;
    return 0;
}

```
#### Valgrind Report
```
==86627== Memcheck, a memory error detector
==86627== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==86627== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==86627== Command: ./2
==86627== 
*** stack smashing detected ***: terminated
==86627== 
==86627== Process terminating with default action of signal 6 (SIGABRT)
==86627==    at 0x489D00B: raise (raise.c:51)
==86627==    by 0x487C858: abort (abort.c:79)
==86627==    by 0x48E726D: __libc_message (libc_fatal.c:155)
==86627==    by 0x4989CD9: __fortify_fail (fortify_fail.c:26)
==86627==    by 0x4989CA5: __stack_chk_fail (stack_chk_fail.c:24)
==86627==    by 0x109183: main (in /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/2)
==86627== 
==86627== HEAP SUMMARY:
==86627==     in use at exit: 0 bytes in 0 blocks
==86627==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==86627== 
==86627== All heap blocks were freed -- no leaks are possible
==86627== 
==86627== For lists of detected and suppressed errors, rerun with: -s
==86627== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted (core dumped)
```
### ASan Report
```
=================================================================
==86523==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc95023c8c at pc 0x55a65ddef2a8 bp 0x7ffc95023c50 sp 0x7ffc95023c40
WRITE of size 4 at 0x7ffc95023c8c thread T0
    #0 0x55a65ddef2a7 in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/2.c:9
    #1 0x7f54c2179082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55a65ddef10d in _start (/home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/2_asan+0x110d)

Address 0x7ffc95023c8c is located in stack of thread T0 at offset 44 in frame
    #0 0x55a65ddef1d8 in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/2.c:6

  This frame has 1 object(s):
    [32, 44) 'a' (line 7) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/2.c:9 in main
Shadow bytes around the buggy address:
  0x1000129fc740: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc750: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc760: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc770: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc780: 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1
=>0x1000129fc790: 00[04]f3 f3 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc7a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc7b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc7c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc7d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000129fc7e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==86523==ABORTING
```

### Global out-of-bounds
#### Source code
```
int globalArray[5] = {1, 2, 3, 4, 5};

int main() {
    printf("%d", globalArray[5]);
    return 0;
}
```
#### Valgrind Report
```
==87085== Memcheck, a memory error detector
==87085== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==87085== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==87085== Command: ./3
==87085== 
0==87085== 
==87085== HEAP SUMMARY:
==87085==     in use at exit: 0 bytes in 0 blocks
==87085==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==87085== 
==87085== All heap blocks were freed -- no leaks are possible
==87085== 
==87085== For lists of detected and suppressed errors, rerun with: -s
==87085== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### ASan Report
```
=================================================================
==87139==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55c81da40034 at pc 0x55c81da3d23d bp 0x7ffc04caa3a0 sp 0x7ffc04caa390
READ of size 4 at 0x55c81da40034 thread T0
    #0 0x55c81da3d23c in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/3.c:4
    #1 0x7f9f88d81082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55c81da3d12d in _start (/home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/3_asan+0x112d)

0x55c81da40034 is located 0 bytes to the right of global variable 'globalArray' defined in '3.c:1:5' (0x55c81da40020) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/3.c:4 in main
Shadow bytes around the buggy address:
  0x0ab983b3ffb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab983b3ffc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab983b3ffd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab983b3ffe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab983b3fff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ab983b40000: 00 00 00 00 00 00[04]f9 f9 f9 f9 f9 00 00 00 00
  0x0ab983b40010: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab983b40020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab983b40030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab983b40040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab983b40050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==87139==ABORTING
```

### Use-after-free
#### Source code
```
int main() {
    int* arr = (int*)malloc(5 * sizeof(int));
    free(arr);
    printf("%d", arr[0]);

    return 0;
}
```
#### Valgrind Report
```
==87302== Memcheck, a memory error detector
==87302== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==87302== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==87302== Command: ./4
==87302== 
==87302== Invalid read of size 4
==87302==    at 0x1091B3: main (in /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/4)
==87302==  Address 0x4a4f040 is 0 bytes inside a block of size 20 free'd
==87302==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==87302==    by 0x1091AE: main (in /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/4)
==87302==  Block was alloc'd at
==87302==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==87302==    by 0x10919E: main (in /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/4)
==87302== 
0==87302== 
==87302== HEAP SUMMARY:
==87302==     in use at exit: 0 bytes in 0 blocks
==87302==   total heap usage: 2 allocs, 2 frees, 1,044 bytes allocated
==87302== 
==87302== All heap blocks were freed -- no leaks are possible
==87302== 
==87302== For lists of detected and suppressed errors, rerun with: -s
==87302== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==87333==ERROR: AddressSanitizer: heap-use-after-free on address 0x603000000010 at pc 0x56463675f284 bp 0x7ffc8f079ea0 sp 0x7ffc8f079e90
READ of size 4 at 0x603000000010 thread T0
    #0 0x56463675f283 in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/4.c:4
    #1 0x7fbe1ff77082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x56463675f16d in _start (/home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/4_asan+0x116d)

0x603000000010 is located 0 bytes inside of 20-byte region [0x603000000010,0x603000000024)
freed by thread T0 here:
    #0 0x7fbe2025240f in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:122
    #1 0x56463675f242 in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/4.c:3

previously allocated by thread T0 here:
    #0 0x7fbe20252808 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cc:144
    #1 0x56463675f237 in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/4.c:2

SUMMARY: AddressSanitizer: heap-use-after-free /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/4.c:4 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa[fd]fd fd fa fa fa fa fa fa fa fa fa fa fa
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
==87333==ABORTING
```

### Use-after-return
#### Source code
```
int* createIntArray() {
    int arr[5] = {1, 2, 3, 4, 5}; 
    return arr;
}

int main() {
    int* myArray = createIntArray();

    printf("%d", myArray[0]);

    return 0;
}

```
#### Valgrind Report
```
==87772== Memcheck, a memory error detector
==87772== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==87772== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==87772== Command: ./5
==87772== 
==87772== Invalid read of size 4
==87772==    at 0x1091E0: main (in /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/5)
==87772==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==87772== 
==87772== 
==87772== Process terminating with default action of signal 11 (SIGSEGV)
==87772==  Access not within mapped region at address 0x0
==87772==    at 0x1091E0: main (in /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/5)
==87772==  If you believe this happened as a result of a stack
==87772==  overflow in your program's main thread (unlikely but
==87772==  possible), you can try to increase the size of the
==87772==  main thread stack using the --main-stacksize= flag.
==87772==  The main thread stack size used in this run was 8388608.
==87772== 
==87772== HEAP SUMMARY:
==87772==     in use at exit: 0 bytes in 0 blocks
==87772==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==87772== 
==87772== All heap blocks were freed -- no leaks are possible
==87772== 
==87772== For lists of detected and suppressed errors, rerun with: -s
==87772== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)
hypervisor@ubuntu:~/Desktop/112-spring-softwa
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==87880==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55f36862e45e bp 0x000000000000 sp 0x7ffd4fe78c80 T0)
==87880==The signal is caused by a READ memory access.
==87880==Hint: address points to the zero page.
    #0 0x55f36862e45d in main /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/5.c:9
    #1 0x7fb6b121b082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x55f36862e18d in _start (/home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/5_asan+0x118d)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/hypervisor/Desktop/112-spring-software-testing/lab5/answer/5.c:9 in main
==87880==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
int main()
{
    int a[8];
    int b[8];
    b[0] = 5;
    printf("Before b[0]: %d\n",b[0]);
    a[b-a] = 10;
    printf("After b[0]: %d\n",b[0]);
}
```
### Why
Because the size of the redzone between a and b array is a - b, a[b-a] is the initial address of b[0]. It led to the result that after assigning the value for a[b-a], b[0] would be that value. For example, if we put the integer value 5 for b[0], then we put the integer value for a[b-1], it would make b[0] 10 because of the reason above.
