// TODO:
void antiasan(unsigned long addr)
{
    char *shadow = (char*)0x7fff8000 + (addr >> 3);
    shadow = 0x00;
}
