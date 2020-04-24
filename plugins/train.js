'use strict'

var train = require('../modules/train');

module.exports = function(controller,bot){

  controller.hears(['山手線は？'],'direct_message,direct_mention,mention',function(message) {
    train.sayYamanoteInfo(bot);
  });

  controller.hears(['東西線は？'],'direct_message,direct_mention,mention',function(message) {
    train.sayTozaiInfo(bot);
  });

  controller.hears(['中央線は？'],'direct_message,direct_mention,mention',function(message) {
    train.sayChuoInfo(bot);
  });

  controller.hears(['西武線は？'],'direct_message,direct_mention,mention',function(message) {
    train.saySeibuInfo(bot);
  });
};
