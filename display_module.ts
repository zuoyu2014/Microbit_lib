/*
Copyright (C): None
modified from zy
*/

//% color="#C814B8" weight=25 icon="\uf1d4"
namespace 显示设备 {
    export enum enColor {
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="Red" block="红色"
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"
        White,
        //% blockId="Cyan" block="青色"
        Cyan,
        //% blockId="Pinkish" block="品红"
        Pinkish,
        //% blockId="Yellow" block="黄色"
        Yellow,
    }
    export enum enLEDStatus {
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="ON" block="亮"
        ON =1
    }

    //% blockId=zybit_DigitalLED block="DigitalLED|pin %pin|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    export function DigitalLED(pin: DigitalPin, value: enLEDStatus): void {
        pins.digitalWritePin(pin, value);

    }

    //% blockId=zybit_AnalogLED block="AnalogLED|pin %pin|value %value"
    //% weight=4
    //% blockGap=8
    //% color="#C814B8"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function AnalogLED(pin: AnalogPin, value: number): void {
        pins.analogWritePin(pin, value * 1024 / 256);
    }

    //% blockId=zybit_BreathLED block="BreathLED|pin %pin"
    //% weight=3
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function BreathLED(pin: AnalogPin): void {
        for (let i: number = 0; i < 1023; i++) {
            pins.analogWritePin(pin, i);
            control.waitMicros(1000);
        }
        basic.pause(10);
        for (let i: number = 1023; i > 0; i--) {
            pins.analogWritePin(pin, i);
            control.waitMicros(1000);
        }
    }

    //% blockId=zybit_AnalogRGB block="AnalogRGB|pinR %pinR|pinG %pinG|pinB %pinB|valueR %valueR|valueG %valueG|valueB %valueB"
    //% weight=2
    //% blockGap=8
    //% color="#C814B8"
    //% valueR.min=0 valueR.max=255 valueG.min=0 valueG.max=255 valueB.min=0 valueB.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function AnalogRGB(pinR: AnalogPin, pinG: AnalogPin, pinB: AnalogPin, valueR: number, valueG: number, valueB: number): void {

        pins.analogWritePin(pinR, valueR * 1024 / 256);
        pins.analogWritePin(pinG, valueG * 1024 / 256);
        pins.analogWritePin(pinB, valueB * 1024 / 256);

    }
	
    //% blockId=zybit_DigitalRGB block="DigitalRGB|pinR %pinR|pinG %pinG|pinB %pinB|color %color"
    //% weight=1
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function DigitalRGB(pinR: DigitalPin, pinG: DigitalPin, pinB: DigitalPin, color: enColor): void {
        switch (color) {
            case enColor.OFF: {
                pins.digitalWritePin(pinR, 0);
                pins.digitalWritePin(pinG, 0);
                pins.digitalWritePin(pinB, 0);
                break;
            }
            case enColor.Red: {
                pins.digitalWritePin(pinR, 1);
                pins.digitalWritePin(pinG, 0);
                pins.digitalWritePin(pinB, 0);
                break;
            }
            case enColor.Green: {
                pins.digitalWritePin(pinR, 0);
                pins.digitalWritePin(pinG, 1);
                pins.digitalWritePin(pinB, 0);
                break;
            }
            case enColor.Blue: {
                pins.digitalWritePin(pinR, 0);
                pins.digitalWritePin(pinG, 0);
                pins.digitalWritePin(pinB, 1);
                break;
            }
            case enColor.White: {
                pins.digitalWritePin(pinR, 1);
                pins.digitalWritePin(pinG, 1);
                pins.digitalWritePin(pinB, 1);
                break;
            }
            case enColor.Cyan: {
                pins.digitalWritePin(pinR, 0);
                pins.digitalWritePin(pinG, 1);
                pins.digitalWritePin(pinB, 1);
                break;
            }
            case enColor.Pinkish: {
                pins.digitalWritePin(pinR, 1);
                pins.digitalWritePin(pinG, 0);
                pins.digitalWritePin(pinB, 1);
                break;
            }
            case enColor.Yellow: {
                pins.digitalWritePin(pinR, 1);
                pins.digitalWritePin(pinG, 1);
                pins.digitalWritePin(pinB, 0);
                break;
            }
        }
    }
}
