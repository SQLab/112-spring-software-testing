#include <stdio.h>
#include <string.h>

void antiasan(unsigned long addr)
{
    unsigned long rz = (addr >> 3) + 0x7ffff8000;
    //printf("%lx\n", *(unsigned long*)rz);
    //unsigned long t = 0x0;
    //memcpy((unsigned long*)rz, &t, 8);
}
