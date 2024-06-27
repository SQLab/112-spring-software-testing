// #include <stdlib.h>

void antiasan(unsigned long addr)
{
    unsigned long *shadow = (unsigned long *)((addr >> 3) + 0x7fff8000); //0x7fff8000 is the offset of the shadow bytes address region
    *shadow = 0x00; //mark the shadow byte as "valid"
}
