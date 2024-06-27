// TODO:
void antiasan(unsigned long addr)
{
    char* mask = (char*) (0x7fff8000 + (addr >> 3));
    *mask = 0;
}
