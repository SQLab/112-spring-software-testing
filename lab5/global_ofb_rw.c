#include <stdio.h>

    char str[8] = "Hello";

int main(void)
{
    str[8] = '!';
    putchar(str[8]);
    return 0;
}

// gcc -Og -g -o global global_obf_rw.c
// ./global output error
// Fatal error: glibc detected an invalid stdio handle
// Aborted

// gcc -o global global_ofb_rw.c
// ./global doesn't produce error