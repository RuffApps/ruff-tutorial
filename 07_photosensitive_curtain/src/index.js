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

    //var isButton = false;
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
            //console.log(value);
            //console.log(stack.peek());
            //onsole.log(stack.length());
            if (stack.length() === 5) {
                var totalIvalue = 0;
                for (var i = 0; i < stack.length(); i++) {

                    totalIvalue += stack.pop();
                    //console.log(totalIvalue);
                }
                averIvalue = totalIvalue / 3;
                console.log("ill: " + averIvalue);
                stack.clear();
                angle = getGear(averIvalue) * 30;
                console.log("angle: " + angle);
                //sition = getGear(averIvalue);
                //    if((sition-pSition)<0)
                //    {
                //        relayTime(relay1,-(sition-pSition));
                //    }
                //    else{
                //        relayTime(relay2,sition-pSition)
                //    }

                //    console.log(pSition);
                //    pSition = sition;
                //if(!isButton)
                //{
                $('#servo').setAngle(angle);
                //}

                //console.log(sition);
            }

        });
    }, 1000);

    // $('#button_open').on('push', function () {
    //     isButton = true;
    //     angle += 2;
    // console.log(angle);
    //     if (angle >= 120) {
    //         angle = 120;
    //     }
    //     $('#servo').setAngle(angle);

    // });


    // $('#button_close').on('push', function () {
    //     isButton = true;
    //     angle -= 2;
    //     if (angle <= 0) {
    //         angle = 0;
    //     }
    //     $('#servo').setAngle(angle);
    // });

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

