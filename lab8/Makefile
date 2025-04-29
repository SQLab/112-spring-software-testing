all: target

llvm-pass.so: llvm-pass.so.cc
	clang-14 `llvm-config-14 --cxxflags` -shared -fPIC $< -o $@

target: target.c llvm-pass.so
	clang-14 `llvm-config-14 --cflags` -fexperimental-new-pass-manager \
	 -fpass-plugin=./llvm-pass.so $< -o $@

run:
	./target 1

clean:
	rm -f llvm-pass.so target