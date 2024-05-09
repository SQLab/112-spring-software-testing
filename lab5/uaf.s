
uaf:     file format elf64-x86-64


Disassembly of section .init:

0000000000001000 <_init>:
    1000:	f3 0f 1e fa          	endbr64 
    1004:	48 83 ec 08          	sub    rsp,0x8
    1008:	48 8b 05 d9 2f 00 00 	mov    rax,QWORD PTR [rip+0x2fd9]        # 3fe8 <__gmon_start__>
    100f:	48 85 c0             	test   rax,rax
    1012:	74 02                	je     1016 <_init+0x16>
    1014:	ff d0                	call   rax
    1016:	48 83 c4 08          	add    rsp,0x8
    101a:	c3                   	ret    

Disassembly of section .plt:

0000000000001020 <.plt>:
    1020:	ff 35 5a 2f 00 00    	push   QWORD PTR [rip+0x2f5a]        # 3f80 <_GLOBAL_OFFSET_TABLE_+0x8>
    1026:	f2 ff 25 5b 2f 00 00 	bnd jmp QWORD PTR [rip+0x2f5b]        # 3f88 <_GLOBAL_OFFSET_TABLE_+0x10>
    102d:	0f 1f 00             	nop    DWORD PTR [rax]
    1030:	f3 0f 1e fa          	endbr64 
    1034:	68 00 00 00 00       	push   0x0
    1039:	f2 e9 e1 ff ff ff    	bnd jmp 1020 <.plt>
    103f:	90                   	nop
    1040:	f3 0f 1e fa          	endbr64 
    1044:	68 01 00 00 00       	push   0x1
    1049:	f2 e9 d1 ff ff ff    	bnd jmp 1020 <.plt>
    104f:	90                   	nop
    1050:	f3 0f 1e fa          	endbr64 
    1054:	68 02 00 00 00       	push   0x2
    1059:	f2 e9 c1 ff ff ff    	bnd jmp 1020 <.plt>
    105f:	90                   	nop
    1060:	f3 0f 1e fa          	endbr64 
    1064:	68 03 00 00 00       	push   0x3
    1069:	f2 e9 b1 ff ff ff    	bnd jmp 1020 <.plt>
    106f:	90                   	nop
    1070:	f3 0f 1e fa          	endbr64 
    1074:	68 04 00 00 00       	push   0x4
    1079:	f2 e9 a1 ff ff ff    	bnd jmp 1020 <.plt>
    107f:	90                   	nop
    1080:	f3 0f 1e fa          	endbr64 
    1084:	68 05 00 00 00       	push   0x5
    1089:	f2 e9 91 ff ff ff    	bnd jmp 1020 <.plt>
    108f:	90                   	nop
    1090:	f3 0f 1e fa          	endbr64 
    1094:	68 06 00 00 00       	push   0x6
    1099:	f2 e9 81 ff ff ff    	bnd jmp 1020 <.plt>
    109f:	90                   	nop
    10a0:	f3 0f 1e fa          	endbr64 
    10a4:	68 07 00 00 00       	push   0x7
    10a9:	f2 e9 71 ff ff ff    	bnd jmp 1020 <.plt>
    10af:	90                   	nop
    10b0:	f3 0f 1e fa          	endbr64 
    10b4:	68 08 00 00 00       	push   0x8
    10b9:	f2 e9 61 ff ff ff    	bnd jmp 1020 <.plt>
    10bf:	90                   	nop

Disassembly of section .plt.got:

00000000000010c0 <__cxa_finalize@plt>:
    10c0:	f3 0f 1e fa          	endbr64 
    10c4:	f2 ff 25 2d 2f 00 00 	bnd jmp QWORD PTR [rip+0x2f2d]        # 3ff8 <__cxa_finalize@GLIBC_2.2.5>
    10cb:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

Disassembly of section .plt.sec:

00000000000010d0 <__asan_unregister_globals@plt>:
    10d0:	f3 0f 1e fa          	endbr64 
    10d4:	f2 ff 25 b5 2e 00 00 	bnd jmp QWORD PTR [rip+0x2eb5]        # 3f90 <__asan_unregister_globals>
    10db:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

00000000000010e0 <free@plt>:
    10e0:	f3 0f 1e fa          	endbr64 
    10e4:	f2 ff 25 ad 2e 00 00 	bnd jmp QWORD PTR [rip+0x2ead]        # 3f98 <free>
    10eb:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

00000000000010f0 <__asan_register_globals@plt>:
    10f0:	f3 0f 1e fa          	endbr64 
    10f4:	f2 ff 25 a5 2e 00 00 	bnd jmp QWORD PTR [rip+0x2ea5]        # 3fa0 <__asan_register_globals>
    10fb:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

0000000000001100 <memcpy@plt>:
    1100:	f3 0f 1e fa          	endbr64 
    1104:	f2 ff 25 9d 2e 00 00 	bnd jmp QWORD PTR [rip+0x2e9d]        # 3fa8 <memcpy>
    110b:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

0000000000001110 <__asan_report_load1@plt>:
    1110:	f3 0f 1e fa          	endbr64 
    1114:	f2 ff 25 95 2e 00 00 	bnd jmp QWORD PTR [rip+0x2e95]        # 3fb0 <__asan_report_load1>
    111b:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

0000000000001120 <__printf_chk@plt>:
    1120:	f3 0f 1e fa          	endbr64 
    1124:	f2 ff 25 8d 2e 00 00 	bnd jmp QWORD PTR [rip+0x2e8d]        # 3fb8 <__printf_chk@GLIBC_2.3.4>
    112b:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

0000000000001130 <__asan_init@plt>:
    1130:	f3 0f 1e fa          	endbr64 
    1134:	f2 ff 25 85 2e 00 00 	bnd jmp QWORD PTR [rip+0x2e85]        # 3fc0 <__asan_init>
    113b:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

0000000000001140 <__asan_version_mismatch_check_v8@plt>:
    1140:	f3 0f 1e fa          	endbr64 
    1144:	f2 ff 25 7d 2e 00 00 	bnd jmp QWORD PTR [rip+0x2e7d]        # 3fc8 <__asan_version_mismatch_check_v8>
    114b:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

0000000000001150 <malloc@plt>:
    1150:	f3 0f 1e fa          	endbr64 
    1154:	f2 ff 25 75 2e 00 00 	bnd jmp QWORD PTR [rip+0x2e75]        # 3fd0 <malloc>
    115b:	0f 1f 44 00 00       	nop    DWORD PTR [rax+rax*1+0x0]

Disassembly of section .text:

0000000000001160 <_start>:
    1160:	f3 0f 1e fa          	endbr64 
    1164:	31 ed                	xor    ebp,ebp
    1166:	49 89 d1             	mov    r9,rdx
    1169:	5e                   	pop    rsi
    116a:	48 89 e2             	mov    rdx,rsp
    116d:	48 83 e4 f0          	and    rsp,0xfffffffffffffff0
    1171:	50                   	push   rax
    1172:	54                   	push   rsp
    1173:	4c 8d 05 46 02 00 00 	lea    r8,[rip+0x246]        # 13c0 <__libc_csu_fini>
    117a:	48 8d 0d cf 01 00 00 	lea    rcx,[rip+0x1cf]        # 1350 <__libc_csu_init>
    1181:	48 8d 3d c1 00 00 00 	lea    rdi,[rip+0xc1]        # 1249 <main>
    1188:	ff 15 52 2e 00 00    	call   QWORD PTR [rip+0x2e52]        # 3fe0 <__libc_start_main@GLIBC_2.2.5>
    118e:	f4                   	hlt    
    118f:	90                   	nop

0000000000001190 <deregister_tm_clones>:
    1190:	48 8d 3d 09 2f 00 00 	lea    rdi,[rip+0x2f09]        # 40a0 <__TMC_END__>
    1197:	48 8d 05 02 2f 00 00 	lea    rax,[rip+0x2f02]        # 40a0 <__TMC_END__>
    119e:	48 39 f8             	cmp    rax,rdi
    11a1:	74 15                	je     11b8 <deregister_tm_clones+0x28>
    11a3:	48 8b 05 2e 2e 00 00 	mov    rax,QWORD PTR [rip+0x2e2e]        # 3fd8 <_ITM_deregisterTMCloneTable>
    11aa:	48 85 c0             	test   rax,rax
    11ad:	74 09                	je     11b8 <deregister_tm_clones+0x28>
    11af:	ff e0                	jmp    rax
    11b1:	0f 1f 80 00 00 00 00 	nop    DWORD PTR [rax+0x0]
    11b8:	c3                   	ret    
    11b9:	0f 1f 80 00 00 00 00 	nop    DWORD PTR [rax+0x0]

00000000000011c0 <register_tm_clones>:
    11c0:	48 8d 3d d9 2e 00 00 	lea    rdi,[rip+0x2ed9]        # 40a0 <__TMC_END__>
    11c7:	48 8d 35 d2 2e 00 00 	lea    rsi,[rip+0x2ed2]        # 40a0 <__TMC_END__>
    11ce:	48 29 fe             	sub    rsi,rdi
    11d1:	48 89 f0             	mov    rax,rsi
    11d4:	48 c1 ee 3f          	shr    rsi,0x3f
    11d8:	48 c1 f8 03          	sar    rax,0x3
    11dc:	48 01 c6             	add    rsi,rax
    11df:	48 d1 fe             	sar    rsi,1
    11e2:	74 14                	je     11f8 <register_tm_clones+0x38>
    11e4:	48 8b 05 05 2e 00 00 	mov    rax,QWORD PTR [rip+0x2e05]        # 3ff0 <_ITM_registerTMCloneTable>
    11eb:	48 85 c0             	test   rax,rax
    11ee:	74 08                	je     11f8 <register_tm_clones+0x38>
    11f0:	ff e0                	jmp    rax
    11f2:	66 0f 1f 44 00 00    	nop    WORD PTR [rax+rax*1+0x0]
    11f8:	c3                   	ret    
    11f9:	0f 1f 80 00 00 00 00 	nop    DWORD PTR [rax+0x0]

0000000000001200 <__do_global_dtors_aux>:
    1200:	f3 0f 1e fa          	endbr64 
    1204:	80 3d 95 2e 00 00 00 	cmp    BYTE PTR [rip+0x2e95],0x0        # 40a0 <__TMC_END__>
    120b:	75 2b                	jne    1238 <__do_global_dtors_aux+0x38>
    120d:	55                   	push   rbp
    120e:	48 83 3d e2 2d 00 00 	cmp    QWORD PTR [rip+0x2de2],0x0        # 3ff8 <__cxa_finalize@GLIBC_2.2.5>
    1215:	00 
    1216:	48 89 e5             	mov    rbp,rsp
    1219:	74 0c                	je     1227 <__do_global_dtors_aux+0x27>
    121b:	48 8b 3d e6 2d 00 00 	mov    rdi,QWORD PTR [rip+0x2de6]        # 4008 <__dso_handle>
    1222:	e8 99 fe ff ff       	call   10c0 <__cxa_finalize@plt>
    1227:	e8 64 ff ff ff       	call   1190 <deregister_tm_clones>
    122c:	c6 05 6d 2e 00 00 01 	mov    BYTE PTR [rip+0x2e6d],0x1        # 40a0 <__TMC_END__>
    1233:	5d                   	pop    rbp
    1234:	c3                   	ret    
    1235:	0f 1f 00             	nop    DWORD PTR [rax]
    1238:	c3                   	ret    
    1239:	0f 1f 80 00 00 00 00 	nop    DWORD PTR [rax+0x0]

0000000000001240 <frame_dummy>:
    1240:	f3 0f 1e fa          	endbr64 
    1244:	e9 77 ff ff ff       	jmp    11c0 <register_tm_clones>

0000000000001249 <main>:
    1249:	f3 0f 1e fa          	endbr64 
    124d:	53                   	push   rbx
    124e:	bf 18 00 00 00       	mov    edi,0x18
    1253:	e8 f8 fe ff ff       	call   1150 <malloc@plt>
    1258:	48 89 c3             	mov    rbx,rax
    125b:	ba 18 00 00 00       	mov    edx,0x18
    1260:	48 8d 35 b9 0d 00 00 	lea    rsi,[rip+0xdb9]        # 2020 <_IO_stdin_used+0x20>
    1267:	48 89 c7             	mov    rdi,rax
    126a:	e8 91 fe ff ff       	call   1100 <memcpy@plt>
    126f:	48 8d 7b 10          	lea    rdi,[rbx+0x10]
    1273:	48 89 f8             	mov    rax,rdi
    1276:	48 c1 e8 03          	shr    rax,0x3
    127a:	0f b6 80 00 80 ff 7f 	movzx  eax,BYTE PTR [rax+0x7fff8000]
    1281:	48 89 fa             	mov    rdx,rdi
    1284:	83 e2 07             	and    edx,0x7
    1287:	38 d0                	cmp    al,dl
    1289:	7f 04                	jg     128f <main+0x46>
    128b:	84 c0                	test   al,al
    128d:	75 63                	jne    12f2 <main+0xa9>
    128f:	0f be 53 10          	movsx  edx,BYTE PTR [rbx+0x10]
    1293:	48 8d 35 c6 0d 00 00 	lea    rsi,[rip+0xdc6]        # 2060 <_IO_stdin_used+0x60>
    129a:	bf 01 00 00 00       	mov    edi,0x1
    129f:	b8 00 00 00 00       	mov    eax,0x0
    12a4:	e8 77 fe ff ff       	call   1120 <__printf_chk@plt>
    12a9:	48 89 df             	mov    rdi,rbx
    12ac:	e8 2f fe ff ff       	call   10e0 <free@plt>
    12b1:	48 8d 7b 10          	lea    rdi,[rbx+0x10]
    12b5:	48 89 f8             	mov    rax,rdi
    12b8:	48 c1 e8 03          	shr    rax,0x3
    12bc:	0f b6 80 00 80 ff 7f 	movzx  eax,BYTE PTR [rax+0x7fff8000]
    12c3:	48 89 fa             	mov    rdx,rdi
    12c6:	83 e2 07             	and    edx,0x7
    12c9:	38 d0                	cmp    al,dl
    12cb:	7f 04                	jg     12d1 <main+0x88>
    12cd:	84 c0                	test   al,al
    12cf:	75 26                	jne    12f7 <main+0xae>
    12d1:	0f be 53 10          	movsx  edx,BYTE PTR [rbx+0x10]
    12d5:	48 8d 35 84 0d 00 00 	lea    rsi,[rip+0xd84]        # 2060 <_IO_stdin_used+0x60>
    12dc:	bf 01 00 00 00       	mov    edi,0x1
    12e1:	b8 00 00 00 00       	mov    eax,0x0
    12e6:	e8 35 fe ff ff       	call   1120 <__printf_chk@plt>
    12eb:	b8 00 00 00 00       	mov    eax,0x0
    12f0:	5b                   	pop    rbx
    12f1:	c3                   	ret    
    12f2:	e8 19 fe ff ff       	call   1110 <__asan_report_load1@plt>
    12f7:	e8 14 fe ff ff       	call   1110 <__asan_report_load1@plt>

00000000000012fc <_sub_D_00099_0>:
    12fc:	f3 0f 1e fa          	endbr64 
    1300:	48 83 ec 08          	sub    rsp,0x8
    1304:	be 02 00 00 00       	mov    esi,0x2
    1309:	48 8d 3d 10 2d 00 00 	lea    rdi,[rip+0x2d10]        # 4020 <__dso_handle+0x18>
    1310:	e8 bb fd ff ff       	call   10d0 <__asan_unregister_globals@plt>
    1315:	48 83 c4 08          	add    rsp,0x8
    1319:	c3                   	ret    

000000000000131a <_sub_I_00099_1>:
    131a:	f3 0f 1e fa          	endbr64 
    131e:	48 83 ec 08          	sub    rsp,0x8
    1322:	e8 09 fe ff ff       	call   1130 <__asan_init@plt>
    1327:	e8 14 fe ff ff       	call   1140 <__asan_version_mismatch_check_v8@plt>
    132c:	be 02 00 00 00       	mov    esi,0x2
    1331:	48 8d 3d e8 2c 00 00 	lea    rdi,[rip+0x2ce8]        # 4020 <__dso_handle+0x18>
    1338:	e8 b3 fd ff ff       	call   10f0 <__asan_register_globals@plt>
    133d:	48 83 c4 08          	add    rsp,0x8
    1341:	c3                   	ret    
    1342:	66 2e 0f 1f 84 00 00 	nop    WORD PTR cs:[rax+rax*1+0x0]
    1349:	00 00 00 
    134c:	0f 1f 40 00          	nop    DWORD PTR [rax+0x0]

0000000000001350 <__libc_csu_init>:
    1350:	f3 0f 1e fa          	endbr64 
    1354:	41 57                	push   r15
    1356:	4c 8d 3d db 29 00 00 	lea    r15,[rip+0x29db]        # 3d38 <__init_array_start>
    135d:	41 56                	push   r14
    135f:	49 89 d6             	mov    r14,rdx
    1362:	41 55                	push   r13
    1364:	49 89 f5             	mov    r13,rsi
    1367:	41 54                	push   r12
    1369:	41 89 fc             	mov    r12d,edi
    136c:	55                   	push   rbp
    136d:	48 8d 2d d4 29 00 00 	lea    rbp,[rip+0x29d4]        # 3d48 <__init_array_end>
    1374:	53                   	push   rbx
    1375:	4c 29 fd             	sub    rbp,r15
    1378:	48 83 ec 08          	sub    rsp,0x8
    137c:	e8 7f fc ff ff       	call   1000 <_init>
    1381:	48 c1 fd 03          	sar    rbp,0x3
    1385:	74 1f                	je     13a6 <__libc_csu_init+0x56>
    1387:	31 db                	xor    ebx,ebx
    1389:	0f 1f 80 00 00 00 00 	nop    DWORD PTR [rax+0x0]
    1390:	4c 89 f2             	mov    rdx,r14
    1393:	4c 89 ee             	mov    rsi,r13
    1396:	44 89 e7             	mov    edi,r12d
    1399:	41 ff 14 df          	call   QWORD PTR [r15+rbx*8]
    139d:	48 83 c3 01          	add    rbx,0x1
    13a1:	48 39 dd             	cmp    rbp,rbx
    13a4:	75 ea                	jne    1390 <__libc_csu_init+0x40>
    13a6:	48 83 c4 08          	add    rsp,0x8
    13aa:	5b                   	pop    rbx
    13ab:	5d                   	pop    rbp
    13ac:	41 5c                	pop    r12
    13ae:	41 5d                	pop    r13
    13b0:	41 5e                	pop    r14
    13b2:	41 5f                	pop    r15
    13b4:	c3                   	ret    
    13b5:	66 66 2e 0f 1f 84 00 	data16 nop WORD PTR cs:[rax+rax*1+0x0]
    13bc:	00 00 00 00 

00000000000013c0 <__libc_csu_fini>:
    13c0:	f3 0f 1e fa          	endbr64 
    13c4:	c3                   	ret    

Disassembly of section .fini:

00000000000013c8 <_fini>:
    13c8:	f3 0f 1e fa          	endbr64 
    13cc:	48 83 ec 08          	sub    rsp,0x8
    13d0:	48 83 c4 08          	add    rsp,0x8
    13d4:	c3                   	ret    
