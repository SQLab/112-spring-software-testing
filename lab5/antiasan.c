#include <stdlib.h>

int *s;

void f()
{
    free(s);
}

void antiasan(unsigned long addr)
{
    free(malloc(1 << 29));
    s = (int *)malloc(0x180);
    ((char *)s)[0x10] = 'H';
    atexit(f);
}
