// TODO:
void antiasan(unsigned long addr) {
    int* ptr = (int*)((addr >> 3) + 0x7fff8000);
    *ptr = 0;
}
