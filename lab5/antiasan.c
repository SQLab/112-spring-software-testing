// TODO:
void antiasan(unsigned long addr)
{
    char *ptr = (addr >> 3) + 0x7fff8000;
    *ptr = 0;
}
