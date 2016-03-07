'use strict'

var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var config = require('../config');

var filePath = path.join(__dirname, "../assets/arsenal.json");

module.exports = {
  fetch:function(callback){
    var data = fs.readFileSync(filePath);
    var json = JSON.parse(data);
    var arsenals = [];
    var weekday = new Date().getDay();

    _.forEach(json.refurbishments,function(arsenal){

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
      if(arsenals.length > 0){
        _.forEach(arsenals,function(arsenal){
          text += arsenal.name + ' (';
          var flag = false;
          _.forEach(arsenal.second_ships,function(ship){
            if(flag) text += ' ';
            text += ship.name;
            if(!flag) flag = true;
          });
          text += ')\n';
        });
        text += 'ですね！';
      }else{
        text += '特にないですね...'
      }


      bot.say({
        text:text,
        channel: config.CHANNEL_ID.ROOM
      });
    });
  }
};
