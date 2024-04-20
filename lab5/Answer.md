# Answer

Name: 紀軒宇
ID: 312551080

## Environment
- Compiler: gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    v     |  v   |
| Stack out-of-bounds  |    x     |  v   |
| Global out-of-bounds |    x     |  v   |
| Use-after-free       |    v     |  v   |
| Use-after-return     |    x     |  v   |

### Heap out-of-bounds
#### Source code
```c
#include <stdlib.h>

int main() {
    int *a = (int *)malloc(sizeof(int) * 10);

    int temp = a[10]; // heap out-of-bounds read
    a[10] = 0;        // heap out-of-bounds write

    free(a);
    return 0;
}
```
#### Valgrind Report
```
==7885== Memcheck, a memory error detector
==7885== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7885== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7885== Command: ./test
==7885== Parent PID: 7879
==7885== 
==7885== Invalid read of size 4
==7885==    at 0x109187: main (1_heap.c:6)
==7885==  Address 0x4a8e068 is 0 bytes after a block of size 40 alloc'd
==7885==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7885==    by 0x10917E: main (1_heap.c:4)
==7885== 
==7885== Invalid write of size 4
==7885==    at 0x109195: main (1_heap.c:7)
==7885==  Address 0x4a8e068 is 0 bytes after a block of size 40 alloc'd
==7885==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7885==    by 0x10917E: main (1_heap.c:4)
==7885== 
==7885== 
==7885== HEAP SUMMARY:
==7885==     in use at exit: 0 bytes in 0 blocks
==7885==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==7885== 
==7885== All heap blocks were freed -- no leaks are possible
==7885== 
==7885== For lists of detected and suppressed errors, rerun with: -s
==7885== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==7894==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x556a190d123e bp 0x7fff988088d0 sp 0x7fff988088c0
READ of size 4 at 0x604000000038 thread T0
    #0 0x556a190d123d in main /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/1_heap.c:6
    #1 0x7f24db7aed8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f24db7aee3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x556a190d1124 in _start (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1124)

0x604000000038 is located 0 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7f24dba62887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x556a190d11fe in main /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/1_heap.c:4
    #2 0x7f24db7aed8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/1_heap.c:6 in main
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
==7894==ABORTING
```

### Stack out-of-bounds
#### Source code
```c
#include <stdlib.h>

int main() {
    int a[10];
    
    int temp = a[10]; // stack out-of-bounds read
    a[10] = 0;        // stack out-of-bounds write

    return 0;
}
```
#### Valgrind Report
```
==8691== Memcheck, a memory error detector
==8691== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==8691== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==8691== Command: ./test
==8691== Parent PID: 8685
==8691== 
==8691== 
==8691== Process terminating with default action of signal 6 (SIGABRT)
==8691==    at 0x48F89FC: __pthread_kill_implementation (pthread_kill.c:44)
==8691==    by 0x48F89FC: __pthread_kill_internal (pthread_kill.c:78)
==8691==    by 0x48F89FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==8691==    by 0x48A4475: raise (raise.c:26)
==8691==    by 0x488A7F2: abort (abort.c:79)
==8691==    by 0x48EB675: __libc_message (libc_fatal.c:155)
==8691==    by 0x4998599: __fortify_fail (fortify_fail.c:26)
==8691==    by 0x4998565: __stack_chk_fail (stack_chk_fail.c:24)
==8691==    by 0x109189: main (2_stack.c:10)
==8691== 
==8691== HEAP SUMMARY:
==8691==     in use at exit: 0 bytes in 0 blocks
==8691==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==8691== 
==8691== All heap blocks were freed -- no leaks are possible
==8691== 
==8691== For lists of detected and suppressed errors, rerun with: -s
==8691== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==8699==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffa05ace48 at pc 0x563a18f5129b bp 0x7fffa05acdd0 sp 0x7fffa05acdc0
READ of size 4 at 0x7fffa05ace48 thread T0
    #0 0x563a18f5129a in main /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/2_stack.c:6
    #1 0x7ff526ebcd8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7ff526ebce3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x563a18f51104 in _start (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1104)

Address 0x7fffa05ace48 is located in stack of thread T0 at offset 88 in frame
    #0 0x563a18f511d8 in main /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/2_stack.c:3

  This frame has 1 object(s):
    [48, 88) 'a' (line 4) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/2_stack.c:6 in main
Shadow bytes around the buggy address:
  0x1000740ad970: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000740ad980: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000740ad990: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000740ad9a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000740ad9b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1
=>0x1000740ad9c0: f1 f1 f1 f1 00 00 00 00 00[f3]f3 f3 f3 f3 00 00
  0x1000740ad9d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000740ad9e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000740ad9f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000740ada00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000740ada10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==8699==ABORTING

```

### Global out-of-bounds
#### Source code
```c
int a[10];

int main(){
    int temp = a[10]; // global out-of-bounds read
    a[10] = 0;        // global out-of-bounds write

    return 0;
}
```
#### Valgrind Report
```
==113316== Memcheck, a memory error detector
==113316== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==113316== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==113316== Command: ./test
==113316== Parent PID: 113310
==113316== 
==113316== 
==113316== HEAP SUMMARY:
==113316==     in use at exit: 0 bytes in 0 blocks
==113316==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==113316== 
==113316== All heap blocks were freed -- no leaks are possible
==113316== 
==113316== For lists of detected and suppressed errors, rerun with: -s
==113316== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==113325==ERROR: AddressSanitizer: global-buffer-overflow on address 0x56111403b0c8 at pc 0x561114038207 bp 0x7ffc3e6774e0 sp 0x7ffc3e6774d0
READ of size 4 at 0x56111403b0c8 thread T0
    #0 0x561114038206 in main (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1206)
    #1 0x7f65e4af6d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f65e4af6e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x561114038104 in _start (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1104)

0x56111403b0c8 is located 0 bytes to the right of global variable 'a' defined in '3_global.c:1:5' (0x56111403b0a0) of size 40
SUMMARY: AddressSanitizer: global-buffer-overflow (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1206) in main
Shadow bytes around the buggy address:
  0x0ac2a27ff5c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac2a27ff5d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac2a27ff5e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac2a27ff5f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac2a27ff600: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ac2a27ff610: 00 00 00 00 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9
  0x0ac2a27ff620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac2a27ff630: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac2a27ff640: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac2a27ff650: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac2a27ff660: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==113325==ABORTING

```

### Use-after-free
#### Source code
```c
#include <stdlib.h>

int main() {
    int *a = (int *)malloc(sizeof(int) * 10);
    
    free(a); // free the memory

    int temp = a[9]; // use-after-free read
    
    return 0;
}
```
#### Valgrind Report
```
==201176== Memcheck, a memory error detector
==201176== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==201176== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==201176== Command: ./test
==201176== Parent PID: 201170
==201176== 
==201176== Invalid read of size 4
==201176==    at 0x109193: main (in /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test)
==201176==  Address 0x4a8e064 is 36 bytes inside a block of size 40 free'd
==201176==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==201176==    by 0x10918E: main (in /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test)
==201176==  Block was alloc'd at
==201176==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==201176==    by 0x10917E: main (in /mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test)
==201176== 
==201176== 
==201176== HEAP SUMMARY:
==201176==     in use at exit: 0 bytes in 0 blocks
==201176==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==201176== 
==201176== All heap blocks were freed -- no leaks are possible
==201176== 
==201176== For lists of detected and suppressed errors, rerun with: -s
==201176== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)

```
### ASan Report
```
=================================================================
==201182==ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000034 at pc 0x55f662b3f22a bp 0x7ffe6f825bb0 sp 0x7ffe6f825ba0
READ of size 4 at 0x604000000034 thread T0
    #0 0x55f662b3f229 in main (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1229)
    #1 0x7f7ecf1a5d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f7ecf1a5e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55f662b3f104 in _start (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1104)

0x604000000034 is located 36 bytes inside of 40-byte region [0x604000000010,0x604000000038)
freed by thread T0 here:
    #0 0x7f7ecf459537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55f662b3f1ee in main (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x11ee)
    #2 0x7f7ecf1a5d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7f7ecf459887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55f662b3f1de in main (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x11de)
    #2 0x7f7ecf1a5d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1229) in main
Shadow bytes around the buggy address:
  0x0c087fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c087fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c087fff8000: fa fa fd fd fd fd[fd]fa fa fa fa fa fa fa fa fa
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
==201182==ABORTING

```

### Use-after-return
#### Source code
```c
#include <stdlib.h>

int *a;

void func() {
    int temp[10];
    a = &temp[0];
    return;
}

int main() {
    func();
    
    int a_temp = a[0]; // use-after-return read

    return 0;
}
```
#### Valgrind Report
```
==3134== Memcheck, a memory error detector
==3134== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==3134== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==3134== Command: ./test
==3134== Parent PID: 3127
==3134== 
==3134== 
==3134== HEAP SUMMARY:
==3134==     in use at exit: 0 bytes in 0 blocks
==3134==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==3134== 
==3134== All heap blocks were freed -- no leaks are possible
==3134== 
==3134== For lists of detected and suppressed errors, rerun with: -s
==3134== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```

### ASan Report
```
=================================================================
==3142==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f3352196030 at pc 0x5596f015e372 bp 0x7ffc1a2340a0 sp 0x7ffc1a234090
READ of size 4 at 0x7f3352196030 thread T0
    #0 0x5596f015e371 in main (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1371)
    #1 0x7f3355834d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f3355834e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5596f015e144 in _start (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1144)

Address 0x7f3352196030 is located in stack of thread T0 at offset 48 in frame
    #0 0x5596f015e218 in func (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1218)

  This frame has 1 object(s):
    [48, 88) 'temp' (line 6) <== Memory access at offset 48 is inside this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return (/mnt/c/Users/312551080/OneDrive - 國立陽明交通大學/NYCU/112-2/【112下】535512軟體測試 Software Testing/lab/lab5/test+0x1371) in main
Shadow bytes around the buggy address:
  0x0fe6ea42abb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe6ea42abc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe6ea42abd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe6ea42abe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe6ea42abf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0fe6ea42ac00: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0fe6ea42ac10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe6ea42ac20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe6ea42ac30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe6ea42ac40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0fe6ea42ac50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==3142==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
#include <stdio.h>

int main(){
    int a[8] = {0, 1, 2, 3, 4, 5, 6, 7};
    int b[8] = {8, 9, 10, 11, 12, 13, 14, 15};

    a[8+8] = 100; // out-of-bounds write
    printf("b[0] = %d\n", b[0]); 

    return 0;
}
```
### Why
我們檢查由讀取已越界 a[8]=100 做測試，擷取 Shadow bytes around the buggy address 部分內容如下

```
  0x100006af5620: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x100006af5630: 00 00 00 00 00 00 f1 f1 f1 f1 00 00 00 00[f2]f2
  0x100006af5640: f2 f2 00 00 00 00 f3 f3 f3 f3 00 00 00 00 00 00
```

可以發現在 a 陣列有 4 個 8 bytes 的 redzone，只要忽略該 8 個 bytes 的 redzone，就可以繞過 ASan 的檢查，並寫入在 00 的地方，即可繞過 ASan 的檢查，如範例程式中，略過 a 與 b 陣列間的 redzone，直接寫入 b 陣列的第一個元素，並成功印出更改後的值。

```
b[0] = 100
```