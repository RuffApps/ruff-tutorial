# 第三课	LCD 抢答器

- 谁将登场
  - LCD 模块
  - 按键模块
- 你将学会
  - LCD 模块的初级使用

## 介绍

第一课课后作业“抢答器”大家实现了么？这节课将实现一个带 LCD 屏的抢答器：

- LCD 屏初始显示 “Welcome !” 欢迎字样；
- 3秒后，显示“Who faster?”；


- 按键 A 按下，板载蓝灯（led-b）亮，LCD 屏显示 “Blue faster!” ；
- 按键 B 按下，板载红灯（led-r）亮，LCD 屏显示 “Red faster!” ；
- 按键 C 用于重置抢答器，C 键按下，LCD 屏显示 “Who faster?” ；
  - 按键 A 或 B 按下后，直到按下按键 C 重置抢答器，即使另一按键按下，LCD 屏也不会有变化。
  - 直到显示“Who faster?”，之前按键 A 或 B 按下 LCD 屏也不会有变化。

## 元件

- Ruff 开发板
- 大按键模块（3个）
- LCD 模块

## 外设添加

- 向项目中添加三个大按键模块，

  - `button_r` 对应红按键

  - `button_b` 对应蓝按键

  - `button_reset` 对应重置按键，

    model 都选择 CK002，驱动版本选择最新版。 

    - 添加红色大按键；

      ![](http://oali8jkda.bkt.clouddn.com/Snip20160725_1.png)

    - 添加蓝色大按键；

      ![](http://oali8jkda.bkt.clouddn.com/Snip20160725_2.png)

    - 添加重置按键；

      ![](http://oali8jkda.bkt.clouddn.com/Snip20160725_3.png)

- 向项目中添加名为`lcd`的 LCD 模块，

  - model 选择 `lcd1602-pcf8574a-hd44780`，驱动版本选择最新版。

    - 添加 LCD 模块

      ![](http://oali8jkda.bkt.clouddn.com/Snip20160725_4.png)

## 代码

- 在编写代码之前需要完成 Ruff 开发板的设置连接、硬件连线。如果有疑问大家可以在[第零课]()了解，也可以到[这里](https://ruff.io/docs/getting-started.html)了解。


- 想了解 Ruff 应用开发步骤和模型，可以到[这里](https://ruff.io/docs/development-steps.html)。

### 初始化

我们首先初始化 LCD 屏以及抢答标志位：

- 初始化抢答标志位为 false，该标志位用于控制是否允许抢答；


- 打开 LCD 屏幕，并打印欢迎语；
- 很短的延迟后，使用`print()` 函数在屏幕上打印抢答开始语；
- 设置抢答标志位为 true，允许红蓝双方抢答；


- 抢答器初始化代码如下：

  ```javascript
  var r_or_b = false;           			//抢答标志位
  $('#lcd').turnOn();			  			//打开 LCD 屏开关	
  $('#lcd').print('welcome!');  			//打印欢迎语
  setTimeout(function () {
          $('#lcd').clear();	  			//延时3s，清空屏幕
          $('#lcd').print('Who faster?');	//打印抢答开始语
          r_or_b = true;        			//设置抢答标志位
      }, 3000);				  
  ```


- 可以在[这里](https://rap.ruff.io/raps/lcd1602-pcf8574a-hd44780)进一步学习 LCD 模块知识；

### 抢答

接下来，我们实现抢答。

- 检测红蓝按键模块的 `push` 事件，一旦检测到信号，执行相对应的“行为”函数。
- 行为函数中判断抢答标志位是否为 true：
  - 如果为 true，
    - 使用`clear()` 函数将 LCD 清屏；
    - 使用`print()` 函数打印“ red win !” 或 “blue win !”;
    - 设置抢答标志位为 false，红蓝双方抢答无效。
  - 如果为 false，不进行操作。


- 想复习大按键模块的知识，可以前往[Ruff-大按键模块](https://rap.ruff.io/raps/button-gpio)。


- 大按键抢答实现：

  ```javascript
  //红色按键抢答
  $('#button_r').on('push', function () {
      if (r_or_b) {
          $('#lcd').clear();
          $('#lcd').print('Red faster!');
          r_or_b = false;
      }
  });

  //蓝色按键抢答
  $('#button_b').on('push', function () {
      if (r_or_b) {
          $('#lcd').clear();
          $('#lcd').print('Blue faster!');
          r_or_b = false;
      }
  });
  ```

### 重置

抢答器的多次使用需要将抢答器重置到初始状态。

我们将解决：如何重置抢答器

- 检测重置按键模块的 `push` 事件，一旦检测到信号，执行相对应的“行为”函数。

- 行为函数中

  - 使用`clear()` 函数将 LCD 清屏；
  - 使用`print()` 函数打印抢答开始语；
  - 设置抢答标志位为 true，允许红蓝双方抢答；

- 抢答器重置实现：

  ```javascript
  $('#button_reset').on('push', function () {
      $('#lcd').clear();
      $('#lcd').print('Who faster?');
      r_or_b = true;
  }
  );
  ```

最后，

- 将**初始化**、**抢答**、**重置**的实现放在 `$.ready` 事件下。

### 完整代码

```javascript
'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var r_or_b = false;
    $('#lcd').turnOn();
    $('#lcd').print('welcome!');
    setTimeout(function () {
            $('#lcd').clear();
            $('#lcd').print('Who faster?');
            r_or_b = true;
        } , 3000);

    $('#button_r').on('push', function () {
        if (r_or_b) {
            $('#lcd').clear();
            $('#lcd').print('Red faster!');
            r_or_b = false;
        }
    });
  
    $('#button_b').on('push', function () {
        if (r_or_b) {
            $('#lcd').clear();
            $('#lcd').print('Blue faster!');
            r_or_b = false;
        }
    });
  
    $('#button_reset').on('push', function () {
        $('#lcd').clear();
        $('#lcd').print('Who faster?');
        r_or_b = true;
    });
});
```

## 课后作业

为本节课的抢答器加入倒数计时功能，完善成一个实用的抢答器：

- LCD 屏初始显示 “Welcome !” 欢迎字样；
- 2秒后显示“Who is the faster?”，
- LCD 屏上开始倒数3秒：“3”“2”“1”“GO!!!”；
- 按键 A 按下，板载蓝灯（led-b）亮，LCD 屏显示 “Blue faster!” ；
- 按键 B 按下，板载红灯（led-r）亮，LCD 屏显示 “Red faster!” ；
- 按键 C 用于重置抢答器，C 键按下，
  - LCD 屏显示 “Who is the faster?” 
  - 开始倒数3秒，3秒后A 和 B 按键可以抢答;
- 按键 A 或 B 按下后，直到按下按键 C 重置抢答器，即使另一按键按下，LCD 屏也不会有变化。