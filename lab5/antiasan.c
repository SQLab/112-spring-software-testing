
void antiasan(unsigned long addr)
{
    long long* add = (long long *)((addr >> 3) + 0x7fff8000);
    *add++ = 0x00;
}
