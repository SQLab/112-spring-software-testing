void antiasan(unsigned long addr){
    unsigned long *shadow_ptr = (unsigned long *)((addr >> 3) + 0x7fff8000);
    *shadow_ptr = 0x00;
}