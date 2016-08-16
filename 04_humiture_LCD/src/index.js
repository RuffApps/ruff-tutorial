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


