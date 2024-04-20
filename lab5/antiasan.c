void antiasan(unsigned long addr)
{
    char* add = (char *)((addr >> 3) | 0x7fff8000);
    *add = 0x00;
}
