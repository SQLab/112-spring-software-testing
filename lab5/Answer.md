# Answer

Name: 蕭詠繼
ID: 312552057

> 整份 Lab5 皆是使用 GCC 11.4.0

## Test Valgrind and ASan
### Result

|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | ✔️        | ✔️    |
| Stack out-of-bounds  | ✔️        | ✔️    |
| Global out-of-bounds | ❌        | ✔️    |
| Use-after-free       | ✔️        | ✔️    |
| Use-after-return     | ✔️        | ✔️    |

### Heap out-of-bounds

#### Source code

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int *)malloc(10 * sizeof(int));
    arr[10] = 0;
    free(arr);
    return 0;
}
```

#### Valgrind Report✔️

```
==14617==ABORTING
==14624== Memcheck, a memory error detector
==14624== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==14624== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==14624== Command: ./test
==14624==
==14624== Invalid write of size 4
==14624==    at 0x10918B: main (in /home/pudding/112-spring-software-testing/lab5/test)
==14624==  Address 0x4a8e068 is 0 bytes after a block of size 40 alloc'd
==14624==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==14624==    by 0x10917E: main (in /home/pudding/112-spring-software-testing/lab5/test)
==14624==
==14624==
==14624== HEAP SUMMARY:
==14624==     in use at exit: 0 bytes in 0 blocks
==14624==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==14624==
==14624== All heap blocks were freed -- no leaks are possible
==14624==
==14624== For lists of detected and suppressed errors, rerun with: -s
==14624== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

#### ASan Report✔️

```
=================================================================
==14617==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x56155981a222 bp 0x7fff562d4e40 sp 0x7fff562d4e30
WRITE of size 4 at 0x604000000038 thread T0
    #0 0x56155981a221 in main (/home/pudding/112-spring-software-testing/lab5/test+0x1221)
    #1 0x7fb1c2757d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb1c2757e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x56155981a104 in _start (/home/pudding/112-spring-software-testing/lab5/test+0x1104)

0x604000000038 is located 0 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7fb1c2a0b887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x56155981a1de in main (/home/pudding/112-spring-software-testing/lab5/test+0x11de)
    #2 0x7fb1c2757d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/pudding/112-spring-software-testing/lab5/test+0x1221) in main
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
```

### Stack out-of-bounds
#### Source code

```c
#include <stdio.h>

int main() {
    int arr[10];
    arr[11] = 0;
    return 0;
}
```

#### Valgrind Report✔️

```
==12996==ABORTING
==13003== Memcheck, a memory error detector
==13003== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13003== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==13003== Command: ./test
==13003==
*** stack smashing detected ***: terminated
==13003==
==13003== Process terminating with default action of signal 6 (SIGABRT)
==13003==    at 0x48F89FC: __pthread_kill_implementation (pthread_kill.c:44)
==13003==    by 0x48F89FC: __pthread_kill_internal (pthread_kill.c:78)
==13003==    by 0x48F89FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==13003==    by 0x48A4475: raise (raise.c:26)
==13003==    by 0x488A7F2: abort (abort.c:79)
==13003==    by 0x48EB675: __libc_message (libc_fatal.c:155)
==13003==    by 0x4998599: __fortify_fail (fortify_fail.c:26)
==13003==    by 0x4998565: __stack_chk_fail (stack_chk_fail.c:24)
==13003==    by 0x109183: main (in /home/pudding/112-spring-software-testing/lab5/test)
==13003==
==13003== HEAP SUMMARY:
==13003==     in use at exit: 0 bytes in 0 blocks
==13003==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==13003==
==13003== All heap blocks were freed -- no leaks are possible
==13003==
==13003== For lists of detected and suppressed errors, rerun with: -s
==13003== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted
```

#### ASan Report✔️

```
=================================================================
==12996==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffc7005238 at pc 0x557ef03f029b bp 0x7fffc70051d0 sp 0x7fffc70051c0
WRITE of size 4 at 0x7fffc7005238 thread T0
    #0 0x557ef03f029a in main (/home/pudding/112-spring-software-testing/lab5/test+0x129a)
    #1 0x7fd88d3c0d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd88d3c0e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x557ef03f0104 in _start (/home/pudding/112-spring-software-testing/lab5/test+0x1104)

Address 0x7fffc7005238 is located in stack of thread T0 at offset 88 in frame
    #0 0x557ef03f01d8 in main (/home/pudding/112-spring-software-testing/lab5/test+0x11d8)

  This frame has 1 object(s):
    [48, 88) 'arr' (line 4) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/pudding/112-spring-software-testing/lab5/test+0x129a) in main
Shadow bytes around the buggy address:
  0x100078df89f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078df8a00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078df8a10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078df8a20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078df8a30: 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1
=>0x100078df8a40: f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3 00 00 00 00
  0x100078df8a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078df8a60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078df8a70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078df8a80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100078df8a90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
```

### Global out-of-bounds

#### Source code
```c
#include <stdio.h>

int arr[10];

int main() {
    arr[10] = 0;
    return 0;
}
```
#### Valgrind Report❌
```
==16446==ABORTING
==16453== Memcheck, a memory error detector
==16453== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==16453== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==16453== Command: ./test
==16453==
==16453==
==16453== HEAP SUMMARY:
==16453==     in use at exit: 0 bytes in 0 blocks
==16453==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==16453==
==16453== All heap blocks were freed -- no leaks are possible
==16453==
==16453== For lists of detected and suppressed errors, rerun with: -s
==16453== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
#### ASan Report✔️
```
=================================================================
==16446==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5642b85580c8 at pc 0x5642b8555203 bp 0x7fffd8c28330 sp 0x7fffd8c28320
WRITE of size 4 at 0x5642b85580c8 thread T0
    #0 0x5642b8555202 in main (/home/pudding/112-spring-software-testing/lab5/test+0x1202)
    #1 0x7f861fbc5d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f861fbc5e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5642b8555104 in _start (/home/pudding/112-spring-software-testing/lab5/test+0x1104)

0x5642b85580c8 is located 0 bytes to the right of global variable 'arr' defined in 'test.c:3:5' (0x5642b85580a0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/pudding/112-spring-software-testing/lab5/test+0x1202) in main
Shadow bytes around the buggy address:
  0x0ac8d70a2fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac8d70a2fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac8d70a2fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac8d70a2ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac8d70a3000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ac8d70a3010: 00 00 00 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9
  0x0ac8d70a3020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac8d70a3030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac8d70a3040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac8d70a3050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac8d70a3060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int *)malloc(10 * sizeof(int));
    free(arr);
    arr[0] = 0;
    return 0;
}
```
#### Valgrind Report✔️
```
==15875==ABORTING
==15882== Memcheck, a memory error detector
==15882== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==15882== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==15882== Command: ./test
==15882==
==15882== Invalid write of size 4
==15882==    at 0x109193: main (in /home/pudding/112-spring-software-testing/lab5/test)
==15882==  Address 0x4a8e040 is 0 bytes inside a block of size 40 free'd
==15882==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==15882==    by 0x10918E: main (in /home/pudding/112-spring-software-testing/lab5/test)
==15882==  Block was alloc'd at
==15882==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==15882==    by 0x10917E: main (in /home/pudding/112-spring-software-testing/lab5/test)
==15882==
==15882==
==15882== HEAP SUMMARY:
==15882==     in use at exit: 0 bytes in 0 blocks
==15882==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==15882==
==15882== All heap blocks were freed -- no leaks are possible
==15882==
==15882== For lists of detected and suppressed errors, rerun with: -s
==15882== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
#### ASan Report✔️
```
=================================================================
==15875==ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000010 at pc 0x55e391752226 bp 0x7ffe226bd990 sp 0x7ffe226bd980
WRITE of size 4 at 0x604000000010 thread T0
    #0 0x55e391752225 in main (/home/pudding/112-spring-software-testing/lab5/test+0x1225)
    #1 0x7f58ee480d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f58ee480e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55e391752104 in _start (/home/pudding/112-spring-software-testing/lab5/test+0x1104)

0x604000000010 is located 0 bytes inside of 40-byte region [0x604000000010,0x604000000038)
freed by thread T0 here:
    #0 0x7f58ee734537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55e3917521ee in main (/home/pudding/112-spring-software-testing/lab5/test+0x11ee)
    #2 0x7f58ee480d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7f58ee734887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55e3917521de in main (/home/pudding/112-spring-software-testing/lab5/test+0x11de)
    #2 0x7f58ee480d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/pudding/112-spring-software-testing/lab5/test+0x1225) in main
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
```

### Use-after-return
#### Source code
```c
#include <stdio.h>

int* getPtr() {
    int *ptr;
    return ptr;
}

int main() {
    int *ptr = getPtr();
    *ptr = 0;
    return 0;
}
```
#### Valgrind Report✔️
```
==29181==ABORTING
==29188== Memcheck, a memory error detector
==29188== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==29188== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==29188== Command: ./test
==29188==
==29188== Use of uninitialised value of size 8
==29188==    at 0x109155: main (in /home/pudding/112-spring-software-testing/lab5/test)
==29188==
==29188== Invalid write of size 4
==29188==    at 0x109155: main (in /home/pudding/112-spring-software-testing/lab5/test)
==29188==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==29188==
==29188==
==29188== Process terminating with default action of signal 11 (SIGSEGV)
==29188==  Access not within mapped region at address 0x0
==29188==    at 0x109155: main (in /home/pudding/112-spring-software-testing/lab5/test)
==29188==  If you believe this happened as a result of a stack
==29188==  overflow in your program's main thread (unlikely but
==29188==  possible), you can try to increase the size of the
==29188==  main thread stack using the --main-stacksize= flag.
==29188==  The main thread stack size used in this run was 8388608.
==29188==
==29188== HEAP SUMMARY:
==29188==     in use at exit: 0 bytes in 0 blocks
==29188==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==29188==
==29188== All heap blocks were freed -- no leaks are possible
==29188==
==29188== Use --track-origins=yes to see where uninitialised values come from
==29188== For lists of detected and suppressed errors, rerun with: -s
==29188== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
Segmentation fault
```
#### ASan Report✔️
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==29181==ERROR: AddressSanitizer: SEGV on unknown address (pc 0x55b3513611c3 bp 0x7fffd9b79800 sp 0x7fffd9b797f0 T0)
==29181==The signal is caused by a READ memory access.
==29181==Hint: this fault was caused by a dereference of a high value address (see register values below).  Dissassemble the provided pc to learn which register was used.
    #0 0x55b3513611c3 in main (/home/pudding/112-spring-software-testing/lab5/test+0x11c3)
    #1 0x7ff41d7bdd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ff41d7bde3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55b3513610c4 in _start (/home/pudding/112-spring-software-testing/lab5/test+0x10c4)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/pudding/112-spring-software-testing/lab5/test+0x11c3) in main
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include <stdio.h>

int main() {
    int a[8], b[8];
    int dist = (int)(b - a);
    a[dist] = 0;
    return 0;
}
```
### Why

​	Asan 的原理是在變數記憶體區段的前後插入 redzone，若是程式讀寫到 redzone 的部分，就會拋出 exception，但實際上只會檢查是否有碰到 redzone，並不會檢查是否為同一個變數理應涉入的範圍，因此在這個範例，Asan 並不會檢查出問題。

​	另外，我發現甚至不一定要是被宣告過的記憶體區段，似乎是 redzone 有一定的大小，實驗後發現若 $arr$ 是整數陣列，當 $i \ge 16$ 或 $i \le -9$，讀寫 $arr[i]$ 不會被 Asan 檢查出問題。
