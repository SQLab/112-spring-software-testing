# Answer

Name: 陳柏翰
ID: 312551074

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    V     |   V  |
| Stack out-of-bounds  |    X     |   V  |
| Global out-of-bounds |    X     |   V  |
| Use-after-free       |    V     |   V  |
| Use-after-return     |    X     |   V  |

### Heap out-of-bounds
#### Source code
```
/*
 * testing heap out-of-bounds read/write  
 */

int heap_oob_overflow(int size) {
    int *arr = (int *)malloc(size * sizeof(int));
    if (arr == NULL) {
        return -1;
    }
    for (int i = 0; i < size; i++) {
        arr[i] = i;
    }
    /* invalid write */
    arr[size] = 0;
    /* invalid read */
    int res = arr[size];
    free(arr);
    return res;
}

int main(int argc, char *argv[]) {
    if(argc < 2 || argc > 2) fprintf(stderr, "Usage: %s <error option>\n", argv[0]);
    
    if(strcmp(argv[1], "heap") == 0){
        heap_oob_overflow(10);
    }

    return;
}
```
#### Valgrind Report
```
==59703== Memcheck, a memory error detector
==59703== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==59703== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==59703== Command: ./main_valgrind heap
==59703== 
==59703== Invalid write of size 4
==59703==    at 0x10927D: heap_oob_overflow (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==59703==    by 0x1096DB: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==59703==  Address 0x4a9c068 is 0 bytes after a block of size 40 alloc'd
==59703==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==59703==    by 0x109228: heap_oob_overflow (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==59703==    by 0x1096DB: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==59703== 
==59703== Invalid read of size 4
==59703==    at 0x109297: heap_oob_overflow (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==59703==    by 0x1096DB: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==59703==  Address 0x4a9c068 is 0 bytes after a block of size 40 alloc'd
==59703==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==59703==    by 0x109228: heap_oob_overflow (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==59703==    by 0x1096DB: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==59703== 
==59703== 
==59703== HEAP SUMMARY:
==59703==     in use at exit: 0 bytes in 0 blocks
==59703==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==59703== 
==59703== All heap blocks were freed -- no leaks are possible
==59703== 
==59703== For lists of detected and suppressed errors, rerun with: -s
==59703== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
=================================================================
==59967==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x55b4946913ef bp 0x7ffdd31f3400 sp 0x7ffdd31f33f0
WRITE of size 4 at 0x604000000038 thread T0
    #0 0x55b4946913ee in heap_oob_overflow /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/heap.h:18
    #1 0x55b494692111 in main /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main.c:17
    #2 0x7f4af9629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7f4af9629e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x55b494691244 in _start (/home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_asan+0x1244)

0x604000000038 is located 0 bytes to the right of 40-byte region [0x604000000010,0x604000000038)
allocated by thread T0 here:
    #0 0x7f4af9ab4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55b494691329 in heap_oob_overflow /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/heap.h:10
    #2 0x55b494692111 in main /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main.c:17
    #3 0x7f4af9629d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/heap.h:18 in heap_oob_overflow
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
==59967==ABORTING
```

### Stack out-of-bounds
#### Source code
```
/*
 * testing stack-out-of-bounds read/write
 */

void stack_oob_overflow(int size){
    int arr[size];
    for (int i = 0; i < size; i++) {
        arr[i] = i;
    }
    /* invalid write */
    arr[size] = 0;
    /* invalid read */
    int res = arr[size];

    return;
}

int main(int argc, char *argv[]){
    if(argc < 2 || argc > 2) fprintf(stderr, "Usage: %s <error option>\n", argv[0]);
    
    if(strcmp(argv[1], "stack") == 0){
        stack_oob_overflow(10);
    }
}
```
#### Valgrind Report
```
==60303== Memcheck, a memory error detector
==60303== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==60303== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==60303== Command: ./main_valgrind stack
==60303== 
==60303== 
==60303== HEAP SUMMARY:
==60303==     in use at exit: 0 bytes in 0 blocks
==60303==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==60303== 
==60303== All heap blocks were freed -- no leaks are possible
==60303== 
==60303== For lists of detected and suppressed errors, rerun with: -s
==60303== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==60330==ERROR: AddressSanitizer: dynamic-stack-buffer-overflow on address 0x7ffeebc2e668 at pc 0x563b6e28378b bp 0x7ffeebc2e600 sp 0x7ffeebc2e5f0
WRITE of size 4 at 0x7ffeebc2e668 thread T0
    #0 0x563b6e28378a in stack_oob_overflow /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/stack.h:13
    #1 0x563b6e283e08 in main /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main.c:20
    #2 0x7f7f76029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7f7f76029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x563b6e283284 in _start (/home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_asan+0x1284)

Address 0x7ffeebc2e668 is located in stack of thread T0
SUMMARY: AddressSanitizer: dynamic-stack-buffer-overflow /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/stack.h:13 in stack_oob_overflow
Shadow bytes around the buggy address:
  0x10005d77dc70: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005d77dc80: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005d77dc90: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005d77dca0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005d77dcb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10005d77dcc0: 00 00 00 00 ca ca ca ca 00 00 00 00 00[cb]cb cb
  0x10005d77dcd0: cb cb cb cb 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005d77dce0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005d77dcf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005d77dd00: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005d77dd10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==60330==ABORTING
```

### Global out-of-bounds
#### Source code
```
/*
 * testing global out-of-bounds read/write
 */

#define GLOBAL_SIZE 10

int global_array[GLOBAL_SIZE];

void global_oob_overflow(){
    for(int i = 0; i < GLOBAL_SIZE; i++) {
        global_array[i] = i;
    }

    /* invalid write */
    global_array[GLOBAL_SIZE] = 0;

    /* invalid read */
    int res = global_array[GLOBAL_SIZE];
}

int main(int argc, char *argv[]) {
    if(argc < 2 || argc > 2) fprintf(stderr, "Usage: %s <error option>\n", argv[0]);
    
    if(strcmp(argv[1], "global") == 0){
        global_oob_overflow();
    }
}
```
#### Valgrind Report
```
==60565== Memcheck, a memory error detector
==60565== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==60565== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==60565== Command: ./main_valgrind global
==60565== 
==60565== 
==60565== HEAP SUMMARY:
==60565==     in use at exit: 0 bytes in 0 blocks
==60565==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==60565== 
==60565== All heap blocks were freed -- no leaks are possible
==60565== 
==60565== For lists of detected and suppressed errors, rerun with: -s
==60565== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==60590==ERROR: AddressSanitizer: global-buffer-overflow on address 0x55b3d3a88328 at pc 0x55b3d3a858a4 bp 0x7fff2daa7ee0 sp 0x7fff2daa7ed0
WRITE of size 4 at 0x55b3d3a88328 thread T0
    #0 0x55b3d3a858a3 in global_oob_overflow /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/global.h:17
    #1 0x55b3d3a85d10 in main /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main.c:23
    #2 0x7f5aff429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7f5aff429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x55b3d3a85284 in _start (/home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_asan+0x1284)

0x55b3d3a88328 is located 0 bytes to the right of global variable 'global_array' defined in 'global.h:9:5' (0x55b3d3a88300) of size 40
0x55b3d3a88328 is located 56 bytes to the left of global variable 'ptr' defined in 'uar.h:11:6' (0x55b3d3a88360) of size 8
SUMMARY: AddressSanitizer: global-buffer-overflow /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/global.h:17 in global_oob_overflow
Shadow bytes around the buggy address:
  0x0ab6fa749010: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab6fa749020: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab6fa749030: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab6fa749040: f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9 f9
  0x0ab6fa749050: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00 00 00
=>0x0ab6fa749060: 00 00 00 00 00[f9]f9 f9 f9 f9 f9 f9 00 f9 f9 f9
  0x0ab6fa749070: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab6fa749080: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab6fa749090: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab6fa7490a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ab6fa7490b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==60590==ABORTING
```

### Use-after-free
#### Source code
```
/*
 * testing use-after-free
 */

#pragma once

void uaf(){
    int *p = (int *)malloc(sizeof(int));
    *p = 10;
    free(p);

    /* invalid write */
    *p = 20;

    /* invalid read */
    int tmp = *p;

    return;
}

int main(int argc, char *argv[]){
    if(argc < 2 || argc > 2) fprintf(stderr, "Usage: %s <error option>\n", argv[0]);
    
    if(strcmp(argv[1], "uaf") == 0){
        uaf();
    }
}
```
#### Valgrind Report
```
==60825== Memcheck, a memory error detector
==60825== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==60825== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==60825== Command: ./main_valgrind uaf
==60825== 
==60825== Invalid write of size 4
==60825==    at 0x1094CE: uaf (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==    by 0x10963E: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==  Address 0x4a9c040 is 0 bytes inside a block of size 4 free'd
==60825==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==60825==    by 0x1094C9: uaf (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==    by 0x10963E: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==  Block was alloc'd at
==60825==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==60825==    by 0x1094AF: uaf (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==    by 0x10963E: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825== 
==60825== Invalid read of size 4
==60825==    at 0x1094D8: uaf (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==    by 0x10963E: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==  Address 0x4a9c040 is 0 bytes inside a block of size 4 free'd
==60825==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==60825==    by 0x1094C9: uaf (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==    by 0x10963E: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==  Block was alloc'd at
==60825==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==60825==    by 0x1094AF: uaf (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825==    by 0x10963E: main (in /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_valgrind)
==60825== 
==60825== 
==60825== HEAP SUMMARY:
==60825==     in use at exit: 0 bytes in 0 blocks
==60825==   total heap usage: 1 allocs, 1 frees, 4 bytes allocated
==60825== 
==60825== All heap blocks were freed -- no leaks are possible
==60825== 
==60825== For lists of detected and suppressed errors, rerun with: -s
==60825== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==60857==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010 at pc 0x55f58a4dc938 bp 0x7ffc3da495b0 sp 0x7ffc3da495a0
WRITE of size 4 at 0x602000000010 thread T0
    #0 0x55f58a4dc937 in uaf /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/uaf.h:13
    #1 0x55f58a4dcc8c in main /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main.c:26
    #2 0x7f4b55a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7f4b55a29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x55f58a4dc264 in _start (/home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_asan+0x1264)

0x602000000010 is located 0 bytes inside of 4-byte region [0x602000000010,0x602000000014)
freed by thread T0 here:
    #0 0x7f4b55eb4537 in __interceptor_free ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:127
    #1 0x55f58a4dc900 in uaf /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/uaf.h:10
    #2 0x55f58a4dcc8c in main /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main.c:26
    #3 0x7f4b55a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

previously allocated by thread T0 here:
    #0 0x7f4b55eb4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x55f58a4dc8af in uaf /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/uaf.h:8
    #2 0x55f58a4dcc8c in main /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main.c:26
    #3 0x7f4b55a29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58

SUMMARY: AddressSanitizer: heap-use-after-free /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/uaf.h:13 in uaf
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
==60857==ABORTING
```

### Use-after-return
#### Source code
```
/*
 * testing use-after-return
 */

#pragma once

int *ptr = NULL;

void alloc_local_array() {
    int local[10];
    ptr = &local[0];
}

void uar() {
    alloc_local_array();
    int i = ptr[10];
}

int main(int argc, char *argv[]){
    if(argc < 2 || argc > 2) fprintf(stderr, "Usage: %s <error option>\n", argv[0]);
    
    if(strcmp(argv[1], "uar") == 0 ){
        uar();
    }
}
```
#### Valgrind Report
```
==61197== Memcheck, a memory error detector
==61197== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==61197== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==61197== Command: ./main_valgrind uar
==61197== 
==61197== 
==61197== HEAP SUMMARY:
==61197==     in use at exit: 0 bytes in 0 blocks
==61197==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==61197== 
==61197== All heap blocks were freed -- no leaks are possible
==61197== 
==61197== For lists of detected and suppressed errors, rerun with: -s
==61197== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
==61223==ERROR: AddressSanitizer: stack-use-after-return on address 0x7fed13eae058 at pc 0x5631a3e13ab8 bp 0x7fff4b1fdc10 sp 0x7fff4b1fdc00
READ of size 4 at 0x7fed13eae058 thread T0
    #0 0x5631a3e13ab7 in uar /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/uar.h:16
    #1 0x5631a3e13cdc in main /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main.c:31
    #2 0x7fed17429d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #3 0x7fed17429e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #4 0x5631a3e13264 in _start (/home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/main_asan+0x1264)

Address 0x7fed13eae058 is located in stack of thread T0 at offset 88 in frame
    #0 0x5631a3e1395d in alloc_local_array /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/uar.h:9

  This frame has 1 object(s):
    [48, 88) 'local' (line 10) <== Memory access at offset 88 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-use-after-return /home/chen/Documents/NYCU_program/112-spring-software-testing/lab5/requirement1/uar.h:16 in uar
Shadow bytes around the buggy address:
  0x0ffe227cdbb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffe227cdbc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffe227cdbd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffe227cdbe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffe227cdbf0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ffe227cdc00: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5
  0x0ffe227cdc10: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffe227cdc20: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffe227cdc30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffe227cdc40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ffe227cdc50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==61223==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
int main(){
    int a[8];
    int b[8];

    /* oob & write in b's region */
    a[16] = 10;
}
```
### Why

We can first check how `ASAN` instrumentation works by including `<sanitizer/asan_interface.h>` library. 
Then execute following code:

```
int main(){
    int a[8];
    int b[8];

    // check if the memory is poisoned
    int *a_rrz = &a[8];
    int *b_lrz = &b[-8];

    printf("&a[8] is poisoned : %20p\n", __asan_region_is_poisoned(a_rrz, 1));
    printf("&b[-8] is poisoned: %20p\n", __asan_region_is_poisoned(b_lrz, 1));
}
```

The output will be:
```
&a[8] is poisoned :       0x7fff29d5ca90
&b[-8] is poisoned:       0x7fff29d5ca90
```

By executing `__asan_region_is_poisoned` function, we can check if the memory is poisoned. If the memory is poisoned, the function will return the address of the first poisoned byte. Otherwise, it will return `0`.
The above demonstration shows that the redzone of `a[8]` and `b[-8]` are the same. This means that the redzone is shared with the adjacent array. Finally we can keep trying and understand the memory layout among `a` and `b`, including location and size:

```
  | redzone | array a | redzone | array b | redzone |
  | 32 bytes| 32 bytes| 32 bytes| 32 bytes| 32 bytes|
  ^         ^         ^         ^         ^         ^
  aligned (16 bytes test on Ubuntu 20.04)
```

Now we can simply bypass the redzone by writing to the adjacent array:

```
int main(){
    int a[8];
    int b[8];

    /* oob & write in b's region */
    a[16] = 10;
}
```

During the test, I found that the redzone is 32 bytes long, so if I write the
region that 32 bytes away from the start / end of redzone, the ASan will not
detect the out-of-bound write. The following is the example:

```
int main(){
    int a[8];
    int b[8];

    // check if the memory is poisoned
    int *a_rrz = &a[8];
    int *b_lrz = &b[-8];

    printf("&a[8] is poisoned : %20p\n", __asan_region_is_poisoned(a_rrz, 1));
    printf("&b[-8] is poisoned: %20p\n", __asan_region_is_poisoned(b_lrz, 1));

    /* oob & beyond left redzone */
    a[-9] = 10;

    /* oob & beyond b's right redzone */
    a[32] = 10;
}
```

The `ASAN` will not detect the out-of-bound write in the above case,
but I think it might be trade-off since the instrumented code will be slower
if the redzone is too long.
