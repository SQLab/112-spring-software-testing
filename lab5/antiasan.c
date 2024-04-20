<<<<<<< HEAD
void antiasan(unsigned long addr)
{
    unsigned long *shadow =((addr>>3) + 0x7fff8000); //target address 0x0c067fff8000
    // if the value of shadow doesn't contain 0xfa, fd, f1, f2, f3, f5, f8, f9 ... then it would pass the check
    *shadow = 0x12; 
    return;
=======
// TODO:
void antiasan(unsigned long addr)
{

>>>>>>> origin/b122521
}
