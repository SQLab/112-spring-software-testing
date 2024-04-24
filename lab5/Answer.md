# Answer

Name: 陳柏瑋
ID: 312551068

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- |:--------:|:----:|
| Heap out-of-bounds   |    V     |  V   |
| Stack out-of-bounds  |    X     |  V   |
| Global out-of-bounds |    X     |  V   |
| Use-after-free       |    V     |  V   |
| Use-after-return     |    X     |  V*  |

Note: Need to set env variable `ASAN_OPTIONS=detect_stack_use_after_return=1`

### Heap out-of-bounds
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = malloc(sizeof(int) * 10);
    p[10] = 0;
    return 0;
}
```
#### Valgrind Report
```
==6055== Command: ./heap-out-of-bounds
==6055==
==6055== Invalid write of size 4
==6055==    at 0x10916B: main (heap-out-of-bounds.c:6)
==6055==  Address 0x4a8c068 is 0 bytes after a block of size 40 alloc'd
==6055==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==6055==    by 0x10915E: main (heap-out-of-bounds.c:5)
```
#### ASan Report
```
==4550==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x604000000038 at pc 0x5573dba91202 bp 0x7ffd1324d400 sp 0x7ffd1324d3f0
WRITE of size 4 at 0x604000000038 thread T0
    #0 0x5573dba91201 in main /mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/heap-out-of-bounds.c:6
    #1 0x7fd4ccd23d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7fd4ccd23e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x5573dba910e4 in _start (/mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/heap-out-of-bounds+0x10e4)
```

### Stack out-of-bounds
#### Source code
```c
#include <stdio.h>

int main() {
    int a[10];
    a[10] = 0;
    return 0;
}
```
#### Valgrind Report
```
==6205== Command: ./stack-out-of-bounds
==6205==
*** stack smashing detected ***: terminated
==6205==
==6205== Process terminating with default action of signal 6 (SIGABRT)
==6205==    at 0x48F69FC: __pthread_kill_implementation (pthread_kill.c:44)
==6205==    by 0x48F69FC: __pthread_kill_internal (pthread_kill.c:78)
==6205==    by 0x48F69FC: pthread_kill@@GLIBC_2.34 (pthread_kill.c:89)
==6205==    by 0x48A2475: raise (raise.c:26)
==6205==    by 0x48887F2: abort (abort.c:79)
==6205==    by 0x48E9675: __libc_message (libc_fatal.c:155)
==6205==    by 0x4996599: __fortify_fail (fortify_fail.c:26)
==6205==    by 0x4996565: __stack_chk_fail (stack_chk_fail.c:24)
==6205==    by 0x109183: main (stack-out-of-bounds.c:7)
```
#### ASan Report
```
==5074==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffe4671378 at pc 0x55a431a7d29b bp 0x7fffe4671310 sp 0x7fffe4671300
WRITE of size 4 at 0x7fffe4671378 thread T0
    #0 0x55a431a7d29a in main /mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/stack-out-of-bounds.c:5
    #1 0x7f7d8ad25d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f7d8ad25e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55a431a7d104 in _start (/mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/stack-out-of-bounds+0x1104)
```

### Global out-of-bounds
#### Source code
```c
#include <stdio.h>

int a[10];

int main() {
    a[10] = 0;
    return 0;
}
```
#### Valgrind Report
```
==6330== Command: ./global-out-of-bounds
==6330==
==6330==
==6330== HEAP SUMMARY:
==6330==     in use at exit: 0 bytes in 0 blocks
==6330==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==6330==
==6330== All heap blocks were freed -- no leaks are possible
```
#### ASan Report
```
==5297==ERROR: AddressSanitizer: global-buffer-overflow on address 0x561bacc650c8 at pc 0x561bacc62203 bp 0x7ffdde617330 sp 0x7ffdde617320
WRITE of size 4 at 0x561bacc650c8 thread T0
    #0 0x561bacc62202 in main /mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/global-out-of-bounds.c:6
    #1 0x7f279b901d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f279b901e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x561bacc62104 in _start (/mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/global-out-of-bounds+0x1104)
```

### Use-after-free
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = malloc(sizeof(int) * 10);
    free(p);
    p[0] = 0;
    return 0;
}
```
#### Valgrind Report
```
==6472== Command: ./use-after-free
==6472==
==6472== Invalid write of size 4
==6472==    at 0x109193: main (use-after-free.c:7)
==6472==  Address 0x4a8c040 is 0 bytes inside a block of size 40 free'd
==6472==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==6472==    by 0x10918E: main (use-after-free.c:6)
==6472==  Block was alloc'd at
==6472==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==6472==    by 0x10917E: main (use-after-free.c:5)
```
#### ASan Report
```
==5409==ERROR: AddressSanitizer: heap-use-after-free on address 0x604000000010 at pc 0x558267a61226 bp 0x7ffc3e323ce0 sp 0x7ffc3e323cd0
WRITE of size 4 at 0x604000000010 thread T0
    #0 0x558267a61225 in main /mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/use-after-free.c:7
    #1 0x7f58ab5f1d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f58ab5f1e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x558267a61104 in _start (/mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/use-after-free+0x1104)
```

### Use-after-return
#### Source code
```c
#include <stdio.h>
#include <stdlib.h>

int* p;

void f() {
    int a[10];
    p = &a[0];
}

int main() {
    f();
    *p = 48763;

    return (*p == 48763);
}
```
#### Valgrind Report
```
==6544== Command: ./use-after-return
==6544==
==6544==
==6544== HEAP SUMMARY:
==6544==     in use at exit: 0 bytes in 0 blocks
==6544==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==6544==
==6544== All heap blocks were freed -- no leaks are possible
```
#### ASan Report
```
==7872==ERROR: AddressSanitizer: stack-use-after-return on address 0x7f9deb856030 at pc 0x55c8a3ded36e bp 0x7ffe6ef747b0 sp 0x7ffe6ef747a0
WRITE of size 4 at 0x7f9deb856030 thread T0
    #0 0x55c8a3ded36d in main /mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/use-after-return.c:13
    #1 0x7f9deeef5d8f in __libc_start_call_main ../sysdeps/nptl/libc_start_call_main.h:58
    #2 0x7f9deeef5e3f in __libc_start_main_impl ../csu/libc-start.c:392
    #3 0x55c8a3ded144 in _start (/mnt/d/csie/nycu/2024_Spring/Software_Testing/112-spring-software-testing/lab5/program/use-after-return+0x1144)
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```c
int a[8] = {0};
int b[8] = {0};
for (int i = 16; i < 24; i++) {
    a[i] = 1;
}
```
### Why
```c
char redzone1[32];
int a[8] = {0};        // 32-bytes
char redzone2[32];
int b[8] = {0};        // 32-bytes
char redzone3[32];
int *shadow = MemToShadow(redzone1);

shadow[0] = 0xffffffff;  // poison redzone1
shadow[1] = 0x00000000;  // unpoison 'a'
shadow[2] = 0xffffffff;  // poison redzone2
shadow[3] = 0x00000000;  // unpoison 'b'
shadow[4] = 0xffffffff;  // poison redzone2

for (int i = 16; i < 24; i++) {
    a[i] = 1;
}

shadow[0] = shadow[2] = shadow[4] = 0;
```

`a[16]` actually points to `a[0]` + 16 * 4 = 64 bytes, which is the `b[0]`. (because the `a[8]` and `redzone2[32]` takes 32 bytes each)

If we print out these two addresses, we can see that they're actually the same.
```c
printf("a[16] = %p\n", &a[16]);
printf("b[0] = %p\n", &b[0]);
```

```
a[16] = 0x7fffb5ff7cb0
b[0] = 0x7fffb5ff7cb0
```

So, we can use `a[16]` to `a[23]` to write to `b[0]` to `b[7]` without triggering asan warning.


