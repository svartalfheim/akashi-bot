'use strict'

var _ = require("lodash");
var arsenal = require('../modules/arsenal');

module.exports = function(controller,bot){

  controller.hears(['今日の改修は？'],'direct_message,direct_mention,mention',function(message) {
    arsenal.sayTodayArsenal(bot,arsenal.PRIORITY.HIGH);
  });
  controller.hears(['今日の改修全部見せて'],'direct_message,direct_mention,mention',function(message) {
    arsenal.sayTodayArsenal(bot,arsenal.PRIORITY.LOW);
  });
};
