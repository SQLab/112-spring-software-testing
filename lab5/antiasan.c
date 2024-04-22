// TODO:
void antiasan(unsigned long addr)
{
    __asan_unpoison_memory_region((void *)addr, 1);
}
