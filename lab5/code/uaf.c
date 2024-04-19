#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *s = (char *)malloc(10);
    free(s);
    s[10] = 'A';
    putchar(s[10]);
    return 0;
}