.PHONY: all
all: uaf_asan

uaf_asan: uaf.c libantiasan.so
	gcc -fsanitize=address -Og -g -o $@ $< -lantiasan -L.

libantiasan.so: antiasan.c
	gcc -g -fPIC -c antiasan.c
	gcc -shared antiasan.o -o libantiasan.so

.PHINY: run
run:
	LD_LIBRARY_PATH=. ./uaf_asan

.PHONY: clean
clean:
	rm uaf_asan antiasan.o libantiasan.so
