'use strict'

var config = require('../config');
var CronJob = require('cron').CronJob;

module.exports = function(bot){
  new CronJob('0 0 19 * * 1-5', function(){
    bot.say({
      text:"お疲れ様でした！",
      channel:config.CHANNEL_ID.ROOM
    });
  }, null, true, 'Asia/Tokyo');
};
