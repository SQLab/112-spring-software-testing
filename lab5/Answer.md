# Answer

Name: 江峻耀
ID: 110550148

## Test Valgrind and ASan
### Version
- Valgrind: 3.15.0
- gcc(GCC) 13.2.0
- compile command: valgrind ./filename (use default tool memcheck)
- compile command: gcc -fsanitize=address -Og -g -o filename filename.c

### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |     v    |   v  |
| Stack out-of-bounds  |     x    |   v  |
| Global out-of-bounds |     x    |   v  |
| Use-after-free       |     v    |   v  |
| Use-after-return     |     x    |   v  |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    int *s = (int *)malloc(9 * sizeof(int));
    int value = s[-1];
    s[-1] = 123;
}
```
#### Valgrind Report
```
==27695== Memcheck, a memory error detector
==27695== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==27695== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==27695== Command: ./heap
==27695== 
==27695== Invalid read of size 4
==27695==    at 0x401140: main (in /home/csc2024/Desktop/lab5/heap)
==27695==  Address 0x4a4f03c is 4 bytes before a block of size 36 alloc'd
==27695==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==27695==    by 0x401137: main (in /home/csc2024/Desktop/lab5/heap)
==27695== 
==27695== Invalid write of size 4
==27695==    at 0x40114E: main (in /home/csc2024/Desktop/lab5/heap)
==27695==  Address 0x4a4f03c is 4 bytes before a block of size 36 alloc'd
==27695==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==27695==    by 0x401137: main (in /home/csc2024/Desktop/lab5/heap)
==27695== 
==27695== 
==27695== HEAP SUMMARY:
==27695==     in use at exit: 36 bytes in 1 blocks
==27695==   total heap usage: 1 allocs, 0 frees, 36 bytes allocated
==27695== 
==27695== LEAK SUMMARY:
==27695==    definitely lost: 36 bytes in 1 blocks
==27695==    indirectly lost: 0 bytes in 0 blocks
==27695==      possibly lost: 0 bytes in 0 blocks
==27695==    still reachable: 0 bytes in 0 blocks
==27695==         suppressed: 0 bytes in 0 blocks
==27695== Rerun with --leak-check=full to see details of leaked memory
==27695== 
==27695== For lists of detected and suppressed errors, rerun with: -s
==27695== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
================================================================
==29981==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60400000000c at pc 0x00000040119d bp 0x7ffffd8cf420 sp 0x7ffffd8cf418
WRITE of size 4 at 0x60400000000c thread T0
    #0 0x40119c in main /home/csc2024/Desktop/lab5/heap_out_of_bound.c:7
    #1 0x7f55278bd082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x40109d in _start (/home/csc2024/Desktop/lab5/heap_asan+0x40109d)

0x60400000000c is located 4 bytes before 36-byte region [0x604000000010,0x604000000034)
allocated by thread T0 here:
    #0 0x7f5527b759df in __interceptor_malloc ../../.././libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x401163 in main /home/csc2024/Desktop/lab5/heap_out_of_bound.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/csc2024/Desktop/lab5/heap_out_of_bound.c:7 in main
Shadow bytes around the buggy address:
  0x603ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x603ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x603ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x603fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x603fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x604000000000: fa[fa]00 00 00 00 04 fa fa fa fa fa fa fa fa fa
  0x604000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x604000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x604000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x604000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x604000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==29981==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(){

        int s[9] = {0};
        int value = s[-1];
        s[-1] = 123;

}
```
#### Valgrind Report
```
==28566== Memcheck, a memory error detector
==28566== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28566== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==28566== Command: ./stack
==28566== 
==28566== 
==28566== HEAP SUMMARY:
==28566==     in use at exit: 0 bytes in 0 blocks
==28566==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==28566== 
==28566== All heap blocks were freed -- no leaks are possible
==28566== 
==28566== For lists of detected and suppressed errors, rerun with: -s
==28566== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==29891==ERROR: AddressSanitizer: stack-buffer-underflow on address 0x7f236370002c at pc 0x0000004012a6 bp 0x7fff11f10730 sp 0x7fff11f10728
WRITE of size 4 at 0x7f236370002c thread T0
    #0 0x4012a5 in main /home/csc2024/Desktop/lab5/stack_out_of_bound.c:8
    #1 0x7f2366084082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x4010ad in _start (/home/csc2024/Desktop/lab5/stack_asan+0x4010ad)

Address 0x7f236370002c is located in stack of thread T0 at offset 44 in frame
    #0 0x401175 in main /home/csc2024/Desktop/lab5/stack_out_of_bound.c:4

  This frame has 1 object(s):
    [48, 84) 's' (line 6) <== Memory access at offset 44 underflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-underflow /home/csc2024/Desktop/lab5/stack_out_of_bound.c:8 in main
Shadow bytes around the buggy address:
  0x7f23636ffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f23636ffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f23636ffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f23636fff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f23636fff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7f2363700000: f1 f1 f1 f1 f1[f1]00 00 00 00 04 f3 f3 f3 f3 f3
  0x7f2363700080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f2363700100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f2363700180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f2363700200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f2363700280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==29891==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>



int s[9] = {0};

int main(void){
        int value = s[9];
        s[9] = 333;
}
```
#### Valgrind Report
```
==28840== Memcheck, a memory error detector
==28840== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28840== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==28840== Command: ./global
==28840== 
==28840== 
==28840== HEAP SUMMARY:
==28840==     in use at exit: 0 bytes in 0 blocks
==28840==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==28840== 
==28840== All heap blocks were freed -- no leaks are possible
==28840== 
==28840== For lists of detected and suppressed errors, rerun with: -s
==28840== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==29794==ERROR: AddressSanitizer: global-buffer-overflow on address 0x000000404104 at pc 0x0000004011a5 bp 0x7ffefdb11e70 sp 0x7ffefdb11e68
WRITE of size 4 at 0x000000404104 thread T0
    #0 0x4011a4 in main /home/csc2024/Desktop/lab5/global_out_of_bound.c:10
    #1 0x7f7ccd5cf082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x4010ad in _start (/home/csc2024/Desktop/lab5/global_asan+0x4010ad)

0x000000404104 is located 0 bytes after global variable 's' defined in 'global_out_of_bound.c:6:5' (0x4040e0) of size 36
SUMMARY: AddressSanitizer: global-buffer-overflow /home/csc2024/Desktop/lab5/global_out_of_bound.c:10 in main
Shadow bytes around the buggy address:
  0x000000403e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000000403f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000000403f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000000404000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000000404080: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x000000404100:[04]f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x000000404180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000000404200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000000404280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000000404300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x000000404380: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==29794==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>


int main(void)
{
    int *s = (int *)malloc(9 * sizeof(int));
    for (int i = 0; i < 9; i++){
        s[i] = i;
    }
    free(s);
    int value = s[5];
    s[5] = 123;
}
```
#### Valgrind Report
```
==28953== Memcheck, a memory error detector
==28953== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==28953== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==28953== Command: ./uaf
==28953== 
==28953== Invalid read of size 4
==28953==    at 0x401188: main (in /home/csc2024/Desktop/lab5/uaf)
==28953==  Address 0x4a4f054 is 20 bytes inside a block of size 36 free'd
==28953==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==28953==    by 0x401183: main (in /home/csc2024/Desktop/lab5/uaf)
==28953==  Block was alloc'd at
==28953==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==28953==    by 0x401147: main (in /home/csc2024/Desktop/lab5/uaf)
==28953== 
==28953== Invalid write of size 4
==28953==    at 0x401196: main (in /home/csc2024/Desktop/lab5/uaf)
==28953==  Address 0x4a4f054 is 20 bytes inside a block of size 36 free'd
==28953==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==28953==    by 0x401183: main (in /home/csc2024/Desktop/lab5/uaf)
==28953==  Block was alloc'd at
==28953==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==28953==    by 0x401147: main (in /home/csc2024/Desktop/lab5/uaf)
==28953== 
==28953== 
==28953== HEAP SUMMARY:
==28953==     in use at exit: 0 bytes in 0 blocks
==28953==   total heap usage: 1 allocs, 1 frees, 36 bytes allocated
==28953== 
==28953== All heap blocks were freed -- no leaks are possible
==28953== 
==28953== For lists of detected and suppressed errors, rerun with: -s
==28953== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==29429==ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000024 at pc 0x0000004011ee bp 0x7ffe574f18f0 sp 0x7ffe574f18e8
WRITE of size 4 at 0x604000000024 thread T0
    #0 0x4011ed in main /home/csc2024/Desktop/lab5/use_after_free.c:13
    #1 0x7ff58487a082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x4010ad in _start (/home/csc2024/Desktop/lab5/uaf_asan+0x4010ad)

0x604000000024 is located 20 bytes inside of 36-byte region [0x604000000010,0x604000000034)
freed by thread T0 here:
    #0 0x7ff584b316a8 in __interceptor_free ../../.././libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x4011b7 in main /home/csc2024/Desktop/lab5/use_after_free.c:11

previously allocated by thread T0 here:
    #0 0x7ff584b329df in __interceptor_malloc ../../.././libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x401170 in main /home/csc2024/Desktop/lab5/use_after_free.c:7

SUMMARY: AddressSanitizer: heap-use-after-free /home/csc2024/Desktop/lab5/use_after_free.c:13 in main
Shadow bytes around the buggy address:
  0x603ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x603ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x603ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x603fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x603fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x604000000000: fa fa fd fd[fd]fd fd fa fa fa fa fa fa fa fa fa
  0x604000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x604000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x604000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x604000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x604000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==29429==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int *v;

void use_after_return(){
    int s[9] = {0};
    v = &s[5];
    return;

}
    


int main(void)
{
    use_after_return();
    int value = *v;
    *v = 123;
}
```
#### Valgrind Report
```
==29062== Memcheck, a memory error detector
==29062== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==29062== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==29062== Command: ./uar
==29062== 
==29062== 
==29062== HEAP SUMMARY:
==29062==     in use at exit: 0 bytes in 0 blocks
==29062==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==29062== 
==29062== All heap blocks were freed -- no leaks are possible
==29062== 
==29062== For lists of detected and suppressed errors, rerun with: -s
==29062== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==29301==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f3984f00044 at pc 0x0000004012ff bp 0x7ffc88ddd320 sp 0x7ffc88ddd318
WRITE of size 4 at 0x7f3984f00044 thread T0
    #0 0x4012fe in main /home/csc2024/Desktop/lab5/use_after_return.c:19
    #1 0x7f39877c5082 in __libc_start_main ../csu/libc-start.c:308
    #2 0x4010cd in _start (/home/csc2024/Desktop/lab5/uar_asan+0x4010cd)

Address 0x7f3984f00044 is located in stack of thread T0 at offset 68 in frame
    #0 0x401195 in use_after_return /home/csc2024/Desktop/lab5/use_after_return.c:6

  This frame has 1 object(s):
    [48, 84) 's' (line 7) <== Memory access at offset 68 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/csc2024/Desktop/lab5/use_after_return.c:19 in main
Shadow bytes around the buggy address:
  0x7f3984effd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f3984effe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f3984effe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f3984efff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f3984efff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7f3984f00000: f5 f5 f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5
  0x7f3984f00080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f3984f00100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f3984f00180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f3984f00200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7f3984f00280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==29301==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    int a[8];
    int b[8];
    a[16] = 9;
    printf("value of a[16] is %d\n", a[16]);
    printf("value of b[0] is %d\n", b[0]);

}

the output is:
value of a[16] is 9
value of b[0] is 0
```
### Why
According to some documents about introduction of ASAN, the left redzone will be 32 byte and right red zone will padding up to 31 byte to let the memory is 32 byte aligned. In the source code, since both array a and b are already 32 byte aligned, the left redzone of array a is 32 byte and the right redzone of array 
a is 0 byte because a is 32 bytes aligned. Plus the left redzone of the b array is 32 byte, the redzone between a and b is total 32 bytes. Therefore, the out-of-bound write `a[16] = 9` of array a with crossing the redzone between a and b, that is, `a[8] to a[15]` , will bypass the redzone check and does not trigger the asan report.