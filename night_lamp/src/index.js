'use strict';

    var ill = 0;                                                    //光照强度
    var isPeople = false;                                           //是否有起床活动
    var isLight = false;                                            //当前灯是否亮
    var timer = 0;                                                  //计时器
    var sound_timer = 0;                                            //声音检测计数器
    var sound_wait_timer = 0;                                       //声音检测计时器

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }


    setInterval(function (ill) {                                    //每1秒（1000ms）循环运行

//////////////////////////////////////////////////////////////////////////////////
//功能：
//      光照传感器检测光照强度，控制灯的亮灭
//
//策略：
//      1.检测光照强度大于50，光照强度高，控制灯关闭，节电
//      2.检测光照强度小于50，根据声音传感器得到的当前是否有人活动
//           a.有人活动，灯逐渐变亮
//           b.没有人活动，一定时长(Demo 用10s)后，灯逐渐变暗，最后灯灭。
//////////////////////////////////////////////////////////////////////////////////

        $('#light').getIlluminance(function (error, value) {
            if (error) {
                console.error(error);
                return;
            }

            ill = value;                                            //得到当前光照值


            if (ill < 50) {                                         //光照强度低，启动亮灯

                console.log('Night');
                console.log('ill: ' + ill);
                console.log('isPeople: ' + isPeople);

                if (isPeople)                                       //如果有人活动
                {

                    timer = 0;                                      //重置计时器

                    if (!isLight) {

                        led_On();                                   //灯逐渐变亮

                        isLight = true;                             //设置当前灯已灭

                        sound_timer = 0;                            //重置声音检测计数器
                    }

                }

                else                                                //如果没有人活动
                {
                    timer += 1;                                     //每秒计时器加一

                    console.log('timer: ' + timer);

                    if (timer >= 10 && isLight)                     //没有检测到人活动一定时长（实验用10s），亮度变暗，最终灯灭;
                    {
                        timer = 0;                                  //重置计时器

                        led_Off();                                  //灯逐渐变暗

                        isLight = false;                            //设置当前灯已灭

                        console.log('timer: ' + timer);

                        setTimeout(function () {                    //完全关灯

                            $('#led').turnOff();

                        }, 10000)

                        sound_timer = 0;                            //重置声音检测计数器

                    }

                }

            }
            else                                                    //光照强度高，不启动,灯关闭
            {

                console.log('Day');

                $('#led').turnOff();    //立即关灯

                isLight = false;    //设置当前灯已灭
            }
        });


//////////////////////////////////////////////////////////////////////////////////
//功能：
//      声音传感器检测人是否起床
//
//策略：
//      检测每10s内触发声音传感器此时，5次以上认为是起床
//////////////////////////////////////////////////////////////////////////////////

        if (sound_wait_timer <= 10) {                               //声音检测计时器,计时10秒

            sound_wait_timer++;                                     //每秒时间检测计时器加一

            console.log('sound_timer: ' + sound_timer);
            console.log('sound_wait_timer: ' + sound_wait_timer);

        }
        else {
            if (sound_timer >= 5) {                                 //触发声音传感器5次以上认为是起床

                isPeople = true;                                    //设置当前已起床
                console.log('isPeople: ' + isPeople);

            }
            else {                                                  //5次以下，认为不是起床

                isPeople = false;                                   //设置当前未起床
                console.log('isPeople: ' + isPeople);               
            }

            sound_wait_timer = 0;                                   //重置声音检测计时器
            
            console.log('sound_timer: ' + sound_timer);
            console.log('sound_wait_timer: ' + sound_wait_timer);

        }
    }, 1000);

    $('#button').on('push', function () {                           //测试用，按键模拟声音检测（可以删）

        isPeople = !isPeople;   

        console.log('ispeople: ' + isPeople);

    });


    $('#sound').on('sound', function () {                           //声音模块检测到声音后触发

        sound_timer++;                                              //每次检测到声音，声音检测计数器加一

        console.log('sound_timer: ' + sound_timer);

    });

//////////////////////////////////////////////////////////////////////////////////
//函数名：led_On
//
//功能：   
//      逐渐点亮 LED 灯
//策略：
//      PWM 接口，按一定时间间隔增加 LED 灯的 R/G/B 的颜色值
//////////////////////////////////////////////////////////////////////////////////

    function led_On() {    
                                                                    //5S做左右灯逐渐点亮
        for (var i = 0; i < 255; i += 5) {
                                                                    //梯度更新led灯的颜色值
            $('#led').setRGB(i, i, i);
                                                                
            sleep(100);                                             //延时100ms

        }
    }

//////////////////////////////////////////////////////////////////////////////////
//函数名：led_Off
//
//功能：   
//      逐渐变暗 LED 灯
//策略：
//      PWM 接口，按一定时间间隔减少 LED 灯的 R/G/B 的颜色值
//////////////////////////////////////////////////////////////////////////////////

    function led_Off() {                                            //5s灯逐渐变暗

        for (var i = 255; i > 0; i -= 5) {                          //梯度更新led灯的颜色值
            
            $('#led').setRGB(i, i, i);
           
            sleep(100);

        }
    }

//////////////////////////////////////////////////////////////////////////////////
//函数名：sleep(milliseconds) 
//参数：
//      milliseconds: 延时毫秒数
//功能：   
//      延时
//策略：
//      PWM 接口，按一定时间间隔减少 LED 灯的 R/G/B 的颜色值
//////////////////////////////////////////////////////////////////////////////////
    function sleep(milliseconds) {  

        var start = new Date().getTime();

        for (var i = 0; i < 1e7; i++) {

            if ((new Date().getTime() - start) > milliseconds) {

                break;

            }
        }
    }

});

