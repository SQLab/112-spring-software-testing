// TODO:
void antiasan(unsigned long addr)
{
    // find shadow 
    char* shadow = (char*) ((addr >> 3) + 0x7fff8000) ;
    // set shadow to 0
    *shadow = '\0' ;
}