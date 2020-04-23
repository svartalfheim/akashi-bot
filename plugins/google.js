module.exports = function(controller) {
    controller.hears(['(調べて) (.*)'], ['direct_message', 'direct_mention', 'mention', 'ambient'], function(bot, message) {
        var matches = message.text.match(/調べて (.*)/i);
        if(matches){
          var res = matches[1].replace(' ', '+');

          bot.reply(message, 'っ [ https://www.google.co.jp/search?q=' + res + ' ]');
        }
    });
};
