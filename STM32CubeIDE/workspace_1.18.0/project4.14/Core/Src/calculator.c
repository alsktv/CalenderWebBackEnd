#include "MAP_touch.h"
#include "MAP_LCD.h"
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <ctype.h>

#define MAX_INPUT_LEN 64
#define TOUCH_X_MIN  100
#define TOUCH_X_MAX  4400
#define TOUCH_Y_MIN  100
#define TOUCH_Y_MAX  3800
#define LCD_WIDTH    240
#define LCD_HEIGHT   320

typedef struct {
    int x, y, w, h;
    char* label;
} Button;

char input[MAX_INPUT_LEN] = "";
char result_str[64] = "";
char prev_input[MAX_INPUT_LEN] = "";
char prev_result[64] = "";

Button buttons[] = {
    {  0,  50, 60, 38, "7"}, { 60,  50, 60, 38, "8"}, {120,  50, 60, 38, "9"}, {180,  50, 60, 38, "/"},
    {  0,  90, 60, 38, "4"}, { 60,  90, 60, 38, "5"}, {120,  90, 60, 38, "6"}, {180,  90, 60, 38, "*"},
    {  0, 130, 60, 38, "1"}, { 60, 130, 60, 38, "2"}, {120, 130, 60, 38, "3"}, {180, 130, 60, 38, "-"},
    {  0, 170, 60, 38, "0"}, { 60, 170, 60, 38, "."}, {120, 170, 60, 38, "="}, {180, 170, 60, 38, "+"},
    {  0, 210, 60, 30, "C"}, { 60, 210, 60, 30, "<-"}, {120, 210, 60, 30, "("}, {180, 210, 60, 30, ")"}
};

int map_touch_to_lcd_x(uint16_t raw_x) {
    if (raw_x < TOUCH_X_MIN) raw_x = TOUCH_X_MIN;
    if (raw_x > TOUCH_X_MAX) raw_x = TOUCH_X_MAX;
    return (raw_x - TOUCH_X_MIN) * (LCD_WIDTH - 1) / (TOUCH_X_MAX - TOUCH_X_MIN);
}

int map_touch_to_lcd_y(uint16_t raw_y) {
    if (raw_y < TOUCH_Y_MIN) raw_y = TOUCH_Y_MIN;
    if (raw_y > TOUCH_Y_MAX) raw_y = TOUCH_Y_MAX;
    return (raw_y - TOUCH_Y_MIN) * (LCD_HEIGHT - 1) / (TOUCH_Y_MAX - TOUCH_Y_MIN);
}

// Expression parsing
double parse_expression(const char **str, int *error);  // Forward declaration

double parse_number(const char **str, int *error) {
    char *end;
    double val = strtod(*str, &end);
    if (*str == end) {
        *error = 1;
        return 0;
    }
    *str = end;
    return val;
}

double parse_factor(const char **str, int *error) {
    while (isspace(**str)) (*str)++;

    if (**str == '(') {
        (*str)++;
        double val = parse_expression(str, error);
        if (**str == ')') {
            (*str)++;
        } else {
            *error = 1;
        }
        return val;
    }

    return parse_number(str, error);
}

double parse_term(const char **str, int *error) {
    double val = parse_factor(str, error);

    while (**str == '*' || **str == '/') {
        char op = *(*str)++;
        double rhs = parse_factor(str, error);
        if (*error) return 0;

        if (op == '*') val *= rhs;
        else {
            if (rhs == 0) {
                *error = 1;
                return 0;
            }
            val /= rhs;
        }
    }

    return val;
}

double parse_expression(const char **str, int *error) {
    double val = parse_term(str, error);

    while (**str == '+' || **str == '-') {
        char op = *(*str)++;
        double rhs = parse_term(str, error);
        if (*error) return 0;

        if (op == '+') val += rhs;
        else val -= rhs;
    }

    return val;
}

double evaluate_expression(const char* expr, int* error) {
    *error = 0;
    const char* p = expr;
    return parse_expression(&p, error);
}

void draw_buttons() {
    LCD_Clear(COLOR_WHITE);
    LCD_Draw_Str(30, 10, (uint8_t *)"STM32 CALCULATOR", COLOR_RED, 2);

    for (int i = 0; i < sizeof(buttons) / sizeof(buttons[0]); i++) {
        Button btn = buttons[i];
        LCD_Draw_Rectangle(btn.x, btn.y, btn.x + btn.w, btn.y + btn.h, COLOR_BLACK);
        LCD_Draw_Str(btn.x + 15, btn.y + 12, (uint8_t*)btn.label, COLOR_BLUE, 1);
    }
}

int get_touched_button(int x, int y) {
    for (int i = 0; i < sizeof(buttons) / sizeof(buttons[0]); i++) {
        Button btn = buttons[i];
        if (x >= btn.x && x <= btn.x + btn.w &&
            y >= btn.y && y <= btn.y + btn.h) {
            return i;
        }
    }
    return -1;
}

void calculator_process_touch() {
    XYP_point p;
    Touch_read(&p);

    if (p.p > 50) {
        int lcd_x = map_touch_to_lcd_x(p.x);
        int lcd_y = map_touch_to_lcd_y(p.y);

        int idx = get_touched_button(lcd_x, lcd_y);
        if (idx >= 0) {
            const char *label = buttons[idx].label;

            if (strcmp(label, "C") == 0) {
                input[0] = '\0';
                result_str[0] = '\0';
            } else if (strcmp(label, "<-") == 0) {
                size_t len = strlen(input);
                if (len > 0) input[len - 1] = '\0';
            } else if (strcmp(label, "=") == 0) {
                int error = 0;
                double res = evaluate_expression(input, &error);
                if (error) {
                    snprintf(result_str, sizeof(result_str), "%s=ERROR", input);
                } else {
                    snprintf(result_str, sizeof(result_str), "%s=%.2f", input, res);
                }
                input[0] = '\0';  // 입력 리셋
            } else {
                if (strlen(input) + strlen(label) < MAX_INPUT_LEN - 1) {
                    strcat(input, label);
                }
            }

            if (strcmp(prev_input, input) != 0) {
                strcpy(prev_input, input);
                LCD_Block_Clear(0, 245, 239, 260, COLOR_WHITE);
                LCD_Draw_Str(10, 245, (uint8_t*)input, COLOR_RED, 1);
            }

            if (strcmp(prev_result, result_str) != 0) {
                strcpy(prev_result, result_str);
                LCD_Block_Clear(0, 280, 239, 319, COLOR_WHITE);
                LCD_Draw_Str(10, 295, (uint8_t*)result_str, COLOR_BLACK, 2);
            }

            HAL_Delay(200);  // 디바운싱
        }
    }
}







