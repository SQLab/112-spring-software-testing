// TODO:
void antiasan(unsigned long addr)
{

    unsigned long shadow_addr = (addr >> 3) + 0x7fff8000;
    *(char *)shadow_addr = 0;
}
