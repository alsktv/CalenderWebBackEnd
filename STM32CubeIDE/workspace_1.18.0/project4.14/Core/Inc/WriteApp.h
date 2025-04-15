#ifndef __WRITE_APP_H__
#define __WRITE_APP_H__

#include "stdint.h"

void WriteApp_init(void);               // 초기화 (화면, 버튼 등)
void WriteApp_process_touch(void);      // 터치 입력 처리

#endif // __WRITE_APP_H__
