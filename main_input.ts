/*
Copyright (C): None
modified from zy
*/


//% color="#808080" weight=23 icon="\uf11c"
namespace zybit_input {

    export enum enRocker {
        //% blockId="Nostate" block="无"
        Nostate = 0,
        //% blockId="Up" block="上"
        Up,
        //% blockId="Down" block="下"
        Down,
        //% blockId="Left" block="左"
        Left,
        //% blockId="Right" block="右"
        Right,
        //% blockId="Press" block="按下"
        Press
    }

    export enum enTouch {
        //% blockId="NoTouch" block="未触摸"
        NoTouch = 0,
        //% blockId="Touch" block="触摸"
        Touch = 1
    }
    export enum enButton {
        //% blockId="Press" block="按下"
        Press = 0,
        //% blockId="Realse" block="松开"
        Realse = 1
    }

    //% blockId=mbit_TouchPad block="TouchPad|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function TouchPad(pin: DigitalPin, value: enTouch): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }
    
    //% blockId=mbit_Rocker block="Rocker|VRX %pin1|VRY %pin2|SW %pin3|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    export function Rocker(pin1: AnalogPin, pin2: AnalogPin, pin3: DigitalPin, value: enRocker): boolean {

        pins.setPull(pin3, PinPullMode.PullUp);
        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin2);
        let z = pins.digitalReadPin(pin3);
        let now_state = enRocker.Nostate;

        if (x < 100) // 上
        {

            now_state = enRocker.Up;

        }
        else if (x > 700) //
        {

            now_state = enRocker.Down;
        }
        else  // 左右
        {
            if (y < 100) //右
            {
                now_state = enRocker.Right;
            }
            else if (y > 700) //左
            {
                now_state = enRocker.Left;
            }
        }
        if (z == 0)
            now_state = enRocker.Press;
        if (now_state == value)
            return true;
        else
            return false;

    }

    //% blockId=mbit_Button block="Button|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(pin: DigitalPin, value: enButton): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }  
}


//% color="#FFA500" weight=10 icon="\uf2c9" 
namespace joystick {
    let JOYSTICK_I2C_ADDR = 0x5A;
    let NONE_PRESS = 8;

	export enum JButton {
		//% block="左按键"
		JOYSTICK_BUTOON_LEFT_S = 0x20,
		//% block="右按键" 
		JOYSTICK_BUTOON_RIGHT_S = 0x21,
		//% block="左摇杆"
		JOYSTICK_BUTOON_LEFT = 0x22,
		//% block="右摇杆" 
		JOYSTICK_BUTOON_RIGHT = 0x23,
	}

	export enum Rocker{
		//% block="左摇杆X"
		JOYSTICK_ROCKER_LEFT_X = 0x10,
		//% block="左摇杆Y"
		JOYSTICK_ROCKER_LEFT_Y = 0x11,
		//% block="右摇杆X"
		JOYSTICK_ROCKER_RIGHT_X = 0x12,
		//% block="右摇杆Y"
		JOYSTICK_ROCKER_RIGHT_Y = 0x13,
	}

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function Get_Button_Status (button : JButton){
		return i2cread(JOYSTICK_I2C_ADDR, button);
    }

    //% blockId=Gamepad_Press block="Gamepad_Press|button %button"
    //% weight=74
    export function Gamepad_Press(button: JButton): boolean {
        return (Get_Button_Status(button) == 0);
    }

   //% blockId=Gamepad_Release block="Gamepad_Release|button %button"
   //% weight=74
   export function Gamepad_Release(button: JButton): boolean {
       return (Get_Button_Status(button) == 1);
   }

   //% blockId=Gamepad_Shock block="Gamepad_Shock|shock %shock"
   //% shock.min=0 shock.max=1000
   //% weight=74
    export function Gamepad_Shock(shock: number): void {
        pins.analogWritePin(AnalogPin.P1, shock)
    }

    //% blockId=Gamepad_Vibration block="Gamepad_Vibration|freq %freq"
    //% freq.min=0 freq.max=1000
    //% weight=74
    export function Gamepad_Vibration(freq: number): void {
        pins.analogWritePin(AnalogPin.P0, freq)
    }

   //% blockId=Gamepad_Rocker block="Gamepad_Rocker|rocker %rocker"
   //% weight=74
   export function Gamepad_Rocker(rocker: Rocker){
       return i2cread(JOYSTICK_I2C_ADDR, rocker);
   }
}

