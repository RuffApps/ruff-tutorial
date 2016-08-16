# 第六课 芝麻开门

- 谁将登场
  - 振动传感器模块
  - 舵机模块
- 你将学会
  - 振动传感器的基本操作
  - 舵机的基本操作

## 介绍

这节课将实现一个用振动传感器控制的电动门：

- 振动传感器感知周围的振动；
- 如果一直有振动，驱动舵机偏转，慢慢将“门”打开
- 如果振动传感器没有感知到振动，则舵机会慢慢将”门“合上

## 元件

- Ruff 开发板

- 振动传感器

- *SG-90舵机

  ***开发套件中未提供，需要自备。

## 外设添加

- 向项目中添加名为`shake` 的振动传感器模块；
  - model 选择`sw-1801p` ，驱动版本选择最新版。
- 向项目中添加名为`servo` 的舵机模块；
  - model 选择`SG-90` ，驱动版本选择最新版。

## 代码

- 在编写代码之前需要完成 Ruff 开发板的设置连接、硬件连线。如果有疑问大家可以在[第零课]()了解，也可以到[这里](https://ruff.io/docs/getting-started.html)了解。


- 想了解 Ruff 应用开发步骤和模型，可以到[这里](https://ruff.io/docs/development-steps.html)。

### 开门

我们首先实现”开门“的效果。

- 首先定义`angle`变量表示舵机的角度；


- 检测振动传感器模块的`shake`事件，如果检测到"振动"事件，执行相对应的“行为”函数；

- “行为”函数中，每次检测到振动，angle 的值增加2；

- 当 angle 的值达到120时，即使检测到“振动”事件，angle 保持120不变。

  - 这里是为了保护舵机，不让舵机角度过大，不同的舵机可以设置不同的上限值。

- 使用`setAngle(angle)`函数使舵机根据 angle 的值转向。

- "开门"初始化代码如下：

  ```javascript
  var angle = 10;
  $('#shake').on('shock', function () {
      angle += 2;
      if (angle >= 120) {
          angle = 120;
      }
      $('#servo').setAngle(angle);

  });
  ```

- 可以在[这里](http://blog.sina.com.cn/s/blog_adfd22480101nw83.html)进一步学习舵机知识;

- 可以在[这里](https://rap.ruff.io/devices/SW-1801P)进一步学习振动传感器模块知识；

### 关门

之后我们实现“关门”的效果。

- 如果振动传感器没有检测到“振动”事件：使用`setInterval` 函数每秒钟执行：

  - 将 angle 的值减2
  - 如果 angle 的值小于0，为了保护舵机，angle 保持0不变
  - 使用`setAngle(angle)`函数使舵机根据 angle 的值转向。

- "开门"初始化代码如下：

  ```javascript
  setInterval(function () {
      angle -= 2;
      if (angle <= 0) {
          angle = 0;
      }
      $('#servo').setAngle(angle);
  }, 1000)
  ```

最后，

- 将**开门、关门**的实现放在 `$.ready` 事件下。

## 完整代码

```javascript
'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var angle = 10;
   $('#shake').on('shock', function() {
   console.log('shocking');
   angle +=2;
   if(angle >=120){
       angle =120;
   }
   console.log(angle);
    $('#servo').setAngle(angle);
    
   });
   
   setInterval(function(){
       angle -=2;
       if(angle <= 0)
       {
           angle =0;
       } 
       $('#servo').setAngle(angle);
   },1000)

});
```