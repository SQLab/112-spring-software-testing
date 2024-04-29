# Answer

Name: chenzhenyin
ID: 312552058

# version
valgrind-3.18.1
gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   Yes    |  Yes |
| Stack out-of-bounds  |    No    |  Yes |
| Global out-of-bounds |    No    |  Yes |
| Use-after-free       |   Yes    |  Yes |
| Use-after-return     |   Yes    |  Yes |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() { 
    int *p = (int *) malloc(3 * sizeof(int));
    p[3] = 5;  
    int k = p[3]; 
    free(p);
    return 0;
}
```
#### Valgrind Report
```
==76432== Memcheck, a memory error detector
==76432== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==76432== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==76432== Command: ./v1
==76432== 
==76432== Invalid write of size 4
==76432==    at 0x1087F4: main (in /home/parallels/Desktop/v1)
==76432==  Address 0x4a4904c is 0 bytes after a block of size 12 alloc'd
==76432==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==76432==    by 0x1087E3: main (in /home/parallels/Desktop/v1)
==76432== 
==76432== Invalid read of size 4
==76432==    at 0x1087FC: main (in /home/parallels/Desktop/v1)
==76432==  Address 0x4a4904c is 0 bytes after a block of size 12 alloc'd
==76432==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==76432==    by 0x1087E3: main (in /home/parallels/Desktop/v1)
==76432== 
==76432== 
==76432== HEAP SUMMARY:
==76432==     in use at exit: 0 bytes in 0 blocks
==76432==   total heap usage: 1 allocs, 1 frees, 12 bytes allocated
==76432== 
==76432== All heap blocks were freed -- no leaks are possible
==76432== 
==76432== For lists of detected and suppressed errors, rerun with: -s
==76432== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==80709==ERROR: AddressSanitizer: heap-buffer-overflow on address 0xffffa76007bc at pc 0xaaaaae6d09c0 bp 0xffffd71e84a0 sp 0xffffd71e84b0
WRITE of size 4 at 0xffffa76007bc thread T0
    #0 0xaaaaae6d09bc in main (/home/parallels/Desktop/v1+0x9bc)
    #1 0xffffab6c73f8 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0xffffab6c74c8 in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0xaaaaae6d086c in _start (/home/parallels/Desktop/v1+0x86c)

0xffffa76007bc is located 0 bytes to the right of 12-byte region [0xffffa76007b0,0xffffa76007bc)
allocated by thread T0 here:
    #0 0xffffab8fa2f4 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0xaaaaae6d0960 in main (/home/parallels/Desktop/v1+0x960)
    #2 0xffffab6c73f8 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0xffffab6c74c8 in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0xaaaaae6d086c in _start (/home/parallels/Desktop/v1+0x86c)

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/parallels/Desktop/v1+0x9bc) in main
Shadow bytes around the buggy address:
  0x200ff4ec00a0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff4ec00b0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff4ec00c0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff4ec00d0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff4ec00e0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
=>0x200ff4ec00f0: fa fa fa fa fa fa 00[04]fa fa fa fa fa fa fa fa
  0x200ff4ec0100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff4ec0110: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff4ec0120: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff4ec0130: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff4ec0140: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==80709==ABORTING

```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main() {
    int arr[3];
    arr[3] = 5;  
    int k = arr[3]; 
    printf("%d\n", k);
    return 0;
}
```
#### Valgrind Report
```
==76750== Memcheck, a memory error detector
==76750== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==76750== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==76750== Command: ./v2
==76750== 
5
==76750== 
==76750== HEAP SUMMARY:
==76750==     in use at exit: 0 bytes in 0 blocks
==76750==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==76750== 
==76750== All heap blocks were freed -- no leaks are possible
==76750== 
==76750== For lists of detected and suppressed errors, rerun with: -s
==76750== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==82494==ERROR: AddressSanitizer: stack-buffer-overflow on address 0xffffe93afe1c at pc 0xaaaabfe60c48 bp 0xffffe93afd90 sp 0xffffe93afda0
WRITE of size 4 at 0xffffe93afe1c thread T0
    #0 0xaaaabfe60c44 in main (/home/parallels/Desktop/v2+0xc44)
    #1 0xffff882573f8 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0xffff882574c8 in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0xaaaabfe60a6c in _start (/home/parallels/Desktop/v2+0xa6c)

Address 0xffffe93afe1c is located in stack of thread T0 at offset 44 in frame
    #0 0xaaaabfe60b60 in main (/home/parallels/Desktop/v2+0xb60)

  This frame has 1 object(s):
    [32, 44) 'arr' (line 4) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/parallels/Desktop/v2+0xc44) in main
Shadow bytes around the buggy address:
  0x200ffd275f70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x200ffd275f80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x200ffd275f90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x200ffd275fa0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x200ffd275fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x200ffd275fc0: f1 f1 00[04]f3 f3 00 00 00 00 00 00 00 00 00 00
  0x200ffd275fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x200ffd275fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x200ffd275ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x200ffd276000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x200ffd276010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==82494==ABORTING

```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>

int arr[3];

int main() {
    arr[3] = 5; 
    int k = arr[3];
    printf("%d\n", k); 
    return 0;
}
```
#### Valgrind Report
```
==77408== Memcheck, a memory error detector
==77408== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==77408== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==77408== Command: ./v3
==77408== 
5
==77408== 
==77408== HEAP SUMMARY:
==77408==     in use at exit: 0 bytes in 0 blocks
==77408==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==77408== 
==77408== All heap blocks were freed -- no leaks are possible
==77408== 
==77408== For lists of detected and suppressed errors, rerun with: -s
==77408== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==82759==ERROR: AddressSanitizer: global-buffer-overflow on address 0xaaaad96210cc at pc 0xaaaad9610ab0 bp 0xfffff59fb9b0 sp 0xfffff59fb9c0
WRITE of size 4 at 0xaaaad96210cc thread T0
    #0 0xaaaad9610aac in main (/home/parallels/Desktop/v3+0xaac)
    #1 0xffff941273f8 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0xffff941274c8 in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0xaaaad961096c in _start (/home/parallels/Desktop/v3+0x96c)

0xaaaad96210cc is located 0 bytes to the right of global variable 'arr' defined in 'v3.c:3:5' (0xaaaad96210c0) of size 12
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/parallels/Desktop/v3+0xaac) in main
Shadow bytes around the buggy address:
  0x15655b2c41c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x15655b2c41d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x15655b2c41e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x15655b2c41f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x15655b2c4200: 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
=>0x15655b2c4210: f9 f9 f9 f9 00 00 00 00 00[04]f9 f9 f9 f9 f9 f9
  0x15655b2c4220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x15655b2c4230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x15655b2c4240: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x15655b2c4250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x15655b2c4260: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==82759==ABORTING

```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = malloc(sizeof(int));
    free(p);
    int k = *p;
    return 0;
}
```
#### Valgrind Report
```
==77749== Memcheck, a memory error detector
==77749== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==77749== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==77749== Command: ./v4
==77749== 
==77749== Invalid read of size 4
==77749==    at 0x1087F4: main (in /home/parallels/Desktop/v4)
==77749==  Address 0x4a49040 is 0 bytes inside a block of size 4 free'd
==77749==    at 0x4867AD0: free (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==77749==    by 0x1087EF: main (in /home/parallels/Desktop/v4)
==77749==  Block was alloc'd at
==77749==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==77749==    by 0x1087E3: main (in /home/parallels/Desktop/v4)
==77749== 
==77749== 
==77749== HEAP SUMMARY:
==77749==     in use at exit: 0 bytes in 0 blocks
==77749==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==77749== 
==77749== All heap blocks were freed -- no leaks are possible
==77749== 
==77749== For lists of detected and suppressed errors, rerun with: -s
==77749== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==82947==ERROR: AddressSanitizer: heap-use-after-free on address 0xffffb6f007b0 at pc 0xaaaabbc50980 bp 0xffffc1153690 sp 0xffffc11536a0
READ of size 4 at 0xffffb6f007b0 thread T0
    #0 0xaaaabbc5097c in main (/home/parallels/Desktop/v4+0x97c)
    #1 0xffffbb0573f8 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0xffffbb0574c8 in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0xaaaabbc5082c in _start (/home/parallels/Desktop/v4+0x82c)

0xffffb6f007b0 is located 0 bytes inside of 4-byte region [0xffffb6f007b0,0xffffb6f007b4)
freed by thread T0 here:
    #0 0xffffbb289fe8 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0xaaaabbc5092c in main (/home/parallels/Desktop/v4+0x92c)
    #2 0xffffbb0573f8 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0xffffbb0574c8 in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0xaaaabbc5082c in _start (/home/parallels/Desktop/v4+0x82c)

previously allocated by thread T0 here:
    #0 0xffffbb28a2f4 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0xaaaabbc50920 in main (/home/parallels/Desktop/v4+0x920)
    #2 0xffffbb0573f8 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0xffffbb0574c8 in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0xaaaabbc5082c in _start (/home/parallels/Desktop/v4+0x82c)

SUMMARY: AddressSanitizer: heap-use-after-free (/home/parallels/Desktop/v4+0x97c) in main
Shadow bytes around the buggy address:
  0x200ff6de00a0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff6de00b0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff6de00c0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff6de00d0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff6de00e0: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
=>0x200ff6de00f0: fa fa fa fa fa fa[fd]fa fa fa fa fa fa fa fa fa
  0x200ff6de0100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff6de0110: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff6de0120: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff6de0130: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x200ff6de0140: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==82947==ABORTING

```

### Use-after-return
#### Source code
```
#include <stdio.h>
int *func() {
    int k = 5;
    return &k;
}

int main() {
    int *p = func();
    int v = *p;
    return 0;
}
```
#### Valgrind Report
```
==77838== Memcheck, a memory error detector
==77838== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==77838== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==77838== Command: ./v5
==77838== 
==77838== Invalid read of size 4
==77838==    at 0x108880: main (in /home/parallels/Desktop/v5)
==77838==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==77838== 
==77838== 
==77838== Process terminating with default action of signal 11 (SIGSEGV)
==77838==  Access not within mapped region at address 0x0
==77838==    at 0x108880: main (in /home/parallels/Desktop/v5)
==77838==  If you believe this happened as a result of a stack
==77838==  overflow in your program's main thread (unlikely but
==77838==  possible), you can try to increase the size of the
==77838==  main thread stack using the --main-stacksize= flag.
==77838==  The main thread stack size used in this run was 8388608.
==77838== 
==77838== HEAP SUMMARY:
==77838==     in use at exit: 0 bytes in 0 blocks
==77838==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==77838== 
==77838== All heap blocks were freed -- no leaks are possible
==77838== 
==77838== For lists of detected and suppressed errors, rerun with: -s
==77838== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)

```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==83971==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0xaaaab95d0c14 bp 0xffffc3540e40 sp 0xffffc3540e40 T0)
==83971==The signal is caused by a READ memory access.
==83971==Hint: address points to the zero page.
    #0 0xaaaab95d0c14 in main (/home/parallels/Desktop/v5+0xc14)
    #1 0xffffa90e73f8 in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0xffffa90e74c8 in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0xaaaab95d096c in _start (/home/parallels/Desktop/v5+0x96c)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/home/parallels/Desktop/v5+0xc14) in main
==83971==ABORTING

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

	int main() {

	int *a = (int *)malloc(8);
	int *b = (int *)malloc(6);
	int gap=b-a;
	
	b[0]=3;
	printf("b[0]=%d\n",b[0]);
	
	a[gap] = 10;
	printf("b[0]=%d\n",b[0]);
	
	free(a);
	free(b);
    
    return 0;
 }
```
### Why
ASan偵測不出來，因為如果避開redzone的區域做讀取，就可以跳過ASan的檢查。

