'use strict';
var sensor_data = {
    ill: 0,
    humi: 0,
    temp: 0
}



var commands = new Array()
//0003 
//open relay0
commands[0] = 'eb0003020201fff2'
//close relay0
commands[1] = 'eb000302020100f3'
//open relay1
commands[2] = 'eb0003020202fff3'
//close relay1
commands[3] = 'eb000302020200f4'
//read sensor 
commands[4] = 'eb00030100ef'


//0005
//open relay0
commands[5] = 'eb0005020201fff4'
//close relay0
commands[6] = 'eb000502020100f5'
//open relay1
commands[7] = 'eb0005020202fff5'
//close relay1
commands[8] = 'eb000502020200f6'
//read sensor(only temp and humidity) 
commands[9] = 'eb00050100f1'

//0008
//open relay0
commands[10] = 'eb0008020201fff7'
//close relay0
commands[11] = 'eb000802020100f8'
//open relay1
commands[12] = 'eb0008020202fff8'
//close relay1
commands[13] = 'eb000802020200f9'
//read sensor 
commands[14] = 'eb00080100f4'

var Path = require('path');
var Server = require('home').Server;

var server = new Server();

// server.use('/', function(req){
//     console.log(req);
//     console.log('req.data = ' +req.data);
//     console.log(req.head);
//     console.log(req.Path);
// });

server.get('/0003_relay0_open', function () {
    console.log('------------------------------');
    console.log('get 0003_relay0_open---------');
    relay_opertion('0003', 0, 'open');
});
server.get('/0003_relay0_close', function () {
    relay_opertion('0003', 0, 'close');
});

server.get('/0003_relay1_open', function () {
    relay_opertion('0003', 1, 'open');
});
server.get('/0003_relay1_close', function () {
    relay_opertion('0003', 1, 'close');
});

server.get('/0005_relay0_open', function () {
    relay_opertion('0005', 0, 'open');
});
server.get('/0005_relay0_close', function () {
    relay_opertion('0005', 0, 'close');
});

server.get('/0005_relay1_open', function () {
    relay_opertion('0005', 1, 'open');
});
server.get('/0005_relay1_close', function () {
    relay_opertion('0005', 1, 'close');
});

server.get('/0008_relay0_open', function () {
    relay_opertion('0008', 0, 'open');
});
server.get('/0008_relay0_close', function () {
    relay_opertion('0008', 0, 'close');
});

server.get('/0008_relay1_open', function () {
    relay_opertion('0008', 1, 'open');
});
server.get('/0008_relay1_close', function () {
    relay_opertion('0008', 1, 'close');
});




server.get('/0003_sensor', function (req) {
    sensor_read('0003');
    return {
        temprature: sensor_data.temp,
        humidity: sensor_data.humi,
        illumination: sensor_data.ill
    };

});
server.get('/0005_sensor', function (req) {
    sensor_read('0005');
    return {
        temprature: sensor_data.temp,
        humidity: sensor_data.humi,
        illumination: sensor_data.ill
    };
});
server.get('/0008_sensor', function (req) {
    sensor_read('0008');
    return {
        temprature: sensor_data.temp,
        humidity: sensor_data.humi,
        illumination: sensor_data.ill
    };
});



var frame = new Buffer(20);


$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }




        
    //relay_opertion('0003',1,'open');
    //write(commands[4]);
    //setTimeout(function(){
    // write(commands[1]);
    //  relay_opertion('0003',0,'close');
    //},1000);
    //sensor_read('0003');

    $('#zigbee').on('data', function (data) {
        //console.log(data.toString("hex"));

        var head = data[0];
        var device_ID = data.toString("hex", 1, 3);
        // head 字节是否是‘eb’
        if (head === 235) {
            // console.log('hei');
            frame = data;
            // console.log('frame: '+frame.toString("hex"));
            if (frame[4] === (frame.length - 6)) {
                //console.log('zhen yes');
                frame_analysis(frame, sensor_data);
                // console.log('temp: ' + sensor_data.temp);
                // console.log('humi: ' + sensor_data.humi);
                // console.log('ill: ' + sensor_data.ill);
            }
        }
        else {
            frame = Buffer.concat([frame, data]);
            //console.log('frame: ' + frame.toString("hex"));
            if (frame[4] === (frame.length - 6)) {
                //console.log('zhen yes');  
                frame_analysis(frame, sensor_data);
            }
        }

    });


});



function sensor_read(device_id) {
    var command_index = 0;
    switch (device_id) {
        case '0003':
            command_index = 4;
            break;
        case '0005':
            command_index = 9;
            break;
        case '0008':
            command_index = 14;
            break;
        default:
            throw new Error('Device not found');
    }
    write(commands[command_index]);
}




function relay_opertion(device_id, relay_num, open_close) {
    var command_index = 0;
    switch (device_id) {
        case '0003':
            command_index = 0;
            break;
        case '0005':
            command_index = 5;
            break;
        case '0008':
            command_index = 10;
            break;
        default:
            throw new Error('Device not found');
    }
    if (relay_num === 1) {
        command_index += 2;
    }
    if (open_close === 'close') {
        command_index += 1;
        write(commands[command_index]);
    }
    else {
        //setInterval(function () {
        write(commands[command_index]);
        //}, 2000);
    }

}



function frame_analysis(frame, obj) {

    if (is_returning_data(frame)) {

        obj.ill = get_illumination(frame);
        obj.temp = get_temperature(frame);
        obj.humi = get_humidity(frame);

        // console.log('light: ' + get_illumination(frame));
        // console.log('temp: ' + get_temperature(frame));
        // console.log('humi: ' + get_humidity(frame));

        //  console.log('temp: '+obj.temp);
        //   console.log('humi: '+obj.humi);
        //    console.log('ill: '+obj.ill );
    }
    else {
        console.log('Operation has done');
    }

}

function is_returning_data(frame) {
    if (frame[3] === 1) {
        return true;
    }
    else return false;
}

function get_illumination(frame) {

    return frame[5] * 256 + frame[6];
}

function get_temperature(frame) {

    var temp_int = frame[11];
    var temp_dec = frame[12];

    return temp_int + '.' + temp_dec;
}

function get_humidity(frame) {

    var humi_int = frame[13];
    var humi_dec = frame[14];

    return humi_int + '.' + humi_dec;
}


function write(command) {
    var data = Duktape.dec('hex', command);

    var send_command = new Buffer(data);
    $('#zigbee').write(send_command);
}




$.end(function () {
    $('#led-r').turnOff();
});
