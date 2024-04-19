#include <stdio.h>

int main()
{
    char a[8] = {};
    char b[8] = {};

    a[8 + 24] = 'A';
    printf("%c %c\n", a[8 + 24], b[0]);

    return 0;
}