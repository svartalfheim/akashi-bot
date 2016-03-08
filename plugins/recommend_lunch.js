'use strict'

var config = require('../config');

module.exports = function(controller,bot){
  function random(items) {
    return items[Math.floor(Math.random() * items.length)];
  };

  controller.hears(['^お(腹|なか)すいた'],'message_received',function(message) {
    var menus = [
      "カレー","そば","うどん","ステーキ","パスタ","寿司","中華","ラーメン","とんかつ",
      "親子丼","牛丼","定食","ピザ","ハンバーグ","焼魚","唐揚げ"
    ];

    bot.say({
      text:random(menus)+'とかどうですか？'
      channel:config.CHANNEL_ID.ROOM
    });
  });
};
