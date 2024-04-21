// TODO:
void antiasan(unsigned long addr)
{
    // for x64
    char* ad = (addr>>3)+(char*)0x7fff8000;
    *ad = 0;
}
