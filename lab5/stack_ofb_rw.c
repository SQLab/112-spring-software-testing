#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
    char str1[8] = "Hello W";
    char str2[8] = "1234567";
    strncpy(str1, "Hello Peko", 10);
    puts(str1);
    puts(str2);
    return 0;
}