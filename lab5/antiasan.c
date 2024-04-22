#include <sanitizer/asan_interface.h>

//TODO:
void antiasan(unsigned long addr)
{
    /* get the scale and base addr of shadow memory */
    size_t shadow_scale, shadow_base;
    __asan_get_shadow_mapping(&shadow_scale, &shadow_base);

    /* shadow memory mapping */
    void *shadow_addr = (void *)((addr >> shadow_scale) + shadow_base);
    *(char *)shadow_addr = 0;

    return;
}