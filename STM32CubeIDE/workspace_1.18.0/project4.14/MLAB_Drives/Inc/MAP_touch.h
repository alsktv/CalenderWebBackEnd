/*
 * user_touch.h
 *
 *  Created on: May 30, 2021
 *      Author: Microprocessor
 */

#ifndef INC_MAP_TOUCH_H_
#define INC_MAP_TOUCH_H_
#include <stdint.h>


typedef struct {
    uint16_t x;
    uint16_t y;
    uint16_t p;
} XYP_point;

#include "MAP.h"
#include <stdint.h>

#define TOUCH_CMD_RDX	0xd1
#define TOUCH_CMD_RDY	0x91
#define TOUCH_CMD_RDZ1	0xb1
#define TOUCH_CMD_RDZ2	0xc1

#define T_CS_GPIO_Port 	GPIOF
#define T_CS_Pin		GPIO_PIN_11
#define T_MOSI_GPIO_Port GPIOF
#define T_MOSI_Pin		GPIO_PIN_9
#define T_MISO_GPIO_Port GPIOB
#define T_MISO_Pin		GPIO_PIN_2

#define P_THRESHOLD 300
#define P_BEEP	2000

void Touch_read(XYP_point *xyp_p);
void Touch_read_raw(XYP_point *xyp_p);
void Touch_spi(uint8_t dout, uint16_t *din);
void Touch_delay();

void data_filter();

#endif /* INC_USER_TOUCH_H_ */
