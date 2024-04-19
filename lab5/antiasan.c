#include <stdlib.h>

int *s;

void f()
{
    free(s);
}

void antiasan(unsigned long addr)
{
    free(malloc(1 << 28));
    s = (int *)malloc(0x18);
    ((char *)s)[0x10] = 'H';
    atexit(f);
}
