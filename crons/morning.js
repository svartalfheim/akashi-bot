'use strict'

var config = require('../config');
var CronJob = require('cron').CronJob;
var weather = require('../modules/weather');
var train = require('../modules/train');

module.exports = function(controller,bot){
  new CronJob('0 0 9 * * 1-5', function() {

    bot.say({
      text:"おはようございます！",
      channel:config.CHANNEL_ID.ROOM
    });

    train.sayYamanoteInfo(bot);
    weather.sayTokyo(bot);

  }, null, true, 'Asia/Tokyo');
}
