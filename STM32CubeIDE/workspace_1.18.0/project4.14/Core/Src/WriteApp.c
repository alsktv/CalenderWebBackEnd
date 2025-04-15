#include "MAP_touch.h"
#include "MAP_LCD.h"
#include <stdint.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define TOUCH_X_MIN 100
#define TOUCH_X_MAX 4400
#define TOUCH_Y_MIN 100
#define TOUCH_Y_MAX 3800
#define LCD_WIDTH   240
#define LCD_HEIGHT  320

// 좌표 변환 함수 (외부에서 제공된다고 가정)
int map_touch_to_lcd_x(uint16_t raw_x);
int map_touch_to_lcd_y(uint16_t raw_y);

// 펜 색상 정의
typedef enum {
    PEN_BLACK,
    PEN_RED,
    PEN_BLUE
} PenColor;

static PenColor pen_color = PEN_BLACK;
static int last_x = -1, last_y = -1;  // 이전 좌표 저장

static uint16_t get_pen_color(void) {
    switch (pen_color) {
        case PEN_RED: return COLOR_RED;
        case PEN_BLUE: return COLOR_BLUE;
        default: return COLOR_BLACK;
    }
}

void WriteApp_draw_buttons(void) {
    LCD_Draw_Rectangle(0, 0, 80, 30, COLOR_BLACK);
    LCD_Draw_Str(20, 10, (uint8_t *)"Black", COLOR_BLACK, 1);

    LCD_Draw_Rectangle(80, 0, 160, 30, COLOR_RED);
    LCD_Draw_Str(100, 10, (uint8_t *)"Red", COLOR_RED, 1);

    LCD_Draw_Rectangle(160, 0, 240, 30, COLOR_BLUE);
    LCD_Draw_Str(180, 10, (uint8_t *)"Blue", COLOR_BLUE, 1);

    // 지우개 UI (우측 하단)
    LCD_Draw_Rectangle(180, 290, 239, 319, COLOR_BLACK);
    LCD_Draw_Str(190, 300, (uint8_t *)"Clear", COLOR_BLACK, 1);
}

void WriteApp_init(void) {
    LCD_Clear(COLOR_WHITE);
    WriteApp_draw_buttons();
}

void WriteApp_process_touch(void) {
    XYP_point p;
    Touch_read(&p);

    if (p.p > 50) {
        int x = map_touch_to_lcd_x(p.x);
        int y = map_touch_to_lcd_y(p.y);

        // 상단 버튼 처리
        if (y < 30) {
            if (x < 80) {
                pen_color = PEN_BLACK;
            } else if (x < 160) {
                pen_color = PEN_RED;
            } else {
                pen_color = PEN_BLUE;
            }
            HAL_Delay(200);
            return;
        }

        // 지우개 버튼
        if (x > 180 && y > 290) {
            LCD_Clear(COLOR_WHITE);
            WriteApp_draw_buttons();
            last_x = -1;
            last_y = -1;
            HAL_Delay(200);
            return;
        }

        // 팬 드로잉
        if (last_x >= 0 && last_y >= 0) {
            LCD_Draw_Line(last_x, last_y, x, y, get_pen_color());
        } else {
            LCD_Draw_Circle(x, y, 2, get_pen_color());
        }

        last_x = x;
        last_y = y;
    } else {
        // 터치가 없을 땐 선 끊김
        last_x = -1;
        last_y = -1;
    }
}






