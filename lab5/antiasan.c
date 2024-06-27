void antiasan(unsigned long addr) {
    // Calculate the address in the shadow memory corresponding to 'addr'.
    unsigned long shadow_addr = (addr >> 3) + 0x7fff8000;
    // Treat the calculated shadow address as a pointer to a char.
    char * shadow_byte_value = (char *) shadow_addr;
    // Set the byte in the shadow memory to 0 (addressable).
    *shadow_byte_value = 0;
}