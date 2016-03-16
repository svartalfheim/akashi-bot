'use strict'

var request = require('request');
var cheerio = require('cheerio');
var config = require('../config');

module.exports = {

  fetchHtml:function(bot,url,parser){
    // parser function
    // @return {lineName:"aaa",state:"bbb"}
    request(url,function(error,response,body){
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body,{decodeEntities: false});
        var trainInfoString = parser($);

        bot.say({
          text:"「"+trainInfoString+"」だそうですよ？",
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

        return lineName+'は'+state+'です'
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

        return lineName+'は'+state+'です'
      });
  },
  saySeibuInfo:function(bot){
    this.fetchHtml(bot,
    'http://www.seibu-group.co.jp/railways/unten/unten.asp',
    function($){
      var text = $('.paragraphmod001').html().split('<br>')[1];

      return text;
    });
  },
  sayChuoInfo:function(bot){
    this.fetchHtml(bot,
    'http://traininfo.jreast.co.jp/train_info/kanto.aspx',
    function($){
      var container = $("#direction_chuo");
      var tr = $(container).find('tr')[0];
      var lineName = $(tr).find('th').text();
      var state = $(tr).find("img").attr("alt");

      return lineName+'は'+state+'です';
    });
  }
}
