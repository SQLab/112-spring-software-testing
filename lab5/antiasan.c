#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <sys/mman.h>

/*
 *  Overwrite the value of target variable in shadow
 */
void antiasan(unsigned long addr)
{
    /* calculate memory address of s[0x10] */
    unsigned long rz = (addr >> 3) + 0x7fff8000;
    
    /* mprotect need to perform on aligned page address, the page size is x^12 bytes */
    unsigned long b_addr = ((rz>>12)<<12);
    // printf("%p\n%p\n", (unsigned long*)rz, (unsigned long*)b_addr);

    /* change the access protection for memory page so that it can be read and write */
    if(mprotect((void*)b_addr, getpagesize(), PROT_READ | PROT_WRITE) == -1) {
        fprintf(stderr, "antiasan: failed to mprotect shadow - %s, %d\n", strerror(errno), errno);
    }

    /* change value in shadow to which s[0x10] map */
    /* first printf: fafafafafafafafd, second printf: fafafafafafafa00 */
    // printf("%lx\n", *(unsigned long*)rz);
    *(char*)rz = 0x0;
    // printf("%lx\n", *(unsigned long*)rz);
}
// 0xc067fff8002: 0xfafafafafafdfdfd