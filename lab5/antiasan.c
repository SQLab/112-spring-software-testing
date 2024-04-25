
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <sys/mman.h>
__attribute__((no_sanitize("address")))
void antiasan(unsigned long addr)
{
	char* ss = (char*)addr;
	malloc(1<<20);
        

}
