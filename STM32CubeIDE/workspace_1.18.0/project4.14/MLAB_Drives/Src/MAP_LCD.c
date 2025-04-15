/*
 * MAP_LCD.c
 *
 *  Created on: Jan 12, 2024
 *      Author: MAP Lab
 */



#include "MAP.h"
#include "MAP_font.h"
#include <stdint.h>   // uint8_t, uint16_t 등 쓰면 필수
#include <stdio.h>    // vsprintf, sprintf 쓰면 필수
#include "MAP_LCD.h"  // 또는 네 프로젝트에서 LCD 관련 함수 선언된 헤더


#include <math.h>
#include <stdarg.h>
#include <stdlib.h>

static uint16_t print_color	= COLOR_BLACK;
static uint16_t print_size	= 1; //size = 0 ~ 3
static const uint16_t print_margin = 2;
static uint16_t print_position_x = print_margin;
static uint16_t print_position_y = print_margin;

void LCD_BL_on()
{
	HAL_GPIO_WritePin(LCD_BL_GPIO_Port, LCD_BL_Pin, GPIO_PIN_SET);
}

void LCD_BL_off()
{
	HAL_GPIO_WritePin(LCD_BL_GPIO_Port, LCD_BL_Pin, GPIO_PIN_RESET);
}


void LCD_Check_ID()
{
	uint16_t temp;
	BANK1_index = 0xd3;
	temp = BANK1_A10_data; //dummy
	temp = BANK1_A10_data; //0x00
	temp = BANK1_A10_data; //0x93
	temp <<= 8;
	temp |= BANK1_A10_data; //0x41
	temp = 0;
}

void LCD_init()
{
//SOFTWARE RESET
BANK1_index = 0x01;
HAL_Delay(100);

//POWER CONTROL A
BANK1_index = 0xCB;
BANK1_A10_data = 0x39;
BANK1_A10_data = 0x2C;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x34;
BANK1_A10_data = 0x02;

//POWER CONTROL B
BANK1_index = 0xCF;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0xC1;
BANK1_A10_data = 0X30;

//DRIVER TIMING CONTROL A
BANK1_index = 0xE8;
BANK1_A10_data = 0x85;
BANK1_A10_data = 0x10;
BANK1_A10_data = 0x7A;  //78

//DRIVER TIMING CONTROL B
BANK1_index = 0xEA;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x00;

//POWER ON SEQUENCE CONTROL
BANK1_index = 0xED;
BANK1_A10_data = 0x64;
BANK1_A10_data = 0x03;
BANK1_A10_data = 0X12;
BANK1_A10_data = 0X81;

//PUMP RATIO CONTROL
BANK1_index = 0xF7;
BANK1_A10_data = 0x20;

//POWER CONTROL,VRH[5:0]
BANK1_index = 0xC0;    //Power control
BANK1_A10_data = 0x1B;   //VRH[5:0]

//POWER CONTROL,SAP[2:0];BT[3:0]
BANK1_index = 0xC1;    //Power control
BANK1_A10_data = 0x01;   //SAP[2:0];BT[3:0]

//VCM CONTROL
BANK1_index = 0xC5;    //VCM control
BANK1_A10_data = 0x30; 	 //3F  3E
BANK1_A10_data = 0x30; 	 //3C	28

//VCM CONTROL 2
BANK1_index = 0xC7;
BANK1_A10_data = 0XB7;

//MEMORY ACCESS CONTROL
BANK1_index = 0x36;
BANK1_A10_data = 0x48;

//PIXEL FORMAT
BANK1_index = 0x3A;
BANK1_A10_data = 0x55;

//FRAME RATIO CONTROL, STANDARD RGB COLOR
BANK1_index = 0xB1;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x1A;

//DISPLAY FUNCTION CONTROL(<-->)
BANK1_index = 0xB6;
BANK1_A10_data = 0x08;
BANK1_A10_data = 0x82;
BANK1_A10_data = 0x27;

//3GAMMA FUNCTION DISABLE
BANK1_index = 0xF2;
BANK1_A10_data = 0x00;

//GAMMA CURVE SELECTED
BANK1_index = 0x26;
BANK1_A10_data = 0x01;

//POSITIVE GAMMA CORRECTION
BANK1_index = 0xE0;    //Set Gamma
BANK1_A10_data = 0x0F;
BANK1_A10_data = 0x2A;
BANK1_A10_data = 0x28;
BANK1_A10_data = 0x08;
BANK1_A10_data = 0x0E;
BANK1_A10_data = 0x08;
BANK1_A10_data = 0x54;
BANK1_A10_data = 0XA9;
BANK1_A10_data = 0x43;
BANK1_A10_data = 0x0A;
BANK1_A10_data = 0x0F;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x00;

//NEGATIVE GAMMA CORRECTION
BANK1_index = 0XE1;    //Set Gamma
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x15;
BANK1_A10_data = 0x17;
BANK1_A10_data = 0x07;
BANK1_A10_data = 0x11;
BANK1_A10_data = 0x06;
BANK1_A10_data = 0x2B;
BANK1_A10_data = 0x56;
BANK1_A10_data = 0x3C;
BANK1_A10_data = 0x05;
BANK1_A10_data = 0x10;
BANK1_A10_data = 0x0F;
BANK1_A10_data = 0x3F;
BANK1_A10_data = 0x3F;
BANK1_A10_data = 0x0F;

//PAGE ADDRESS SET
BANK1_index = 0x2B;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x01;
BANK1_A10_data = 0x3f;

//COLUMN ADDRESS SET
BANK1_index = 0x2A;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0x00;
BANK1_A10_data = 0xef;
//EXIT SLEEP
BANK1_index = 0x11;

HAL_Delay(120);

//TURN ON DISPLAY
BANK1_index = 0x29;

} //End of LCD Initialization

void LCD_SetPos(uint16_t xPos, uint16_t yPos)
{
	BANK1_index = LCD_xpos_cmd;
	BANK1_A10_data = xPos>>8;
	BANK1_A10_data = xPos&0xff;
	BANK1_index = LCD_ypos_cmd;
	BANK1_A10_data = yPos>>8;
	BANK1_A10_data = yPos&0xff;
}


void LCD_Clear(uint16_t Color)
{
	int i;
	LCD_SetPos(0,0);
	//LCD_buf[10][11] = Color;
	BANK1_index = LCD_wram_cmd;
	for(i = 0; i < LCD_width * LCD_height ; i++)
	{
		BANK1_A10_data = Color;
	}

	print_position_x = print_margin;
	print_position_y = print_margin;
}

void LCD_Draw_Point(uint16_t x, uint16_t y, uint16_t Color)
{

	if( x < 0 )
	{
		x = 0;
	}
	else
	{
		x = x % LCD_width;
	}

	if( y < 0 )
	{
		y = 0;
	}
	else
	{
		y = y % LCD_height;
	}

	LCD_SetPos(x,y);
	BANK1_index = LCD_wram_cmd;
	BANK1_A10_data = Color;
}

void LCD_Draw_Line(int16_t x1, int16_t y1, int16_t x2, int16_t y2,int16_t Color)
{
	float x, y;
	float slope;

	if(abs((int)x2 - x1) > abs((int)y2 - y1))
	{
		slope = ((float)((int)y2 - y1)) / ((int)x2 - x1);
		if(x1 < x2)
		{
			for(x = x1, y = y1 ; x <= x2 ; x += 1, y += slope)
				LCD_Draw_Point(round(x), round(y), Color);
		}
		else
		{
			for(x = x2, y = y2 ; x <= x1 ; x += 1, y += slope)
				LCD_Draw_Point(round(x), round(y), Color);
		}

	}
	else
	{
		slope = ((float)((int)x2 - x1)) / ((int)y2 - y1);
		if(y1 < y2)
		{
			for(x = x1, y = y1 ; y <= y2 ; x += slope, y += 1)
				LCD_Draw_Point(round(x), round(y), Color);
		}
		else
		{
			for(x = x2, y = y2 ; y <= y1 ; x += slope, y += 1)
				LCD_Draw_Point(round(x), round(y), Color);
		}
	}
}

void LCD_Draw_Circle(uint16_t x, uint16_t y, uint16_t r, uint16_t Color)
{
	float arc = 1.0;
	float theta_step = arc / r;
	float theta;
	for(theta = 0 ; theta < 2 * 3.141592 ; theta += theta_step)
		LCD_Draw_Point(round(x + r * sin(theta)), round(y + r * cos(theta)), Color);
}


void LCD_Draw_Filled_Circle(uint16_t x, uint16_t y, uint16_t r, uint16_t Color)
{
	int y_edge;
	int i;

	for(i = -r ; i <= r ; i++)
	{
		y_edge = round(sqrt(r*r - i*i));
		LCD_Draw_Line(x + i, y + y_edge, x + i, y - y_edge, Color);
	}

}

void LCD_Draw_Char(uint16_t x, uint16_t y, uint8_t Char, uint16_t Color, uint16_t font_size)
{
	uint8_t temp;
	int i,j,dx = 0, dy = 0;

	for(i = 0 ; i < asc_length[font_size] ; i++)
	{
		if(font_size == 0) 			temp = asc2_1206[Char - ' '][i];
		else if(font_size == 1) 	temp = asc2_1608[Char - ' '][i];
		else if(font_size == 2) 	temp = asc2_2412[Char - ' '][i];
		else if(font_size == 3) 	temp = asc2_3216[Char - ' '][i];

		for(j = 0 ; j < 8 ; j++, temp <<= 1)
		{
			if((temp&0x80) == 0x80) LCD_Draw_Point(x + dx, y + dy, Color);

			dy++;
			if(dy == asc_height[font_size])
			{
				dy = 0;
				dx++;
			}
		}
	}
}

void LCD_Draw_Str(uint16_t x, uint16_t y, uint8_t * str, uint16_t Color, uint16_t font_size)
{
    int i;
    for(i = 0; i < 100; i++)
    {
        if(str[i] == '\0') break;

        // 문자 범위 체크 (ASCII printable 범위 내에서만 처리)
        if (str[i] < ' ' || str[i] > '~') {
            continue;  // 유효하지 않은 문자는 그리지 않음
        }

        LCD_Draw_Char(x, y, str[i], Color, font_size);

        if(font_size == 0)         x += 6;
        else if(font_size == 1)    x += 8;
        else if(font_size == 2)    x += 12;
        else if(font_size == 3)    x += 16;
    }
}



void LCD_printf(char* fmt, ...)
{
	va_list ap;
	char buf[LCD_PRINT_BUF_SIZE] = {0,};
	int i;

	va_start(ap, fmt);
	vsprintf(buf, fmt, ap);
	va_end(ap);

	for(i = 0 ; i < LCD_PRINT_BUF_SIZE; i++)
	{
		if(buf[i] == '\0') //null
		{
			break;
		}
		else if(buf[i] == '\n') //next line
		{
			if(print_size == 0) 		print_position_y += 12;
			else if(print_size == 1) 	print_position_y += 16;
			else if(print_size == 2) 	print_position_y += 24;
			else if(print_size == 3) 	print_position_y += 32;
			print_position_x = print_margin;
		}
		else if(buf[i] == '\r') //carriage return
		{
			print_position_x = print_margin;
		}
		else
		{
			LCD_Draw_Char(print_position_x, print_position_y, buf[i], print_color, print_size);

			if(print_size == 0)
			{
				print_position_x += 6;
				if(print_position_x > (LCD_width - 6))
				{
					print_position_x = print_margin;
					print_position_y += 12;
				}
			}
			else if(print_size == 1)
			{
				print_position_x += 8;
				if(print_position_x >( LCD_width - 8))
				{
					print_position_x = print_margin;
					print_position_y += 16;
				}
			}
			else if(print_size == 2)
			{
				print_position_x += 12;
				if(print_position_x > (LCD_width - 12))
				{
					print_position_x = print_margin;
					print_position_y += 24;
				}
			}
			else if(print_size == 3)
			{
				print_position_x += 16;
				if(print_position_x > (LCD_width - 16))
				{
					print_position_x = print_margin;
					print_position_y += 32;
				}
			}
		}
	}

}

void LCD_font_set(uint16_t size, uint16_t color)
{
	if(size > 3) size = 3;
	if(size < 0) size = 0;
	print_size = size;
	print_color = color;
}

void LCD_Draw_Rectangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t Color)
{
    LCD_Draw_Line(x1, y1, x2, y1, Color); // top
    LCD_Draw_Line(x2, y1, x2, y2, Color); // right
    LCD_Draw_Line(x2, y2, x1, y2, Color); // bottom
    LCD_Draw_Line(x1, y2, x1, y1, Color); // left
}

void LCD_Block_Clear(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t Color)
{
    for (uint16_t y = y1; y <= y2; y++) {
        for (uint16_t x = x1; x <= x2; x++) {
            LCD_Draw_Point(x, y, Color);
        }
    }
}

