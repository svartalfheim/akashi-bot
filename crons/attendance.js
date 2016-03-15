'use strict'

var CronJob = require('cron').CronJob;
var attendance = require('../modules/attendance');

module.exports = function(controller,bot){
  new CronJob('0 0 10 * * 1-5', function(){
    attendance.fetch(bot);
  }, null, true, 'Asia/Tokyo');
};
