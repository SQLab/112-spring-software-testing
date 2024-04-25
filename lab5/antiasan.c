

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void antiasan(unsigned long addr)
{
	unsigned long shadow=((addr-0x10)>>3)+0x7fff8000;
	char* shadow_addr=(char*)shadow;
	for (int i=0;i<3;i++){
		shadow_addr[i]=0;
	}
        

}
