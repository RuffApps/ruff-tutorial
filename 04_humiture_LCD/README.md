# 第四课 LCD 温湿度计

- 谁将登场
  - LCD 模块
  - 温湿度传感器
- 你将学会
  - 温湿度传感器的使用
  - LCD 屏的进阶使用

## 介绍

这节课将实现一个用 LCD 屏显示的温湿度计：

- LCD 屏初始显示 “Welcome !” 欢迎字样；
- 1秒钟后，在第一行显示当前温度，在第二行显示当前湿度；
- 每秒钟刷新当前温度和湿度的值。

## 元件

- Ruff 开发板
- 温湿度传感器模块
- LCD 模块

## 外设添加

- 向项目中添加名为`lcd`的 LCD 模块

  - model 选择`lcd1602-pcf8574a-hd44780`，驱动版本选择最新版。

    ![](http://oali8jkda.bkt.clouddn.com/Snip20160727_4.png)


- 向项目中添加名为`humirature`的温湿度传感器模块，

  - model 选择 DHT11，驱动版本选择最新版。

    ![](http://oali8jkda.bkt.clouddn.com/Snip20160727_3.png)

## 代码

- 在编写代码之前需要完成 Ruff 开发板的设置连接、硬件连线。如果有疑问大家可以在[第零课]()了解，也可以到[这里](https://ruff.io/docs/getting-started.html)了解。


- 想了解 Ruff 应用开发步骤和模型，可以到[这里](https://ruff.io/docs/development-steps.html)。

### 初始化

我们首先初始化 LCD 屏以及设置光标：

- 打开 LCD 屏幕；

- 使用设置`setCursor(x,y)`函数设置光标到（1，0）处并打印欢迎语；

  - LCD 模块的`setCursor`函数用来设置光标，语法如下：

    - #### `setCursor(x, y, [callback])`

  - LCD 模块每行可显示16个字符，共有两行字符，

    - (0,0)指向第一行第一个字符；
    - (1,0)指向第一行第二个字符；
    - (0,1)指向第二行第一个字符；

- 初始化代码如下：

```javascript
$('#lcd').turnOn();
$('#lcd').setCursor(1, 0);
$('#lcd').print('Welcome!');
```

- 可以在[这里](https://rap.ruff.io/raps/lcd1602-pcf8574a-hd44780)复习LCD 模块知识。

### 温度显示

之后我们解决：如何检测和显示当前温度

- 使用温湿度传感器模块的`getTemperature()` 函数获取当前温度：

  - 温湿度模块的`getTemperature()` 函数语法如下：

    - #### `getTemperature(callback)`

- 设置光标到第一行第二个字符处；

- 打印“temperature:”和当前温度；

- 使用`setInterval` 函数每秒钟重新检测和显示当前温度。

- 温度显示代码如下：

```javascript
setInterval(function () {
    $('#humirature').getTemperature(function (error, temperature) {
        if (error) {
            console.error(error);
            return;
        }
        $('#lcd').setCursor(1, 0);
        $('#lcd').print('temperature: ' + temperature);
    });
}, 1000);
```

### 湿度显示

之后我们解决：如何检测和显示当前湿度，解决方法和温度类似。

- 使用温湿度传感器模块的`getRelativeHumidity()` 函数获取当前湿度：

  - 温湿度模块的`getRelativeHumidity()` 函数语法如下：

    - #### `getRelativeHumidity(callback)`

- 设置光标到第二行第二个字符处；

- 打印“humility ”和当前湿度；

- 使用`setInterval` 函数每秒钟重新检测和显示当前湿度。

- 湿度显示代码如下：

```javascript
setInterval(function () {
    $('#humirature').getRelativeHumidity(function (error, humidity) {
        if (error) {
            console.error(error);
            return;
        }
        $('#lcd').setCursor(1, 1);
        $('#lcd').print('humidity: ' + humidity);
    });
}, 1000);
```

- 可以在[这里](https://rap.ruff.io/raps/dht11)进一步学习温湿度传感器模块知识；

最后，

- 将**初始化**、**温度显示**、**湿度显示**的实现放在 `$.ready` 事件下	。

### 完整代码

```javascript
'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    $('#lcd').turnOn();
    $('#lcd').setCursor(1, 0);
    $('#lcd').print('Welcome!');
    
    setInterval(
        function () {
            $('#humirature').getTemperature(function (error, temperature) {
                if (error) {
                    console.error(error);
                    return;
                }
                $('#lcd').setCursor(1, 0);
                console.log('temperature', temperature);
                $('#lcd').print('temperature: ' + temperature);
            });
        }, 1000);

    setInterval(function () {
        $('#humirature').getRelativeHumidity(function (error, humidity) {
            if (error) {
                console.error(error);
                return;
            }
            $('#lcd').setCursor(1, 1);
            console.log('humidity', humidity);
            $('#lcd').print('humidity: ' + humidity);
        });
    }, 1000)
});
```



## 课后作业

为本课的温湿度计加入温度报警功能：

- 添加模块：
  - 蜂鸣器模块
  - LED 模块
- 检测当前温度，未超过设定温度：
  - LCD 屏显示当前温度和湿度；
  - 蜂鸣器关闭；
  - LED 模块常亮蓝灯。


- 检测当前温度，如果超过设定温度：

  - LCD 屏上打印：“WARNING !!!” 字样，并每秒闪烁一次；
  - 蜂鸣器发出报警声；
  - LED 模块亮红灯，并每0.5秒闪烁一次。

  ​