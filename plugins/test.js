'use strict'

var attendance = require('../modules/attendance');

module.exports = function(controller,bot){

  controller.hears(['テスト'],'direct_message,direct_mention,mention',function(message) {
    attendance.fetch(bot);
  });
};
