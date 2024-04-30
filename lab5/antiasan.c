// TODO:
void antiasan(unsigned long addr)
{
    // change the shadow memory for the address addr
    unsigned long *p = (unsigned long *)((addr >> 3) + 0x7fff8000);
    *p = 0x00;
}
