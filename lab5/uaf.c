#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "antiasan.h"

int main(void)
{
        char *s = (char *)malloc(0x18);
        strcpy(s, "HAHAHAHAHAHAHAHAHAHAHAH");
        printf("s[0x10] = %c\n", s[0x10]);
        free(s);
        antiasan((unsigned long)&s[0x10]);
        printf("s[0x10] = %c\n", s[0x10]);
        return 0;
}
