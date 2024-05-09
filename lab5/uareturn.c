#include <stdio.h>

char* foo()
{
    char str[8] = "Hello";
    char *ptr = &str[0];
    return ptr;
}

int main(void)
{
    char *ptr = foo();
    *ptr = 'P';
    return 0;
}

// test: when executing arm program at x86_64 computer, wsl execute qemu-aarch64 automatically
// ASAN_OPTIONS=detect_stack_use_after_return=1 ./uareturn to enable detecting use-after-return bugs at run-time