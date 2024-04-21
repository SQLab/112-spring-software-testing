# Answer

Name: 
ID: 

## Test Valgrind and ASan
### Result
|                      | Valgrind | Asan |
| -------------------- | -------- | ---- |
| Heap out-of-bounds   |          |      |
| Stack out-of-bounds  |          |      |
| Global out-of-bounds |          |      |
| Use-after-free       |          |      |
| Use-after-return     |          |      |

### Heap out-of-bounds
#### Source code
```
#include <stdio.h>
#include <stdlib.h>

int main() {
    char *str = malloc(3);
    str[3] = 'A';
    printf("%c\n",str[3]);
    free(str);
    return 0;
}

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Stack out-of-bounds
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Global out-of-bounds
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Use-after-free
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

### Use-after-return
#### Source code
```

```
#### Valgrind Report
```

```
### ASan Report
```

```

## ASan Out-of-bound Write bypass Redzone
### Source code
```

```
### Why

