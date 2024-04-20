// TODO:
void antiasan(unsigned long addr)
{
    //calculate address of shadow memory
    unsigned long *shadow = (unsigned long *)((addr >> 3) + 0x7fff8000);
    //set to zero as addressable
    *shadow = 0x00;

}
