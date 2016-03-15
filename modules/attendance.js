'use strict'

var config = require('../config');
var _ = require("lodash");

module.exports = {
  fetch:function(bot){
    bot.api.channels.info({channel:config.CHANNEL_ID.ROOM},function(error,response){
      if(error){
        console.log(error);
      }else{
        _.forEach(response.channel.members,function(memberKey){
          bot.api.users.list({presence:1},function(error,response){
            if(error){
              console.log(error);
            }else{
              _.forEach(response.members,function(member){
                if(member.name == 'akashi-bot') return;
                if(member.id == memberKey && member.presence == "active"){
                  bot.say({
                    text:member.name + '提督が着任されました！本日もよろしくお願いします！',
                    channel:config.CHANNEL_ID.ROOM
                  });
                }
              });
            }
          });
        });
      }
    });
  }
}
