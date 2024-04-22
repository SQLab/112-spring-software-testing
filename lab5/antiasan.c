// TODO:
void antiasan(unsigned long addr)
{
    *(char *)((addr >> 3) + 0x7fff8000) = 0;
}
