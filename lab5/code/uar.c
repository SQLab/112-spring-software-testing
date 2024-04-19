#include <stdio.h>
#include <stdlib.h>

int *foo()
{
    int x;
    return &x;
}

int main()
{
    int *f = foo();
    *f = 0xc8763;
    printf("%d\n", *f);
    return 0;
}