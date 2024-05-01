# Answer

Name: 
ID: 

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | Yes      | Yes  |
| Stack out-of-bounds  |          |      |
| Global out-of-bounds |          |      |
| Use-after-free       |          |      |
| Use-after-return     |          |      |

### Heap out-of-bounds
#### Source code
```
#include<stdio.h>
#include<stdlib.h>

int main(){

    int *p = (int *)malloc(8*sizeof(int));

    // writing out of bounds
    p[8] = 88888888;

    //reading out of bounds
    printf("I'm so good at reading heap %d\n", p[8]);
    free(p);
    
    return 0;

}
```
#### Valgrind Report
```
==193724== Memcheck, a memory error detector
==193724== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==193724== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==193724== Command: ./bad_heap
==193724== 
==193724== Invalid write of size 4
==193724==    at 0x1091AB: main (in /home/chysong/Homeworks/bad_heap)
==193724==  Address 0x4a8e060 is 0 bytes after a block of size 32 alloc'd
==193724==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==193724==    by 0x10919E: main (in /home/chysong/Homeworks/bad_heap)
==193724== 
==193724== Invalid read of size 4
==193724==    at 0x1091B9: main (in /home/chysong/Homeworks/bad_heap)
==193724==  Address 0x4a8e060 is 0 bytes after a block of size 32 alloc'd
==193724==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==193724==    by 0x10919E: main (in /home/chysong/Homeworks/bad_heap)
==193724== 
I'm so good at reading heap 88888888
==193724== 
==193724== HEAP SUMMARY:
==193724==     in use at exit: 0 bytes in 0 blocks
==193724==   total heap usage: 2 allocs, 2 frees, 1,056 bytes allocated
==193724== 
==193724== All heap blocks were freed -- no leaks are possible
==193724== 
==193724== For lists of detected and suppressed errors, rerun with: -s
==193724== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==211964==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000060 at pc 0x55588e0cd294 bp 0x7ffcac4f3020 sp 0x7ffcac4f3010
WRITE of size 4 at 0x603000000060 thread T0
    #0 0x55588e0cd293 in main /home/chysong/Homeworks/ST/Lab5/bad_heap.c:9
    #1 0x7f27d2fd8d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f27d2fd8e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55588e0cd164 in _start (/home/chysong/Homeworks/ST/Lab5/bad_heap+0x1164)

0x603000000060 is located 0 bytes to the right of 32-byte region [0x603000000040,0x603000000060)
allocated by thread T0 here:
    #0 0x7f27d328c887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55588e0cd237 in main /home/chysong/Homeworks/ST/Lab5/bad_heap.c:6

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/chysong/Homeworks/ST/Lab5/bad_heap.c:9 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00 00 00[fa]fa fa fa
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
==211964==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include<stdio.h>

int main(){

    int a[4] = {1, 2, 3, 4,};   

    // writing out of bounds
    a[7] = 88888888;

    //reading out of bounds
    printf("I'm so good at reading stack %d\n", a[7]);
    
    return 0;

}
```
#### Valgrind Report
```
==219067== Memcheck, a memory error detector
==219067== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==219067== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==219067== Command: ./bad_stack
==219067== 
I'm so good at reading stack 88888888
*** stack smashing detected ***: terminated
==219067== 
==219067== Process terminating with default action of signal 6 (SIGABRT)
==219067==    at 0x48F89FC: __pthread_kill_implementation (pthread_kill.c:44)
==219067==    by 0x48F89FC: __pthread_kill_internal (pthread_kill.c:78)
==219067==    by 0x48F89FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==219067==    by 0x48A4475: raise (raise.c:26)
==219067==    by 0x488A7F2: abort (abort.c:79)
==219067==    by 0x48EB675: __libc_message (libc_fatal.c:155)
==219067==    by 0x4998599: __fortify_fail (fortify_fail.c:26)
==219067==    by 0x4998565: __stack_chk_fail (stack_chk_fail.c:24)
==219067==    by 0x1091D8: main (in /home/chysong/Homeworks/ST/Lab5/bad_stack)
==219067== 
==219067== HEAP SUMMARY:
==219067==     in use at exit: 1,024 bytes in 1 blocks
==219067==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==219067== 
==219067== LEAK SUMMARY:
==219067==    definitely lost: 0 bytes in 0 blocks
==219067==    indirectly lost: 0 bytes in 0 blocks
==219067==      possibly lost: 0 bytes in 0 blocks
==219067==    still reachable: 1,024 bytes in 1 blocks
==219067==         suppressed: 0 bytes in 0 blocks
==219067== Rerun with --leak-check=full to see details of leaked memory
==219067== 
==219067== For lists of detected and suppressed errors, rerun with: -s
==219067== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted
```
### ASan Report
```
=================================================================
==223722==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe8101046c at pc 0x55e0c6aa83e3 bp 0x7ffe81010420 sp 0x7ffe81010410
WRITE of size 4 at 0x7ffe8101046c thread T0
    #0 0x55e0c6aa83e2 in main /home/chysong/Homeworks/ST/Lab5/bad_stack.c:8
    #1 0x7feb8b002d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7feb8b002e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e0c6aa8164 in _start (/home/chysong/Homeworks/ST/Lab5/bad_stack+0x1164)

Address 0x7ffe8101046c is located in stack of thread T0 at offset 60 in frame
    #0 0x55e0c6aa8238 in main /home/chysong/Homeworks/ST/Lab5/bad_stack.c:3

  This frame has 1 object(s):
    [32, 48) 'a' (line 5) <== Memory access at offset 60 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/chysong/Homeworks/ST/Lab5/bad_stack.c:8 in main
Shadow bytes around the buggy address:
  0x1000501fa030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000501fa040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000501fa050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000501fa060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000501fa070: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x1000501fa080: 00 00 00 00 00 00 f1 f1 f1 f1 00 00 f3[f3]00 00
  0x1000501fa090: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000501fa0a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000501fa0b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000501fa0c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000501fa0d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==223722==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include<stdio.h>

int a[4] = {1, 2, 3, 4};


int main(){

    // writing out of bounds
    a[7] = 88888888;

    //reading out of bounds
    printf("I'm global master %d\n", a[7]);
    
    return 0;

}
```
#### Valgrind Report
```
==225062== Memcheck, a memory error detector
==225062== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==225062== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==225062== Command: ./bad_global
==225062== 
I'm global master 88888888
==225062== 
==225062== HEAP SUMMARY:
==225062==     in use at exit: 0 bytes in 0 blocks
==225062==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==225062== 
==225062== All heap blocks were freed -- no leaks are possible
==225062== 
==225062== For lists of detected and suppressed errors, rerun with: -s
==225062== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
SUMMARY: AddressSanitizer: global-buffer-overflow /home/chysong/Homeworks/ST/Lab5/bad_global.c:9 in main
Shadow bytes around the buggy address:
  0x0ab4931c0db0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab4931c0dc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab4931c0dd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab4931c0de0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab4931c0df0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ab4931c0e00: 00 00 00 00 00 00 f9[f9]f9 f9 f9 f9 00 00 00 00
  0x0ab4931c0e10: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab4931c0e20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab4931c0e30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab4931c0e40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab4931c0e50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==225687==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    
        int *p = (int *)malloc(8*sizeof(int));
    
        p[0] = 88888888;
    
        free(p);
        // use after free
        printf("It's not freed %d\n", p[8]);
        
        return 0;
}
```
#### Valgrind Report
```
==227437== Memcheck, a memory error detector
==227437== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==227437== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==227437== Command: ./use_freed
==227437== 
==227437== Invalid read of size 4
==227437==    at 0x1091C1: main (in /home/chysong/Homeworks/ST/Lab5/use_freed)
==227437==  Address 0x4a8e060 is 0 bytes after a block of size 32 free'd
==227437==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==227437==    by 0x1091B8: main (in /home/chysong/Homeworks/ST/Lab5/use_freed)
==227437==  Block was alloc'd at
==227437==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==227437==    by 0x10919E: main (in /home/chysong/Homeworks/ST/Lab5/use_freed)
==227437== 
It's not freed 0
==227437== 
==227437== HEAP SUMMARY:
==227437==     in use at exit: 0 bytes in 0 blocks
==227437==   total heap usage: 2 allocs, 2 frees, 1,056 bytes allocated
==227437== 
==227437== All heap blocks were freed -- no leaks are possible
==227437== 
==227437== For lists of detected and suppressed errors, rerun with: -s
==227437== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==228100==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x603000000060 at pc 0x55c6d45b22d5 bp 0x7fffa7dd5dc0 sp 0x7fffa7dd5db0
READ of size 4 at 0x603000000060 thread T0
    #0 0x55c6d45b22d4 in main /home/chysong/Homeworks/ST/Lab5/use_freed.c:12
    #1 0x7f39939f4d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f39939f4e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55c6d45b2184 in _start (/home/chysong/Homeworks/ST/Lab5/use_freed+0x1184)

0x603000000060 is located 0 bytes to the right of 32-byte region [0x603000000040,0x603000000060)
freed by thread T0 here:
    #0 0x7f3993ca8537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55c6d45b2284 in main /home/chysong/Homeworks/ST/Lab5/use_freed.c:10

previously allocated by thread T0 here:
    #0 0x7f3993ca8887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55c6d45b2257 in main /home/chysong/Homeworks/ST/Lab5/use_freed.c:6

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/chysong/Homeworks/ST/Lab5/use_freed.c:12 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa fd fd fd fd[fa]fa fa fa
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
==228100==ABORTING
```

### Use-after-return
#### Source code
```
#include<stdio.h>

int *p;

void foo(){
    int a[4] = {1, 2, 3, 4};
    p = a;
};

int main(){

    foo();

    printf("p was the same %d\n", p[0]);
    
    return 0;

}
```
#### Valgrind Report
```
==231538== Memcheck, a memory error detector
==231538== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==231538== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==231538== Command: ./use_returned
==231538== 
==231538== Conditional jump or move depends on uninitialised value(s)
==231538==    at 0x48D8AD6: __vfprintf_internal (vfprintf-internal.c:1516)
==231538==    by 0x48C279E: printf (printf.c:33)
==231538==    by 0x1091F2: main (in /home/chysong/Homeworks/ST/Lab5/use_returned)
==231538== 
==231538== Use of uninitialised value of size 8
==231538==    at 0x48BC2EB: _itoa_word (_itoa.c:177)
==231538==    by 0x48D7ABD: __vfprintf_internal (vfprintf-internal.c:1516)
==231538==    by 0x48C279E: printf (printf.c:33)
==231538==    by 0x1091F2: main (in /home/chysong/Homeworks/ST/Lab5/use_returned)
==231538== 
==231538== Conditional jump or move depends on uninitialised value(s)
==231538==    at 0x48BC2FC: _itoa_word (_itoa.c:177)
==231538==    by 0x48D7ABD: __vfprintf_internal (vfprintf-internal.c:1516)
==231538==    by 0x48C279E: printf (printf.c:33)
==231538==    by 0x1091F2: main (in /home/chysong/Homeworks/ST/Lab5/use_returned)
==231538== 
==231538== Conditional jump or move depends on uninitialised value(s)
==231538==    at 0x48D85C3: __vfprintf_internal (vfprintf-internal.c:1516)
==231538==    by 0x48C279E: printf (printf.c:33)
==231538==    by 0x1091F2: main (in /home/chysong/Homeworks/ST/Lab5/use_returned)
==231538== 
==231538== Conditional jump or move depends on uninitialised value(s)
==231538==    at 0x48D7C05: __vfprintf_internal (vfprintf-internal.c:1516)
==231538==    by 0x48C279E: printf (printf.c:33)
==231538==    by 0x1091F2: main (in /home/chysong/Homeworks/ST/Lab5/use_returned)
==231538== 
p was the same 1
==231538== 
==231538== HEAP SUMMARY:
==231538==     in use at exit: 0 bytes in 0 blocks
==231538==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==231538== 
==231538== All heap blocks were freed -- no leaks are possible
==231538== 
==231538== Use --track-origins=yes to see where uninitialised values come from
==231538== For lists of detected and suppressed errors, rerun with: -s
==231538== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==232680==ERROR: AddressSanitizer: stack-use-after-return on address 0x7fd0aa218020 at pc 0x55a7a71ec440 bp 0x7ffeeeb1e1e0 sp 0x7ffeeeb1e1d0
READ of size 4 at 0x7fd0aa218020 thread T0
    #0 0x55a7a71ec43f in main /home/chysong/Homeworks/ST/Lab5/use_returned.c:14
    #1 0x7fd0ad9b6d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd0ad9b6e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55a7a71ec184 in _start (/home/chysong/Homeworks/ST/Lab5/use_returned+0x1184)

Address 0x7fd0aa218020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55a7a71ec258 in foo /home/chysong/Homeworks/ST/Lab5/use_returned.c:5

  This frame has 1 object(s):
    [32, 48) 'a' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/chysong/Homeworks/ST/Lab5/use_returned.c:14 in main
Shadow bytes around the buggy address:
  0x0ffa9543afb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffa9543afc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffa9543afd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffa9543afe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffa9543aff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ffa9543b000: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0ffa9543b010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffa9543b020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffa9543b030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffa9543b040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffa9543b050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==232680==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include<stdio.h>

int main(){

    int a[4] = {1, 2, 3, 4,};   
    int b[4] = {1, 2, 3, 4,};   

    printf("I'm so good at reading stack %d\n", a[9]);
    
    return 0;

}
```
### Why
When declaring two arrays, their memories will be allocated consecutively. ASAN will put red zones before, between, and after them. Suppose we access the first array out of bounds to a specific degree. In that case, it is possible for us to access the data in the second without touching the red zone between the two arrays, avoiding being detected by ASAN.