// TODO:
#include <dlfcn.h>
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <string.h>
void antiasan(unsigned long addr)
{
    
    char * tar = (addr >> 3) + 0x7fff8000;
    *tar = 0;  
    
}
