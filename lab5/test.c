#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main() {
    int heap[2] = {1,2};
    int buffer[2] = {3,4};
    int offset = &buffer[0] - &heap[1];
    printf("%d\n",offset);
    heap[1+offset] = 3;
    return 0;
}