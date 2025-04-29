#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void debug(int id)
{
    if (id == 48763)
        printf("deubg mode\n");
    else
        printf("bad id!\n");
}

int main(int argc, char **argv)
{
    printf("argc = %d\n", argc);
    if (argc >= 2)
        printf("argv[1] = %s\n", argv[1]);
    else
        return 0;
    if (argc == 48763)
        printf("Your argc is so hayaku!\n");
    else
        printf("Your argc need to be modohayaku!\n");
    if (strcmp(argv[1], "hayaku... motohayaku!") == 0)
        printf("Suta... basuto... sutorimu!\n");
    else
        printf("You dead\n");
    return 0;
}
