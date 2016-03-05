'use strict'

var train = require('../modules/train');
var config = require('../config');

module.exports = function(controller,bot){

  controller.hears(['山手線は？'],'direct_message,direct_mention,mention',function(message) {
    train.sayYamanoteInfo(bot);
  });

  controller.hears(['東西線は？'],'direct_message,direct_mention,mention',function(message) {
    train.sayTozaiInfo(bot);
  });
};
