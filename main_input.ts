/*
Copyright (C): None
modified from zy
*/


//% color="#808080" weight=23 icon="\uf11c"
namespace 数字输入 {
    //% blockId=数字输入_TouchPad block="TouchPad|pin %pine"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function TouchPad(pin: DigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        return (pins.digitalReadPin(pin) == 1)
    }

    //% blockId=数字输入_InfraredDetector block="InfraredDetector|pin %pin"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function InfraredDetector (pin: DigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        return (pins.digitalReadPin(pin) == 0)
    }
}


//% color="#FFA500" weight=10 icon="\uf2c9" 
namespace 游戏手柄 {
    let JOYSTICK_I2C_ADDR = 0x5A;

	export enum JButton {
		//% block="左摇杆"
		JOYSTICK_BUTOON_LEFT = 0x20,
		//% block="右摇杆" 
		JOYSTICK_BUTOON_RIGHT = 0x21,
		//% block="左按键"
		JOYSTICK_BUTOON_LEFT_S = 0x22,
		//% block="右按键" 
		JOYSTICK_BUTOON_RIGHT_S = 0x23
	}

	export enum Rocker{
		//% block="左摇杆X"
		JOYSTICK_ROCKER_LEFT_X = 0x10,
		//% block="左摇杆Y"
		JOYSTICK_ROCKER_LEFT_Y = 0x11,
		//% block="右摇杆X"
		JOYSTICK_ROCKER_RIGHT_X = 0x12,
		//% block="右摇杆Y"
		JOYSTICK_ROCKER_RIGHT_Y = 0x13
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

   //% blockId=Gamepad_No_Action block="Gamepad_No_Action|button %button"
   //% weight=74
   export function Gamepad_No_Action(button: JButton): boolean {
       return (Get_Button_Status(button) == 8);
   }

   //% blockId=Gamepad_Shock block="Gamepad_Shock|shock %shock"
   //% shock.min=0 shock.max=1000
   //% weight=74
    export function Gamepad_Shock(shock: number): void {
        pins.analogWritePin(AnalogPin.P0, shock)
    }

    //% blockId=Gamepad_Vibration block="Gamepad_Vibration|freq %freq"
    //% freq.min=0 freq.max=1000
    //% weight=74
    export function Gamepad_Vibration(freq: number): void {
        pins.analogWritePin(AnalogPin.P1, freq)
    }

   //% blockId=Gamepad_Rocker block="Gamepad_Rocker|rocker %rocker"
   //% weight=74
   export function Gamepad_Rocker(rocker: Rocker){
       return i2cread(JOYSTICK_I2C_ADDR, rocker);
   }
}

