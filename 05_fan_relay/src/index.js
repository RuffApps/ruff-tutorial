'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    $('#button').on('push', function () {
        $('#relay').isOn(function (error, state) {
            console.log('the state is ' + state);
            if (!state) {
                $('#relay').turnOn(function () {
                    console.log('relay turn on');
                });
            }
            else {
                $('#relay').turnOff(function () {
                    console.log('relay turn off');
                });
            }
        });
    });
});

