void antiasan(unsigned long addr) {
    void* shadow = (void*) ((addr >> 3) + 0x7fff8000);
    *(char*)shadow = 0;
}