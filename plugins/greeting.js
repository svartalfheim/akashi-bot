'use strict'

var config = require('../config');

var sayMorningGreeting = function(bot){
  bot.say({
    text:"おはようございます！",
    channel:config.CHANNEL_ID.ROOM
  });
};

module.exports = function(controller,bot){

};
