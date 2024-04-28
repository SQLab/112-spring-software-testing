# Answer

Name: 盧均祐
ID:111550065
編譯環境：gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | yes      | yes  |
| Stack out-of-bounds  | yes      | yes  |
| Global out-of-bounds | no       | yes  |
| Use-after-free       | yes      | yes  |
| Use-after-return     | yes      | yes  |

### Heap out-of-bounds
#### Source code
```cpp=
# include <stdio.h>
# include <stdlib.h>

int main() {
    int *p = (int *)malloc(2*sizeof(int)) ;
    // heap out of bound write
    p[2] = 10 ; 

    // heap out of bound read
    printf("heap out of bound :%d\n", p[2]) ;

    free(p) ;
    return 0 ;
}
```
#### Valgrind Report
```
==8612== Memcheck, a memory error detector
==8612== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8612== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==8612== Command: ./heap_out_of_bounds
==8612== 
==8612== Invalid write of size 4
==8612==    at 0x1091AB: main (in /home/mushroom/桌面/code/test/part_1/heap_out_of_bounds/heap_out_of_bounds)
==8612==  Address 0x4a9d048 is 0 bytes after a block of size 8 alloc'd
==8612==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==8612==    by 0x10919E: main (in /home/mushroom/桌面/code/test/part_1/heap_out_of_bounds/heap_out_of_bounds)
==8612== 
==8612== Invalid read of size 4
==8612==    at 0x1091B9: main (in /home/mushroom/桌面/code/test/part_1/heap_out_of_bounds/heap_out_of_bounds)
==8612==  Address 0x4a9d048 is 0 bytes after a block of size 8 alloc'd
==8612==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==8612==    by 0x10919E: main (in /home/mushroom/桌面/code/test/part_1/heap_out_of_bounds/heap_out_of_bounds)
==8612== 
heap out of bound :10
==8612== 
==8612== HEAP SUMMARY:
==8612==     in use at exit: 0 bytes in 0 blocks
==8612==   total heap usage: 2 allocs, 2 frees, 1,032 bytes allocated
==8612== 
==8612== All heap blocks were freed -- no leaks are possible
==8612== 
==8612== For lists of detected and suppressed errors, rerun with: -s
==8612== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8529==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000018 at pc 0x5c840959b294 bp 0x7ffdaa567710 sp 0x7ffdaa567700
WRITE of size 4 at 0x602000000018 thread T0
    #0 0x5c840959b293 in main /home/mushroom/桌面/code/test/part_1/heap_out_of_bounds/heap_out_of_bounds.c:7
    #1 0x7c4b82229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7c4b82229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c840959b164 in _start (/home/mushroom/桌面/code/test/part_1/heap_out_of_bounds/heap_out_of_bounds+0x1164)

0x602000000018 is located 0 bytes to the right of 8-byte region [0x602000000010,0x602000000018)
allocated by thread T0 here:
    #0 0x7c4b826b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5c840959b237 in main /home/mushroom/桌面/code/test/part_1/heap_out_of_bounds/heap_out_of_bounds.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/mushroom/桌面/code/test/part_1/heap_out_of_bounds/heap_out_of_bounds.c:7 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00[fa]fa fa fa fa fa fa fa fa fa fa fa fa
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
==8529==ABORTING
```

### Stack out-of-bounds
#### Source code
```cpp
# include <stdio.h>

int main() {
    int a[3] = {0, 1, 2} ;

    // stack out of bound write 
    a[3] = 3 ;

    // stack out of bound read 
    printf("stack out of bound :%d\n", a[3]) ;

    return 0 ;
}
```
#### Valgrind Report
```
==9191== Memcheck, a memory error detector
==9191== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9191== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==9191== Command: ./stack_out_of_bounds
==9191== 
stack out of bound :3
*** stack smashing detected ***: terminated
==9191== 
==9191== Process terminating with default action of signal 6 (SIGABRT)
==9191==    at 0x49079FC: __pthread_kill_implementation (pthread_kill.c:44)
==9191==    by 0x49079FC: __pthread_kill_internal (pthread_kill.c:78)
==9191==    by 0x49079FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==9191==    by 0x48B3475: raise (raise.c:26)
==9191==    by 0x48997F2: abort (abort.c:79)
==9191==    by 0x48FA675: __libc_message (libc_fatal.c:155)
==9191==    by 0x49A7599: __fortify_fail (fortify_fail.c:26)
==9191==    by 0x49A7565: __stack_chk_fail (stack_chk_fail.c:24)
==9191==    by 0x1091D1: main (in /home/mushroom/桌面/code/test/part_1/stack_out_of_bounds/stack_out_of_bounds)
==9191== 
==9191== HEAP SUMMARY:
==9191==     in use at exit: 1,024 bytes in 1 blocks
==9191==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==9191== 
==9191== LEAK SUMMARY:
==9191==    definitely lost: 0 bytes in 0 blocks
==9191==    indirectly lost: 0 bytes in 0 blocks
==9191==      possibly lost: 0 bytes in 0 blocks
==9191==    still reachable: 1,024 bytes in 1 blocks
==9191==         suppressed: 0 bytes in 0 blocks
==9191== Rerun with --leak-check=full to see details of leaked memory
==9191== 
==9191== For lists of detected and suppressed errors, rerun with: -s
==9191== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
中止 (核心已傾印)
```
### ASan Report
```
=================================================================
==9280==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe129ed9dc at pc 0x5b6a58c9a3b0 bp 0x7ffe129ed9a0 sp 0x7ffe129ed990
WRITE of size 4 at 0x7ffe129ed9dc thread T0
    #0 0x5b6a58c9a3af in main /home/mushroom/桌面/code/test/part_1/stack_out_of_bounds/stack_out_of_bounds.c:7
    #1 0x712376a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x712376a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b6a58c9a164 in _start (/home/mushroom/桌面/code/test/part_1/stack_out_of_bounds/stack_out_of_bounds+0x1164)

Address 0x7ffe129ed9dc is located in stack of thread T0 at offset 44 in frame
    #0 0x5b6a58c9a238 in main /home/mushroom/桌面/code/test/part_1/stack_out_of_bounds/stack_out_of_bounds.c:3

  This frame has 1 object(s):
    [32, 44) 'a' (line 4) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/mushroom/桌面/code/test/part_1/stack_out_of_bounds/stack_out_of_bounds.c:7 in main
Shadow bytes around the buggy address:
  0x100042535ae0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100042535af0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100042535b00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100042535b10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100042535b20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100042535b30: 00 00 00 00 00 00 f1 f1 f1 f1 00[04]f3 f3 00 00
  0x100042535b40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100042535b50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100042535b60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100042535b70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100042535b80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==9280==ABORTING
```

### Global out-of-bounds
#### Source code
```cpp
# include <stdio.h>
int a[10] ;

int main() {
    // global out of bound write
    a[20] = 20 ;

    // global out of bound read 
    printf("global out of bound :%d\n", a[20]) ;

    return 0 ;
}
```
#### Valgrind Report
```
==6489== Memcheck, a memory error detector
==6489== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6489== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6489== Command: ./global_out_of_bounds
==6489== 
global out of bound :20
==6489== 
==6489== HEAP SUMMARY:
==6489==     in use at exit: 0 bytes in 0 blocks
==6489==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==6489== 
==6489== All heap blocks were freed -- no leaks are possible
==6489== 
==6489== For lists of detected and suppressed errors, rerun with: -s
==6489== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==18799==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5c1c607c6130 at pc 0x5c1c607c3242 bp 0x7ffc3f15bcf0 sp 0x7ffc3f15bce0
WRITE of size 4 at 0x5c1c607c6130 thread T0
    #0 0x5c1c607c3241 in main /home/mushroom/桌面/code/test/global_out_of_bounds/global_out_of_bounds.c:6
    #1 0x7ce1f9829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ce1f9829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c1c607c3124 in _start (/home/mushroom/桌面/code/test/global_out_of_bounds/global_out_of_bounds+0x1124)

0x5c1c607c6130 is located 40 bytes to the right of global variable 'a' defined in 'global_out_of_bounds.c:2:5' (0x5c1c607c60e0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/mushroom/桌面/code/test/global_out_of_bounds/global_out_of_bounds.c:6 in main
Shadow bytes around the buggy address:
  0x0b840c0f0bd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b840c0f0be0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b840c0f0bf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b840c0f0c00: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0b840c0f0c10: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0b840c0f0c20: 00 f9 f9 f9 f9 f9[f9]f9 00 00 00 00 00 00 00 00
  0x0b840c0f0c30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b840c0f0c40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b840c0f0c50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b840c0f0c60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b840c0f0c70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==18799==ABORTING
```

### Use-after-free
#### Source code
```cpp
# include <stdio.h>
# include <stdlib.h>

int main() {
    int *p = (int *)malloc(sizeof(int)) ;
    *p = 10 ;
    free(p) ;
    
    // use after free
    printf ("use after free :%d\n", *p) ;

    return 0 ;
}
```
#### Valgrind Report
```
==9518== Memcheck, a memory error detector
==9518== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9518== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==9518== Command: ./use_after_free
==9518== 
==9518== Invalid read of size 4
==9518==    at 0x1091BD: main (in /home/mushroom/桌面/code/test/part_1/use_after_free/use_after_free)
==9518==  Address 0x4a9d040 is 0 bytes inside a block of size 4 free'd
==9518==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==9518==    by 0x1091B8: main (in /home/mushroom/桌面/code/test/part_1/use_after_free/use_after_free)
==9518==  Block was alloc'd at
==9518==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==9518==    by 0x10919E: main (in /home/mushroom/桌面/code/test/part_1/use_after_free/use_after_free)
==9518== 
use after free :10
==9518== 
==9518== HEAP SUMMARY:
==9518==     in use at exit: 0 bytes in 0 blocks
==9518==   total heap usage: 2 allocs, 2 frees, 1,028 bytes allocated
==9518== 
==9518== All heap blocks were freed -- no leaks are possible
==9518== 
==9518== For lists of detected and suppressed errors, rerun with: -s
==9518== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==9426==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5b1ac99c52d3 bp 0x7ffcfb0cbf00 sp 0x7ffcfb0cbef0
READ of size 4 at 0x602000000010 thread T0
    #0 0x5b1ac99c52d2 in main /home/mushroom/桌面/code/test/part_1/use_after_free/use_after_free.c:10
    #1 0x788e27629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x788e27629e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b1ac99c5184 in _start (/home/mushroom/桌面/code/test/part_1/use_after_free/use_after_free+0x1184)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x788e27ab4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5b1ac99c5284 in main /home/mushroom/桌面/code/test/part_1/use_after_free/use_after_free.c:7

previously allocated by thread T0 here:
    #0 0x788e27ab4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5b1ac99c5257 in main /home/mushroom/桌面/code/test/part_1/use_after_free/use_after_free.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/mushroom/桌面/code/test/part_1/use_after_free/use_after_free.c:10 in main
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
==9426==ABORTING
```

### Use-after-return
#### Source code
```cpp
# include <stdio.h>
# include <stdlib.h>

int *p ;

void func() {
    int arr[100] ;
    p = &arr[0] ;
}

int main () {
    func() ;
    // use after return
    *p = 20 ;
    printf ("use after return :%d\n", *p) ;

    return 0 ;
}
// gcc -fsanitize=address -Og -g -o use_after_return use_after_return.c
// ASAN_OPTIONS=detect_stack_use_after_return=1 ./use_after_return 
// or it will not detect use after return errors by default
```
#### Valgrind Report
```
==10639== Memcheck, a memory error detector
==10639== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==10639== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==10639== Command: ./use_after_return
==10639== 
==10639== Invalid write of size 4
==10639==    at 0x1091C5: main (in /home/mushroom/桌面/code/test/part_1/use_after_return/use_after_return)
==10639==  Address 0x1ffefffa50 is on thread 1's stack
==10639==  432 bytes below stack pointer
==10639== 
==10639== Invalid read of size 4
==10639==    at 0x1091D2: main (in /home/mushroom/桌面/code/test/part_1/use_after_return/use_after_return)
==10639==  Address 0x1ffefffa50 is on thread 1's stack
==10639==  432 bytes below stack pointer
==10639== 
use after return :20
==10639== 
==10639== HEAP SUMMARY:
==10639==     in use at exit: 0 bytes in 0 blocks
==10639==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==10639== 
==10639== All heap blocks were freed -- no leaks are possible
==10639== 
==10639== For lists of detected and suppressed errors, rerun with: -s
==10639== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==10553==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f78e16ae030 at pc 0x58b8aac663cf bp 0x7ffc5f86f570 sp 0x7ffc5f86f560
WRITE of size 4 at 0x7f78e16ae030 thread T0
    #0 0x58b8aac663ce in main /home/mushroom/桌面/code/test/part_1/use_after_return/use_after_return.c:14
    #1 0x7f78e4a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f78e4a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x58b8aac66164 in _start (/home/mushroom/桌面/code/test/part_1/use_after_return/use_after_return+0x1164)

Address 0x7f78e16ae030 is located in stack of thread T0 at offset 48 in frame
    #0 0x58b8aac66238 in func /home/mushroom/桌面/code/test/part_1/use_after_return/use_after_return.c:6

  This frame has 1 object(s):
    [48, 448) 'arr' (line 7) <== Memory access at offset 48 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/mushroom/桌面/code/test/part_1/use_after_return/use_after_return.c:14 in main
Shadow bytes around the buggy address:
  0x0fef9c2cdbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fef9c2cdbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fef9c2cdbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fef9c2cdbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fef9c2cdbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fef9c2cdc00: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0fef9c2cdc10: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0fef9c2cdc20: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0fef9c2cdc30: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0fef9c2cdc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fef9c2cdc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==10553==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
:::success
剛好越過 redzone(並沒有對 redzone 做讀寫)，並說明 ASan 能否找的出來？
Ans : 不行, 如以下程式
:::
```cpp
# include <stdio.h>
# include <stdlib.h>

int main () {
    int false_position = (16) ;
    int arr1 [5] = {0, 1, 2, 3, 4} ;    
    int arr2 [5] = {16, 17, 18, 19, 20} ;
    // out of bound write
    arr1[false_position] = 10 ;

    // out of bound read
    printf ("out of bound :%d\n", arr1[false_position]) ;

    // show array changes
    printf ("arr1 :") ;
    for (int i = 0 ; i < 5 ; i++) printf ("%d ", arr1[i]) ;
    printf ("\narr2 :") ;
    for (int i = 0 ; i < 5 ; i++) printf ("%d ", arr2[i]) ;
    printf ("\n") ;

    return 0 ;
}
// output:
// out of bound :10
// arr1 :0 1 2 3 4 
// arr2 :10 17 18 19 20 
```
### Why
:::success
程式內容：
建立兩個array，他們在記憶體空間會是連續的。而redzone會在分別在他們的後面形成。
這時候只要我們access第一個array的index夠大，大到超過第一個array後面的redzone size，就會access到第二個array的內容。
由於ASan是靠檢測redzone有沒有被污染來判斷是否有錯誤的，所以此時的out of bounds access就不會被ASan給偵測到。

實做：如果我們將false_postion變數由16改成10（如以下程式），ASan會顯示錯誤（如以下偵錯報告）。可以從錯誤報告裡看到該區段的記憶體分配，並找到可以越過redzone的index。
:::
```cpp=
# include <stdio.h>
# include <stdlib.h>

int main () {
    int false_position = (10) ;
    int arr1 [5] = {0, 1, 2, 3, 4} ;    
    int arr2 [5] = {16, 17, 18, 19, 20} ;
    // out of bound write
    arr1[false_position] = 10 ;

    // out of bound read
    printf ("out of bound :%d\n", arr1[false_position]) ;

    // show array changes
    printf ("arr1 :") ;
    for (int i = 0 ; i < 5 ; i++) printf ("%d ", arr1[i]) ;
    printf ("\narr2 :") ;
    for (int i = 0 ; i < 5 ; i++) printf ("%d ", arr2[i]) ;
    printf ("\n") ;

    return 0 ;
}
```
ASan output
```
=================================================================
==22179==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffa9860548 at pc 0x565456478569 bp 0x7fffa98604f0 sp 0x7fffa98604e0
WRITE of size 4 at 0x7fffa9860548 thread T0
    #0 0x565456478568 in main /home/mushroom/桌面/code/test/part_2/out_of_bound_write.c:9
    #1 0x746a54829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x746a54829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5654564781a4 in _start (/home/mushroom/桌面/code/test/part_2/out_of_bound_write+0x11a4)

Address 0x7fffa9860548 is located in stack of thread T0 at offset 72 in frame
    #0 0x565456478278 in main /home/mushroom/桌面/code/test/part_2/out_of_bound_write.c:4

  This frame has 2 object(s):
    [32, 52) 'arr1' (line 6) <== Memory access at offset 72 overflows this variable
    [96, 116) 'arr2' (line 7) <== Memory access at offset 72 underflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/mushroom/桌面/code/test/part_2/out_of_bound_write.c:9 in main
Shadow bytes around the buggy address:
  0x100075304050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075304060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075304070: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075304080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100075304090: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x1000753040a0: f1 f1 f1 f1 00 00 04 f2 f2[f2]f2 f2 00 00 04 f3
  0x1000753040b0: f3 f3 f3 f3 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000753040c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000753040d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000753040e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000753040f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==22179==ABORTING
```