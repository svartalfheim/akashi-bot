'use strict'

var fs = require("fs");
var _ = require("lodash");
var config = require('../config');

module.exports = {
  fetch:function(callback){
    var data = fs.readFileSync("../assets/arsenal.json");
    var json = JSON.parse(data);
    var arsenals = [];
    var weekday = new Date().getDay();

    _.forEach(json,function(arsenal){
      var ships = [];
      _.forEach(arsenal.second_ships,function(ship){
        if(_.indexOf(ship.weekdays,weekday) != -1){
          ships.push(ship);
        }
      });

      if(ships.length > 0){
        arsenals.push({
          "name":arsenal.name,
          "second_ships":ships
        })
      }
    });

    callback(arsenals);
  },
  sayTodayArsenal:function(bot){
    this.fetch(function(arsenals){
      var text = '今日の改修は\n';
      _.forEach(arsenals,function(arsenal){
        text += arsenal.name + ' 二番艦(';
        _.forEach(arsenal.second_ships,function(ship){
          text += ship.name + ' ';
        });
        text += ')\n';
      });
      text += 'ですね！';

      bot.say({
        text:text,
        channel: config.CHANNEL_ID.ROOM
      });
    });
  }
};
