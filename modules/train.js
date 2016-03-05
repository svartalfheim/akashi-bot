'use strict'

var request = require('request');
var cheerio = require('cheerio');

module.exports = function(){

  var train = {};

  // parser function
  // @return {lineName:"aaa",state:"bbb"}
  var fetchHtml = function(bot,url,callback,parser){
    request(url,function(error,response,body){
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var trainInfo = parser($);

        bot.say({
          text:trainInfo.lineName+"は"+trainInfo.state+"みたいですよ？",
          channel: config.CHANNEL_ID.ROOM
        });
      }else{
        console.log(error);
      }
    });
  };

  train.sayYamanoteInfo = function(bot){
    fetchHtml(bot,
      'http://traininfo.jreast.co.jp/train_info/kanto.aspx',
      function($){
        var container = $("#direction_yamate");
        var lineName = $(container).find("th").text();
        var state = $(container).find("img").attr("alt");

        return {
          lineName:lineName,
          state:state
        }
      });
  }

  train.sayTozaiInfo = function(bot){
    fetchHtml(bot,
      'http://www.tokyometro.jp/unkou/index.html',
      function($){
        var tr = $(".dataTable").find("tr")[4];
        var lineName = $(tr).find("img").attr("alt");
        var state = $(tr).find("p").text();
        state = state.replace(/います。/,'る');

        return {
          lineName:lineName,
          state:state
        }
      });
  }

  return train;
}