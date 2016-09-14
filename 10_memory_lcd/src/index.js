'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }


    $('#lcd').turnOn();
    $('#lcd').print('  Memory Game');
    $('#lcd').setCursor(12, 1);
    $('#lcd').print('Wei');

    setTimeout(function () {
        $('#lcd').clear();
        $('#lcd').setCursor(0, 0);
        $('#lcd').print('    14214324');
        $('#lcd').setCursor(0, 1);
        $('#lcd').print('    23331142');
    }, 3000)

    var queue0 = new Array(1, 4, 2, 1, 4, 3, 2, 4);//第一排数字谜底
    var queue1 = new Array(2, 3, 3, 3, 1, 1, 4, 2);//第二排数字谜底
    var queue0_true = new Array(true, true, true, true, true, true, true, true);//记录数字是否被消除
    var queue1_true = new Array(true, true, true, true, true, true, true, true);
    var pre_cursor_x = 0;   //记录前比较数的x坐标
    var pre_cursor_y = 0;   //记录前比较数的y坐标
    var cursor_x = 4;   //记录后比较数的x坐标
    var cursor_y = 0;   //记录后比较数的y坐标
    var IsConparision = false;  //是否是在进行比较
    var isFirst = true; //按下第一个数后第一次左右移显示原数字，之后变为 false 其他情况显示#
    var isSueecss = false;  //是否成功消除所有方块
    var pre_num = 0;    //记录前比较数
    var num = '';   //记录后比较数
    var secend = 0; //记录游戏时间

    $('#lcd').setCursor(4, 0);

    setTimeout(function () {
        $('#lcd').setCursor(4, 0);
        $('#lcd').print('########');
        $('#lcd').setCursor(4, 1);
        $('#lcd').print('########');


        $('#lcd').showCursor();
        $('#lcd').setCursor(cursor_x, cursor_y);

        var timer = setInterval(function () {
            secend++;
        }, 1000)


        setInterval(function () {

            $('#joystick').IsLeft(function (aaa) {
                if (aaa === true) { //左转
                    if (cursor_x <= 4) {
                        $('#lcd').setCursor(cursor_x, cursor_y);
                    }
                    else {
                        console.log('cursor_x: ' + cursor_x);
                        console.log(queue0_true[cursor_x - 4]);
                        if ((cursor_y == 0) && (queue0_true[cursor_x - 4] === true) || (cursor_y == 1) && (queue1_true[cursor_x - 4] === true)) {

                            if (!IsConparision) {   //未比较
                                $('#lcd').print('#');
                            }
                            else {  //比较后
                                if (isFirst) {
                                    if (cursor_y === 0) {
                                        num = queue0[cursor_x - 4].toString();
                                        $('#lcd').print(num);
                                    }
                                    else {
                                        num = queue1[cursor_x - 4].toString();
                                        $('#lcd').print(num);
                                    }
                                    isFirst = false;

                                }
                                else {
                                    $('#lcd').print('#');
                                }
                            }

                            $('#lcd').setCursor(--cursor_x, cursor_y);
                            $('#lcd').print('*');
                            $('#lcd').setCursor(cursor_x, cursor_y);
                        }
                        else {
                            $('#lcd').print(' ');
                            $('#lcd').setCursor(--cursor_x, cursor_y);

                            $('#lcd').setCursor(cursor_x, cursor_y);
                        }



                    }

                    console.log('left');
                    console.log('x: ' + cursor_x);
                    console.log('y: ' + cursor_y);
                    console.log('Conparision: ' + IsConparision);
                    console.log('Isfirst: ' + isFirst);
                    console.log('cursor_x: ' + cursor_x);
                    console.log('cursor_y: ' + cursor_y);
                }
                else if (aaa === false) {
                    if (cursor_x >= 11) {
                        $('#lcd').setCursor(cursor_x, cursor_y);
                    }
                    else {
                        console.log('cursor_x: ' + cursor_x);
                        console.log(queue0_true[cursor_x - 4]);
                        if ((cursor_y == 0) && (queue0_true[cursor_x - 4] === true) || (cursor_y == 1) && (queue1_true[cursor_x - 4] === true)) {
                            if (!IsConparision) {
                                $('#lcd').print('#');
                            }
                            else {
                                if (isFirst) {
                                    if (cursor_y === 0) {
                                        num = queue0[cursor_x - 4].toString();
                                        $('#lcd').print(num);
                                    }
                                    else {
                                        num = queue1[cursor_x - 4].toString();
                                        $('#lcd').print(num);
                                    }
                                    isFirst = false;

                                }
                                else {
                                    $('#lcd').print('#');
                                }
                            }
                            $('#lcd').setCursor(++cursor_x, cursor_y);
                            $('#lcd').print('*');
                            $('#lcd').setCursor(cursor_x, cursor_y);
                        }
                        else {
                            $('#lcd').print(' ');
                            $('#lcd').setCursor(++cursor_x, cursor_y);

                            $('#lcd').setCursor(cursor_x, cursor_y);
                        }


                    }

                    console.log('right');
                    console.log('x: ' + cursor_x);
                    console.log('y: ' + cursor_y);
                    console.log('Conparision: ' + IsConparision);
                    console.log('Isfirst: ' + isFirst);
                    console.log('cursor_x: ' + cursor_x);
                    console.log('cursor_y: ' + cursor_y);
                }
                // console.log(aaa);
            });
            $('#joystick').IsDown(function (aaa) {
                if (aaa === true) {
                    if (cursor_y >= 1) {
                        $('#lcd').setCursor(cursor_x, cursor_y);
                    }
                    else {
                        console.log('cursor_x: ' + cursor_x);
                        console.log(queue0_true[cursor_x - 4]);
                        if ((cursor_y == 0) && (queue0_true[cursor_x - 4] === true) || (cursor_y == 1) && (queue1_true[cursor_x - 4] === true)) {

                            if (!IsConparision) {
                                $('#lcd').print('#');
                            }
                            else {
                                if (isFirst) {
                                    if (cursor_y === 0) {
                                        num = queue0[cursor_x - 4].toString();
                                        $('#lcd').print(num);
                                    }
                                    else {
                                        num = queue1[cursor_x - 4].toString();
                                        $('#lcd').print(num);
                                    }
                                    isFirst = false;

                                }
                                else {
                                    $('#lcd').print('#');
                                }
                            }

                            $('#lcd').setCursor(cursor_x, ++cursor_y);
                            $('#lcd').print('*');
                            $('#lcd').setCursor(cursor_x, cursor_y);
                        }
                        else {
                            $('#lcd').print(' ');
                            $('#lcd').setCursor(cursor_x, ++cursor_y);

                            $('#lcd').setCursor(cursor_x, cursor_y);
                        }


                        // $('#lcd').print('#');
                        // $('#lcd').setCursor(cursor_x, ++cursor_y);
                        // $('#lcd').print('*');
                        // $('#lcd').setCursor(cursor_x, cursor_y);

                    }

                    console.log('down');
                    console.log('x: ' + cursor_x);
                    console.log('y: ' + cursor_y);
                    console.log('Conparision: ' + IsConparision);
                    console.log('Isfirst: ' + isFirst);
                    console.log('cursor_x: ' + cursor_x);
                    console.log('cursor_y: ' + cursor_y);
                }
                else if (aaa === false) {
                    if (cursor_y <= 0) {
                        $('#lcd').setCursor(cursor_x, cursor_y);
                    }
                    else {
                        console.log('cursor_x: ' + cursor_x);
                        console.log(queue0_true[cursor_x - 4]);
                        if ((cursor_y == 0) && (queue0_true[cursor_x - 4] === true) || (cursor_y == 1) && (queue1_true[cursor_x - 4] === true)) {

                            if (!IsConparision) {
                                $('#lcd').print('#');
                            }
                            else {
                                if (isFirst) {
                                    if (cursor_y === 0) {
                                        num = queue0[cursor_x - 4].toString();
                                        $('#lcd').print(num);
                                    }
                                    else {
                                        num = queue1[cursor_x - 4].toString();
                                        $('#lcd').print(num);
                                    }
                                    isFirst = false;

                                }
                                else {
                                    $('#lcd').print('#');
                                }
                            }

                            $('#lcd').setCursor(cursor_x, --cursor_y);
                            $('#lcd').print('*');
                            $('#lcd').setCursor(cursor_x, cursor_y);
                        }
                        else {
                            $('#lcd').print(' ');
                            $('#lcd').setCursor(cursor_x, --cursor_y);

                            $('#lcd').setCursor(cursor_x, cursor_y);
                        }

                        // $('#lcd').print('#');
                        // $('#lcd').setCursor(cursor_x, --cursor_y);
                        // $('#lcd').print('*');
                        // $('#lcd').setCursor(cursor_x, cursor_y);
                    }

                    console.log('up');
                    console.log('x: ' + cursor_x);
                    console.log('y: ' + cursor_y);
                    console.log('Conparision: ' + IsConparision);
                    console.log('Isfirst: ' + isFirst);
                    console.log('cursor_x: ' + cursor_x);
                    console.log('cursor_y: ' + cursor_y);
                }
            });
        }, 250);
        $('#button_A').on('push', function () {
            console.log('cursor_x: ' + cursor_x);
            console.log('cursor_y: ' + cursor_y);

            if (cursor_y === 0) {     //在第0排
                $('#lcd').setCursor(cursor_x, cursor_y);
                num = queue0[cursor_x - 4].toString();
                if (queue0_true[cursor_x - 4] === true) //没有消除
                {
                    if (!IsConparision) {   //对比前

                        pre_num = num;
                        pre_cursor_x = cursor_x;
                        pre_cursor_y = cursor_y;


                        $('#lcd').print(num);
                        console.log('num: ' + queue0[cursor_x - 4]);
                        $('#lcd').setCursor(cursor_x, cursor_y);
                        IsConparision = true;
                        console.log('Conparision: ' + IsConparision);
                        console.log('Isfirst: ' + isFirst);
                        console.log('cursor_x: ' + cursor_x);
                        console.log('cursor_y: ' + cursor_y);

                    }
                    else {         //对比后
                        if (num == pre_num) { //匹配成功
                            $('#lcd').print(num);
                            $('#lcd').setCursor(cursor_x, cursor_y);


                            $('#lcd').setCursor(pre_cursor_x, pre_cursor_y);
                            $('#lcd').print(' ');
                            $('#lcd').setCursor(cursor_x, cursor_y);
                            $('#lcd').print(' ');
                            $('#lcd').setCursor(cursor_x, cursor_y);



                            queue0_true[cursor_x - 4] = false;
                            console.log('pre_cursor_y:' + pre_cursor_y);
                            if (pre_cursor_y === 0) {
                                queue0_true[pre_cursor_x - 4] = false;
                                console.log(' queue0_true[pre_cursor_x - 4] ' + queue0_true[pre_cursor_x - 4])
                            }
                            else {
                                queue1_true[pre_cursor_x - 4] = false;
                                console.log(' queue1_true[pre_cursor_x - 4] ' + queue1_true[pre_cursor_x - 4])
                            }

                            for (var i = 0; i < queue0_true.length; i++) {
                                if (queue0_true[i] === true) {
                                    break;
                                }
                                else if (i === queue0_true.length - 1) {
                                    for (var j = 0; j < queue1_true.length; j++) {
                                        if (queue1_true[j] === true) {
                                            break;
                                        }
                                        else if (i === queue1_true.length - 1) {
                                            isSueecss = true;
                                        }

                                    }

                                }

                            }

                            if (!isSueecss) {
                                pre_num = 0;
                                pre_cursor_x = 0;
                                pre_cursor_y = 0;
                                IsConparision = false;
                                isFirst = true;
                            }
                            else {
                                $('#lcd').setCursor(4, 0);
                                $('#lcd').print('You Win!');
                                $('#lcd').hideCursor();
                                clearInterval(timer);
                                $('#lcd').setCursor(6, 1);
                                $('#lcd').print("Time: ")
                                $('#lcd').print(secend.toString());
                                $('#lcd').print("s");

                            }


                            console.log('Conparision: ' + IsConparision);
                            console.log('Isfirst: ' + isFirst);
                            console.log('cursor_x: ' + cursor_x);
                            console.log('cursor_y: ' + cursor_y);
                        }

                        else        //匹配失败
                        {
                            $('#lcd').print(num);
                            $('#lcd').setCursor(cursor_x, cursor_y);

                            // sleep(2000);
                            // setTimeout("print()",2000);


                            console.log('cursor_x: ' + cursor_x);
                            console.log('cursor_y: ' + cursor_y);
                            console.log('pre_cursor_x: ' + pre_cursor_x);
                            console.log('pre_cursor_y: ' + pre_cursor_y);
                            $('#lcd').setCursor(pre_cursor_x, pre_cursor_y);
                            $('#lcd').print('#');
                            $('#lcd').setCursor(cursor_x, cursor_y);
                            $('#lcd').print('#');
                            $('#lcd').setCursor(cursor_x, cursor_y);

                            pre_num = 0;
                            pre_cursor_x = 0;
                            pre_cursor_y = 0;
                            IsConparision = false;
                            isFirst = true;
                            console.log('Isfirst: ' + isFirst);
                            console.log('Conparision: ' + IsConparision);



                        }


                    }

                }




            }
            else { //在第一排

                $('#lcd').setCursor(cursor_x, cursor_y);
                num = queue1[cursor_x - 4].toString();
                if (queue1_true[cursor_x - 4] === true) //没有消除
                {
                    if (!IsConparision) {   //对比前

                        pre_num = num;
                        pre_cursor_x = cursor_x;
                        pre_cursor_y = cursor_y;


                        $('#lcd').print(num);
                        console.log('num: ' + queue1[cursor_x - 4]);
                        $('#lcd').setCursor(cursor_x, cursor_y);
                        IsConparision = true;
                        console.log('Conparision: ' + IsConparision);
                        console.log('Isfirst: ' + isFirst);
                        console.log('cursor_x: ' + cursor_x);
                        console.log('cursor_y: ' + cursor_y);

                    }
                    else {         //对比后
                        if (num == pre_num) { //匹配成功
                            console.log('success compare!')
                            $('#lcd').print(num);
                            $('#lcd').setCursor(cursor_x, cursor_y);


                            $('#lcd').setCursor(pre_cursor_x, pre_cursor_y);
                            $('#lcd').print(' ');
                            $('#lcd').setCursor(cursor_x, cursor_y);
                            $('#lcd').print(' ');
                            $('#lcd').setCursor(cursor_x, cursor_y);



                            queue1_true[cursor_x - 4] = false;
                            console.log('pre_cursor_y:' + pre_cursor_y);
                            if (pre_cursor_y == 0) {
                                queue0_true[pre_cursor_x - 4] = false;
                                console.log(' queue0_true[pre_cursor_x - 4] ' + queue0_true[pre_cursor_x - 4])
                            }
                            else {
                                queue1_true[pre_cursor_x - 4] = false;
                            }

                            for (var i = 0; i < queue0_true.length; i++) {
                                if (queue0_true[i] === true) {
                                    break;
                                }
                                else if (i === queue0_true.length - 1) {
                                    for (var j = 0; j < queue1_true.length; j++) {
                                        if (queue1_true[j] === true) {
                                            break;
                                        }
                                        else if (i === queue1_true.length - 1) {
                                            isSueecss = true;
                                        }

                                    }

                                }

                            }


                            if (!isSueecss) {
                                pre_num = 0;
                                pre_cursor_x = 0;
                                pre_cursor_y = 0;
                                IsConparision = false;
                                isFirst = true;
                            }
                            else {
                                $('#lcd').setCursor(4, 0);
                                $('#lcd').print('You Win!');
                                $('#lcd').hideCursor();
                                clearInterval(timer);
                                $('#lcd').setCursor(6, 1);
                                $('#lcd').print("Time: ");
                                $('#lcd').print(secend.toString());
                                $('#lcd').print("s");

                            }


                            console.log('Conparision: ' + IsConparision);
                            console.log('Isfirst: ' + isFirst);
                            console.log('cursor_x: ' + cursor_x);
                            console.log('cursor_y: ' + cursor_y);
                        }

                        else        //匹配失败
                        {
                            $('#lcd').print(num);
                            $('#lcd').setCursor(cursor_x, cursor_y);

                            // sleep(2000);
                            // setTimeout("print()",2000);


                            console.log('cursor_x: ' + cursor_x);
                            console.log('cursor_y: ' + cursor_y);
                            console.log('pre_cursor_x: ' + pre_cursor_x);
                            console.log('pre_cursor_y: ' + pre_cursor_y);
                            $('#lcd').setCursor(pre_cursor_x, pre_cursor_y);
                            $('#lcd').print('#');
                            $('#lcd').setCursor(cursor_x, cursor_y);
                            $('#lcd').print('#');
                            $('#lcd').setCursor(cursor_x, cursor_y);

                            pre_num = 0;
                            pre_cursor_x = 0;
                            pre_cursor_y = 0;
                            IsConparision = false;
                            isFirst = true;
                            console.log('Isfirst: ' + isFirst);
                            console.log('Conparision: ' + IsConparision);



                        }


                    }

                }
                // $('#lcd').setCursor(cursor_x, cursor_y);
                // num = queue1[cursor_x - 4].toString();
                // $('#lcd').print(num);
                // console.log('num: ' + queue1[cursor_x - 4]);
                // $('#lcd').setCursor(cursor_x, cursor_y);
            }

        });


    }, 6000);


});


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

