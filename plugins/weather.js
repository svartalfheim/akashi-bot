'use strict';
var config = require('../config');
var weather = require('../modules/weather');

module.exports = function(controller,bot){
  controller.hears(['今日の天気は？'],'direct_message,direct_mention,mention',function(bot, message) {
    weather.sayTodayArsenal(bot);
  });
};
