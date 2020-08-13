'use strict';

var app = angular.module('app', []);
app.controller('MainCtrl', MainController);

function MainController($http, $timeout, $interval, $log) {
    this.ready = false;
    this.ip = null;
    this.coord = {
        latitude: 0,
        longitude: 0
    }

    this.state = 'day';
    this.light = false;
    this.ac = false;
    this.heat = false;
    window.rain = false;

    this.electricity = 0;
    this.electricityGenerated = 0;
    this.gas = 0;

    this.changeState = function () {
        this.state = (this.state === 'day') ? 'night' : 'day';
    }

    this.switchLighting = function () {
        this.light = !this.light;
    }

    this.changeWeather = function () {
        window.rain = !window.rain;
    }

    this.getData = function () {
        $http.get('https://ipinfo.io/ip').then((res) => {
            this.ip = res.data;
            return fetch('http://ip-api.com/json/' + this.ip);
        })
            .then((res) => res.json())
            .then((data) => {
                this.coord = { latitude: data.lat, longitude: data.lon };
                window.lat = this.coord.latitude;
                window.lng = this.coord.longitude;
                console.log(this.coord, window.lat);

                var url = 'http://api.openweathermap.org/data/2.5/weather';
                url += '?lat=' + Math.round(this.coord.latitude);
                url += '&lon=' + Math.round(this.coord.longitude);
                url += '&APPID=3d9fd6b4a8b9c90e12f1f4311c638540';

                return $http.get(url);
            }).then((res) => {
                this.weather = res.data;
                this.weather.main.temp -= 273;
                this.weather.temp = Math.floor(this.weather.main.temp);
                this.weather.tempDecimal = Math.floor(this.weather.main.temp * 10) % 10;

                this.insideTemp = this.weather.temp;
                this.insideTempDecimal = this.weather.tempDecimal;

                this.init();
            });
    }

    this.init = function () {
        var now = Math.round(Date.now() / 1000);

        // Set day / night
        if (now > this.weather.sys.sunrise && now < this.weather.sys.sunset) {
            this.state = 'day';
        } else {
            this.state = 'night';
            this.light = true;
        }

        // Set rain
        if (this.weather.rain) {
            window.rain = true;
        }

        /* Remove loading screen */
        $timeout(() => {
            document.getElementById('loading').classList.add('hide');
            $timeout(() => {
                this.ready = true;
            }, delay);
        }, delay);
    }

    this.getData();

    $interval(() => {
        var energyForLightning = 1;
        var energyGeneratedPerInterval = 2;
        var gasConsumption = 0.1;
        var energyConsumption = 1;

        var outside = ((this.weather.temp * 10) + this.weather.tempDecimal) / 10;
        var inside = ((this.insideTemp * 10) + this.insideTempDecimal) / 10;

        var dif = inside - outside;

        if (this.state === 'day') {
            this.electricityGenerated += energyGeneratedPerInterval;
        }

        if (dif > 0) {
            this.gas += dif * gasConsumption;
        } else if (dif < 0) {
            this.electricity += (-dif) * energyConsumption;
        }

        if (this.light) {
            this.electricity += energyForLightning;
        }

        if (this.electricityGenerated > 0) {
            if (this.electricity > this.electricityGenerated) {
                this.electricity -= this.electricityGenerated;
            } else {
                this.electricityGenerated -= this.electricity;
                this.electricity = 0;
            }
        }

        this.electricity = Math.round(this.electricity);

    }, 1000);

    this.modifyTemp = function (x) {

        this.insideTempDecimal += x;
        if (this.insideTempDecimal > 9) {
            this.insideTemp++;
            this.insideTempDecimal = 0;
        } else if (this.insideTempDecimal < 0) {
            this.insideTemp--;
            this.insideTempDecimal = 9;
        }

        var outside = ((this.weather.temp * 10) + this.weather.tempDecimal) / 10;
        var inside = ((this.insideTemp * 10) + this.insideTempDecimal) / 10;

        if (outside == inside) {
            this.ac = this.heat = false;
        } else if (outside > inside) {
            this.ac = true;
            this.heat = false;
        } else {
            this.ac = false;
            this.heat = true;
        }
    }

}
