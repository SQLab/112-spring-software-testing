# Answer

Name: 林琛琛
ID: 312552024

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   Yes       |  Yes    |
| Stack out-of-bounds  |   No       |   Yes   |
| Global out-of-bounds |   No       |   Yes   |
| Use-after-free       |   Yes       |   Yes   |
| Use-after-return     |   Yes       |  Yes    |

### Heap out-of-bounds
#### Source code
```
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int main(void)
{
	char *s = malloc(5);
	s[5] = 'c';
	free(s);
	return 0;
}
```
#### Valgrind Report
```
==7170== Memcheck, a memory error detector
==7170== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7170== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7170== Command: ./test_valgrind
==7170==
==7170== Invalid write of size 1
==7170==    at 0x10918B: main (in /home/cc/software_testing/test_valgrind)
==7170==  Address 0x4a8d045 is 0 bytes after a block of size 5 alloc'd
==7170==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7170==    by 0x10917E: main (in /home/cc/software_testing/test_valgrind)
==7170==
==7170==
==7170== HEAP SUMMARY:
==7170==     in use at exit: 0 bytes in 0 blocks
==7170==   total heap usage: 1 allocs, 1 frees, 5 bytes allocated
==7170==
==7170== All heap blocks were freed -- no leaks are possible
==7170==
==7170== For lists of detected and suppressed errors, rerun with: -s
==7170== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8624==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000015 at pc 0x5581d3737219 bp 0x7ffe208f3cf0 sp 0x7ffe208f3ce0
WRITE of size 1 at 0x602000000015 thread T0
    #0 0x5581d3737218 in main /home/cc/software_testing/test_valgrind.c:8
    #1 0x7f7914d73d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f7914d73e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5581d3737104 in _start (/home/cc/software_testing/test_asan+0x1104)

0x602000000015 is located 0 bytes to the right of 5-byte region [0x602000000010,0x602000000015)
allocated by thread T0 here:
    #0 0x7f7915027887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5581d37371da in main /home/cc/software_testing/test_valgrind.c:7

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/cc/software_testing/test_valgrind.c:8 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[05]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==8624==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int main(void)
{
	int arr[10] = {0};
	arr[10]++;
	return 0;
}
```
#### Valgrind Report
```
==12757== Memcheck, a memory error detector
==12757== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==12757== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==12757== Command: ./test_valgrind
==12757==
*** stack smashing detected ***: terminated
==12757==
==12757== Process terminating with default action of signal 6 (SIGABRT)
==12757==    at 0x48F79FC: __pthread_kill_implementation (pthread_kill.c:44)
==12757==    by 0x48F79FC: __pthread_kill_internal (pthread_kill.c:78)
==12757==    by 0x48F79FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==12757==    by 0x48A3475: raise (raise.c:26)
==12757==    by 0x48897F2: abort (abort.c:79)
==12757==    by 0x48EA675: __libc_message (libc_fatal.c:155)
==12757==    by 0x4997599: __fortify_fail (fortify_fail.c:26)
==12757==    by 0x4997565: __stack_chk_fail (stack_chk_fail.c:24)
==12757==    by 0x1091AD: main (in /home/cc/software_testing/test_valgrind)
==12757==
==12757== HEAP SUMMARY:
==12757==     in use at exit: 0 bytes in 0 blocks
==12757==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==12757==
==12757== All heap blocks were freed -- no leaks are possible
==12757==
==12757== For lists of detected and suppressed errors, rerun with: -s
==12757== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==13345==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffd41c3ffd8 at pc 0x555b8ae76375 bp 0x7ffd41c3ff70 sp 0x7ffd41c3ff60
READ of size 4 at 0x7ffd41c3ffd8 thread T0
    #0 0x555b8ae76374 in main /home/cc/software_testing/test_valgrind.c:8
    #1 0x7fdf9b1a7d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fdf9b1a7e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x555b8ae76124 in _start (/home/cc/software_testing/test_asan+0x1124)

Address 0x7ffd41c3ffd8 is located in stack of thread T0 at offset 88 in frame
    #0 0x555b8ae761f8 in main /home/cc/software_testing/test_valgrind.c:6

  This frame has 1 object(s):
    [48, 88) 'arr' (line 7) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/cc/software_testing/test_valgrind.c:8 in main
Shadow bytes around the buggy address:
  0x10002837ffa0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002837ffb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002837ffc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002837ffd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10002837ffe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10002837fff0: f1 f1 f1 f1 f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3
  0x100028380000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100028380010: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100028380020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100028380030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100028380040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==13345==
```

### Global out-of-bounds
#### Source code
```
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int arr[10] = {0};

int main(void)
{
	arr[10]++;
	return 0;
}
```
#### Valgrind Report
```
==13931== Memcheck, a memory error detector
==13931== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13931== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==13931== Command: ./test_valgrind
==13931==
==13931==
==13931== HEAP SUMMARY:
==13931==     in use at exit: 0 bytes in 0 blocks
==13931==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==13931==
==13931== All heap blocks were freed -- no leaks are possible
==13931==
==13931== For lists of detected and suppressed errors, rerun with: -s
==13931== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==14968==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5561e7ec00c8 at pc 0x5561e7ebd208 bp 0x7fff0417ffe0 sp 0x7fff0417ffd0
READ of size 4 at 0x5561e7ec00c8 thread T0
    #0 0x5561e7ebd207 in main /home/cc/software_testing/test_valgrind.c:9
    #1 0x7faac18edd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7faac18ede3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5561e7ebd104 in _start (/home/cc/software_testing/test_asan+0x1104)

0x5561e7ec00c8 is located 0 bytes to the right of global variable 'arr' defined in 'test_valgrind.c:5:5' (0x5561e7ec00a0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow /home/cc/software_testing/test_valgrind.c:9 in main
Shadow bytes around the buggy address:
  0x0aacbcfcffc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacbcfcffd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacbcfcffe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacbcfcfff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacbcfd0000: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0aacbcfd0010: 00 00 00 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9
  0x0aacbcfd0020: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacbcfd0030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacbcfd0040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacbcfd0050: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0aacbcfd0060: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==14968==
```

### Use-after-free
#### Source code
```
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int main(void)
{
	char *s = malloc(5);
	free(s);
	s[0] = 'c';
	return 0;
}
```
#### Valgrind Report
```
==15395== Memcheck, a memory error detector
==15395== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==15395== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==15395== Command: ./test_valgrind
==15395==
==15395== Invalid write of size 1
==15395==    at 0x109193: main (in /home/cc/software_testing/test_valgrind)
==15395==  Address 0x4a8d040 is 0 bytes inside a block of size 5 free'd
==15395==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==15395==    by 0x10918E: main (in /home/cc/software_testing/test_valgrind)
==15395==  Block was alloc'd at
==15395==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==15395==    by 0x10917E: main (in /home/cc/software_testing/test_valgrind)
==15395==
==15395==
==15395== HEAP SUMMARY:
==15395==     in use at exit: 0 bytes in 0 blocks
==15395==   total heap usage: 1 allocs, 1 frees, 5 bytes allocated
==15395==
==15395== All heap blocks were freed -- no leaks are possible
==15395==
==15395== For lists of detected and suppressed errors, rerun with: -s
==15395== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==15795==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x5631917f9211 bp 0x7ffef6db0200 sp 0x7ffef6db01f0
WRITE of size 1 at 0x602000000010 thread T0
    #0 0x5631917f9210 in main /home/cc/software_testing/test_valgrind.c:9
    #1 0x7fb3229d0d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fb3229d0e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5631917f9104 in _start (/home/cc/software_testing/test_asan+0x1104)

0x602000000010 is located 0 bytes inside of 5-byte region [0x602000000010,0x602000000015)
freed by thread T0 here:
    #0 0x7fb322c84537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5631917f91e2 in main /home/cc/software_testing/test_valgrind.c:8

previously allocated by thread T0 here:
    #0 0x7fb322c84887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5631917f91d7 in main /home/cc/software_testing/test_valgrind.c:7

SUMMARY: AddressSanitizer: heap-use-after-free /home/cc/software_testing/test_valgrind.c:9 in main
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
==15795==
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include<string.h>

int* res;

void f(){
    int x = 0;
    res = &x;
}
int main(){
    f();
    printf("%d\n", *res);
    return 0;
}
```
#### Valgrind Report
```
==124026== Memcheck, a memory error detector
==124026== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==124026== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==124026== Command: ./test_valgrind
==124026==
==124026== Conditional jump or move depends on uninitialised value(s)
==124026==    at 0x48D7AD6: __vfprintf_internal (vfprintf-internal.c:1516)
==124026==    by 0x48C179E: printf (printf.c:33)
==124026==    by 0x1091DD: main (in /home/cc/software_testing/test_valgrind)
==124026==
==124026== Use of uninitialised value of size 8
==124026==    at 0x48BB2EB: _itoa_word (_itoa.c:177)
==124026==    by 0x48D6ABD: __vfprintf_internal (vfprintf-internal.c:1516)
==124026==    by 0x48C179E: printf (printf.c:33)
==124026==    by 0x1091DD: main (in /home/cc/software_testing/test_valgrind)
==124026==
==124026== Conditional jump or move depends on uninitialised value(s)
==124026==    at 0x48BB2FC: _itoa_word (_itoa.c:177)
==124026==    by 0x48D6ABD: __vfprintf_internal (vfprintf-internal.c:1516)
==124026==    by 0x48C179E: printf (printf.c:33)
==124026==    by 0x1091DD: main (in /home/cc/software_testing/test_valgrind)
==124026==
==124026== Conditional jump or move depends on uninitialised value(s)
==124026==    at 0x48D75C3: __vfprintf_internal (vfprintf-internal.c:1516)
==124026==    by 0x48C179E: printf (printf.c:33)
==124026==    by 0x1091DD: main (in /home/cc/software_testing/test_valgrind)
==124026==
==124026== Conditional jump or move depends on uninitialised value(s)
==124026==    at 0x48D6C05: __vfprintf_internal (vfprintf-internal.c:1516)
==124026==    by 0x48C179E: printf (printf.c:33)
==124026==    by 0x1091DD: main (in /home/cc/software_testing/test_valgrind)
==124026==
0
==124026==
==124026== HEAP SUMMARY:
==124026==     in use at exit: 0 bytes in 0 blocks
==124026==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==124026==
==124026== All heap blocks were freed -- no leaks are possible
==124026==
==124026== Use --track-origins=yes to see where uninitialised values come from
==124026== For lists of detected and suppressed errors, rerun with: -s
==124026== ERROR SUMMARY: 5 errors from 5 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==3397==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f4909623020 at pc 0x55b52ce993ab bp 0x7ffe65bcf6e0 sp 0x7ffe65bcf6d0
READ of size 4 at 0x7f4909623020 thread T0
    #0 0x55b52ce993aa in main /home/cc/software_testing/test_valgrind.c:13
    #1 0x7f490cdc0d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f490cdc0e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55b52ce99184 in _start (/home/cc/software_testing/test_asan+0x1184)

Address 0x7f4909623020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55b52ce99258 in f /home/cc/software_testing/test_valgrind.c:7

  This frame has 1 object(s):
    [32, 36) 'x' (line 8) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/cc/software_testing/test_valgrind.c:13 in main
Shadow bytes around the buggy address:
  0x0fe9a12bc5b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe9a12bc5c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe9a12bc5d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe9a12bc5e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe9a12bc5f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fe9a12bc600: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0fe9a12bc610: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe9a12bc620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe9a12bc630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe9a12bc640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe9a12bc650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3397==
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int main(void)
{
	int arr1[8] = {0};
	int arr2[8] = {0};
	arr1[40]++; // 8 + 32
}
```
### Why
That's because the size of redzone is 32 bytes. In the code above, arr1[40] is doing the same thing as arr2[0].
And ASan doesn't show any error message.
