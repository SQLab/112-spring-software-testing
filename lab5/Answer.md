# Answer

Name: 張百寬
ID: m091545

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- |:-------- | ---- |
| Heap out-of-bounds   | YES      | YES  |
| Stack out-of-bounds  | YES      | YES  |
| Global out-of-bounds | NO       | YES  |
| Use-after-free       | YES      | YES  |
| Use-after-return     | YES      | YES  |

### Heap out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(){
	int *h = malloc(sizeof(int) * 4);
	h[4] = 100;
	free(h);
	return 0;
}
```
#### Valgrind Report
```
==13781== Invalid write of size 4
==13781==    at 0x1091AB: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13781==  Address 0x4a8d050 is 0 bytes after a block of size 16 alloc'd
==13781==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13781==    by 0x10919E: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13781==
==13781== Invalid read of size 4
==13781==    at 0x1091B9: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13781==  Address 0x4a8d050 is 0 bytes after a block of size 16 alloc'd
==13781==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13781==    by 0x10919E: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13781==
```
### ASan Report
```
WRITE of size 4 at 0x602000000020 thread T0
    #0 0x5566b3a40251 in main /home/ubuntu/112-spring-software-testing/lab5/test.c:6
    #1 0x7f77ab429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f77ab429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5566b3a40124 in _start (/home/ubuntu/112-spring-software-testing/lab5/test+0x1124)

0x602000000020 is located 0 bytes to the right of 16-byte region [0x602000000010,0x602000000020)
allocated by thread T0 here:
    #0 0x7f77ab8b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5566b3a401f7 in main /home/ubuntu/112-spring-software-testing/lab5/test.c:5

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/ubuntu/112-spring-software-testing/lab5/test.c:6 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00 00[fa]fa fa fa fa fa fa fa fa fa fa fa
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
==13806==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(){
	int stack[10];

	stack[10] = 0;

	return 0;
}
```
#### Valgrind Report
```
==13864== Memcheck, a memory error detector
==13864== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13864== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==13864== Command: ./test
==13864==
*** stack smashing detected ***: terminated
==13864==
==13864== Process terminating with default action of signal 6 (SIGABRT)
==13864==    at 0x48F79FC: __pthread_kill_implementation (pthread_kill.c:44)
==13864==    by 0x48F79FC: __pthread_kill_internal (pthread_kill.c:78)
==13864==    by 0x48F79FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==13864==    by 0x48A3475: raise (raise.c:26)
==13864==    by 0x48897F2: abort (abort.c:79)
==13864==    by 0x48EA675: __libc_message (libc_fatal.c:155)
==13864==    by 0x4997599: __fortify_fail (fortify_fail.c:26)
==13864==    by 0x4997565: __stack_chk_fail (stack_chk_fail.c:24)
==13864==    by 0x109183: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13864==
==13864== HEAP SUMMARY:
==13864==     in use at exit: 0 bytes in 0 blocks
==13864==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==13864==
==13864== All heap blocks were freed -- no leaks are possible
==13864==
==13864== For lists of detected and suppressed errors, rerun with: -s
==13864== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
Aborted (core dumped)
```
### ASan Report
```
=================================================================
==13874==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffe99dd99c8 at pc 0x560c31a522ce bp 0x7ffe99dd9960 sp 0x7ffe99dd9950
WRITE of size 4 at 0x7ffe99dd99c8 thread T0
    #0 0x560c31a522cd in main /home/ubuntu/112-spring-software-testing/lab5/test.c:7
    #1 0x7fab2d229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fab2d229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x560c31a52104 in _start (/home/ubuntu/112-spring-software-testing/lab5/test+0x1104)

Address 0x7ffe99dd99c8 is located in stack of thread T0 at offset 88 in frame
    #0 0x560c31a521d8 in main /home/ubuntu/112-spring-software-testing/lab5/test.c:4

  This frame has 1 object(s):
    [48, 88) 'stack' (line 5) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/ubuntu/112-spring-software-testing/lab5/test.c:7 in main
Shadow bytes around the buggy address:
  0x1000533b32e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000533b32f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000533b3300: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000533b3310: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000533b3320: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x1000533b3330: f1 f1 f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3 00 00
  0x1000533b3340: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000533b3350: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000533b3360: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000533b3370: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000533b3380: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==13874==ABORTING  
```

### Global out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int stack[10];

int main(){

	stack[10] = 0;

	return 0;
}
```
#### Valgrind Report
```
==13883== Memcheck, a memory error detector
==13883== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13883== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==13883== Command: ./test
==13883==
==13883==
==13883== HEAP SUMMARY:
==13883==     in use at exit: 0 bytes in 0 blocks
==13883==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==13883==
==13883== All heap blocks were freed -- no leaks are possible
==13883==
==13883== For lists of detected and suppressed errors, rerun with: -s
==13883== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==13889==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55ac774c00c8 at pc 0x55ac774bd203 bp 0x7ffe1a9f0fc0 sp 0x7ffe1a9f0fb0
WRITE of size 4 at 0x55ac774c00c8 thread T0
    #0 0x55ac774bd202 in main /home/ubuntu/112-spring-software-testing/lab5/test.c:9
    #1 0x7f7c66829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f7c66829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55ac774bd104 in _start (/home/ubuntu/112-spring-software-testing/lab5/test+0x1104)

0x55ac774c00c8 is located 0 bytes to the right of global variable 'stack' defined in 'test.c:5:5' (0x55ac774c00a0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/ubuntu/112-spring-software-testing/lab5/test.c:9 in main
Shadow bytes around the buggy address:
  0x0ab60ee8ffc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab60ee8ffd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab60ee8ffe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab60ee8fff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab60ee90000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ab60ee90010: 00 00 00 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9
  0x0ab60ee90020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab60ee90030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab60ee90040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab60ee90050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab60ee90060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==13889==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){

	int *a1 = (int *)malloc(10 * sizeof(int));
	free(a1);
	a1[0] = 0;
	return 0;
}
```
#### Valgrind Report
```

==13897== Memcheck, a memory error detector
==13897== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13897== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==13897== Command: ./test
==13897==
==13897== Invalid write of size 4
==13897==    at 0x109193: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13897==  Address 0x4a8d040 is 0 bytes inside a block of size 40 free'd
==13897==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13897==    by 0x10918E: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13897==  Block was alloc'd at
==13897==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13897==    by 0x10917E: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13897==
==13897==
==13897== HEAP SUMMARY:
==13897==     in use at exit: 0 bytes in 0 blocks
==13897==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==13897==
==13897== All heap blocks were freed -- no leaks are possible
==13897==
==13897== For lists of detected and suppressed errors, rerun with: -s
==13897== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==13904==ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000010 at pc 0x5615e26fb217 bp 0x7fff59393950 sp 0x7fff59393940
WRITE of size 4 at 0x604000000010 thread T0
    #0 0x5615e26fb216 in main /home/ubuntu/112-spring-software-testing/lab5/test.c:9
    #1 0x7f87d2229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f87d2229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5615e26fb104 in _start (/home/ubuntu/112-spring-software-testing/lab5/test+0x1104)

0x604000000010 is located 0 bytes inside of 40-byte region [0x604000000010,0x604000000038)
freed by thread T0 here:
    #0 0x7f87d26b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5615e26fb1e2 in main /home/ubuntu/112-spring-software-testing/lab5/test.c:8

previously allocated by thread T0 here:
    #0 0x7f87d26b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5615e26fb1d7 in main /home/ubuntu/112-spring-software-testing/lab5/test.c:7

SUMMARY: AddressSanitizer: heap-use-after-free /home/ubuntu/112-spring-software-testing/lab5/test.c:9 in main
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
==13904==ABORTING
```

### Use-after-return
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int* foo(){
    int local=100;
    return &local;

}
int main(){
    int *p = foo();

    return *p == 100;
}

```
#### Valgrind Report
```

==13941== Memcheck, a memory error detector
==13941== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13941== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==13941== Command: ./test
==13941==
==13941== Invalid read of size 4
==13941==    at 0x1091A4: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13941==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==13941==
==13941==
==13941== Process terminating with default action of signal 11 (SIGSEGV)
==13941==  Access not within mapped region at address 0x0
==13941==    at 0x1091A4: main (in /home/ubuntu/112-spring-software-testing/lab5/test)
==13941==  If you believe this happened as a result of a stack
==13941==  overflow in your program's main thread (unlikely but
==13941==  possible), you can try to increase the size of the
==13941==  main thread stack using the --main-stacksize= flag.
==13941==  The main thread stack size used in this run was 8388608.
==13941==
==13941== HEAP SUMMARY:
==13941==     in use at exit: 0 bytes in 0 blocks
==13941==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==13941==
==13941== All heap blocks were freed -- no leaks are possible
==13941==
==13941== For lists of detected and suppressed errors, rerun with: -s
==13941== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==13951==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x559a50c5d1c4 bp 0x000000000001 sp 0x7ffff7e02b10 T0)
==13951==The signal is caused by a READ memory access.
==13951==Hint: address points to the zero page.
    #0 0x559a50c5d1c4 in main /home/ubuntu/112-spring-software-testing/lab5/test.c:13
    #1 0x7f2905229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f2905229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x559a50c5d0c4 in _start (/home/ubuntu/112-spring-software-testing/lab5/test+0x10c4)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/ubuntu/112-spring-software-testing/lab5/test.c:13 in main
==13951==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
  int arr[8] = {0};
	int brr[8] = {0};
	printf("Arr %p\n", &arr);
	printf("Brr %p\n", &brr);
	printf("dist: %ld\n", brr - arr);
	for (int i=16;i<24;i++){
		arr[i] = i;
	}
        printf("bypass");
        return 0;
}
```

### Why

> Output
```
Arr 0x7fff45a8d4c0
Brr 0x7fff45a8d500
dist: 16
bypass
```

這個 case 之下 Arr[16] 剛好壓在 Brr[0] 的頭上，因此不會碰到 redzone，可以順利通過 ASan 的檢查。
