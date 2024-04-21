// TODO:
#include <stdint.h>

void antiasan(unsigned long addr)
{
    uint8_t *shadow = (uint8_t *)((addr >> 3) + 0x7fff8000);
    *shadow = 0x00;
}
