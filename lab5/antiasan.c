void antiasan(unsigned long addr)
{
    *(unsigned long *)((addr >> 3) + 0x7fff8000) = 0; 
}
