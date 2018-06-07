#include <ModbusRtu.h>
//#include "SPI.h"

/**
 Modbus slave example 1:
 The purpose of this example is to link a data array
 from the Arduino to an external device.

 Recommended Modbus Master: QModbus
 http://qmodbus.sourceforge.net/
 */


// data array for modbus network sharing
uint16_t au16data[11] = { 0x000F, 0x0003, 10, 11, 12, 13, 14, 15 };

/**
 Modbus object declaration
 u8id : node id = 0 for master, = 1..247 for slave
 u8serno : serial port (use 0 for Serial)
 u8txenpin : 0 for RS-232 and USB-FTDI
 or any pin number > 1 for RS-485
 */
int wait = 0;
int8_t state = 0;
byte pin3 = 0;
const int pinLED = 3;
Modbus slave(1, 0, 10); // this is slave @1 and RS-232 or USB-FTDI

void setup() {

    slave.begin( 19200 ); // baud-rate at 19200
    pinMode(pinLED, OUTPUT);
    digitalWrite(pinLED, LOW);
}

void loop() {
    delay(100);
    wait++;
    state = slave.poll( au16data, 11 );
    if (state > 4) {
        // нет ошибок
        wait =0;
        pin3 = bitRead( au16data[1], 3);
        digitalWrite(pinLED, pin3 > 0? HIGH: LOW );
    }
    if(wait > 50){
        void(* resetFunc) (void) = 0; // Reset MC function
        resetFunc(); //вызов
    }
    //printf("%d",state);


}