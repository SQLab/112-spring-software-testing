#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
typedef struct _BMPHeader {
	char BM[2];
	uint32_t size;
	uint32_t reserve;
	uint32_t offset;
	uint32_t header_size;
	uint32_t width;
	uint32_t height;
	uint16_t planes;
	uint16_t bpp;
	uint32_t compression;
	uint32_t bitmap_size;
	uint32_t h_res;
	uint32_t v_res;
	uint32_t palette;
	uint32_t important;
}__attribute__((__packed__)) Header;
int main(int argc, char **argv) {
	FILE *pF[9];
	char *filename = argv[1];
	for ( int i=0; i<9; ++i ) {
		pF[i] = fopen(filename, "rb");
		if ( pF[i] == NULL ) {
			printf("error! file %s doesn't exist.\n", filename);
			return 0;
		}
	}
	char output[11] = {'o', 'u', 't', 'p', 'u', 't', '.', 'b', 'm', 'p', '\0'};
	FILE *pR = fopen(output, "wb");
	Header H[9], res;
	printf("size of Herder %d\n", sizeof(Header));
	for ( int i=0; i<9; ++i )	fread(H+i, sizeof(Header), 1, pF[i]);
	res = H[0];
	res.height = H[0].height + H[3].height + H[6].height;
	res.width = H[0].width + H[1].width + H[2].width;
	res.bitmap_size = res.height*res.width*3+(res.width%4*res.height);
	res.size = res.bitmap_size + res.offset;
	fwrite(&res, sizeof(Header), 1, pR);
	for ( int i=2; i<9; i+=3 ) {
		for ( int j=0; j<H[i].height; ++j ) {
			for ( int k=0; k<3; ++k ) {
				uint8_t data[H[i-k].width*3];
				fread(data, sizeof(uint8_t), H[i-k].width*3, pF[i-k]);
				fwrite(data, sizeof(uint8_t), H[i-k].width*3, pR);
				fseek(pF[i-k], H[i-k].width%4, SEEK_CUR);
			}
			uint8_t padding;
			for ( int k=0; k<res.width%4; ++k )	fwrite(&padding, sizeof(uint8_t), 1, pR);
		}
	}
	for ( int i=0; i<9; ++i )	fclose(pF[i]);
	fclose(pR);
	puts("done!");
	return 0;
}
