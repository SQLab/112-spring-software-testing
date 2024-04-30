// TODO:
void antiasan(unsigned long addr) {
    char *p = (char*)(0x7fff8000 + (addr >> 3));
 	*p = 0;
}
