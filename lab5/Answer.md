# Answer


Name: 蔡牧軒
ID: 312555022


## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |      v   |   v  |
| Stack out-of-bounds  |      v   |   x  |
| Global out-of-bounds |      x   |   v  |
| Use-after-free       |      v   |   v  |
| Use-after-return     |      v   |   v  |

### Heap out-of-bounds
#### Source code
``` C
#include <stdio.h>
#include <stdlib.h>

int main() {
    const int size = 3;
    int *p = (int *)malloc(sizeof(int) * size);
    p[size] = 200;
    printf("%d\n", p[size]);
    free(p);
    return 0;
}
```
#### Valgrind Report
```
==6535== Memcheck, a memory error detector
==6535== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6535== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6535== Command: ./test
==6535== 
==6535== Invalid write of size 4
==6535==    at 0x1091C5: main (in /home/ubuntu/Just-For-Test/test)
==6535==  Address 0x4a8f04c is 0 bytes after a block of size 12 alloc'd
==6535==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==6535==    by 0x1091AC: main (in /home/ubuntu/Just-For-Test/test)
==6535== 
==6535== Invalid read of size 4
==6535==    at 0x1091DF: main (in /home/ubuntu/Just-For-Test/test)
==6535==  Address 0x4a8f04c is 0 bytes after a block of size 12 alloc'd
==6535==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==6535==    by 0x1091AC: main (in /home/ubuntu/Just-For-Test/test)
==6535== 
200
==6535== 
==6535== HEAP SUMMARY:
==6535==     in use at exit: 0 bytes in 0 blocks
==6535==   total heap usage: 2 allocs, 2 frees, 1,036 bytes allocated
==6535== 
==6535== All heap blocks were freed -- no leaks are possible
==6535== 
==6535== For lists of detected and suppressed errors, rerun with: -s
==6535== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```
Shadow bytes around the buggy address:
  0x0c047fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c047fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c047fff8000: fa fa 00[04]fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c047fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
Shadow byte legend (one shadow byte represents 8 application bytes):

```

### Stack out-of-bounds
#### Source code
``` C
#include <stdio.h>
#include <stdlib.h>

int main() {
    int s[4];
    s[4] = 200;
    printf("%d\n", s[4]);
    return 0;
}
```
#### Valgrind Report
```
==6779== Memcheck, a memory error detector
==6779== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==6779== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==6779== Command: ./test_valgrind
==6779== 
200
==6779== 
==6779== HEAP SUMMARY:
==6779==     in use at exit: 0 bytes in 0 blocks
==6779==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==6779== 
==6779== All heap blocks were freed -- no leaks are possible
==6779== 
==6779== For lists of detected and suppressed errors, rerun with: -s
==6779== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
Shadow bytes around the buggy address:
  0x10006d8596a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006d8596b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006d8596c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006d8596d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006d8596e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x10006d8596f0: 00 00 00 00 00 00 00 00 f1 f1 f1 f1 00 00[f3]f3
  0x10006d859700: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006d859710: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006d859720: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006d859730: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x10006d859740: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07 
  Heap left redzone:       fa
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
```

### Global out-of-bounds
#### Source code
``` C
#include <stdio.h>
#include <stdlib.h>
int s[4];
int main() {
    s[4] = 200;
    printf("%d\n", s[4]);
    return 0;
}
```
#### Valgrind Report
cannot found this error
```
==6998== 
==6998== HEAP SUMMARY:
==6998==     in use at exit: 0 bytes in 0 blocks
==6998==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==6998== 
==6998== All heap blocks were freed -- no leaks are possible
==6998== 
==6998== For lists of detected and suppressed errors, rerun with: -s
==6998== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
SUMMARY: AddressSanitizer: global-buffer-overflow /home/ubuntu/Just-For-Test/test.c:5 in main
Shadow bytes around the buggy address:
  0x0ac38e5cc9c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac38e5cc9d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac38e5cc9e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac38e5cc9f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac38e5cca00: 00 00 00 00 00 00 00 00 f9 f9 f9 f9 f9 f9 f9 f9
=>0x0ac38e5cca10: f9 f9 f9 f9 f9 f9 f9 f9 00 00 00 00 00 00[f9]f9
  0x0ac38e5cca20: f9 f9 f9 f9 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac38e5cca30: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac38e5cca40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac38e5cca50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ac38e5cca60: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
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
```

### Use-after-free
#### Source code
``` C
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = (int *)malloc(sizeof(int));
    free(p);
    *p = 10;
    printf("%d\n", *p);
    return 0;
}
```
#### Valgrind Report
```
==7187== Invalid write of size 4
==7187==    at 0x1091B3: main (in /home/ubuntu/Just-For-Test/test_valgrind)
==7187==  Address 0x4a8f040 is 0 bytes inside a block of size 4 free'd
==7187==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7187==    by 0x1091AE: main (in /home/ubuntu/Just-For-Test/test_valgrind)
==7187==  Block was alloc'd at
==7187==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7187==    by 0x10919E: main (in /home/ubuntu/Just-For-Test/test_valgrind)
==7187== 
==7187== Invalid read of size 4
==7187==    at 0x1091BD: main (in /home/ubuntu/Just-For-Test/test_valgrind)
==7187==  Address 0x4a8f040 is 0 bytes inside a block of size 4 free'd
==7187==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7187==    by 0x1091AE: main (in /home/ubuntu/Just-For-Test/test_valgrind)
==7187==  Block was alloc'd at
==7187==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==7187==    by 0x10919E: main (in /home/ubuntu/Just-For-Test/test_valgrind)
```
### ASan Report
```
SUMMARY: AddressSanitizer: heap-use-after-free /home/ubuntu/Just-For-Test/test.c:7 in main
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
```

### Use-after-return
#### Source code
``` C
#include<stdio.h>
#include<stdlib.h>
int *ptr;
void Foo() {
  int local[100];
  ptr = &local[0];
}

int main(){
    Foo();
    *ptr = 0;
    return 0;
}
```
#### Valgrind Report
```
==7479== Process terminating with default action of signal 11 (SIGSEGV)
==7479==  Access not within mapped region at address 0x0
==7479==    at 0x10919C: main (in /home/ubuntu/Just-For-Test/test_valgrind)
==7479==  If you believe this happened as a result of a stack
==7479==  overflow in your program's main thread (unlikely but
==7479==  possible), you can try to increase the size of the
==7479==  main thread stack using the --main-stacksize= flag.
==7479==  The main thread stack size used in this run was 8388608.
```
### ASan Report
```
SUMMARY: AddressSanitizer: stack-use-after-return /home/ubuntu/Just-For-Test/test.c:11 in main
Shadow bytes around the buggy address:
  0x0ff7045939b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff7045939c0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff7045939d0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff7045939e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff7045939f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0ff704593a00: f5 f5 f5 f5 f5 f5[f5]f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0ff704593a10: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0ff704593a20: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0ff704593a30: f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5 f5
  0x0ff704593a40: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0ff704593a50: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
```

## ASan Out-of-bound Write bypass Redzone
### Source code
``` C
int main () {
    int a[4];
    int b[4];
    a[8] = 0;
}
```
### Why

ASAN 會在a,b 兩個陣列中填充redzone 偵測越界存取，而redzone 大小會是: 原始資料+redzone 為32-bytes alignment(單位:application bytes)。 因此我上方的source code 中 redzone 會如以下配置 :

```
        f1 f1 f1 f1 00 00 f2 f2 00 00 f3 f3
```
所以只要讓a越過兩個16個bytes即可存取到addressable region(非redzone，為b[0])

