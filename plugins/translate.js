'use strict'

var config = require('../config');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(controller,bot){
  controller.hears(['ru2ja (.*)'],['direct_message', 'ambient'],function(bot,message){
    var matches = message.text.match(/ru2ja (.*)/i);
    var str = matches[1];
    request('https://translate.google.co.jp/?hl=ja#ru/ja/'+encodeURIComponent(str),function(error,response,body){
      if (response.statusCode == 200) {
        var $ = cheerio.load(body);
        var jaString = $.find('#result_box span').text();
        bot.reply(message,'「'+jaString+'」って言ってるみたいですよ？');
      }else{
        console.log(error);
        bot.reply(message,'？');
      }
    });
  });
};
