#include <sanitizer/asan_interface.h>

// TODO:
void antiasan(unsigned long addr)
{
    __asan_unpoison_memory_region((void *)addr, 1);
}
