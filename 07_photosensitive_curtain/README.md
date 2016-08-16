# 第七课 光控电动窗帘

- 谁将登场
  - 光照传感器
  - 舵机
- 你将学会
  - 光照传感器的基本使用

## 介绍

这节课将实现一个用光照传感器控制的电动窗帘：

- 光照传感器测量当前光照强度
- 根据光照强度，确定舵机转动角度，带动窗帘拉下或拉上。

## 元件

- Ruff 开发板

- 光照传感器

- *舵机

  ***开发套件中未提供，需要自备。**

## 外设添加

- 向项目中添加名为`light` 的光照传感器模块；
  - model 选择`GY-30` ，驱动版本选择最新版。
- 向项目中添加名为`servo` 的舵机模块；
  - model 选择`sg-90` ，驱动版本选择最新版。

## 代码

- 在编写代码之前需要完成 Ruff 开发板的设置连接、硬件连线。如果有疑问大家可以在[第零课]()了解，也可以到[这里](https://ruff.io/docs/getting-started.html)了解。


- 想了解 Ruff 应用开发步骤和模型，可以到[这里](https://ruff.io/docs/development-steps.html)。

### 栈

为了处理光感传感器读数突变的情况，需要将5秒内每秒得到的光强值取平均值，将平均光强值作为确定舵机转动角度的数据。

- 首先我们需要用数据结构——栈，存储和取出平均光强值。
  - 如果对栈很了解，可以跳过这部分
- 栈是一种特殊的列表，栈内的元素只能通过栈顶添加或删除，栈的方法和属性包括：
  - 方法：
    - `push()`：数据入栈
    - `pop()`：栈顶数据出栈
    - `peek()`：返回栈顶元素，而不删除
    - `clear()`：清除栈内的所有元素。
    - `length()`: 记录栈内元素的个数。
  - 属性：
    - dataStore：保存栈内的所有元素，初始化为空
    - top :记录栈顶的位置，初始化为0
- 栈实现代码如下：

```javascript
function Stack() {
    this.dataStore = [];
    this.top = 0;
}
Stack.prototype = {

    // 向栈中压入一个新元素
    push: function (element) {
        this.dataStore[this.top++] = element;
    },
    // 访问栈顶元素，栈顶元素永久被删除
    pop: function () {
        return this.dataStore[--this.top];
    },
    // 返回数组中的 top-1 个位置的元素，即栈顶元素
    peek: function () {
        return this.dataStore[this.top - 1];
    },
    // 栈内存储了多少个元素
    length: function () {
        return this.top;
    },
    // 清空栈
    clear: function () {
        this.top = 0;
    }
};
```

### 档位选择

我们先确定不同光强下窗帘的位置，如图例为窗帘设置5个档位，如果光照感应器测得光强越强，则档位越低，舵机转动角度越大，窗帘被拉动的越低。

![](http://oali8jkda.bkt.clouddn.com/curtain%20%281%29.png)

- 档位选择函数如下：
  - 传入的参数为光照感应器测得光强

```javascript
function getGear(value) {

    var gear = 0;
    if (value > 140) {
        gear = 0;
    }
    else if (value > 130) {
        gear = 1;
    }
    else if (value > 120) {
        gear = 2;
    }
    else if (value > 100) {
        gear = 3;
    }
    else {
        gear = 4;
    }
    return gear;
}
```

### 读取光强并调节窗帘

接下来我们解决如何检测和读取当前平均光强值

- 新建一个栈，用来存储处理数据

- 使用`setInterval` 函数每秒钟运行下面函数：

  - 使用光强传感器模块的`getIlluminance()` 函数获取当前光强：

    - 光强传感器模块的`getIlluminance()` 函数语法如下：

      - #### getIlluminance(function (error, value) {...})

      - #### value 获取的当前光强值

  - 将获得的光强值压栈，当栈元素个数为5时，所有数据出栈，并得到平均光强值

  - 将光强值传至档位选择函数，得到舵机档位，设置舵机转动角度为**档位*30**。

  - 使用舵机的**`setAngle(value)`** 方法控制舵机转动，拉动窗帘上下运动。

- 读取光强并调节窗帘代码如下：

```javascript
var stack = new Stack();
var angle = 0;
setInterval(function () {
    $('#light').getIlluminance(function (error, value) {
        if (error) {
            console.error(error);
            return;
        }
        var averIvalue = 0;
        stack.push(value);
        if (stack.length() === 5) {
            var totalIvalue = 0;
            for (var i = 0; i < stack.length(); i++) {
                totalIvalue += stack.pop();
            }
            averIvalue = totalIvalue / 3;
            console.log("ill: " + averIvalue);
            stack.clear();
            angle = getGear(averIvalue) * 30;
            console.log("angle: " + angle);
            $('#servo').setAngle(angle);
        }
    });
}, 1000);
```

- 可以在[这里](https://rap.ruff.io/devices/GY-30)进一步学习光照传感器模块知识；

最后，

- 将**栈**、**读取光强并调节窗帘**的实现放在 `$.ready` 事件下。把**档位选择**函数放在该事件外。

## 完整代码

```javascript
'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    function Stack() {
        this.dataStore = [];
        this.top = 0;
    }
    Stack.prototype = {

        // 向栈中压入一个新元素
        push: function (element) {
            this.dataStore[this.top++] = element;
        },
        // 访问栈顶元素，栈顶元素永久的被删除了
        pop: function () {
            return this.dataStore[--this.top];
        },
        // 返回数组中的 top-1 个位置的元素，即栈顶元素
        peek: function () {
            return this.dataStore[this.top - 1];
        },
        // 栈内存储了多少个元素
        length: function () {
            return this.top;
        },
        // 清空栈
        clear: function () {
            this.top = 0;
        }
    };
    
    var stack = new Stack();
    var angle = 0;
    setInterval(function () {
        $('#light').getIlluminance(function (error, value) {
            if (error) {
                console.error(error);
                return;
            }
            var averIvalue = 0;
            stack.push(value);
            if (stack.length() === 5) {
                var totalIvalue = 0;
                for (var i = 0; i < stack.length(); i++) {
                    totalIvalue += stack.pop();
                }
                averIvalue = totalIvalue / 3;
                console.log("ill: " + averIvalue);
                stack.clear();
                angle = getGear(averIvalue) * 30;
                console.log("angle: " + angle);
                $('#servo').setAngle(angle);
            }
        });
    }, 1000);
});

function getGear(value) {

    var gear = 0;
    if (value > 140) {
        gear = 0;
    }
    else if (value > 130) {
        gear = 1;
    }
    else if (value > 120) {
        gear = 2;
    }
    else if (value > 100) {
        gear = 3;
    }
    else {
        gear = 4;
    }
    return gear;
}
```