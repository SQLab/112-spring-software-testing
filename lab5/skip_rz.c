#include <stdio.h>

int main(void)
{
    char a[8] = "Hello";
    char b[8] = "World";
    a[32] = 'P';
    printf("a = %p, b = %p\n", a, b);
    printf("*a = %s, *b = %s\n", a, b);
    return 0;
}