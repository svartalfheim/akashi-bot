'use strict'

var config = require('../config');
var request = require('request');

module.exports = {
  CITY:{
    TOKYO:130010,
  },
  parse:function(forecast){
    var parseTemp = function(object){
      var temp = '-';
      if(object){
        temp = object.celsius;
      }
      return temp;
    };

    return {
      day:forecast.dateLabel,
      telop:forecast.telop,
      maxTemp:parseTemp(forecast.temperature.max),
      minTemp:parseTemp(forecast.temperature.min)
    }
  },
  get:function(cityId,complete,error){
    if (!cityId) throw new Error('required argument cityId'); return;

    var self = this;
    console.log(cityId);
    request('http://weather.livedoor.com/forecast/webservice/json/v1?city='+cityId, function (error, response, body){
      console.log(response);
      if (response.statusCode == 200) {
        var json = JSON.parse(body);
        var weathers = [];
        for(var i=0;i<json.forecasts.length;i++){
          weathers.push(self.parse(json.forecasts[i]));
        }
        console.log(complete);
        if(complete && typeof complete === 'function') complete(weathers);
      }else{
        if(error && typeof error === 'function'){
          error(error);
        }else{
          console.log(error);
        }
      }
    });
  },
  sayTokyo:function(bot){
    this.get(this.CITY.TOKYO,
      function(forecasts){
        console.log(forecasts);
        var today = forecasts[0];
        bot.say({
          text:'今日の天気は'+today.telop+' 最高気温:'+maxTemp+'/最低気温:'+minTemp+' ですよ',
          channel: config.CHANNEL_ID.ROOM
        });
      })
  }
}
