#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *s = "0123456789";
    s[11] = 'A';
    putchar(s[11]);
    return 0;
}