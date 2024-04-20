// TODO:
void antiasan(unsigned long addr)
{
    char* skip = (char*)0x7fff8000 + (addr >> 3);
    *skip = 0; 
}
