# Answer

Name: 鍾博笙
ID: 109502529
Compiler: gcc version 11.4.0 (Ubuntu 11.4.0-1ubuntu1~22.04)

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | V        | V    |
| Stack out-of-bounds  | X        | V    |
| Global out-of-bounds | X        | V    |
| Use-after-free       | V        | V    |
| Use-after-return     | V        | V    |
V:有偵測到, X:沒偵測到
### Heap out-of-bounds
#### Source code
```
#include <stdlib.h>
#include <stdio.h>
int main() {
    int *a = (int *)malloc(10 * sizeof(int));
    a[10] = 0;
    printf("%d\n", a[10]);
    free(a);
    return 0;
}
```
#### Valgrind Report
```
==5421== Memcheck, a memory error detector
==5421== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5421== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==5421== Command: ./heap_out_of_bounds
==5421== 
==5421== Invalid write of size 4
==5421==    at 0x1091AB: main (in /home/posh/week09/112-spring-software-testing/lab/heap_out_of_bounds)
==5421==  Address 0x4a96068 is 0 bytes after a block of size 40 alloc'd
==5421==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5421==    by 0x10919E: main (in /home/posh/week09/112-spring-software-testing/lab/heap_out_of_bounds)
==5421== 
==5421== Invalid read of size 4
==5421==    at 0x1091B9: main (in /home/posh/week09/112-spring-software-testing/lab/heap_out_of_bounds)
==5421==  Address 0x4a96068 is 0 bytes after a block of size 40 alloc'd
==5421==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==5421==    by 0x10919E: main (in /home/posh/week09/112-spring-software-testing/lab/heap_out_of_bounds)
==5421== 
0
==5421== 
==5421== HEAP SUMMARY:
==5421==     in use at exit: 0 bytes in 0 blocks
==5421==   total heap usage: 2 allocs, 2 frees, 1,064 bytes allocated
==5421== 
==5421== All heap blocks were freed -- no leaks are possible
==5421== 
==5421== For lists of detected and suppressed errors, rerun with: -s
==5421== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==5775==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x5ffdb83f3294 bp 0x7ffc40556190 sp 0x7ffc40556180
WRITE of size 4 at 0x604000000038 thread T0
    #0 0x5ffdb83f3293 in main /home/posh/week09/112-spring-software-testing/lab/heap_out_of_bounds.c:6
    #1 0x7caa07429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7caa07429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ffdb83f3164 in _start (/home/posh/week09/112-spring-software-testing/lab/heap_out_of_bounds_san+0x1164)

0x604000000038 is located 0 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7caa078b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5ffdb83f3237 in main /home/posh/week09/112-spring-software-testing/lab/heap_out_of_bounds.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/posh/week09/112-spring-software-testing/lab/heap_out_of_bounds.c:6 in main
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
==5775==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
int main() {
    int a[10];
    a[10] = 13;
    printf("%d\n", a[10]);
    return 0;
}
```
#### Valgrind Report
```
==4122== Memcheck, a memory error detector
==4122== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==4122== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==4122== Command: ./stack_out_of_bounds
==4122== 
13
*** stack smashing detected ***: terminated
==4122== 
==4122== Process terminating with default action of signal 6 (SIGABRT)
==4122==    at 0x49009FC: __pthread_kill_implementation (pthread_kill.c:44)
==4122==    by 0x49009FC: __pthread_kill_internal (pthread_kill.c:78)
==4122==    by 0x49009FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==4122==    by 0x48AC475: raise (raise.c:26)
==4122==    by 0x48927F2: abort (abort.c:79)
==4122==    by 0x48F3675: __libc_message (libc_fatal.c:155)
==4122==    by 0x49A0599: __fortify_fail (fortify_fail.c:26)
==4122==    by 0x49A0565: __stack_chk_fail (stack_chk_fail.c:24)
==4122==    by 0x1091BC: main (in /home/posh/week09/112-spring-software-testing/lab/stack_out_of_bounds)
==4122== 
==4122== HEAP SUMMARY:
==4122==     in use at exit: 1,024 bytes in 1 blocks
==4122==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==4122== 
==4122== LEAK SUMMARY:
==4122==    definitely lost: 0 bytes in 0 blocks
==4122==    indirectly lost: 0 bytes in 0 blocks
==4122==      possibly lost: 0 bytes in 0 blocks
==4122==    still reachable: 1,024 bytes in 1 blocks
==4122==         suppressed: 0 bytes in 0 blocks
==4122== Rerun with --leak-check=full to see details of leaked memory
==4122== 
==4122== For lists of detected and suppressed errors, rerun with: -s
==4122== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted (core dumped)
```
### ASan Report
```
=================================================================
==6158==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffcf821bf08 at pc 0x5d09e0f0b34c bp 0x7ffcf821bea0 sp 0x7ffcf821be90
WRITE of size 4 at 0x7ffcf821bf08 thread T0
    #0 0x5d09e0f0b34b in main /home/posh/week09/112-spring-software-testing/lab/stack_out_of_bounds.c:5
    #1 0x773933a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x773933a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5d09e0f0b164 in _start (/home/posh/week09/112-spring-software-testing/lab/stack_out_of_bounds_asan+0x1164)

Address 0x7ffcf821bf08 is located in stack of thread T0 at offset 88 in frame
    #0 0x5d09e0f0b238 in main /home/posh/week09/112-spring-software-testing/lab/stack_out_of_bounds.c:3

  This frame has 1 object(s):
    [48, 88) 'a' (line 4) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/posh/week09/112-spring-software-testing/lab/stack_out_of_bounds.c:5 in main
Shadow bytes around the buggy address:
  0x10001f03b790: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001f03b7a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001f03b7b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001f03b7c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001f03b7d0: 00 00 00 00 00 00 f1 f1 f1 f1 f1 f1 00 00 00 00
=>0x10001f03b7e0: 00[f3]f3 f3 f3 f3 00 00 00 00 00 00 00 00 00 00
  0x10001f03b7f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001f03b800: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001f03b810: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001f03b820: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10001f03b830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==6158==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
int a[10];
int main() {
    a[10] = 13;
    printf("%d\n", a[10]);
    return 0;
}
```
#### Valgrind Report
```
==23484== Memcheck, a memory error detector
==23484== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==23484== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==23484== Command: ./global_out_of_bounds
==23484== 
13
==23484== 
==23484== HEAP SUMMARY:
==23484==     in use at exit: 0 bytes in 0 blocks
==23484==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==23484== 
==23484== All heap blocks were freed -- no leaks are possible
==23484== 
==23484== For lists of detected and suppressed errors, rerun with: -s
==23484== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==6290==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5c79f2953108 at pc 0x5c79f2950242 bp 0x7ffc510e1100 sp 0x7ffc510e10f0
WRITE of size 4 at 0x5c79f2953108 thread T0
    #0 0x5c79f2950241 in main /home/posh/week09/112-spring-software-testing/lab/global_out_of_bounds.c:5
    #1 0x74825fc29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x74825fc29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c79f2950124 in _start (/home/posh/week09/112-spring-software-testing/lab/global_out_of_bounds_asan+0x1124)

0x5c79f2953108 is located 0 bytes to the right of global variable 'a' defined in 'global_out_of_bounds.c:3:5' (0x5c79f29530e0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/posh/week09/112-spring-software-testing/lab/global_out_of_bounds.c:5 in main
Shadow bytes around the buggy address:
  0x0b8fbe5225d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8fbe5225e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8fbe5225f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8fbe522600: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
  0x0b8fbe522610: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0b8fbe522620: 00[f9]f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
  0x0b8fbe522630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8fbe522640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8fbe522650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8fbe522660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8fbe522670: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==6290==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
int main() {
    int *a = (int *)malloc(10 * sizeof(int));
    free(a);
    a[0] = 13;
    printf("%d\n", a[0]);
    return 0;
}
```
#### Valgrind Report
```
==23709== Memcheck, a memory error detector
==23709== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==23709== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==23709== Command: ./use_after_free
==23709== 
==23709== Invalid write of size 4
==23709==    at 0x1091B3: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_free)
==23709==  Address 0x4a96040 is 0 bytes inside a block of size 40 free'd
==23709==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==23709==    by 0x1091AE: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_free)
==23709==  Block was alloc'd at
==23709==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==23709==    by 0x10919E: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_free)
==23709== 
==23709== Invalid read of size 4
==23709==    at 0x1091BD: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_free)
==23709==  Address 0x4a96040 is 0 bytes inside a block of size 40 free'd
==23709==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==23709==    by 0x1091AE: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_free)
==23709==  Block was alloc'd at
==23709==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==23709==    by 0x10919E: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_free)
==23709== 
13
==23709== 
==23709== HEAP SUMMARY:
==23709==     in use at exit: 0 bytes in 0 blocks
==23709==   total heap usage: 2 allocs, 2 frees, 1,064 bytes allocated
==23709== 
==23709== All heap blocks were freed -- no leaks are possible
==23709== 
==23709== For lists of detected and suppressed errors, rerun with: -s
==23709== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==6525==ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000010 at pc 0x5b36ad370292 bp 0x7ffd7a9af740 sp 0x7ffd7a9af730
WRITE of size 4 at 0x604000000010 thread T0
    #0 0x5b36ad370291 in main /home/posh/week09/112-spring-software-testing/lab/use_after_free.c:7
    #1 0x75f4e2829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x75f4e2829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b36ad370164 in _start (/home/posh/week09/112-spring-software-testing/lab/use_after_free_asan+0x1164)

0x604000000010 is located 0 bytes inside of 40-byte region [0x604000000010,0x604000000038)
freed by thread T0 here:
    #0 0x75f4e2cb4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5b36ad370242 in main /home/posh/week09/112-spring-software-testing/lab/use_after_free.c:6

previously allocated by thread T0 here:
    #0 0x75f4e2cb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5b36ad370237 in main /home/posh/week09/112-spring-software-testing/lab/use_after_free.c:5

SUMMARY: AddressSanitizer: heap-use-after-free /home/posh/week09/112-spring-software-testing/lab/use_after_free.c:7 in main
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
==6525==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int *a;
void foo() {
    int b = 13;
    a = &b;
    return;
}
int main() {
    foo();
    printf("%d\n", *a);
    return 0;
}
```
#### Valgrind Report
```
==8888== Memcheck, a memory error detector
==8888== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8888== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==8888== Command: ./use_after_return
==8888== 
==8888== Conditional jump or move depends on uninitialised value(s)
==8888==    at 0x48E0AD6: __vfprintf_internal (vfprintf-internal.c:1516)
==8888==    by 0x48CA79E: printf (printf.c:33)
==8888==    by 0x1091DD: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_return)
==8888== 
==8888== Use of uninitialised value of size 8
==8888==    at 0x48C42EB: _itoa_word (_itoa.c:177)
==8888==    by 0x48DFABD: __vfprintf_internal (vfprintf-internal.c:1516)
==8888==    by 0x48CA79E: printf (printf.c:33)
==8888==    by 0x1091DD: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_return)
==8888== 
==8888== Conditional jump or move depends on uninitialised value(s)
==8888==    at 0x48C42FC: _itoa_word (_itoa.c:177)
==8888==    by 0x48DFABD: __vfprintf_internal (vfprintf-internal.c:1516)
==8888==    by 0x48CA79E: printf (printf.c:33)
==8888==    by 0x1091DD: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_return)
==8888== 
==8888== Conditional jump or move depends on uninitialised value(s)
==8888==    at 0x48E05C3: __vfprintf_internal (vfprintf-internal.c:1516)
==8888==    by 0x48CA79E: printf (printf.c:33)
==8888==    by 0x1091DD: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_return)
==8888== 
==8888== Conditional jump or move depends on uninitialised value(s)
==8888==    at 0x48DFC05: __vfprintf_internal (vfprintf-internal.c:1516)
==8888==    by 0x48CA79E: printf (printf.c:33)
==8888==    by 0x1091DD: main (in /home/posh/week09/112-spring-software-testing/lab/use_after_return)
==8888== 
13
==8888== 
==8888== HEAP SUMMARY:
==8888==     in use at exit: 0 bytes in 0 blocks
==8888==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==8888== 
==8888== All heap blocks were freed -- no leaks are possible
==8888== 
==8888== Use --track-origins=yes to see where uninitialised values come from
==8888== For lists of detected and suppressed errors, rerun with: -s
==8888== ERROR SUMMARY: 7 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8544==ERROR: AddressSanitizer: stack-use-after-return on address 0x704cf5bae020 at pc 0x5fea4c31a3ab bp 0x7ffd59286590 sp 0x7ffd59286580
READ of size 4 at 0x704cf5bae020 thread T0
    #0 0x5fea4c31a3aa in main /home/posh/week09/112-spring-software-testing/lab/use_after_return.c:12
    #1 0x704cf9229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x704cf9229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5fea4c31a184 in _start (/home/posh/week09/112-spring-software-testing/lab/use_after_return_asan+0x1184)

Address 0x704cf5bae020 is located in stack of thread T0 at offset 32 in frame
    #0 0x5fea4c31a258 in foo /home/posh/week09/112-spring-software-testing/lab/use_after_return.c:5

  This frame has 1 object(s):
    [32, 36) 'b' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/posh/week09/112-spring-software-testing/lab/use_after_return.c:12 in main
Shadow bytes around the buggy address:
  0x0e0a1eb6dbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e0a1eb6dbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e0a1eb6dbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e0a1eb6dbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e0a1eb6dbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0e0a1eb6dc00: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0e0a1eb6dc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e0a1eb6dc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e0a1eb6dc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e0a1eb6dc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e0a1eb6dc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==8544==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(){
    int a[8];
    int b[8];
    int *ptr = a;

    for (int i = 0; i < 8; i++)
        b[i] = 2;

    for(int i = 0; i < 20; i++){
        if (8 <= i && i < 16)   // red zone
            continue;
        ptr[i] = 1;
    }    

    for(int i = 0; i < 8; i++){
        printf("%d", a[i]);
    }
    printf("\n");
    for(int i = 0; i < 8; i++){
        printf("%d", b[i]);
    }
    printf("\n");
    
    return 0;
}
```
### Why
因為ASan是透過redzone的更動，來偵測out-of-bound write，若直接越過redzone寫入，ASan不會偵測到。

