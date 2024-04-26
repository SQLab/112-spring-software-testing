// TODO:
void antiasan(unsigned long addr)
{
    unsigned long *shadow = (unsigned long *)((addr >> 3) + 0x7fff8000);
    *shadow = 0;
}
