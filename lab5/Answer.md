# Answer

Name:ZIH-HAN CHEN
ID:512557026

## Test Valgrind and ASan

### Environment

gcc/g++ (Ubuntu 11.4.0-1ubuntu1~22.04) `11.4.0`
valgrind: `3.18.1`

### Result

|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   | Yes      | Yes  |
| Stack out-of-bounds  | No       | Yes  |
| Global out-of-bounds | No       | Yes  |
| Use-after-free       | Yes      | Yes  |
| Use-after-return     | No       | No   |

### Heap out-of-bounds

#### Source code

```
#include <stdio.h>
#include <stdlib.h>

int main() {
    char *str = malloc(3);
    str[3] = 'C';
    printf("%c\n",str[3]);
    free(str);
    return 0;
}
```

#### Valgrind Report

```
==26907== Memcheck, a memory error detector
==26907== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==26907== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==26907== Command: ./main
==26907==
==26907== Invalid write of size 1
==26907==    at 0x1091AB: main (main.c:6)
==26907==  Address 0x4a8c043 is 0 bytes after a block of size 3 alloc'd
==26907==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==26907==    by 0x10919E: main (main.c:5)
==26907==
==26907== Invalid read of size 1
==26907==    at 0x1091B6: main (main.c:7)
==26907==  Address 0x4a8c043 is 0 bytes after a block of size 3 alloc'd
==26907==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==26907==    by 0x10919E: main (main.c:5)
==26907==
C
==26907==
==26907== HEAP SUMMARY:
==26907==     in use at exit: 0 bytes in 0 blocks
==26907==   total heap usage: 2 allocs, 2 frees, 1,027 bytes allocated
==26907==
==26907== All heap blocks were freed -- no leaks are possible
==26907==
==26907== For lists of detected and suppressed errors, rerun with: -s
==26907== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```

### ASan Report

```
=================================================================
==1514==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000013 at pc 0x7f5550f4729f bp 0x7fffcf748df0 sp 0x7fffcf748de0
WRITE of size 1 at 0x602000000013 thread T0
    #0 0x7f5550f4729e in main /home/david/lab5/uaf.c:6
    #1 0x7f5550309d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7f5550309e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x7f5550f47184 in _start (/home/david/lab5/uaf+0x1184)

0x602000000013 is located 0 bytes to the right of 3-byte region [0x602000000010,0x602000000013)
allocated by thread T0 here:
    #0 0x7f55505c4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x7f5550f4725e in main /home/david/lab5/uaf.c:5
    #2 0x7f5550309d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/david/lab5/uaf.c:6 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[03]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==1514==ABORTING
```

### Stack out-of-bounds

#### Source code

```
#include <stdio.h>
int main()
{
    int arr[] = {1,2,3};
    printf("arr[10] is %d\n", arr[3]);
    return 0;
}
```

#### Valgrind Report

```
==27196== Memcheck, a memory error detector
==27196== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==27196== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==27196== Command: ./main
==27196==
arr[10] is -468835072
==27196==
==27196== HEAP SUMMARY:
==27196==     in use at exit: 0 bytes in 0 blocks
==27196==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==27196==
==27196== All heap blocks were freed -- no leaks are possible
==27196==
==27196== For lists of detected and suppressed errors, rerun with: -s
==27196== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### ASan Report

```
=================================================================
==791==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffed35d01c at pc 0x7fea5c2ee3c0 bp 0x7fffed35cfe0 sp 0x7fffed35cfd0
READ of size 4 at 0x7fffed35d01c thread T0
    #0 0x7fea5c2ee3bf in main /home/david/lab5/uaf.c:5
    #1 0x7fea5b6a9d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7fea5b6a9e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x7fea5c2ee184 in _start (/home/david/lab5/uaf+0x1184)

Address 0x7fffed35d01c is located in stack of thread T0 at offset 44 in frame
    #0 0x7fea5c2ee258 in main /home/david/lab5/uaf.c:3

  This frame has 1 object(s):
    [32, 44) 'arr' (line 4) <== Memory access at offset 44 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/david/lab5/uaf.c:5 in main
Shadow bytes around the buggy address:
  0x10007da639b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007da639c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007da639d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007da639e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007da639f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x10007da63a00: f1 f1 00[04]f3 f3 00 00 00 00 00 00 00 00 00 00
  0x10007da63a10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007da63a20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007da63a30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007da63a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10007da63a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==791==ABORTING
```

### Global out-of-bounds

#### Source code

```
int arr[5];
int main() {
    int x = arr[5];
    return x;
}
```

#### Valgrind Report

```
==27497== Memcheck, a memory error detector
==27497== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==27497== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==27497== Command: ./main
==27497==
==27497==
==27497== HEAP SUMMARY:
==27497==     in use at exit: 0 bytes in 0 blocks
==27497==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==27497==
==27497== All heap blocks were freed -- no leaks are possible
==27497==
==27497== For lists of detected and suppressed errors, rerun with: -s
==27497== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### ASan Report

```
=================================================================
==93==ERROR: AddressSanitizer: global-buffer-overflow on address 0x7ff7930830b4 at pc 0x7ff79308020f bp 0x7fffc48c34c0 sp 0x7fffc48c34b0
READ of size 4 at 0x7ff7930830b4 thread T0
    #0 0x7ff79308020e in main /home/david/lab5/uaf.c:3
    #1 0x7ff792439d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7ff792439e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x7ff793080104 in _start (/home/david/lab5/uaf+0x1104)

0x7ff7930830b4 is located 0 bytes to the right of global variable 'arr' defined in 'uaf.c:1:5' (0x7ff7930830a0) of size 20
SUMMARY: AddressSanitizer: global-buffer-overflow /home/david/lab5/uaf.c:3 in main
Shadow bytes around the buggy address:
  0x0fff726085c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fff726085d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fff726085e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fff726085f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fff72608600: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0fff72608610: 00 00 00 00 00 00[04]f9 f9 f9 f9 f9 00 00 00 00
  0x0fff72608620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fff72608630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fff72608640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fff72608650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fff72608660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==93==ABORTING
```

### Use-after-free

#### Source code

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, const char *argv[])
{
    char *s = malloc(10);
    free(s);
    strcpy(s, "CHII!");
    printf("string is: %s\n", s);
    return 0;
}

```

#### Valgrind Report

```
==13844== Memcheck, a memory error detector
==13844== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==13844== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==13844== Command: ./main
==13844==
==13844== Invalid write of size 4
==13844==    at 0x1091BA: main (main.c:9)
==13844==  Address 0x4a8c040 is 0 bytes inside a block of size 10 free'd
==13844==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091B5: main (main.c:8)
==13844==  Block was alloc'd at
==13844==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091A5: main (main.c:7)
==13844==
==13844== Invalid write of size 2
==13844==    at 0x1091C0: main (main.c:9)
==13844==  Address 0x4a8c044 is 4 bytes inside a block of size 10 free'd
==13844==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091B5: main (main.c:8)
==13844==  Block was alloc'd at
==13844==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091A5: main (main.c:7)
==13844==
==13844== Invalid read of size 1
==13844==    at 0x484ED16: strlen (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x48D6D30: __vfprintf_internal (vfprintf-internal.c:1517)
==13844==    by 0x48C079E: printf (printf.c:33)
==13844==    by 0x1091E0: main (main.c:10)
==13844==  Address 0x4a8c040 is 0 bytes inside a block of size 10 free'd
==13844==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091B5: main (main.c:8)
==13844==  Block was alloc'd at
==13844==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091A5: main (main.c:7)
==13844==
==13844== Invalid read of size 1
==13844==    at 0x484ED24: strlen (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x48D6D30: __vfprintf_internal (vfprintf-internal.c:1517)
==13844==    by 0x48C079E: printf (printf.c:33)
==13844==    by 0x1091E0: main (main.c:10)
==13844==  Address 0x4a8c041 is 1 bytes inside a block of size 10 free'd
==13844==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091B5: main (main.c:8)
==13844==  Block was alloc'd at
==13844==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091A5: main (main.c:7)
==13844==
==13844== Invalid read of size 1
==13844==    at 0x48EB734: _IO_new_file_xsputn (fileops.c:1218)
==13844==    by 0x48EB734: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==13844==    by 0x48D700B: outstring_func (vfprintf-internal.c:239)
==13844==    by 0x48D700B: __vfprintf_internal (vfprintf-internal.c:1517)
==13844==    by 0x48C079E: printf (printf.c:33)
==13844==    by 0x1091E0: main (main.c:10)
==13844==  Address 0x4a8c044 is 4 bytes inside a block of size 10 free'd
==13844==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091B5: main (main.c:8)
==13844==  Block was alloc'd at
==13844==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091A5: main (main.c:7)
==13844==
==13844== Invalid read of size 1
==13844==    at 0x48534C8: mempcpy (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x48EB664: _IO_new_file_xsputn (fileops.c:1235)
==13844==    by 0x48EB664: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==13844==    by 0x48D700B: outstring_func (vfprintf-internal.c:239)
==13844==    by 0x48D700B: __vfprintf_internal (vfprintf-internal.c:1517)
==13844==    by 0x48C079E: printf (printf.c:33)
==13844==    by 0x1091E0: main (main.c:10)
==13844==  Address 0x4a8c044 is 4 bytes inside a block of size 10 free'd
==13844==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091B5: main (main.c:8)
==13844==  Block was alloc'd at
==13844==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091A5: main (main.c:7)
==13844==
==13844== Invalid read of size 1
==13844==    at 0x48534D6: mempcpy (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x48EB664: _IO_new_file_xsputn (fileops.c:1235)
==13844==    by 0x48EB664: _IO_file_xsputn@@GLIBC_2.2.5 (fileops.c:1196)
==13844==    by 0x48D700B: outstring_func (vfprintf-internal.c:239)
==13844==    by 0x48D700B: __vfprintf_internal (vfprintf-internal.c:1517)
==13844==    by 0x48C079E: printf (printf.c:33)
==13844==    by 0x1091E0: main (main.c:10)
==13844==  Address 0x4a8c042 is 2 bytes inside a block of size 10 free'd
==13844==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091B5: main (main.c:8)
==13844==  Block was alloc'd at
==13844==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==13844==    by 0x1091A5: main (main.c:7)
==13844==
string is: CHII!
==13844==
==13844== HEAP SUMMARY:
==13844==     in use at exit: 0 bytes in 0 blocks
==13844==   total heap usage: 2 allocs, 2 frees, 1,034 bytes allocated
==13844==
==13844== All heap blocks were freed -- no leaks are possible
==13844==
==13844== For lists of detected and suppressed errors, rerun with: -s
==13844== ERROR SUMMARY: 19 errors from 7 contexts (suppressed: 0 from 0)
```

### ASan Report

```
=================================================================
==15056==ERROR: AddressSanitizer: heap-use-after-free on address 0x6020000000d0 at pc 0x00010ab35dc6 bp 0x7ff7b58f9350 sp 0x7ff7b58f8b10
WRITE of size 6 at 0x6020000000d0 thread T0
    #0 0x10ab35dc5 in __asan_memcpy+0xf85 (libclang_rt.asan_osx_dynamic.dylib:x86_64h+0xdadc5)
    #1 0x10a609e6e in main uaf.c:9
    #2 0x7ff80b1a341e in start+0x76e (dyld:x86_64+0xfffffffffff6e41e)

0x6020000000d0 is located 0 bytes inside of 10-byte region [0x6020000000d0,0x6020000000da)
freed by thread T0 here:
    #0 0x10ab38f89 in wrap_free+0xa9 (libclang_rt.asan_osx_dynamic.dylib:x86_64h+0xddf89)
    #1 0x10a609e5a in main uaf.c:8
    #2 0x7ff80b1a341e in start+0x76e (dyld:x86_64+0xfffffffffff6e41e)

previously allocated by thread T0 here:
    #0 0x10ab38e40 in wrap_malloc+0xa0 (libclang_rt.asan_osx_dynamic.dylib:x86_64h+0xdde40)
    #1 0x10a609e4f in main uaf.c:7
    #2 0x7ff80b1a341e in start+0x76e (dyld:x86_64+0xfffffffffff6e41e)

SUMMARY: AddressSanitizer: heap-use-after-free (libclang_rt.asan_osx_dynamic.dylib:x86_64h+0xdadc5) in __asan_memcpy+0xf85
Shadow bytes around the buggy address:
  0x601ffffffe00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601ffffffe80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x601fffffff80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x602000000000: fa fa fd fd fa fa 00 00 fa fa 00 03 fa fa 00 07
=>0x602000000080: fa fa 00 04 fa fa 00 00 fa fa[fd]fd fa fa fa fa
  0x602000000100: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000180: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000200: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000280: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x602000000300: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==15056==ABORTING

```

### Use-after-return

#### Source code

```
char* x;

void foo() {
    char stack_buffer[42];
    x = &stack_buffer[13];
}

int main() {
    foo();
    *x = 42; // user after return

    return 0;
}
```

#### Valgrind Report

```
==27820== Memcheck, a memory error detector
==27820== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==27820== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==27820== Command: ./main
==27820==
==27820==
==27820== HEAP SUMMARY:
==27820==     in use at exit: 0 bytes in 0 blocks
==27820==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==27820==
==27820== All heap blocks were freed -- no leaks are possible
==27820==
==27820== For lists of detected and suppressed errors, rerun with: -s
==27820== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### ASan Report

```

```

## ASan Out-of-bound Write bypass Redzone

### Source code

```
int main() {
    char a[8];
    char *p = &a[32];
    *p = 0;
    return 0;
}
```

### Why

Since the pointer `*p` is set to a position beyond the range of array `a`, it will not access the redzone area after array `a`.
When trying to write a value via *p, this will trigger an out-of-bounds access. However, ASan only reports an error when redzone is accessed, and `*p` doesn't access the redzone, ASan will not be able to detect this error.
