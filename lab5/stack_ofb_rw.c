#include <stdio.h>

int main(void)
{
    char str[8] = "Hello";
    str[8] = '!';
    putchar(str[8]);
    return 0;
}

// gcc -o stack stack_ofb_rw.c
// ./stack produce error
// *** stack smashing detected ***: terminated
// Aborted

// gcc -Og -g -o stack stack_obf_rw.c
// ./stack doesn't produce error
