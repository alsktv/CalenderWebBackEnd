/*
 * user_touch.c
 *
 *  Created on: May 30, 2021
 *      Author: Microprocessor
 */

#include "../Inc/MAP_touch.h"
#include "main.h"         // HAL 라이브러리 및 핀 정의들 포함됨
#include <stdint.h>       // uint8_t, uint16_t 같은 자료형
#include <stdio.h>


#include <Math.h>

uint8_t tstr[100]={0,};
extern uint16_t xx,yy,pp,pz1,pz2;
extern float fx,fy,fp;
extern UART_HandleTypeDef huart1;


void Touch_read(XYP_point *xyp_point) {
	XYP_point xyp_raw;

	static uint16_t pre_pressure;
	static int fi = 0;
	float ffx, ffy, ffp;

	// read raw data
	Touch_read_raw(&xyp_raw);

	xyp_point->x = xyp_raw.x;
	xyp_point->y = xyp_raw.y;
	xyp_point->p = xyp_raw.p;

}

uint16_t t1,t2,t3,t4;

void Touch_read_raw(XYP_point *xyp_raw) {

	uint16_t z1, z2, z3, xp, yp, p, din;

	Touch_spi(TOUCH_CMD_RDZ1, &z1);
	Touch_spi(TOUCH_CMD_RDX, &xp);
	Touch_spi(TOUCH_CMD_RDZ2, &z2);
	Touch_spi(TOUCH_CMD_RDY, &yp);
	Touch_spi(0x00, &din);

	p = (float) (4095 + z1 - z2 - xp/3.5 + yp/3.5);

	xyp_raw->x = xp;
	xyp_raw->y = yp;
	xyp_raw->p = p;

}



void Touch_spi(uint8_t dout, uint16_t* din)
{
	int i;

	HAL_GPIO_WritePin(T_CS_GPIO_Port, T_CS_Pin, GPIO_PIN_RESET); // Active CS
	Touch_delay();

	for(i = 7 ; i >= 0 ; i--) // Write Command
	{

		HAL_GPIO_WritePin(T_MOSI_GPIO_Port, T_MOSI_Pin, (dout >> i) & 0x01);

		Touch_delay();

		HAL_GPIO_WritePin(T_SCK_GPIO_Port, T_SCK_Pin, GPIO_PIN_SET); // DCLK High

		Touch_delay();

		HAL_GPIO_WritePin(T_SCK_GPIO_Port, T_SCK_Pin, GPIO_PIN_RESET); // DCLK Low
	}
		Touch_delay();
		HAL_GPIO_WritePin(T_SCK_GPIO_Port, T_SCK_Pin, GPIO_PIN_SET); // DCLK High

		Touch_delay();
		HAL_GPIO_WritePin(T_SCK_GPIO_Port, T_SCK_Pin, GPIO_PIN_RESET); // DCLK Low

		*din=0;
	for (i=14; i >=0; i--) //Read Data
 	{
 		HAL_GPIO_WritePin(T_SCK_GPIO_Port, T_SCK_Pin, GPIO_PIN_SET); // DCLK High
 		*din <<= 1;
 		*din |= HAL_GPIO_ReadPin(T_MISO_GPIO_Port, T_MISO_Pin);

 		Touch_delay();
 		HAL_GPIO_WritePin(T_SCK_GPIO_Port, T_SCK_Pin, GPIO_PIN_RESET); // DCLK Low
 	}
	*din=(*din >>3) & 0x0fff;

	Touch_delay();
	HAL_GPIO_WritePin(T_CS_GPIO_Port, T_CS_Pin, GPIO_PIN_SET); // Disable CS
}




void Touch_delay()
{
	int i;
	for(i = 0 ; i < 2 ; i++);
}
