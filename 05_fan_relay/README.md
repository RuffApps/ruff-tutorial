# 第五课   简易电风扇

- 谁将登场
  - 继电器模块
  - 大按键模块
- 你将学会
  - 继电器模块的使用
  - 直流电机和继电器的连接

## 介绍

这节课将实现一个用按键控制的简易电风扇：

- 按下按键，继电器打开，电风扇转动；
- 再按下按键，继电器关闭，电风扇停止转动

## 元件

- Ruff 开发板
- 继电器模块
- *面包板
- *130 直流电机
- *小风扇

  ***开发套件中未提供，需要自备。**

## 外设添加

- 向项目中添加名为`button` 的大按键模块；
  - model 选择`CK002`，驱动版本选择最新版。


- 向项目中添加名为`relay` 的继电器模块；
  - model 选择`relay-1c` ，驱动版本选择最新版。

## 代码

- 在编写代码之前需要完成 Ruff 开发板的设置连接、硬件连线。如果有疑问大家可以在[第零课]()了解，也可以到[这里](https://ruff.io/docs/getting-started.html)了解。


- 想了解 Ruff 应用开发步骤和模型，可以到[这里](https://ruff.io/docs/development-steps.html)。

### 继电器状态检测

我们首先解决：如何检测当前继电器是否打开。

- 使用继电器的`isOn` 函数，用来检测继电器状态，语法如下：

  ```javascript
  $('#<device-id>').isOn(function (error, state) {});
  ```

  - 函数变量 state 得到当前继电器的状态
    - `true` ：当前继电器是打开状态
    - `false` ：当前继电器是关闭状态

### 打开/关闭继电器

接下来解决：如何打开/关闭继电器。

- 使用继电器的`turn0n()` 和`turnOff()`函数打开关闭继电器，语法如下：

  - #### `turnOn([callback])`

  - #### `turnOff([callback])`

- 可以在[这里](https://rap.ruff.io/raps/relay-1c)进一步学习继电器模块知识；

### 按键控制开关

实现按键控制继电器开关，需要在每次按键按下时，检测当前继电器是否打开：

- 如果继电器已打开，关闭继电器；
- 如果继电器已关闭，打开继电器。
- 按键控制开关代码如下：

```javascript
$('#button').on('push', function () {
    $('#relay').isOn(function (error, state) {
        if (!state) {
            $('#relay').turnOn();
        }
        else {
            $('#relay').turnOff();
        }
    });
});
```

### 完整代码

```javascript
'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }
  
    $('#button').on('push', function () {
        $('#relay').isOn(function (error, state) {
            if (!state) {
                $('#relay').turnOn();
            }
            else {
                $('#relay').turnOff();
            }
        });
    });
});
```

