#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    char *str = (char*)malloc(sizeof(char)*6);
    strcpy(str, "Hello");
    str[6] = '!';
    putchar(str[7]);
    return 0;
}