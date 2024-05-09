
#include <stdio.h>

int main(void)
{
	char *ptr;
	if(1) {
		char str[8] = "Hello";
		ptr = &str[0];
	}
	putchar(*ptr);
	*ptr = 'p';
	return 0;
}
