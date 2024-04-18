# Answer

Name: 林奕辰

ID: B122552

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |    O     |   O  |
| Stack out-of-bounds  |    X     |   O  |
| Global out-of-bounds |    X     |   X  |
| Use-after-free       |    O     |   O  |
| Use-after-return     |    O     |   O  |

### Heap out-of-bounds
#### Source code
```
#include<stdio.h>
#include<stdlib.h>

#define SIZE 5

int main(){
    int* heap = malloc(sizeof(int)*SIZE);
    int top = -1;

    for(int i=0;i<=SIZE;i++)
        heap[++top] = i;
    for(int i=0;i<=SIZE;i++)
        printf("%d", heap[i]);

    free(heap);
    return 0;
}
```
#### Valgrind Report
```
==15855== Invalid write of size 4
==15855==    at 0x1091CE: main (in /home/albert/test/out/heapOF)
==15855==  Address 0x4a95054 is 0 bytes after a block of size 20 alloc'd
==15855==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==15855==    by 0x10919E: main (in /home/albert/test/out/heapOF)
==15855== 
==15855== Invalid read of size 4
==15855==    at 0x1091F7: main (in /home/albert/test/out/heapOF)
==15855==  Address 0x4a95054 is 0 bytes after a block of size 20 alloc'd
==15855==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==15855==    by 0x10919E: main (in /home/albert/test/out/heapOF)
```
### ASan Report
```
SUMMARY: AddressSanitizer: heap-buffer-overflow /home/albert/test/heapOF.c:11 in main
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa 00 00[04]fa fa fa fa fa
  0x0c067fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
```

### Stack out-of-bounds
#### Source code
```
#include<stdio.h>
#include<stdlib.h>

#define SIZE 5

int main(){
    int stack[SIZE];
    int top = -1;

    for(int i=0;i<=SIZE;i++)
        stack[++top] = i;
    for(int i=0;i<=SIZE;i++)
        printf("%d", stack[i]);
    
    return 0;
}
```
#### Valgrind Report
```
==16099== HEAP SUMMARY:
==16099==     in use at exit: 0 bytes in 0 blocks
==16099==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==16099== 
==16099== All heap blocks were freed -- no leaks are possible
==16099== 
==16099== For lists of detected and suppressed errors, rerun with: -s
==16099== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```
SUMMARY: AddressSanitizer: stack-buffer-overflow /home/albert/test/stackOF.c:11 in main
Shadow bytes around the buggy address:
  0x1000472d7180: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000472d7190: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000472d71a0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000472d71b0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000472d71c0: 00 00 00 00 00 00 00 00 00 00 00 00 f1 f1 f1 f1
=>0x1000472d71d0: 00 00[04]f3 f3 f3 f3 f3 00 00 00 00 00 00 00 00
  0x1000472d71e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000472d71f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000472d7200: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000472d7210: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000472d7220: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
```

### Global out-of-bounds
#### Source code
```
#include<stdio.h>
#include<stdlib.h>

#define SIZE 5

int stack[SIZE];
int top = -1;

void push(int i){
    stack[++top] = i;
};

int main(){
    for(int i=0;i<=SIZE;i++)
        push(i);
    return 0;
}
```
#### Valgrind Report
```
==16265== HEAP SUMMARY:
==16265==     in use at exit: 0 bytes in 0 blocks
==16265==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
```
### ASan Report
```
no output
```

### Use-after-free
#### Source code
```
#include<stdio.h>
#include<stdlib.h>

#define SIZE 5

int main(){
    int* heap = malloc(sizeof(int)*SIZE);
    int top = -1;
    free(heap);

    for(int i=0;i<=SIZE;i++)
        heap[++top] = i;
    for(int i=0;i<=SIZE;i++)
        printf("%d", heap[i]);

    return 0;
}
```
#### Valgrind Report
```
==17022== Invalid write of size 4
==17022==    at 0x1091DA: main (in /home/albert/test/out/useAfterFree)
==17022==  Address 0x4a95040 is 0 bytes inside a block of size 20 free'd
==17022==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==17022==    by 0x1091B5: main (in /home/albert/test/out/useAfterFree)
==17022==  Block was alloc'd at
==17022==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==17022==    by 0x10919E: main (in /home/albert/test/out/useAfterFree)
==17022== 
==17022== Invalid read of size 4
==17022==    at 0x109203: main (in /home/albert/test/out/useAfterFree)
==17022==  Address 0x4a95040 is 0 bytes inside a block of size 20 free'd
==17022==    at 0x484B27F: free (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==17022==    by 0x1091B5: main (in /home/albert/test/out/useAfterFree)
==17022==  Block was alloc'd at
==17022==    at 0x4848899: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-amd64-linux.so)
==17022==    by 0x10919E: main (in /home/albert/test/out/useAfterFree)
```
### ASan Report
```
Shadow bytes around the buggy address:
  0x0c067fff7fb0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fc0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fd0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7fe0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x0c067fff7ff0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x0c067fff8000: fa fa 00 00 00 fa fa fa[fd]fd fd fa fa fa fa fa
  0x0c067fff8010: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8020: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8030: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8040: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
  0x0c067fff8050: fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa fa
```

### Use-after-return
#### Source code
```
#include<stdio.h>
#include<stdlib.h>

#define SIZE 5


int* returnStack(){
    int test[5];
    return test;
};

int main(){
    int* returnedStack = returnStack();
    returnedStack[0]=33;
    printf("%d", returnedStack[0]);
    return 0;
}
```
#### Valgrind Report
```
==17263== Invalid write of size 4
==17263==    at 0x1091BD: main (in /home/albert/test/out/useAfterReturn)
==17263==  Address 0x0 is not stack'd, malloc'd or (recently) free'd
==17263== 
==17263== 
==17263== Process terminating with default action of signal 11 (SIGSEGV)
==17263==  Access not within mapped region at address 0x0
==17263==    at 0x1091BD: main (in /home/albert/test/out/useAfterReturn)
==17263==  If you believe this happened as a result of a stack
==17263==  overflow in your program's main thread (unlikely but
==17263==  possible), you can try to increase the size of the
==17263==  main thread stack using the --main-stacksize= flag.
==17263==  The main thread stack size used in this run was 8388608.
```
### ASan Report
```
==17395==ERROR: AddressSanitizer: SEGV on unknown address 0x000000000000 (pc 0x55b3f56a3224 bp 0x000000000001 sp 0x7ffda70a14b0 T0)
==17395==The signal is caused by a WRITE memory access.
==17395==Hint: address points to the zero page.
    #0 0x55b3f56a3223 in main /home/albert/test/useAfterReturn.c:14
    #1 0x7fdeef310d8f  (/lib/x86_64-linux-gnu/libc.so.6+0x29d8f)
    #2 0x7fdeef310e3f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x29e3f)
    #3 0x55b3f56a3124 in _start (/home/albert/test/asan_out/useAfterReturn+0x1124)

AddressSanitizer can not provide additional info.
SUMMARY: AddressSanitizer: SEGV /home/albert/test/useAfterReturn.c:14 in main
==17395==ABORTING
```

## ASan Out-of-bound Write bypass Redzone
### Source code
```
#include<stdio.h>
#include<stdlib.h>

#define SIZE 5

int main(){
    int a[SIZE], b[SIZE];
    int btoa = b-a;
    a[btoa] = 3;
    printf("%d\n", a[btoa]);
    printf("%d\n", b[0]);
    return 0;
}
```
### Why
無法利用助教上課提到之原理(標記此塊記憶體)方式檢查，因此被成功跳過
