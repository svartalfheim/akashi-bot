'use strict'

var config = require('../config');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(controller,bot){
  controller.hears(['([\x{0430}-\x{044F}\x{0410}-\x{042F} ]+)'],['direct_message', 'ambient'],function(bot,message){
    var matches = message.text.match(/([\x{0430}-\x{044F}\x{0410}-\x{042F} ]+)/iu);
    var str = matches[1];
    console.log(str);
    request('https://translate.google.co.jp/?hl=ja#ru/ja/'+encodeURIComponent(str),function(error,response,body){
      if (response.statusCode == 200) {
        var $ = cheerio.load(body);
        var jaString = $('#result_box span').text();
        bot.reply(message,'「'+jaString+'」って言ってるみたいですよ？');
      }else{
        console.log(error);
        bot.reply(message,'？');
      }
    });
  });
};
