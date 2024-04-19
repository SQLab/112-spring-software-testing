# Answer

Name: linhenrpei
ID: 312551078

## version
valgrind : 3.18.1
gcc : 11.4.0
## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   yes    | yes  |
| Stack out-of-bounds  |   yes    | yes  |
| Global out-of-bounds |   no     | yes  |
| Use-after-free       |   no     | yes  |
| Use-after-return     |   yes    | yes  |

### Heap out-of-bounds
#### Source code
```
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
        char *heap = (char *)malloc(4);
        heap[4] = 'a';
	printf("%c\n",heap[4]);
	free(heap);
        return 0;
}
```
#### Valgrind Report
```
==6984== Memcheck, a memory error detector
==6984== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6984== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6984== Command: ./test
==6984== 
==6984==ASan runtime does not come first in initial library list; you should either link runtime to your application or manually preload it with LD_PRELOAD.
==6984== 
==6984== Process terminating with default action of signal 11 (SIGSEGV)
==6984==  General Protection Fault
==6984==    at 0x52ECEC2: __pthread_once_slow (pthread_once.c:114)
==6984==    by 0x53BB8C2: __rpc_thread_variables (rpc_thread.c:59)
==6984==    by 0x540EC0C: free_mem (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==6984==    by 0x540E741: __libc_freeres (in /usr/lib/x86_64-linux-gnu/libc.so.6)
==6984==    by 0x483F1B2: _vgnU_freeres (in /usr/libexec/valgrind/vgpreload_core-amd64-linux.so)
==6984==    by 0x4A523DF: ???
==6984==    by 0x49482D6: __sanitizer::Die() (sanitizer_termination.cpp:59)
==6984==    by 0x491E3B8: __asan::AsanCheckDynamicRTPrereqs() (asan_linux.cpp:181)
==6984==    by 0x492A564: __asan::AsanInitInternal() [clone .part.0] (asan_rtl.cpp:420)
==6984==    by 0x40065BD: _dl_init (dl-init.c:102)
==6984==    by 0x40202C9: ??? (in /usr/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2)
==6984== 
==6984== HEAP SUMMARY:
==6984==     in use at exit: 0 bytes in 0 blocks
==6984==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==6984== 
==6984== All heap blocks were freed -- no leaks are possible
==6984== 
==6984== For lists of detected and suppressed errors, rerun with: -s
==6984== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)


```
### ASan Report
=================================================================
==6971==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000014 at pc 0x5ac6fb75728e bp 0x7ffe54fe87f0 sp 0x7ffe54fe87e0
WRITE of size 1 at 0x602000000014 thread T0
    #0 0x5ac6fb75728d in main /home/gary/112-spring-software-testing/lab5/test.c:8
    #1 0x74559de29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x74559de29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5ac6fb757164 in _start (/home/gary/112-spring-software-testing/lab5/test+0x1164)

0x602000000014 is located 0 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x74559e2b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x5ac6fb757237 in main /home/gary/112-spring-software-testing/lab5/test.c:7

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/gary/112-spring-software-testing/lab5/test.c:8 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[04]fa fa fa fa fa fa fa fa fa fa fa fa fa
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
==6971==ABORTING

```

### Stack out-of-bounds
#### Source code
```
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
        char stack [4] ;
        stack[4] = 'a';
	printf("%c\n",stack[4]);
        return 0;
}
```
#### Valgrind Report
```
==7010== Memcheck, a memory error detector
==7010== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7010== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7010== Command: ./test
==7010== 
a
*** stack smashing detected ***: terminated
==7010== 
==7010== Process terminating with default action of signal 6 (SIGABRT)
==7010==    at 0x49009FC: __pthread_kill_implementation (pthread_kill.c:44)
==7010==    by 0x49009FC: __pthread_kill_internal (pthread_kill.c:78)
==7010==    by 0x49009FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==7010==    by 0x48AC475: raise (raise.c:26)
==7010==    by 0x48927F2: abort (abort.c:79)
==7010==    by 0x48F3675: __libc_message (libc_fatal.c:155)
==7010==    by 0x49A0599: __fortify_fail (fortify_fail.c:26)
==7010==    by 0x49A0565: __stack_chk_fail (stack_chk_fail.c:24)
==7010==    by 0x1091BD: main (in /home/gary/112-spring-software-testing/lab5/test)
==7010== 
==7010== HEAP SUMMARY:
==7010==     in use at exit: 1,024 bytes in 1 blocks
==7010==   total heap usage: 1 allocs, 0 frees, 1,024 bytes allocated
==7010== 
==7010== LEAK SUMMARY:
==7010==    definitely lost: 0 bytes in 0 blocks
==7010==    indirectly lost: 0 bytes in 0 blocks
==7010==      possibly lost: 0 bytes in 0 blocks
==7010==    still reachable: 1,024 bytes in 1 blocks
==7010==         suppressed: 0 bytes in 0 blocks
==7010== Rerun with --leak-check=full to see details of leaked memory
==7010== 
==7010== For lists of detected and suppressed errors, rerun with: -s
==7010== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)

```
### ASan Report
```
==7094==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffef8fb8f44 at pc 0x5dbca1cbe321 bp 0x7ffef8fb8f10 sp 0x7ffef8fb8f00
WRITE of size 1 at 0x7ffef8fb8f44 thread T0
    #0 0x5dbca1cbe320 in main /home/gary/112-spring-software-testing/lab5/test.c:8
    #1 0x7232ba829d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7232ba829e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5dbca1cbe164 in _start (/home/gary/112-spring-software-testing/lab5/test+0x1164)

Address 0x7ffef8fb8f44 is located in stack of thread T0 at offset 36 in frame
    #0 0x5dbca1cbe238 in main /home/gary/112-spring-software-testing/lab5/test.c:6

  This frame has 1 object(s):
    [32, 36) 'stack' (line 7) <== Memory access at offset 36 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism, swapcontext or vfork
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/gary/112-spring-software-testing/lab5/test.c:8 in main
Shadow bytes around the buggy address:
  0x10005f1ef190: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005f1ef1a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005f1ef1b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005f1ef1c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005f1ef1d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10005f1ef1e0: 00 00 00 00 f1 f1 f1 f1[04]f3 f3 f3 00 00 00 00
  0x10005f1ef1f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005f1ef200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005f1ef210: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005f1ef220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10005f1ef230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
==7094==ABORTING

```

### Global out-of-bounds
#### Source code
```
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

char global [4] ;
int main(void)
{
        global[4] = 'a';
	printf("%c\n",global[4]);
        return 0;
}
```
#### Valgrind Report
```

```
### ASan Report
```
=================================================================
==7132==ERROR: AddressSanitizer: global-buffer-overflow on address 0x59209b5b10e4 at pc 0x59209b5ae245 bp 0x7ffd7b258910 sp 0x7ffd7b258900
WRITE of size 1 at 0x59209b5b10e4 thread T0
    #0 0x59209b5ae244 in main /home/gary/112-spring-software-testing/lab5/test.c:8
    #1 0x78cfc1029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x78cfc1029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x59209b5ae124 in _start (/home/gary/112-spring-software-testing/lab5/test+0x1124)

0x59209b5b10e4 is located 0 bytes to the right of global variable 'global' defined in 'test.c:5:6' (0x59209b5b10e0) of size 4
SUMMARY: AddressSanitizer: global-buffer-overflow /home/gary/112-spring-software-testing/lab5/test.c:8 in main
Shadow bytes around the buggy address:
  0x0b24936ae1c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b24936ae1d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b24936ae1e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b24936ae1f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b24936ae200: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0b24936ae210: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00[04]f9 f9 f9
  0x0b24936ae220: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b24936ae230: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b24936ae240: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b24936ae250: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0b24936ae260: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
```
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
        char *heap = (char *)malloc(4);
        heap[4] = 'a';
	printf("%c\n",heap[4]);
	free(heap);
	printf("%c\n",heap[4]);
        return 0;
}

```
#### Valgrind Report
```

```
### ASan Report
```
==========================================================
==7289==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x602000000014 at pc 0x647bef6412e8 bp 0x7ffc8f46df30 sp 0x7ffc8f46df20
WRITE of size 1 at 0x602000000014 thread T0
    #0 0x647bef6412e7 in main /home/gary/112-spring-software-testing/lab5/test.c:8
    #1 0x754f9c029d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x754f9c029e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x647bef641184 in _start (/home/gary/112-spring-software-testing/lab5/test+0x1184)

0x602000000014 is located 0 bytes to the right of 4-byte region [0x602000000010,0x602000000014)
allocated by thread T0 here:
    #0 0x754f9c4b4887 in __interceptor_malloc ../../../../src/libsanitizer/asan/asan_malloc_linux.cpp:145
    #1 0x647bef641257 in main /home/gary/112-spring-software-testing/lab5/test.c:7

SUMMARY: AddressSanitizer: heap-buffer-overflow /home/gary/112-spring-software-testing/lab5/test.c:8 in main
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa[04]fa fa fa fa fa fa fa fa fa fa fa fa fa
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

```

### Use-after-return
#### Source code
```
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

char * function(){
	char data[5] = "54321";
	return data;

}
int main(void)
{
        char *tmp = function();
	printf("%c\n",*tmp);
        return 0;
}

```
#### Valgrind Report
```
==7673== Memcheck, a memory error detector
==7673== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==7673== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==7673== Command: ./test
==7673== 
==7673== Invalid read of size 1
==7673==    at 0x1091C8: main (in /home/gary/112-spring-software-testing/lab5/test)
==7673==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==7673== 
==7673== 
==7673== Process terminating with default action of signal 11 (SIGSEGV)
==7673==  Access not within mapped region at address 0x0
==7673==    at 0x1091C8: main (in /home/gary/112-spring-software-testing/lab5/test)
==7673==  If you believe this happened as a result of a stack
==7673==  overflow in your program's main thread (unlikely but
==7673==  possible), you can try to increase the size of the
==7673==  main thread stack using the --main-stacksize= flag.
==7673==  The main thread stack size used in this run was 8388608.
==7673== 
==7673== HEAP SUMMARY:
==7673==     in use at exit: 0 bytes in 0 blocks
==7673==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==7673== 
==7673== All heap blocks were freed -- no leaks are possible
==7673== 
==7673== For lists of detected and suppressed errors, rerun with: -s
==7673== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```
### ASan Report
```
AddressSanitizer:DEADLYSIGNAL
=================================================================
==7748==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x59e51572a3ad bp 0x000000000001 sp 0x7ffc7e196440 T0)
==7748==The signal is caused by a READ memory access.
==7748==Hint: address points to the zero page.
    #0 0x59e51572a3ad in main /home/gary/112-spring-software-testing/lab5/test.c:13
    #1 0x71b1bde29d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x71b1bde29e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x59e51572a184 in _start (/home/gary/112-spring-software-testing/lab5/test+0x1184)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/gary/112-spring-software-testing/lab5/test.c:13 in main
==7748==ABORTING

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include<stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{ 

        int *first  = (int *)malloc(5);
        int *second = (int *)malloc(5);
        int diff_addr =  second - first;
        printf("before\n");
       
        second[i] = 0;
	first[diff_addr]  = 100;
 	
	printf("second[0] = %d \n",second[0]);
	free(first);
        free(second);
        
        return 0;
}
```
### Why
ASan can only checks data in reszone , so it can't detect when data exceed redzone range 

