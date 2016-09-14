'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    /**
     * @param {Object} inputs A map of assigned interfaces according to `driver.json`.
     * @param {Object} context Context of this instance to attach.
     * @param {string} context.id ID of the device.
     * @param {string} context.model Model of the device.
     * @param {Object} context.args A map of device arguments.
     * @param {Function} callback If the third parameter is added, it's the callback for asyncrhonous attaching.
     */
    attach: function (inputs, context/*, callback */) {
        // Get assigned GPIO interface and set property `_gpio`.
        // See https://ruff.io/zh-cn/api/gpio.html for more information about GPIO interfaces.
        this._adc_x = inputs['adc-x'];
        this._adc_y = inputs['adc-y'];
        this._gpio_k = inputs['gpio-k'];

        this._gpio_k.on('interrupt', function (value) {
            //console.log('interrupt: ', value);
        });
    },
    exports: {
        getVoltage_x: function (callback) {
            return this._adc_x.getVoltage(function (error, voltage) {
                if (error) {
                    console.log(error);
                    return;
                }
                callback(voltage);
                //console.log(voltage);
               return voltage;
                //val  = voltage;
            });
            
        },
        getVoltage_y: function (callback) {
            return this._adc_y.getVoltage(function (error, voltage) {
                if (error) {
                    console.log(error);
                    return;
                }
                callback(voltage);
                 //console.log(voltage);
               return voltage;
                //val  = voltage;
            });
        },
        IsLeft: function(callback){
            this.getVoltage_x(function (voltage) {
                if(voltage>4.8) {
                    callback(true);
                }
                else if(voltage<0.3)
                {
                callback(false);
                }
            })
        },
        IsDown: function(callback){
            this.getVoltage_y(function (voltage) {
                if(voltage>4.8) {
                    callback(true);
                }
                else if(voltage<0.3)
                {
                callback(false);
                }

            })
        }


        // turnOff: function (callback) {
        //    this._gpio.write(Level.low, callback);
        //}
    }
});