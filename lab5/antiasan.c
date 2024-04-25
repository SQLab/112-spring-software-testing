// TODO:
void antiasan(unsigned long addr)
{
	unsigned long int *shadow = (unsigned long int *)((addr >> 3) + 0x7fff8000);
    *shadow = 0;
}
