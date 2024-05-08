#include <stdio.h>

char *ptr = NULL;

void foo()
{
    char str[8] = "Hello";
    ptr = &str[0];
}

int main(void)
{
    foo();
    putchar(*ptr);
    *ptr = 'P';
    return 0;
}