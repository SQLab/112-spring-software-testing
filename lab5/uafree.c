#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    char *str = (char*)malloc(sizeof(char)*6);
    strcpy(str, "Hello");
    free(str);
    str[0] = '!';
    putchar(str[0]);
    return 0;
}