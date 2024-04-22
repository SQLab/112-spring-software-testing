# Answer

Name: `陳彥瑋`
ID: `312555003`

## Test Valgrind and ASan
### Environment
- gcc: `11.4.0`
- valgrind: `3.18.1`

### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    O     |   O  |
| Stack out-of-bounds  |    X     |   O  |
| Global out-of-bounds |    X     |   O  |
| Use-after-free       |    O     |   O  |
| Use-after-return     |    O     |   O  |

### Heap out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *buf = malloc(100);
    buf[0] = '1';
    buf[1] = '2';
    buf[2] = '3';

    // normal use
    buf[0] = 'a';
    printf("buf: %s\n", buf);

    // oob
    buf[100] = 'b';
    printf("buf: %s\n", buf);
    
    free(buf);
}
```
#### Valgrind Report
```
==354893== Memcheck, a memory error detector
==354893== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==354893== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==354893== Command: ./heap_oob
==354893==
==354893== Conditional jump or move depends on uninitialised value(s)
==354893==    at 0x484ED28: strlen (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==354893==    by 0x48EBD30: __vfprintf_internal (vfprintf-internal.c:1517)
==354893==    by 0x48D579E: printf (printf.c:33)
==354893==    by 0x1091E1: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/heap_oob)
==354893==
buf: a23
==354893== Invalid write of size 1
==354893==    at 0x1091EA: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/heap_oob)
==354893==  Address 0x4aa10a4 is 0 bytes after a block of size 100 alloc'd
==354893==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==354893==    by 0x10919E: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/heap_oob)
==354893==
==354893== Conditional jump or move depends on uninitialised value(s)
==354893==    at 0x484ED28: strlen (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==354893==    by 0x48EBD30: __vfprintf_internal (vfprintf-internal.c:1517)
==354893==    by 0x48D579E: printf (printf.c:33)
==354893==    by 0x109207: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/heap_oob)
==354893==
buf: a23
==354893==
==354893== HEAP SUMMARY:
==354893==     in use at exit: 0 bytes in 0 blocks
==354893==   total heap usage: 2 allocs, 2 frees, 1,124 bytes allocated
==354893==
==354893== All heap blocks were freed -- no leaks are possible
==354893==
==354893== Use --track-origins=yes to see where uninitialised values come from
==354893== For lists of detected and suppressed errors, rerun with: -s
==354893== ERROR SUMMARY: 3 errors from 3 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
=================================================================
==355314==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60b000000154 at pc 0x78bbdfe5df89 bp 0x7fffea248e50 sp 0x7fffea2485c8
READ of size 101 at 0x60b000000154 thread T0
    #0 0x78bbdfe5df88 in printf_common ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors_format.inc:553
    #1 0x78bbdfe5e6cc in __interceptor_vprintf ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors.inc:1660
    #2 0x78bbdfe5e7c6 in __interceptor_printf ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors.inc:1718
    #3 0x5c6c7f0f331d in main (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/heap_oob_asan+0x131d)
    #4 0x78bbdfa29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #5 0x78bbdfa29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #6 0x5c6c7f0f3164 in _start (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/heap_oob_asan+0x1164)

0x60b000000154 is located 0 bytes to the right of 100-byte region [0x60b0000000f0,0x60b000000154)
allocated by thread T0 here:
    #0 0x78bbdfeb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5c6c7f0f323e in main (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/heap_oob_asan+0x123e)
    #2 0x78bbdfa29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors_format.inc:553 in printf_common
Shadow bytes around the buggy address:
  0x0c167fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c167fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c167fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c167fff8000: fa fa fa fa fa fa fa fa fd fd fd fd fd fd fd fd
  0x0c167fff8010: fd fd fd fd fd fa fa fa fa fa fa fa fa fa 00 00
=>0x0c167fff8020: 00 00 00 00 00 00 00 00 00 00[04]fa fa fa fa fa
  0x0c167fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c167fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c167fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c167fff8060: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c167fff8070: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==355314==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char buf[100] = "123";

    // normal use
    buf[0] = 'a';
    printf("buf: %s\n", buf);

    // oob
    buf[100] = 'b';
    printf("buf: %s\n", buf);
}
```
#### Valgrind Report
```
==357574== Memcheck, a memory error detector
==357574== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==357574== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==357574== Command: ./stack_oob
==357574==
buf: a23
buf: a23
==357574==
==357574== HEAP SUMMARY:
==357574==     in use at exit: 0 bytes in 0 blocks
==357574==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==357574==
==357574== All heap blocks were freed -- no leaks are possible
==357574==
==357574== For lists of detected and suppressed errors, rerun with: -s
==357574== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
buf: a23
=================================================================
==358047==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffcce66c124 at pc 0x574a17b88463 bp 0x7ffcce66c080 sp 0x7ffcce66c070
WRITE of size 1 at 0x7ffcce66c124 thread T0
    #0 0x574a17b88462 in main (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/stack_oob_asan+0x1462)
    #1 0x729a0ea29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x729a0ea29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x574a17b88184 in _start (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/stack_oob_asan+0x1184)

Address 0x7ffcce66c124 is located in stack of thread T0 at offset 148 in frame
    #0 0x574a17b88258 in main (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/stack_oob_asan+0x1258)

  This frame has 1 object(s):
    [48, 148) 'buf' (line 6) <== Memory access at offset 148 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/stack_oob_asan+0x1462) in main
Shadow bytes around the buggy address:
  0x100019cc57d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100019cc57e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100019cc57f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100019cc5800: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100019cc5810: 00 00 f1 f1 f1 f1 f1 f1 00 00 00 00 00 00 00 00
=>0x100019cc5820: 00 00 00 00[04]f3 f3 f3 f3 f3 00 00 00 00 00 00
  0x100019cc5830: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100019cc5840: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100019cc5850: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100019cc5860: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100019cc5870: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==358047==ABORTING
```

### Global out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

char buf[100] = "123";

int main()
{
    // normal use
    buf[0] = 'a';
    printf("buf: %s\n", buf);

    // oob
    buf[100] = 'b';
    printf("buf: %s\n", buf);
}
```
#### Valgrind Report
```
==358388== Memcheck, a memory error detector
==358388== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==358388== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==358388== Command: ./global_oob
==358388==
buf: a23
buf: a23
==358388==
==358388== HEAP SUMMARY:
==358388==     in use at exit: 0 bytes in 0 blocks
==358388==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==358388==
==358388== All heap blocks were freed -- no leaks are possible
==358388==
==358388== For lists of detected and suppressed errors, rerun with: -s
==358388== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
buf: a23
=================================================================
==358573==ERROR: AddressSanitizer: global-buffer-overflow on address 0x5f83679e6084 at pc 0x5f83679e324d bp 0x7ffe72bff760 sp 0x7ffe72bff750
WRITE of size 1 at 0x5f83679e6084 thread T0
    #0 0x5f83679e324c in main (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/global_oob_asan+0x124c)
    #1 0x79d076629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x79d076629e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5f83679e3124 in _start (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/global_oob_asan+0x1124)

0x5f83679e6084 is located 0 bytes to the right of global variable 'buf' defined in 'global_oob.c:4:6' (0x5f83679e6020) of size 100
SUMMARY: AddressSanitizer: global-buffer-overflow (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/global_oob_asan+0x124c) in main
Shadow bytes around the buggy address:
  0x0bf0ecf34bc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bf0ecf34bd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bf0ecf34be0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bf0ecf34bf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bf0ecf34c00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0bf0ecf34c10:[04]f9 f9 f9 f9 f9 f9 f9 00 00 00 00 f9 f9 f9 f9
  0x0bf0ecf34c20: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00
  0x0bf0ecf34c30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bf0ecf34c40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bf0ecf34c50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0bf0ecf34c60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==358573==ABORTING
```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *buf = malloc(100);
    buf[0] = '1';
    buf[1] = '2';
    buf[2] = '3';

    // normal use
    printf("buf: %s\n", buf);

    // uaf
    free(buf);
    buf[0] = 'a';
    printf("buf: %s\n", buf);
}
```
#### Valgrind Report
```
==358839== Memcheck, a memory error detector
==358839== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==358839== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==358839== Command: ./uaf
==358839==
==358839== Conditional jump or move depends on uninitialised value(s)
==358839==    at 0x484ED28: strlen (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x48EBD30: __vfprintf_internal (vfprintf-internal.c:1517)
==358839==    by 0x48D579E: printf (printf.c:33)
==358839==    by 0x1091DA: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==
buf: 123
==358839== Invalid write of size 1
==358839==    at 0x1091EB: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Address 0x4aa1040 is 0 bytes inside a block of size 100 free'd
==358839==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x1091E6: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Block was alloc'd at
==358839==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x10919E: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==
==358839== Invalid read of size 1
==358839==    at 0x484ED16: strlen (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x48EBD30: __vfprintf_internal (vfprintf-internal.c:1517)
==358839==    by 0x48D579E: printf (printf.c:33)
==358839==    by 0x109208: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Address 0x4aa1040 is 0 bytes inside a block of size 100 free'd
==358839==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x1091E6: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Block was alloc'd at
==358839==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x10919E: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==
==358839== Invalid read of size 1
==358839==    at 0x484ED24: strlen (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x48EBD30: __vfprintf_internal (vfprintf-internal.c:1517)
==358839==    by 0x48D579E: printf (printf.c:33)
==358839==    by 0x109208: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Address 0x4aa1041 is 1 bytes inside a block of size 100 free'd
==358839==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x1091E6: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Block was alloc'd at
==358839==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x10919E: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==
==358839== Invalid read of size 1
==358839==    at 0x4900734: _IO_new_file_xsputn (fileops.c:1218)
==358839==    by 0x4900734: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==358839==    by 0x48EC00B: outstring_func (vfprintf-internal.c:239)
==358839==    by 0x48EC00B: __vfprintf_internal (vfprintf-internal.c:1517)
==358839==    by 0x48D579E: printf (printf.c:33)
==358839==    by 0x109208: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Address 0x4aa1042 is 2 bytes inside a block of size 100 free'd
==358839==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x1091E6: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Block was alloc'd at
==358839==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x10919E: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==
==358839== Invalid read of size 1
==358839==    at 0x48534C8: mempcpy (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x4900664: _IO_new_file_xsputn (fileops.c:1235)
==358839==    by 0x4900664: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==358839==    by 0x48EC00B: outstring_func (vfprintf-internal.c:239)
==358839==    by 0x48EC00B: __vfprintf_internal (vfprintf-internal.c:1517)
==358839==    by 0x48D579E: printf (printf.c:33)
==358839==    by 0x109208: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Address 0x4aa1042 is 2 bytes inside a block of size 100 free'd
==358839==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x1091E6: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Block was alloc'd at
==358839==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x10919E: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==
==358839== Invalid read of size 1
==358839==    at 0x48534D6: mempcpy (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x4900664: _IO_new_file_xsputn (fileops.c:1235)
==358839==    by 0x4900664: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==358839==    by 0x48EC00B: outstring_func (vfprintf-internal.c:239)
==358839==    by 0x48EC00B: __vfprintf_internal (vfprintf-internal.c:1517)
==358839==    by 0x48D579E: printf (printf.c:33)
==358839==    by 0x109208: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Address 0x4aa1040 is 0 bytes inside a block of size 100 free'd
==358839==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x1091E6: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==  Block was alloc'd at
==358839==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==358839==    by 0x10919E: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf)
==358839==
buf: a23
==358839==
==358839== HEAP SUMMARY:
==358839==     in use at exit: 0 bytes in 0 blocks
==358839==   total heap usage: 2 allocs, 2 frees, 1,124 bytes allocated
==358839==
==358839== All heap blocks were freed -- no leaks are possible
==358839==
==358839== Use --track-origins=yes to see where uninitialised values come from
==358839== For lists of detected and suppressed errors, rerun with: -s
==358839== ERROR SUMMARY: 12 errors from 7 contexts (suppressed: 0 from 0)
```
#### ASan Report
```
=================================================================
==359163==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x60b000000154 at pc 0x76ab0625df89 bp 0x7fffb708a780 sp 0x7fffb7089ef8
READ of size 101 at 0x60b000000154 thread T0
    #0 0x76ab0625df88 in printf_common ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors_format.inc:553
    #1 0x76ab0625e6cc in __interceptor_vprintf ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors.inc:1660
    #2 0x76ab0625e7c6 in __interceptor_printf ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors.inc:1718
    #3 0x5e8d247ee316 in main (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf_asan+0x1316)
    #4 0x76ab05e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #5 0x76ab05e29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #6 0x5e8d247ee164 in _start (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf_asan+0x1164)

0x60b000000154 is located 0 bytes to the right of 100-byte region [0x60b0000000f0,0x60b000000154)
allocated by thread T0 here:
    #0 0x76ab062b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5e8d247ee23e in main (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uaf_asan+0x123e)
    #2 0x76ab05e29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow ../../../../src/libsanitizer/sanitizer_common/sanitizer_common_interceptors_format.inc:553 in printf_common
Shadow bytes around the buggy address:
  0x0c167fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c167fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c167fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c167fff8000: fa fa fa fa fa fa fa fa fd fd fd fd fd fd fd fd
  0x0c167fff8010: fd fd fd fd fd fa fa fa fa fa fa fa fa fa 00 00
=>0x0c167fff8020: 00 00 00 00 00 00 00 00 00 00[04]fa fa fa fa fa
  0x0c167fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c167fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c167fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c167fff8060: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c167fff8070: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==359163==ABORTING
```

### Use-after-return
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

char *func()
{
    char buf[100] = "123";
    return buf;
}

int main()
{
    char *buf = func();
    buf[0] = 'a';
    printf("buf: %s\n", buf);
}
```
#### Valgrind Report
```
==360370== Memcheck, a memory error detector
==360370== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==360370== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==360370== Command: ./uar
==360370==
==360370== Invalid write of size 1
==360370==    at 0x109224: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uar)
==360370==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==360370==
==360370==
==360370== Process terminating with default action of signal 11 (SIGSEGV)
==360370==  Access not within mapped region at address 0x0
==360370==    at 0x109224: main (in /media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uar)
==360370==  If you believe this happened as a result of a stack
==360370==  overflow in your program's main thread (unlikely but
==360370==  possible), you can try to increase the size of the
==360370==  main thread stack using the --main-stacksize= flag.
==360370==  The main thread stack size used in this run was 8388608.
==360370==
==360370== HEAP SUMMARY:
==360370==     in use at exit: 0 bytes in 0 blocks
==360370==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==360370==
==360370== All heap blocks were freed -- no leaks are possible
==360370==
==360370== For lists of detected and suppressed errors, rerun with: -s
==360370== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
Segmentation fault (core dumped)
```
#### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==360881==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x6465ce4064ab bp 0x7fff42fc6f60 sp 0x7fff42fc6f50 T0)
==360881==The signal is caused by a WRITE memory access.
==360881==Hint: address points to the zero page.
    #0 0x6465ce4064ab in main (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uar_asan+0x14ab)
    #1 0x7c8b23629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7c8b23629e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x6465ce406184 in _start (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uar_asan+0x1184)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV (/media/ywc/Data/1122_software_test/softwaretest_lab5/vuln/uar_asan+0x14ab) in main
==360881==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Environment
- gcc: `11.4.0`

### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int a[8] = {1, 2, 3, 4, 5, 6, 7, 8};
    int b[8] = {11, 12, 13, 14, 15, 16, 17, 18};

    // normal use
    a[0] = 0;
    puts("Before");
    for(int i=0; i<8; i++) printf("a[%d]: %d ", i, a[i]);
    puts("");
    for(int i=0; i<8; i++) printf("b[%d]: %d ", i, b[i]);
    puts("");

    // oob
    a[8 + 0x20/4] = 1000;
    puts("After");
    for(int i=0; i<8; i++) printf("a[%d]: %d ", i, a[i]);
    puts("");
    for(int i=0; i<8; i++) printf("b[%d]: %d ", i, b[i]);
    puts("");
}
```
### Result
```
Before
a[0]: 0 a[1]: 2 a[2]: 3 a[3]: 4 a[4]: 5 a[5]: 6 a[6]: 7 a[7]: 8
b[0]: 11 b[1]: 12 b[2]: 13 b[3]: 14 b[4]: 15 b[5]: 16 b[6]: 17 b[7]: 18
After
a[0]: 0 a[1]: 2 a[2]: 3 a[3]: 4 a[4]: 5 a[5]: 6 a[6]: 7 a[7]: 8
b[0]: 1000 b[1]: 12 b[2]: 13 b[3]: 14 b[4]: 15 b[5]: 16 b[6]: 17 b[7]: 18
```

### Why

在有開啟 ASAN 的情況中，array 的前後都會有 redzone 的區域，以用來偵測是否有 OOB read / write 的情形發生。在兩個 int [8] array 的情況中，在 redzone 範圍的計算上由於二 array 的大小皆為 $4 * 8 = 32$ 是 32 的倍數，無須額外做 redzone 的 alignment，因此空間的分配上會是 `| redzone (32) | a (4*8) | redzone (32) | b (4*8) | redzone (32)` 的情形，因此如果我們要在只能操作 array a 的情況下跳過中間的 redzone 改變 array b 的值的話，我們要存取的 index 是 `8 + 0x20/4`，其中 0x20 是 redzone 的大小也因為 array 是 int array 因此要進行除以 4 (`sizeof(int)`) 的操作，如此一來就能夠跳過 redzone 改變 array b 的值。