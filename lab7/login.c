#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int encrypt(int a1, int a2) {
        if ( a1 <= 0x40 || a1 > 90 ) {
                puts("Login failed");
                exit(1);
        }
        return (0x1F * a2 + a1 - 65) % 26 + 65;
}

int main(void) {
        char secret[0x20] = "VXRRJEURXDASBFHM";
        char pwd[0x20] = {0};

        printf("Enter the password: ");
        scanf("%16s", pwd);
        for ( int j = 0; j < 0x10; ++j )
                pwd[j] = encrypt(pwd[j], j + 8);
        if ( !strcmp(secret, pwd) )
                puts("Login successful");
        else
                puts("Login failed");
        return 0;
}
