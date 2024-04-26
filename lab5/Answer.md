# Answer

Name: 翁愉媃
ID:   312551035

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   yes       |  yes    |
| Stack out-of-bounds  |   no       |  yes    |
| Global out-of-bounds |   no       |   yes   |
| Use-after-free       |   yes       |  yes    |
| Use-after-return     |   no       |  yes    |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main(void){
    int *p = (int *) malloc(sizeof(int) * 3);
    p[4]=10;// Heap out-of-bounds(write)
    int x=p[4];//Heap out-of-bounds(read)
    printf("%d\n", p[4]);
    free(p);
    return 0;
}
```
#### Valgrind Report
```
==6027== Memcheck, a memory error detector
==6027== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6027== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==6027== Command: ./1-1
==6027== 
==6027== Invalid write of size 4
==6027==    at 0x10918B: main (in /workspaces/112-spring-software-testing/lab5/1-1)
==6027==  Address 0x4a49050 is 4 bytes after a block of size 12 alloc'd
==6027==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==6027==    by 0x10917E: main (in /workspaces/112-spring-software-testing/lab5/1-1)
==6027== 
==6027== Invalid read of size 4
==6027==    at 0x109195: main (in /workspaces/112-spring-software-testing/lab5/1-1)
==6027==  Address 0x4a49050 is 4 bytes after a block of size 12 alloc'd
==6027==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==6027==    by 0x10917E: main (in /workspaces/112-spring-software-testing/lab5/1-1)
==6027== 
==6027== 
==6027== HEAP SUMMARY:
==6027==     in use at exit: 0 bytes in 0 blocks
==6027==   total heap usage: 1 allocs, 1 frees, 12 bytes allocated
==6027== 
==6027== All heap blocks were freed -- no leaks are possible
==6027== 
==6027== For lists of detected and suppressed errors, rerun with: -s
==6027== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8191==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000020 at pc 0x5fc4a0e8a2a2 bp 0x7fff7ec62e00 sp 0x7fff7ec62df0
WRITE of size 4 at 0x602000000020 thread T0
    #0 0x5fc4a0e8a2a1 in main (/home/emily/Desktop/112-spring-software-testing/lab5/1-1+0x12a1)
    #1 0x74fe21629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x74fe21629e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5fc4a0e8a184 in _start (/home/emily/Desktop/112-spring-software-testing/lab5/1-1+0x1184)

0x602000000020 is located 4 bytes to the right of 12-byte region [0x602000000010,0x60200000001c)
allocated by thread T0 here:
    #0 0x74fe21ab4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5fc4a0e8a25e in main (/home/emily/Desktop/112-spring-software-testing/lab5/1-1+0x125e)
    #2 0x74fe21629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow (/home/emily/Desktop/112-spring-software-testing/lab5/1-1+0x12a1) in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00 04[fa]fa fa fa fa fa fa fa fa fa fa fa
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
==8191==ABORTING
```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>

int main(){
    int stack[4] = {3,4,5,6};
    stack[9] = 10;
    int temp = stack[9];  
    printf("%d\n", stack[9]);
    return 0;
}
```
#### Valgrind Report
```
==39131== Memcheck, a memory error detector
==39131== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==39131== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==39131== Command: ./1-2
==39131== 
10
==39131== 
==39131== HEAP SUMMARY:
==39131==     in use at exit: 0 bytes in 0 blocks
==39131==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==39131== 
==39131== All heap blocks were freed -- no leaks are possible
==39131== 
==39131== For lists of detected and suppressed errors, rerun with: -s
==39131== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==8298==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fff35b81234 at pc 0x6442efcca31c bp 0x7fff35b811e0 sp 0x7fff35b811d0
WRITE of size 4 at 0x7fff35b81234 thread T0
    #0 0x6442efcca31b in main (/home/emily/Desktop/112-spring-software-testing/lab5/1-2+0x131b)
    #1 0x701c47029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x701c47029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x6442efcca184 in _start (/home/emily/Desktop/112-spring-software-testing/lab5/1-2+0x1184)

Address 0x7fff35b81234 is located in stack of thread T0 at offset 52 in frame
    #0 0x6442efcca258 in main (/home/emily/Desktop/112-spring-software-testing/lab5/1-2+0x1258)

  This frame has 1 object(s):
    [32, 52) 'stack' (line 4) <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow (/home/emily/Desktop/112-spring-software-testing/lab5/1-2+0x131b) in main
Shadow bytes around the buggy address:
  0x100066b681f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066b68200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066b68210: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066b68220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066b68230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100066b68240: f1 f1 f1 f1 00 00[04]f3 f3 f3 f3 f3 00 00 00 00
  0x100066b68250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066b68260: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066b68270: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066b68280: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x100066b68290: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==8298==ABORTING
```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int glob[4];

int main(void) {
    glob[5] = 4;      // Global out-of-bounds(write)
    int x = glob[5];  // Global out-of-bounds(read)
    printf("%d\n",glob[5]);
    return 0;
}
```
#### Valgrind Report
```
==5874== Memcheck, a memory error detector
==5874== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5874== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==5874== Command: ./1-4
==5874== 
4
==5874== 
==5874== HEAP SUMMARY:
==5874==     in use at exit: 0 bytes in 0 blocks
==5874==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==5874== 
==5874== All heap blocks were freed -- no leaks are possible
==5874== 
==5874== For lists of detected and suppressed errors, rerun with: -s
==5874== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==10481==ERROR: AddressSanitizer: global-buffer-overflow on address 0x579ae6bfa0f4 at pc 0x579ae6bf722f bp 0x7ffee1af4470 sp 0x7ffee1af4460
WRITE of size 4 at 0x579ae6bfa0f4 thread T0
    #0 0x579ae6bf722e in main (/home/emily/Desktop/112-spring-software-testing/lab5/1-3+0x122e)
    #1 0x70d52c829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x70d52c829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x579ae6bf7124 in _start (/home/emily/Desktop/112-spring-software-testing/lab5/1-3+0x1124)

0x579ae6bfa0f4 is located 4 bytes to the right of global variable 'glob' defined in '1-3.c:4:5' (0x579ae6bfa0e0) of size 16
SUMMARY: AddressSanitizer: global-buffer-overflow (/home/emily/Desktop/112-spring-software-testing/lab5/1-3+0x122e) in main
Shadow bytes around the buggy address:
  0x0af3dcd773c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af3dcd773d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af3dcd773e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af3dcd773f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af3dcd77400: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0af3dcd77410: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00[f9]f9
  0x0af3dcd77420: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af3dcd77430: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af3dcd77440: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af3dcd77450: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0af3dcd77460: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==10481==ABORTING
```

### Use-after-free
#### Source code
```
#include <stdlib.h>

int main() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 10;
    free(ptr);
    *ptr = 20;  // Use-after-free(write)
    int x = *ptr;  // Use-after-free(read)
    return 0;
}
```
#### Valgrind Report
```
==40610== Memcheck, a memory error detector
==40610== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==40610== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==40610== Command: ./1-3
==40610== 
==40610== Invalid write of size 4
==40610==    at 0x10919D: main (in /workspaces/112-spring-software-testing/lab5/1-3)
==40610==  Address 0x4a49040 is 0 bytes inside a block of size 4 free'd
==40610==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==40610==    by 0x109198: main (in /workspaces/112-spring-software-testing/lab5/1-3)
==40610==  Block was alloc'd at
==40610==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==40610==    by 0x10917E: main (in /workspaces/112-spring-software-testing/lab5/1-3)
==40610== 
==40610== Invalid read of size 4
==40610==    at 0x1091A7: main (in /workspaces/112-spring-software-testing/lab5/1-3)
==40610==  Address 0x4a49040 is 0 bytes inside a block of size 4 free'd
==40610==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==40610==    by 0x109198: main (in /workspaces/112-spring-software-testing/lab5/1-3)
==40610==  Block was alloc'd at
==40610==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==40610==    by 0x10917E: main (in /workspaces/112-spring-software-testing/lab5/1-3)
==40610== 
==40610== 
==40610== HEAP SUMMARY:
==40610==     in use at exit: 0 bytes in 0 blocks
==40610==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==40610== 
==40610== All heap blocks were freed -- no leaks are possible
==40610== 
==40610== For lists of detected and suppressed errors, rerun with: -s
==40610== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==11038==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x59681802e267 bp 0x7ffd5c61f390 sp 0x7ffd5c61f380
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x59681802e266 in main (/home/emily/Desktop/112-spring-software-testing/lab5/1-4+0x1266)
    #1 0x7a70f6029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7a70f6029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x59681802e104 in _start (/home/emily/Desktop/112-spring-software-testing/lab5/1-4+0x1104)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7a70f64b4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x59681802e22f in main (/home/emily/Desktop/112-spring-software-testing/lab5/1-4+0x122f)
    #2 0x7a70f6029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7a70f64b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x59681802e1de in main (/home/emily/Desktop/112-spring-software-testing/lab5/1-4+0x11de)
    #2 0x7a70f6029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/home/emily/Desktop/112-spring-software-testing/lab5/1-4+0x1266) in main
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
==11038==ABORTING
```

### Use-after-return
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int *ptr;
void *func() {
    int a = 123;
    ptr = &a; 
}
int main() {
    func();
    printf("%d\n", *ptr);
    return 0;
}
```
#### Valgrind Report
```
==5916== Memcheck, a memory error detector
==5916== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==5916== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==5916== Command: ./1-5
==5916== 
==5916== 
==5916== HEAP SUMMARY:
==5916==     in use at exit: 0 bytes in 0 blocks
==5916==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==5916== 
==5916== All heap blocks were freed -- no leaks are possible
==5916== 
==5916== For lists of detected and suppressed errors, rerun with: -s
==5916== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==173992==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f9e9eb2b020 at pc 0x55ed0ada73b0 bp 0x7fff9f584e20 sp 0x7fff9f584e10
READ of size 4 at 0x7f9e9eb2b020 thread T0
    #0 0x55ed0ada73af in main /home/cc/software_testing/test_valgrind.c:11
    #1 0x7f9ea22c8d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f9ea22c8e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55ed0ada7184 in _start (/home/cc/software_testing/test_asan+0x1184)

Address 0x7f9e9eb2b020 is located in stack of thread T0 at offset 32 in frame
    #0 0x55ed0ada7258 in func /home/cc/software_testing/test_valgrind.c:5

  This frame has 1 object(s):
    [32, 36) 'a' (line 6) <== Memory access at offset 32 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions are supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/cc/software_testing/test_valgrind.c:11 in main
Shadow bytes around the buggy address:
  0x0ff453d5d5b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff453d5d5c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff453d5d5d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff453d5d5e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff453d5d5f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ff453d5d600: f5 f5 f5 f5[f5]f5 f5 f5 00 00 00 00 00 00 00 00
  0x0ff453d5d610: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff453d5d620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff453d5d630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff453d5d640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff453d5d650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==173992==
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include <stdio.h>
#include <stdlib.h>

#include <stdio.h>
#include <stdlib.h>

int main() {
    int *a = (int*)malloc(8 * sizeof(int));
    int *b = (int*)malloc(8 * sizeof(int));

    a[32] = 17; 

    free(a);
    free(b);

    return 0;
}
```
### Why
ASan will not detect errors. Because a's readzone is 32 bytes, writing 17 into a[32] will cross the redzone of a, which means that the memory write is in another legal memory allocation area.
