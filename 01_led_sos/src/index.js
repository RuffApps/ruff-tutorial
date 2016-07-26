'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }
//在‘button’按下时运行函数
    $('#button').on('push', function () {
        performS();//发出莫斯电码 ‘S’  
        setTimeout(function () { $('#led-b').turnOff(); }, 5000);
        setTimeout(performO, 6000);//延时1秒（1000毫秒),发出莫斯电码 ‘O’
        setTimeout(function () { $('#led-b').turnOff(); }, 16000);
        setTimeout(performS, 17000);//延时1秒（1000毫秒),发出莫斯电码 ‘S’
        setTimeout(function () { $('#led-b').turnOff(); }, 22000);
    });

});
  
//Led灯闪烁函数
function Blink() {
    if (!$('#led-b').isOn()) {
        $('#led-b').turnOn();
    }
    else {
        $('#led-b').turnOff();
    }

}

//三个快闪烁来表示字母“S”
function performS() {
    $('#led-b').turnOn();//设置led模块亮
    setTimeout(Blink, 1000);//1000ms后led灭
    setTimeout(Blink, 2000);//1000ms后led亮
    setTimeout(Blink, 3000);//1000ms后led灭
    setTimeout(Blink, 4000);//1000ms后led亮
}
//三个快闪烁来表示字母“O”
function performO() {
    $('#led-b').turnOn();//设置led模块亮
    setTimeout(Blink, 2000);//1000ms后led灭
    setTimeout(Blink, 4000);//1000ms后led亮
    setTimeout(Blink, 6000);//1000ms后led灭
    setTimeout(Blink, 8000);//1000ms后led亮
}


