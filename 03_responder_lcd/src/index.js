'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var r_or_b = false;
    $('#lcd').turnOn();
    $('#lcd').print('welcome!');
    setTimeout(
        function () {
            $('#lcd').clear();
            $('#lcd').print('Who faster?');
            r_or_b = true;

        }
        , 3000);



    $('#button_r').on('push', function () {
        if (r_or_b) {
            $('#lcd').clear();
            $('#lcd').print('Red faster!');
            console.log('Red Button pushed.');
            r_or_b = false;
        }
    }

    );
    $('#button_b').on('push', function () {
        if (r_or_b) {
            $('#lcd').clear();
            $('#lcd').print('Blue faster!');
            console.log('Blue Button pushed.');
            r_or_b = false;
        }

    }
    );
    $('#button_reset').on('push', function () {
        console.log('Reset Button pushed.');
        $('#lcd').clear();
        $('#lcd').print('Who faster?');
        r_or_b = true;
    }
    );

});

