################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (13.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../MLAB_Drives/Src/MAP_LCD.c \
../MLAB_Drives/Src/MAP_touch.c 

OBJS += \
./MLAB_Drives/Src/MAP_LCD.o \
./MLAB_Drives/Src/MAP_touch.o 

C_DEPS += \
./MLAB_Drives/Src/MAP_LCD.d \
./MLAB_Drives/Src/MAP_touch.d 


# Each subdirectory must supply rules for building sources it contributes
MLAB_Drives/Src/%.o MLAB_Drives/Src/%.su MLAB_Drives/Src/%.cyclo: ../MLAB_Drives/Src/%.c MLAB_Drives/Src/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DDEBUG -DUSE_HAL_DRIVER -DSTM32F103xE -c -I../Core/Inc -I../Drivers/STM32F1xx_HAL_Driver/Inc/Legacy -I../Drivers/STM32F1xx_HAL_Driver/Inc -I../Drivers/CMSIS/Device/ST/STM32F1xx/Include -I../Drivers/CMSIS/Include -I"C:/Users/juhyungkim/STM32CubeIDE/workspace_1.18.0/project4.14/MLAB_Drives" -I"C:/Users/juhyungkim/STM32CubeIDE/workspace_1.18.0/project4.14/MLAB_Drives/Inc" -I"C:/Users/juhyungkim/STM32CubeIDE/workspace_1.18.0/project4.14/MLAB_Drives/Src" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-MLAB_Drives-2f-Src

clean-MLAB_Drives-2f-Src:
	-$(RM) ./MLAB_Drives/Src/MAP_LCD.cyclo ./MLAB_Drives/Src/MAP_LCD.d ./MLAB_Drives/Src/MAP_LCD.o ./MLAB_Drives/Src/MAP_LCD.su ./MLAB_Drives/Src/MAP_touch.cyclo ./MLAB_Drives/Src/MAP_touch.d ./MLAB_Drives/Src/MAP_touch.o ./MLAB_Drives/Src/MAP_touch.su

.PHONY: clean-MLAB_Drives-2f-Src

