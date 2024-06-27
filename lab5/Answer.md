# Answer

Name: 鄧人豪
ID: 110550174

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    Yes   |  Yes |
| Stack out-of-bounds  |    No    |  Yes |
| Global out-of-bounds |    No    |  Yes |
| Use-after-free       |    Yes   |  Yes |
| Use-after-return     |    No    |  Yes |

### Compiler Information
```
$ gcc --version
gcc (GCC) 13.2.1 20230801

Valgrind-3.22.0
```

### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>

int main() {
    int *a = malloc(10 * sizeof(int));
    a[10] = 0;
    return 0;
}
```
#### Valgrind Report
```
==4360== Invalid write of size 4
==4360==    at 0x109157: main (heap_out_of_bounds.c:5)
==4360==  Address 0x4a85068 is 0 bytes after a block of size 40 alloc'd
==4360==    at 0x4843788: malloc (vg_replace_malloc.c:442)
==4360==    by 0x10914A: main (heap_out_of_bounds.c:4)
==4360== 
==4360== 
==4360== HEAP SUMMARY:
==4360==     in use at exit: 40 bytes in 1 blocks
==4360==   total heap usage: 1 allocs, 0 frees, 40 bytes allocated
==4360== 
==4360== 40 bytes in 1 blocks are definitely lost in loss record 1 of 1
==4360==    at 0x4843788: malloc (vg_replace_malloc.c:442)
==4360==    by 0x10914A: main (heap_out_of_bounds.c:4)
==4360== 
==4360== LEAK SUMMARY:
==4360==    definitely lost: 40 bytes in 1 blocks
==4360==    indirectly lost: 0 bytes in 0 blocks
==4360==      possibly lost: 0 bytes in 0 blocks
==4360==    still reachable: 0 bytes in 0 blocks
==4360==         suppressed: 0 bytes in 0 blocks
==4360== 
==4360== For lists of detected and suppressed errors, rerun with: -s
==4360== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==7158==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x504000000038 at pc 0x5da05691c1b0 bp 0x7fff22265350 sp 0x7fff22265340
WRITE of size 4 at 0x504000000038 thread T0
    #0 0x5da05691c1af in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/heap_out_of_bounds.c:5
    #1 0x738e788e8ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x738e788e8d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x5da05691c094 in _start (/win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/heap_out_of_bounds+0x1094) (BuildId: 27aeb5bc862b09a8bd21ea9c4c2cb42781db13d1)

0x504000000038 is located 0 bytes after 40-byte region [0x504000000010,0x504000000038)
allocated by thread T0 here:
    #0 0x738e782e1359 in __interceptor_malloc /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x5da05691c176 in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/heap_out_of_bounds.c:4

SUMMARY: AddressSanitizer: heap-buffer-overflow /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/heap_out_of_bounds.c:5 in main
Shadow bytes around the buggy address:
  0x503ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x504000000000: fa fa 00 00 00 00 00[fa]fa fa fa fa fa fa fa fa
  0x504000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==7158==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdlib.h>

int main() {
    int a[10];
    a[10] = 0;
    return 0;
}
```
#### Valgrind Report
```
*** stack smashing detected ***: terminated
==5220== 
==5220== Process terminating with default action of signal 6 (SIGABRT): dumping core
==5220==    at 0x492D32C: __pthread_kill_implementation (pthread_kill.c:44)
==5220==    by 0x48DC6C7: raise (raise.c:26)
==5220==    by 0x48C44B7: abort (abort.c:79)
==5220==    by 0x48C5394: __libc_message_impl.cold (libc_fatal.c:132)
==5220==    by 0x49B475A: __fortify_fail (fortify_fail.c:24)
==5220==    by 0x49B5A75: __stack_chk_fail (stack_chk_fail.c:24)
==5220==    by 0x10916F: main (stack_out_of_bounds.c:7)
==5220== 
==5220== HEAP SUMMARY:
==5220==     in use at exit: 0 bytes in 0 blocks
==5220==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==5220== 
==5220== All heap blocks were freed -- no leaks are possible
==5220== 
==5220== For lists of detected and suppressed errors, rerun with: -s
==5220== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==10803==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x75f3e7b09058 at pc 0x5e8ae913626f bp 0x7ffe79dcbc40 sp 0x7ffe79dcbc30
WRITE of size 4 at 0x75f3e7b09058 thread T0
    #0 0x5e8ae913626e in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/stack_out_of_bounds.c:5
    #1 0x75f3ea043ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x75f3ea043d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x5e8ae91360a4 in _start (/win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/stack_out_of_bounds+0x10a4) (BuildId: 2e059e9c8b1266b537fa0c3054971344044abba3)

Address 0x75f3e7b09058 is located in stack of thread T0 at offset 88 in frame
    #0 0x5e8ae9136188 in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/stack_out_of_bounds.c:3

  This frame has 1 object(s):
    [48, 88) 'a' (line 4) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/stack_out_of_bounds.c:5 in main
Shadow bytes around the buggy address:
  0x75f3e7b08d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x75f3e7b08e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x75f3e7b08e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x75f3e7b08f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x75f3e7b08f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x75f3e7b09000: f1 f1 f1 f1 f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3
  0x75f3e7b09080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x75f3e7b09100: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x75f3e7b09180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x75f3e7b09200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x75f3e7b09280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==10803==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdlib.h>

int a[10];

int main() {
    a[10] = 0;
    return 0;
}
```
#### Valgrind Report
```
==5470== HEAP SUMMARY:
==5470==     in use at exit: 0 bytes in 0 blocks
==5470==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==5470== 
==5470== All heap blocks were freed -- no leaks are possible
==5470== 
==5470== For lists of detected and suppressed errors, rerun with: -s
==5470== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==10849==ERROR: AddressSanitizer: global-buffer-overflow on address 0x64fe9b805108 at pc 0x64fe9b8021af bp 0x7fffbfba7a70 sp 0x7fffbfba7a60
WRITE of size 4 at 0x64fe9b805108 thread T0
    #0 0x64fe9b8021ae in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/global_out_of_bounds.c:6
    #1 0x78564ee43ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x78564ee43d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x64fe9b8020a4 in _start (/win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/global_out_of_bounds+0x10a4) (BuildId: 5fa2b404e21df367fa47e4ad28a8045ccaf6f3bd)

0x64fe9b805108 is located 0 bytes after global variable 'a' defined in 'global_out_of_bounds.c:3:5' (0x64fe9b8050e0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/global_out_of_bounds.c:6 in main
Shadow bytes around the buggy address:
  0x64fe9b804e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x64fe9b804f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x64fe9b804f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x64fe9b805000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x64fe9b805080: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x64fe9b805100: 00[f9]f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x64fe9b805180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x64fe9b805200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x64fe9b805280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x64fe9b805300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x64fe9b805380: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==10849==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdlib.h>

int main() {
    int *a = malloc(10 * sizeof(int));
    free(a);
    a[0] = 0;
    return 0;
}
```
#### Valgrind Report
```
==5640== Invalid write of size 4
==5640==    at 0x10916F: main (use_after_free.c:6)
==5640==  Address 0x4a85040 is 0 bytes inside a block of size 40 free'd
==5640==    at 0x48468CF: free (vg_replace_malloc.c:985)
==5640==    by 0x10916A: main (use_after_free.c:5)
==5640==  Block was alloc'd at
==5640==    at 0x4843788: malloc (vg_replace_malloc.c:442)
==5640==    by 0x10915A: main (use_after_free.c:4)
==5640== 
==5640== 
==5640== HEAP SUMMARY:
==5640==     in use at exit: 0 bytes in 0 blocks
==5640==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==5640== 
==5640== All heap blocks were freed -- no leaks are possible
==5640== 
==5640== For lists of detected and suppressed errors, rerun with: -s
==5640== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==10920==ERROR: AddressSanitizer: heap-use-after-free on address 0x504000000010 at pc 0x6246a447d1c3 bp 0x7fff716ce170 sp 0x7fff716ce160
WRITE of size 4 at 0x504000000010 thread T0
    #0 0x6246a447d1c2 in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_free.c:6
    #1 0x7a5d24c43ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x7a5d24c43d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x6246a447d0a4 in _start (/win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_free+0x10a4) (BuildId: 7290921cfa0b0be59d49b26f68edaa4d26a86e37)

0x504000000010 is located 0 bytes inside of 40-byte region [0x504000000010,0x504000000038)
freed by thread T0 here:
    #0 0x7a5d24edfdb2 in __interceptor_free /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:52
    #1 0x6246a447d18e in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_free.c:5

previously allocated by thread T0 here:
    #0 0x7a5d24ee1359 in __interceptor_malloc /usr/src/debug/gcc/gcc/libsanitizer/asan/asan_malloc_linux.cpp:69
    #1 0x6246a447d183 in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_free.c:4

SUMMARY: AddressSanitizer: heap-use-after-free /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_free.c:6 in main
Shadow bytes around the buggy address:
  0x503ffffffd80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x503fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x504000000000: fa fa[fd]fd fd fd fd fa fa fa fa fa fa fa fa fa
  0x504000000080: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x504000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==10920==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdlib.h>

int *global_ptr;

void allocate() {
    int local_var[100];
    global_ptr = &local_var[0];
}

int main() {
    allocate();
    *global_ptr = 10;    
    return 0;
}
```
#### Valgrind Report
```
==235509== Memcheck, a memory error detector
==235509== Copyright (C) 2002-2022, and GNU GPL'd, by Julian Seward et al.
==235509== Using Valgrind-3.22.0 and LibVEX; rerun with -h for copyright info
==235509== Command: ./use_after_return
==235509== 
==235509== Invalid write of size 4
==235509==    at 0x10918D: main (use_after_return.c:12)
==235509==  Address 0x1ffefff090 is on thread 1's stack
==235509==  432 bytes below stack pointer
==235509== 
==235509== 
==235509== HEAP SUMMARY:
==235509==     in use at exit: 0 bytes in 0 blocks
==235509==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==235509== 
==235509== All heap blocks were freed -- no leaks are possible
==235509== 
==235509== For lists of detected and suppressed errors, rerun with: -s
==235509== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==12352==ERROR: AddressSanitizer: stack-use-after-return on address 0x7fe39cf09030 at pc 0x5e10baf612f7 bp 0x7ffe6471f610 sp 0x7ffe6471f600
WRITE of size 4 at 0x7fe39cf09030 thread T0
    #0 0x5e10baf612f6 in main /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_return.c:12
    #1 0x7fe39f243ccf  (/usr/lib/libc.so.6+0x25ccf) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #2 0x7fe39f243d89 in __libc_start_main (/usr/lib/libc.so.6+0x25d89) (BuildId: 6542915cee3354fbcf2b3ac5542201faec43b5c9)
    #3 0x5e10baf610c4 in _start (/win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_return+0x10c4) (BuildId: 6ec5790c8d71f4f2c573b596dc80b82394ee3acc)

Address 0x7fe39cf09030 is located in stack of thread T0 at offset 48 in frame
    #0 0x5e10baf611a8 in allocate /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_return.c:5

  This frame has 1 object(s):
    [48, 448) 'local_var' (line 6) <== Memory access at offset 48 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /win10/D_drive/thomas/NYCU_Courses/Sixth_Semester/Software_Testing/Lab/112-spring-software-testing/lab5/asan/use_after_return.c:12 in main
Shadow bytes around the buggy address:
  0x7fe39cf08d80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fe39cf08e00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fe39cf08e80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fe39cf08f00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fe39cf08f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x7fe39cf09000: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x7fe39cf09080: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x7fe39cf09100: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x7fe39cf09180: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x7fe39cf09200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x7fe39cf09280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==12352==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int a[8];
    int b[8];

    a[16] = 20;
    printf("a[16]: %d\n", a[16]);
    printf("b[0]: %d\n", b[0]);

    return 0;
}
```
Output:
```
a[16]: 20
b[0]: 20
```
### Why
In [Debloating Address Sanitizer](https://www.usenix.org/system/files/sec22summer_zhang-yuchen.pdf), it has the following paragraph about the redzone of stack:
> Stack: Before and after each array on the stack, ASan inserts
two neighboring arrays to work as the left redzone and the
right redzone, respectively. The left redzone has 32 bytes, and
the right redzone has 32 bytes plus to up to 31 bytes to align
the original array. Both redzones are poisoned when the host
function is entered at execution time.

So for the example above, the redzone of array `a` is `a[8]` to `a[15]` because `a` is already aligned to 32 bytes, and the redzone has 32 bytes. When we write to `a[16]`, it will bypass the redzone of array `a` and write to array `b`.