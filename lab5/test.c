int *p;
void init_p() {
    int a[10];
    p = a; 
}

int main() {
    init_p();
    *p = 1;
}