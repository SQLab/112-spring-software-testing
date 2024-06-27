#include <stdint.h>
void antiasan(unsigned long addr)
{
#if UINTPTR_MAX == 0xffffffff
        *(char *)((addr >> 3) + 0x20000000) = 0;
#elif UINTPTR_MAX == 0xffffffffffffffff
        *(char *)((addr >> 3) + 0x7fff8000) = 0;
#else
#error
#endif
}
