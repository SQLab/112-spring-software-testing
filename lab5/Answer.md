# Answer

Name: 施育衡
ID: 312553004

## Environment

- Compiler: gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   O      |  O   |
| Stack out-of-bounds  |   X      |  O   |
| Global out-of-bounds |   X      |  O   |
| Use-after-free       |   O      |  O   |
| Use-after-return     |   X      |  O   |

### Heap out-of-bounds
#### Source code
```c
#include <stdlib.h>

int main() {
	int *arr = (int *)malloc(sizeof(int) * 10);
	int tmp = arr[10];
	arr[10] = 0;
	return 0;
}
```
#### Valgrind Report
```
==13491== Memcheck, a memory error detector
==13491== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13491== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==13491== Command: ./vg
==13491== 
==13491== Invalid read of size 4
==13491==    at 0x109167: main (in /home/shiheng/112-spring-software-testing/lab5/test/vg)
==13491==  Address 0x4a97068 is 0 bytes after a block of size 40 alloc'd
==13491==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13491==    by 0x10915E: main (in /home/shiheng/112-spring-software-testing/lab5/test/vg)
==13491== 
==13491== Invalid write of size 4
==13491==    at 0x109175: main (in /home/shiheng/112-spring-software-testing/lab5/test/vg)
==13491==  Address 0x4a97068 is 0 bytes after a block of size 40 alloc'd
==13491==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13491==    by 0x10915E: main (in /home/shiheng/112-spring-software-testing/lab5/test/vg)
==13491== 
==13491== 
==13491== HEAP SUMMARY:
==13491==     in use at exit: 40 bytes in 1 blocks
==13491==   total heap usage: 1 allocs, 0 frees, 40 bytes allocated
==13491== 
==13491== LEAK SUMMARY:
==13491==    definitely lost: 40 bytes in 1 blocks
==13491==    indirectly lost: 0 bytes in 0 blocks
==13491==      possibly lost: 0 bytes in 0 blocks
==13491==    still reachable: 0 bytes in 0 blocks
==13491==         suppressed: 0 bytes in 0 blocks
==13491== Rerun with --leak-check=full to see details of leaked memory
==13491== 
==13491== For lists of detected and suppressed errors, rerun with: -s
==13491== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==10229==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x5b271d9d121e bp 0x7fff0b7256b0 sp 0x7fff0b7256a0
READ of size 4 at 0x604000000038 thread T0
    #0 0x5b271d9d121d in main (/home/shiheng/112-spring-software-testing/lab5/a+0x121d)
    #1 0x76cd2d629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x76cd2d629e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5b271d9d1104 in _start (/home/shiheng/112-spring-software-testing/lab5/a+0x1104)

0x604000000038 is located 0 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x76cd2dab4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5b271d9d11de in main (/home/shiheng/112-spring-software-testing/lab5/a+0x11de)
    #2 0x76cd2d629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/shiheng/112-spring-software-testing/lab5/a+0x121d) in main
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
int main() {
	int arr[10];
	int tmp = arr[20];
	arr[20] = 0;
	return 0;
}
```
#### Valgrind Report
```
==10644== Memcheck, a memory error detector
==10644== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==10644== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==10644== Command: ./vg
==10644== 
*** stack smashing detected ***: terminated
==10644== 
==10644== Process terminating with default action of signal 6 (SIGABRT)
==10644==    at 0x49019FC: __pthread_kill_implementation (pthread_kill.c:44)
==10644==    by 0x49019FC: __pthread_kill_internal (pthread_kill.c:78)
==10644==    by 0x49019FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==10644==    by 0x48AD475: raise (raise.c:26)
==10644==    by 0x48937F2: abort (abort.c:79)
==10644==    by 0x48F4675: __libc_message (libc_fatal.c:155)
==10644==    by 0x49A1599: __fortify_fail (fortify_fail.c:26)
==10644==    by 0x49A1565: __stack_chk_fail (stack_chk_fail.c:24)
==10644==    by 0x109189: main (in /home/shiheng/112-spring-software-testing/lab5/test/vg)
==10644== 
==10644== HEAP SUMMARY:
==10644==     in use at exit: 0 bytes in 0 blocks
==10644==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==10644== 
==10644== All heap blocks were freed -- no leaks are possible
==10644== 
==10644== For lists of detected and suppressed errors, rerun with: -s
==10644== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==10634==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x71181ecae058 at pc 0x5cf49e5bb29b bp 0x7fff5c688b10 sp 0x7fff5c688b00
READ of size 4 at 0x71181ecae058 thread T0
    #0 0x5cf49e5bb29a in main (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x129a)
    #1 0x711822229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x711822229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5cf49e5bb104 in _start (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x1104)

Address 0x71181ecae058 is located in stack of thread T0 at offset 88 in frame
    #0 0x5cf49e5bb1d8 in main (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x11d8)

  This frame has 1 object(s):
    [48, 88) 'arr' (line 2) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x129a) in main
Shadow bytes around the buggy address:
  0x0e2383d8dbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e2383d8dbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e2383d8dbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e2383d8dbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e2383d8dbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0e2383d8dc00: f1 f1 f1 f1 f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3
  0x0e2383d8dc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e2383d8dc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e2383d8dc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e2383d8dc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0e2383d8dc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
int arr[10];

int main() {
	int tmp = arr[10];
	arr[10] = 0;
	return 0;
}
```
#### Valgrind Report
```
==10747== Memcheck, a memory error detector
==10747== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==10747== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==10747== Command: ./vg
==10747== 
==10747== 
==10747== HEAP SUMMARY:
==10747==     in use at exit: 0 bytes in 0 blocks
==10747==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==10747== 
==10747== All heap blocks were freed -- no leaks are possible
==10747== 
==10747== For lists of detected and suppressed errors, rerun with: -s
==10747== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==10755==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5c00c763e0c8 at pc 0x5c00c763b207 bp 0x7ffeac108550 sp 0x7ffeac108540
READ of size 4 at 0x5c00c763e0c8 thread T0
    #0 0x5c00c763b206 in main (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x1206)
    #1 0x7523a8e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7523a8e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5c00c763b104 in _start (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x1104)

0x5c00c763e0c8 is located 0 bytes to the right of global variable 'arr' defined in 'a.c:1:5' (0x5c00c763e0a0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x1206) in main
Shadow bytes around the buggy address:
  0x0b8098ebfbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8098ebfbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8098ebfbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8098ebfbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8098ebfc00: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0b8098ebfc10: 00 00 00 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9
  0x0b8098ebfc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8098ebfc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8098ebfc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8098ebfc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b8098ebfc60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
#include <stdlib.h>

int main() {
	int *arr = (int *)malloc(sizeof(int) * 10);
	free(arr);
	arr[0] = 0;
	return 0;
}
```
#### Valgrind Report
```
==10817== Memcheck, a memory error detector
==10817== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==10817== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==10817== Command: ./vg
==10817== 
==10817== Invalid write of size 4
==10817==    at 0x109193: main (in /home/shiheng/112-spring-software-testing/lab5/test/vg)
==10817==  Address 0x4a97040 is 0 bytes inside a block of size 40 free'd
==10817==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==10817==    by 0x10918E: main (in /home/shiheng/112-spring-software-testing/lab5/test/vg)
==10817==  Block was alloc'd at
==10817==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==10817==    by 0x10917E: main (in /home/shiheng/112-spring-software-testing/lab5/test/vg)
==10817== 
==10817== 
==10817== HEAP SUMMARY:
==10817==     in use at exit: 0 bytes in 0 blocks
==10817==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==10817== 
==10817== All heap blocks were freed -- no leaks are possible
==10817== 
==10817== For lists of detected and suppressed errors, rerun with: -s
==10817== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==10825==ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000010 at pc 0x555751168226 bp 0x7ffd41c3c340 sp 0x7ffd41c3c330
WRITE of size 4 at 0x604000000010 thread T0
    #0 0x555751168225 in main (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x1225)
    #1 0x72a5fb229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x72a5fb229e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x555751168104 in _start (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x1104)

0x604000000010 is located 0 bytes inside of 40-byte region [0x604000000010,0x604000000038)
freed by thread T0 here:
    #0 0x72a5fb6b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x5557511681ee in main (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x11ee)
    #2 0x72a5fb229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x72a5fb6b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5557511681de in main (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x11de)
    #2 0x72a5fb229d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/shiheng/112-spring-software-testing/lab5/test/asan+0x1225) in main
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
#include <stdlib.h>

int *arr;

void func() {
	int tmp[10];
	arr = &tmp[0];
}

int main() {
	func();

	int p = arr[0];

	return 0;
}
```
#### Valgrind Report
```
==10879== Memcheck, a memory error detector
==10879== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==10879== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==10879== Command: ./vg
==10879== 
==10879== 
==10879== HEAP SUMMARY:
==10879==     in use at exit: 0 bytes in 0 blocks
==10879==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==10879== 
==10879== All heap blocks were freed -- no leaks are possible
==10879== 
==10879== For lists of detected and suppressed errors, rerun with: -s
==10879== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==10156==ERROR: AddressSanitizer: stack-use-after-return on address 0x7692fc6ae030 at pc 0x5e24a9283372 bp 0x7ffe97bbfff0 sp 0x7ffe97bbffe0
READ of size 4 at 0x7692fc6ae030 thread T0
    #0 0x5e24a9283371 in main (/home/shiheng/112-spring-software-testing/lab5/a+0x1371)
    #1 0x7692ffc29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7692ffc29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5e24a9283144 in _start (/home/shiheng/112-spring-software-testing/lab5/a+0x1144)

Address 0x7692fc6ae030 is located in stack of thread T0 at offset 48 in frame
    #0 0x5e24a9283218 in func (/home/shiheng/112-spring-software-testing/lab5/a+0x1218)

  This frame has 1 object(s):
    [48, 88) 'tmp' (line 6) <== Memory access at offset 48 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (/home/shiheng/112-spring-software-testing/lab5/a+0x1371) in main
Shadow bytes around the buggy address:
  0x0ed2df8cdbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ed2df8cdbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ed2df8cdbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ed2df8cdbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ed2df8cdbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ed2df8cdc00: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0ed2df8cdc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ed2df8cdc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ed2df8cdc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ed2df8cdc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ed2df8cdc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include <stdio.h>

int main() {
	int arr[8] = {0, 1, 2, 3, 4, 5, 6, 7};
	int brr[8] = {8, 9, 10, 11, 12, 13, 14, 15};

	arr[16] = 100;
	for(int i = 0; i < 8; i++)
		printf("%d\n", arr[i]);

	for(int i = 0; i < 8; i++)
		printf("%d\n", brr[i]);

	return 0;
}
```
### Why

ASAN 會在 arr 後面放若干個 bytes 當作 redzone，只要記憶體取用超過這個 redzone 取到合理的記憶體區塊就可以繞過 ASAN 的檢查．