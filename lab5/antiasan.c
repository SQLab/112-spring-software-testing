void antiasan(unsigned long addr)
{
    // modify shadow address to 0 (allocated data)
    // shadow = (addr >> 3) + 0x7fff8000 (in 64-bit)
    // ref: https://github.com/google/sanitizers/wiki/AddressSanitizerAlgorithm
    *(char *)((addr >> 3) + 0x7fff8000) = 0;
}
