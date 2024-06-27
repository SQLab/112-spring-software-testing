// TODO:
void antiasan(unsigned long addr)
{
    char* ss = (char*)0x7fff8000 + (addr >> 3);
    *ss = 0x00; 
    return;
}
