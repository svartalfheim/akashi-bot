'use strict'

var config = require('../config');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(controller,bot){
  controller.hears(['([0-9\u0430-\u044F\u0410-\u042F ]+)'],['direct_message', 'ambient'],function(bot,message){
    var matches = message.text.match(/([0-9\u0430-\u044F\u0410-\u042F ]+)/i);
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
