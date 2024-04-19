#include <stdio.h>
#include <stdlib.h>

char *s = "0123456789";

int main()
{
    s[11] = 'A';
    putchar(s[11]);
    return 0;
}