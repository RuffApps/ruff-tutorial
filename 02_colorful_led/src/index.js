'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var color = Object.create({
        red: 0xff0000,
        blue: 0x0000ff,
        green: 0x00ff00,
        purple: 0xff00ff,
        cyan: 0x00ffff,
        yellow: 0xffff00,
        white: 0x000000
    });

    var light = setInterval(
        function () {
            $('#led').setRGB(color.blue);
            setTimeout(function () {
                $('#led').setRGB(color.green);
            }, 500);
            setTimeout(function () {
                $('#led').setRGB(color.cyan);
            }, 1000);
            setTimeout(function () {
                $('#led').setRGB(color.red);
            }, 1500);
            setTimeout(function () {
                $('#led').setRGB(color.purple);
            }, 2000);
            setTimeout(function () {
                $('#led').setRGB(color.yellow);
            }, 2500);
            setTimeout(function () {
                $('#led').setRGB(color.white);
            }, 3000)
        }, 3500)

    $('#led-r').turnOn();
});

$.end(function () {
    $('#led-r').turnOff();
});

$('#led').setRGB(color.blue);
setTimeout(function () {
    $('#led').setRGB(color.green);
}, 500);
setTimeout(function () {
    $('#led').setRGB(color.cyan);
}, 1000);
setTimeout(function () {
    $('#led').setRGB(color.red);
}, 1500);
setTimeout(function () {
    $('#led').setRGB(color.purple);
}, 2000);
setTimeout(function () {
    $('#led').setRGB(color.yellow);
}, 2500);
setTimeout(function () {
    $('#led').setRGB(color.white);
}, 3000)