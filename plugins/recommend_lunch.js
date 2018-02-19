'use strict'

module.exports = function(controller){
  function random(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  controller.hears(['お(腹|なか)(す|空)いた'],['direct_message', 'ambient'],function(bot,message) {
    var menus = [
      "カレー","そば","うどん","ステーキ","パスタ","寿司","中華","ラーメン","とんかつ",
      "親子丼","牛丼","定食","ピザ","ハンバーグ","焼魚","唐揚げ","チャーハン","餃子","オムライス",
      "天丼","海鮮丼","おでん","お好み焼き","釜飯","うなぎ","カキフライ","ピロシキ","沖縄料理","タイ料理","韓国料理"
    ];
    var speechs = [
      "うーん、そうですね…、xxはどうですか？",
      "あ、xxとかいいですね！",
      "xxがおいしいお店があるみたいですよ！",
      "提督、xxはいかがでしょう？",
      "私はxxが食べたいです！ …えっ、違いました？",
      "今日はxxがオススメですよ！",
      "それなら、xx食べに行きましょう！",
      "間宮さんのオススメはxxみたいですよ！",
      "提督は何がお好きですか？ xxとかいかがです？",
      "ちょっと小腹が空きましたね！ おいしいxxが食べたいな～！",
      "xxはいかがでしょう？ 今度、私と大淀も誘ってくださいね！"
    ];

    var speech = random(speechs);
    var menu = random(menus);
    bot.reply(message,speech.replace(/xx/,menu));
  });
};
