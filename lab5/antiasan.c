// TODO:
void antiasan(unsigned long addr)
{
    // find shadow 
    unsigned long* shadow = (unsigned long*) ( 0x7fff8000 + (addr >> 3));
    // destroy the shadow;
    *shadow = 0;
}
