# Answer

Name: 黃建廷
ID: 312511041

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |   Yes    |      |
| Stack out-of-bounds  |   No     |      |
| Global out-of-bounds |   No     |      |
| Use-after-free       |   Yes    |      |
| Use-after-return     |   Yes    |      |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    char *str = (char*)malloc(sizeof(char)*6);
    strcpy(str, "Hello");
    str[6] = '!';
    putchar(str[7]);
    return 0;
}
```
#### Valgrind Report
```
==119409== Memcheck, a memory error detector
==119409== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==119409== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==119409== Command: ./heap
==119409== 
==119409== Invalid write of size 1
==119409==    at 0x108814: main (in /home/yles94214/112-spring-software-testing/lab5/heap)
==119409==  Address 0x4a39046 is 0 bytes after a block of size 6 alloc'd
==119409==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==119409==    by 0x1087E3: main (in /home/yles94214/112-spring-software-testing/lab5/heap)
==119409== 
==119409== Invalid read of size 1
==119409==    at 0x108820: main (in /home/yles94214/112-spring-software-testing/lab5/heap)
==119409==  Address 0x4a39047 is 1 bytes after a block of size 6 alloc'd
==119409==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==119409==    by 0x1087E3: main (in /home/yles94214/112-spring-software-testing/lab5/heap)
==119409== 
==119409== 
==119409== HEAP SUMMARY:
==119409==     in use at exit: 6 bytes in 1 blocks
==119409==   total heap usage: 2 allocs, 1 frees, 1,030 bytes allocated
==119409== 
==119409== LEAK SUMMARY:
==119409==    definitely lost: 6 bytes in 1 blocks
==119409==    indirectly lost: 0 bytes in 0 blocks
==119409==      possibly lost: 0 bytes in 0 blocks
==119409==    still reachable: 0 bytes in 0 blocks
==119409==         suppressed: 0 bytes in 0 blocks
==119409== Rerun with --leak-check=full to see details of leaked memory
==119409== 
==119409== For lists of detected and suppressed errors, rerun with: -s
==119409== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```

```

### Stack out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    char str1[8] = "Hello W";
    char str2[8] = "1234567";
    strncpy(str1, "Hello Peko", 10);
    puts(str1);
    puts(str2);
    return 0;
}
```
#### Valgrind Report
```
==119818== Memcheck, a memory error detector
==119818== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==119818== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==119818== Command: ./stack
==119818== 
Hello Peko34567
ko34567
==119818== 
==119818== HEAP SUMMARY:
==119818==     in use at exit: 0 bytes in 0 blocks
==119818==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==119818== 
==119818== All heap blocks were freed -- no leaks are possible
==119818== 
==119818== For lists of detected and suppressed errors, rerun with: -s
==119818== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```

```

### Global out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char str1[8] = "Hello W";
char str2[8] = "1234567";

int main(void)
{
    strncpy(str1, "Hello Peko", 10);
    puts(str1);
    puts(str2);
    return 0;
}
```
#### Valgrind Report
```
==119988== Memcheck, a memory error detector
==119988== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==119988== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==119988== Command: ./global
==119988== 
Hello Peko34567
ko34567
==119988== 
==119988== HEAP SUMMARY:
==119988==     in use at exit: 0 bytes in 0 blocks
==119988==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==119988== 
==119988== All heap blocks were freed -- no leaks are possible
==119988== 
==119988== For lists of detected and suppressed errors, rerun with: -s
==119988== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
### ASan Report
```

```

### Use-after-free
#### Source code
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    char *str = (char*)malloc(sizeof(char)*6);
    strcpy(str, "Hello");
    free(str);
    str[0] = '!';
    putchar(str[0]);
    return 0;
}
```
#### Valgrind Report
```
==120200== Memcheck, a memory error detector
==120200== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==120200== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==120200== Command: ./uafree
==120200== 
==120200== Invalid write of size 1
==120200==    at 0x108858: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200==  Address 0x4a39040 is 0 bytes inside a block of size 6 free'd
==120200==    at 0x4867AD0: free (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==120200==    by 0x10884F: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200==  Block was alloc'd at
==120200==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==120200==    by 0x108823: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200== 
==120200== Invalid read of size 1
==120200==    at 0x108860: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200==  Address 0x4a39040 is 0 bytes inside a block of size 6 free'd
==120200==    at 0x4867AD0: free (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==120200==    by 0x10884F: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200==  Block was alloc'd at
==120200==    at 0x4865058: malloc (in /usr/libexec/valgrind/vgpreload_memcheck-arm64-linux.so)
==120200==    by 0x108823: main (in /home/yles94214/112-spring-software-testing/lab5/uafree)
==120200== 
!==120200== 
==120200== HEAP SUMMARY:
==120200==     in use at exit: 0 bytes in 0 blocks
==120200==   total heap usage: 2 allocs, 2 frees, 1,030 bytes allocated
==120200== 
==120200== All heap blocks were freed -- no leaks are possible
==120200== 
==120200== For lists of detected and suppressed errors, rerun with: -s
==120200== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```

```

### Use-after-return
#### Source code
```
#include <stdio.h>

char *ptr = NULL;

void foo()
{
    char str[8] = "Hello";
    ptr = &str[0];
}

int main(void)
{
    foo();
    putchar(*ptr);
    *ptr = 'P';
    return 0;
}
```
#### Valgrind Report
```
==120760== Memcheck, a memory error detector
==120760== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==120760== Using Valgrind-3.18.1 and LibVEX; rerun with -h for copyright info
==120760== Command: ./uareturn
==120760== 
==120760== Invalid read of size 1
==120760==    at 0x1088D4: main (in /home/yles94214/112-spring-software-testing/lab5/uareturn)
==120760==  Address 0x1ffefffdb0 is on thread 1's stack
==120760==  16 bytes below stack pointer
==120760== 
==120760== Invalid write of size 1
==120760==    at 0x1088EC: main (in /home/yles94214/112-spring-software-testing/lab5/uareturn)
==120760==  Address 0x1ffefffdb0 is on thread 1's stack
==120760==  16 bytes below stack pointer
==120760== 
H==120760== 
==120760== HEAP SUMMARY:
==120760==     in use at exit: 0 bytes in 0 blocks
==120760==   total heap usage: 1 allocs, 1 frees, 1,024 bytes allocated
==120760== 
==120760== All heap blocks were freed -- no leaks are possible
==120760== 
==120760== For lists of detected and suppressed errors, rerun with: -s
==120760== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
```
### ASan Report
```

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

```
### Why

