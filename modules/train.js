'use strict'

var request = require('request');
var cheerio = require('cheerio');

module.exports = {

  fetchHtml:function(bot,url,parser){
    // parser function
    // @return {lineName:"aaa",state:"bbb"}
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
  },
  sayYamanoteInfo:function(bot){
    this.fetchHtml(bot,
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
  },
  sayTozaiInfo:function(bot){
    this.fetchHtml(bot,
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
}
