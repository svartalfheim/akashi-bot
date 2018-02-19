'use strict';
var weather = require('../modules/weather');

module.exports = function(controller){
  controller.hears(['今日の天気は？'],'direct_message,direct_mention,mention',function(bot) {
    weather.sayTokyo(bot);
  });
};
