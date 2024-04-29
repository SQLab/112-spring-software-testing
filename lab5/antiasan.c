// TODO:
void antiasan(unsigned long addr)
{
    char *p = (addr >> 3) + 0x7fff8000;
 	*p = 0;
}
