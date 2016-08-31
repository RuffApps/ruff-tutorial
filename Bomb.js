'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var led = Object.create({
        0: '#led_R',
        1: '#led_B',
        2: '#led_W',
        3: '#led_G'
    });

    var code_Array = new Array();
    code_Array[0] = new Array('0001');
    code_Array[1] = new Array('0010');
    code_Array[2] = new Array('0011');
    code_Array[3] = new Array('0100');
    code_Array[4] = new Array('0110');
    code_Array[5] = new Array('0111');
    code_Array[6] = new Array('1000');
    code_Array[7] = new Array('1001');
    code_Array[8] = new Array('1011');
    code_Array[9] = new Array('1100');
    code_Array[10] = new Array('1101');
    code_Array[11] = new Array('1110');



    var blink_order = new Array(9, 3, 6, 4, 1, 10, 11, 5, 7, 0, 8, 2);

    var blink_Array = new Array();
    blink_Array[0] = new Array(0, 1);
    blink_Array[1] = new Array(0, 2);
    blink_Array[2] = new Array(0, 3);
    blink_Array[3] = new Array(1, 0);
    blink_Array[4] = new Array(1, 2);
    blink_Array[5] = new Array(1, 3);
    blink_Array[6] = new Array(2, 0);
    blink_Array[7] = new Array(2, 1);
    blink_Array[8] = new Array(2, 3);
    blink_Array[9] = new Array(3, 0);
    blink_Array[10] = new Array(3, 1);
    blink_Array[11] = new Array(3, 2);






    var i = rand.get(0, 11);
    //console.log(i);
    $('#lcd').turnOn();
    $('#lcd').setCursor(1, 0);
    $('#lcd').print('Ready ?');
    setTimeout(function () {
        $('#lcd').clear();
        $('#lcd').print('Your code :');
    }, 2000);

    var firstInterval;
    var secondInterval;
    var blinkInterval;

    setTimeout(function () {
        firstInterval = setInterval(function () {
            setTimeout(function () { $('#buzzer').turnOn(); }, 500);
            setTimeout(function () { $('#buzzer').turnOff(); }, 1000);
        }, 1000);
    }
        , 2000);

    setTimeout(function () {
        secondInterval = setInterval(function () {
            setTimeout(function () { $('#buzzer').turnOn(); }, 250);
            setTimeout(function () { $('#buzzer').turnOff(); }, 500);
        }, 500);
    }
        , 13500);

    setTimeout(function () {
        clearInterval(firstInterval);
    }, 12500);

    setTimeout(function () {
        clearInterval(secondInterval);
        setTimeout(function () {
            $('#buzzer').turnOn();
        }, 500);

        $('#lcd').clear();
        $('#lcd').setCursor(1, 0);
        $('#lcd').print('TIME UP!');
        $('#lcd').setCursor(1, 1);
        $('#lcd').print('Mission Failed!');
        $('#servo').setAngle(135);
        led_end();
    }, 17500);

    $('#servo').setAngle(0);
    console.log('code ' + code_Array[i]);
    //console.log('code_digital '+ code_Array[i][0][0]);
    led_blink_on(blink_Array[blink_order[i]][0]);
    led_blink_on(blink_Array[blink_order[i]][1]);
    setTimeout(function () {
        led_blink_off(blink_Array[blink_order[i]][0]);
        led_blink_off(blink_Array[blink_order[i]][1]);
    }, 5000);


    var right = true;
    var code_num = 0;
    //var code_s = 1;
    //console.log('code_s '+code_s);
    console.log('code_digital ' + code_Array[i][0][code_num]);
    $('#button_0').on('push', function () {
        // console.log(code_Array[i][0][code_num]);
        //if(code_Array[i][0][code_num] === 0)
        liushui();
        $('#buzzer').turnOn();
        setTimeout(function () { $('#buzzer').turnOff(); }, 500);
        if (code_Array[i][0][code_num] == 0) {
            //console.log('true'); 
            $('#lcd').print('0');
            code_num++;
            console.log('code_digital ' + code_Array[i][0][code_num]);
            if (code_num == 4) {
                $('#lcd').clear();
                $('#lcd').setCursor(0, 0);
                clearInterval(firstInterval);
                clearInterval(secondInterval);
                $('#lcd').print('Mission Completed!');
            }
        }
        else {
            clearInterval(firstInterval);
            clearInterval(secondInterval);
            //console.log('false');\
            $('#lcd').clear();
            $('#lcd').print('Mission Failed!');
            $('#servo').setAngle(135);
            $('#buzzer').turnOn();
            led_end();
            // $('#buzzer').turnOn();

            //    setTimeout(function(){$('#buzzer').turnOff();},1000);
            // $('#buzzer').turnOn();
            // setTimeout(function(){$('#buzzer').turnOff();},1500);
        }

    });

    $('#button_2').on('push', function () {
        //console.log(code_Array[i][0][code_num]+'true');
        // console.log(code_Array[i][0][code_num]);
        //if(code_Array[i][0][code_num] === 1)
        liushui();
        $('#buzzer').turnOn();
        setTimeout(function () { $('#buzzer').turnOff(); }, 500);
        if (code_Array[i][0][code_num] == 1) {

            //console.log('true');
            $('#lcd').print('1');
            code_num++;
            console.log('code_digital ' + code_Array[i][0][code_num]);
            if (code_num == 4) {
                clearInterval(firstInterval);
                clearInterval(secondInterval);
                $('#lcd').clear();
                $('#lcd').setCursor(0, 0);
                $('#lcd').print('Mission Completed!');

            }

        }
        else {
            clearInterval(firstInterval);
            clearInterval(secondInterval);
            //console.log('false');\
            $('#lcd').clear();
            $('#buzzer').turnOn();
            $('#lcd').print('Mission Failed!');
            $('#servo').setAngle(135);
            led_end();
            //  $('#buzzer').turnOn();
            // setTimeout(function(){$('#buzzer').turnOff();},1000);
            // $('#buzzer').turnOn();
            // setTimeout(function(){$('#buzzer').turnOff();},1500);
        }
    });

    //console.log(led.blink[blink_order[i]][1]); 
    //$('#led_R').turnOn();
    //$('#led_B').turnOn();
    //$('#led_W').turnOn();
    //$('#led_G').turnOn();
});


function led_blink_on(num) {
    switch (num) {
        case 0:
            $('#led_R').turnOn();
            break;
        case 1:
            $('#led_B').turnOn();
            break;
        case 2:
            $('#led_W').turnOn();
            break;
        case 3:
            $('#led_G').turnOn();
            break;
        default:
            //n 与 case 1 和 case 2 不同时执行的代码
            console.log('error');
    }

}


function led_blink_off(num) {
    switch (num) {
        case 0:
            $('#led_R').turnOff();
            break;
        case 1:
            $('#led_B').turnOff();
            break;
        case 2:
            $('#led_W').turnOff();
            break;
        case 3:
            $('#led_G').turnOff();
            break;
        default:
            //n 与 case 1 和 case 2 不同时执行的代码
            console.log('error');
    }

}


var rand = {};
rand.get = function (begin, end) {
    return Math.floor(Math.random() * (end - begin)) + begin;
}


function beep_3() {
    $('#buzzer').turnOn();
    setTimeout(function () { $('#buzzer').turnOff(); }, 500);
    $('#buzzer').turnOn();
    setTimeout(function () { $('#buzzer').turnOff(); }, 1000);
    $('#buzzer').turnOn();
    setTimeout(function () { $('#buzzer').turnOff(); }, 1500);
}

function liushui() {

    setInterval(function () {
        $('#led_R').turnOn();
        // blinkInterval=setInterval(function(){
        setTimeout(function () {
            $('#led_R').turnOff();
            $('#led_B').turnOn();
        }, 500);
        setTimeout(function () {
            $('#led_B').turnOff();
            $('#led_W').turnOn();
        }, 1000);
        setTimeout(function () {
            $('#led_W').turnOff();
            $('#led_G').turnOn();
        }, 1500);

        setTimeout(function () {
            $('#led_G').turnOff();
            $('#led_R').turnOn();
        }, 2000);
    }
        , 2000);
}



function led_end_off() {
    $('#led_R').turnOff();
    $('#led_B').turnOff();
    $('#led_W').turnOff();
    $('#led_G').turnOff();
}


function led_end() {
    $('#led_R').turnOn();
    $('#led_B').turnOn();
    $('#led_W').turnOn();
    $('#led_G').turnOn();
}
