// TODO:
void antiasan(unsigned long addr)
{
    char *shadow = (char *)((addr >> 3) + 0x7fff8000);
    *shadow = 0;
}
