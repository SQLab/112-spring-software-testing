void antiasan(unsigned long addr)
{
	char* shadow=((addr-0x10)>>3)+0x7fff8000;
    for(int i=0;i<3;i++)
        shadow[i]=0; 
}