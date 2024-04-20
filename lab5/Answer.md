# Answer


Name: 謝翔丞
ID: 312551183

## GCC Version
gcc version 11.4.0 (Ubuntu 11.4.0-1ubuntu1~22.04) 

## Valgrind Version
valgrind-3.18.1


## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   Yes    |  Yes |
| Stack out-of-bounds  |    No    |  Yes |
| Global out-of-bounds |    No    |  Yes |
| Use-after-free       |   Yes    |  Yes |
| Use-after-return     |    No    |  Yes |



### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>
#include <stdio.h>

int main(){
    int length = 6;
    int *p = (int*) malloc(length * sizeof(int));
    
    p[6] = 6;
    printf("%d", p[6]);
    
    return 0;
}
```
#### Valgrind Report
```
==53== Memcheck, a memory error detector
==53== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==53== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==53== Command: ./hoob
==53== 
==53== Invalid write of size 4
==53==    at 0x109199: main (in /home/docker/workspace/hoob)
==53==  Address 0x4a8b058 is 0 bytes after a block of size 24 alloc'd
==53==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==53==    by 0x10918C: main (in /home/docker/workspace/hoob)
==53== 
==53== Invalid read of size 4
==53==    at 0x1091A7: main (in /home/docker/workspace/hoob)
==53==  Address 0x4a8b058 is 0 bytes after a block of size 24 alloc'd
==53==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==53==    by 0x10918C: main (in /home/docker/workspace/hoob)
==53== 
6==53== 
==53== HEAP SUMMARY:
==53==     in use at exit: 24 bytes in 1 blocks
==53==   total heap usage: 2 allocs, 1 frees, 1,048 bytes allocated
==53== 
==53== LEAK SUMMARY:
==53==    definitely lost: 24 bytes in 1 blocks
==53==    indirectly lost: 0 bytes in 0 blocks
==53==      possibly lost: 0 bytes in 0 blocks
==53==    still reachable: 0 bytes in 0 blocks
==53==         suppressed: 0 bytes in 0 blocks
==53== Rerun with --leak-check=full to see details of leaked memory
==53== 
==53== For lists of detected and suppressed errors, rerun with: -s
==53== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
=======
```
### ASan Report
```
=================================================================
==45==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000058 at pc 0x562195772290 bp 0x7ffe046c02d0 sp 0x7ffe046c02c0
WRITE of size 4 at 0x603000000058 thread T0
    #0 0x56219577228f in main (/home/docker/workspace/hoob+0x128f)
    #1 0x7fb540bdcd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb540bdce3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x562195772164 in _start (/home/docker/workspace/hoob+0x1164)

0x603000000058 is located 0 bytes to the right of 24-byte region [0x603000000040,0x603000000058)
allocated by thread T0 here:
    #0 0x7fb540e90887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56219577224c in main (/home/docker/workspace/hoob+0x124c)
    #2 0x7fb540bdcd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/docker/workspace/hoob+0x128f) in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00 00[fa]fa fa fa fa
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
==45==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main(){
    int a[100];
    int b = a[101];
    
    return 0;
}
```
#### Valgrind Report
```
==74== Memcheck, a memory error detector
==74== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==74== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==74== Command: ./soob
==74== 
==74== 
==74== HEAP SUMMARY:
==74==     in use at exit: 0 bytes in 0 blocks
==74==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==74== 
==74== All heap blocks were freed -- no leaks are possible
==74== 
==74== For lists of detected and suppressed errors, rerun with: -s
==74== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==66==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffc8b7b7124 at pc 0x564c898cd2a8 bp 0x7ffc8b7b6f40 sp 0x7ffc8b7b6f30
READ of size 4 at 0x7ffc8b7b7124 thread T0
    #0 0x564c898cd2a7 in main (/home/docker/workspace/soob+0x12a7)
    #1 0x7f12da250d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f12da250e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x564c898cd104 in _start (/home/docker/workspace/soob+0x1104)

Address 0x7ffc8b7b7124 is located in stack of thread T0 at offset 452 in frame
    #0 0x564c898cd1d8 in main (/home/docker/workspace/soob+0x11d8)

  This frame has 1 object(s):
    [48, 448) 'a' (line 4) <== Memory access at offset 452 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/docker/workspace/soob+0x12a7) in main
Shadow bytes around the buggy address:
  0x1000116eedd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000116eede0: 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1
  0x1000116eedf0: f1 f1 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000116eee00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000116eee10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x1000116eee20: 00 00 00 00[f3]f3 f3 f3 f3 f3 f3 f3 00 00 00 00
  0x1000116eee30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000116eee40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000116eee50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000116eee60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000116eee70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==66==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int a[100] = {0};

int main(){
    printf("%d\n", a[101]);
    
    return 0;
}
```
#### Valgrind Report
```
==83== Memcheck, a memory error detector
==83== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==83== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==83== Command: ./goob
==83== 
0
==83== 
==83== HEAP SUMMARY:
==83==     in use at exit: 0 bytes in 0 blocks
==83==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==83== 
==83== All heap blocks were freed -- no leaks are possible
==83== 
==83== For lists of detected and suppressed errors, rerun with: -s
==83== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==91==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55e4e3e11274 at pc 0x55e4e3e0e22b bp 0x7fff43b05a00 sp 0x7fff43b059f0
READ of size 4 at 0x55e4e3e11274 thread T0
    #0 0x55e4e3e0e22a in main (/home/docker/workspace/goob+0x122a)
    #1 0x7fd84eb0cd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd84eb0ce3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e4e3e0e124 in _start (/home/docker/workspace/goob+0x1124)

0x55e4e3e11274 is located 4 bytes to the right of global variable 'a' defined in 'goob.c:3:5' (0x55e4e3e110e0) of size 400
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/docker/workspace/goob+0x122a) in main
Shadow bytes around the buggy address:
  0x0abd1c7ba1f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd1c7ba200: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0abd1c7ba210: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x0abd1c7ba220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd1c7ba230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0abd1c7ba240: 00 00 00 00 00 00 00 00 00 00 00 00 00 00[f9]f9
  0x0abd1c7ba250: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd1c7ba260: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd1c7ba270: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd1c7ba280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0abd1c7ba290: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==91==ABORTING
```


### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    int *a = malloc(4 * sizeof(int));
    free(a);
    printf("%d\n", a[1]);
    
    return 0;
}
```
#### Valgrind Report
```
==99== Memcheck, a memory error detector
==99== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==99== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==99== Command: ./uaf
==99== 
==99== Invalid read of size 4
==99==    at 0x1091B7: main (in /home/docker/workspace/uaf)
==99==  Address 0x4a8b044 is 4 bytes inside a block of size 16 free'd
==99==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==99==    by 0x1091AE: main (in /home/docker/workspace/uaf)
==99==  Block was alloc'd at
==99==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==99==    by 0x10919E: main (in /home/docker/workspace/uaf)
==99== 
0
==99== 
==99== HEAP SUMMARY:
==99==     in use at exit: 0 bytes in 0 blocks
==99==   total heap usage: 2 allocs, 2 frees, 1,040 bytes allocated
==99== 
==99== All heap blocks were freed -- no leaks are possible
==99== 
==99== For lists of detected and suppressed errors, rerun with: -s
==99== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==106==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000014 at pc 0x5619917bb28e bp 0x7fff34b9f390 sp 0x7fff34b9f380
READ of size 4 at 0x602000000014 thread T0
    #0 0x5619917bb28d in main (/home/docker/workspace/uaf+0x128d)
    #1 0x7fa0a9a9cd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fa0a9a9ce3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5619917bb164 in _start (/home/docker/workspace/uaf+0x1164)

0x602000000014 is located 4 bytes inside of 16-byte region [0x602000000010,0x602000000020)
freed by thread T0 here:
    #0 0x7fa0a9d50537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5619917bb24e in main (/home/docker/workspace/uaf+0x124e)
    #2 0x7fa0a9a9cd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7fa0a9d50887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5619917bb23e in main (/home/docker/workspace/uaf+0x123e)
    #2 0x7fa0a9a9cd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/docker/workspace/uaf+0x128d) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[fd]fd fa fa fa fa fa fa fa fa fa fa fa fa
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
==106==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

char* x;

void foo() {
    char stack_buffer[42];
    x = &stack_buffer[13];
}

int main() {
    foo();
    *x = 42;
    
    return 0;
}
```
#### Valgrind Report
```
==119== Memcheck, a memory error detector
==119== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==119== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==119== Command: ./uar
==119== 
==119== 
==119== HEAP SUMMARY:
==119==     in use at exit: 0 bytes in 0 blocks
==119==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==119== 
==119== All heap blocks were freed -- no leaks are possible
==119== 
==119== For lists of detected and suppressed errors, rerun with: -s
==119== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==125==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f857855003d at pc 0x55ff2475f36f bp 0x7ffe222159c0 sp 0x7ffe222159b0
WRITE of size 1 at 0x7f857855003d thread T0
    #0 0x55ff2475f36e in main (/home/docker/workspace/uar+0x136e)
    #1 0x7f857bbf0d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f857bbf0e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55ff2475f144 in _start (/home/docker/workspace/uar+0x1144)

Address 0x7f857855003d is located in stack of thread T0 at offset 61 in frame
    #0 0x55ff2475f218 in foo (/home/docker/workspace/uar+0x1218)

  This frame has 1 object(s):
    [48, 90) 'stack_buffer' (line 7) <== Memory access at offset 61 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (/home/docker/workspace/uar+0x136e) in main
Shadow bytes around the buggy address:
  0x0ff12f0a1fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff12f0a1fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff12f0a1fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff12f0a1fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff12f0a1ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ff12f0a2000: f5 f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5
  0x0ff12f0a2010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff12f0a2020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff12f0a2030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff12f0a2040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff12f0a2050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==125==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>

int main(){
    int a[8]={1,1,1,1,1,1,1,1};
    int b[8]={1,1,1,1,1,1,1,1};
    a[8+8] = 100;   // oob write bypass redzone
	printf("%d\n",b[0]);
    
    return 0;
}
```
### Why
```
  0x100009839780: 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00 00 00
=>0x100009839790:[f2]f2 f2 f2 00 00 00 00 f3 f3 f3 f3 00 00 00 00
```
This is the case that we write a[8],we can find that there are 32 bytes redzone after array a , so if we can cross that redzone , we will be able to pass  the check of ASan.

So in above source code , using a[8+8] is viewed as safe by ASan.

### Output
```
docker@61b7ed00c33f:~/workspace$ ./bpz 
100
```


