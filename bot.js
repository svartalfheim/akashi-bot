var Botkit = require('botkit');
var redis = require('botkit/lib/storage/redis_storage');
var http = require('http');
var url = require('url');
var CronJob = require('cron').CronJob;
var request = require('request');

var redisURL = url.parse(process.env.REDISCLOUD_URL);
var redisStorage = redis({
    namespace: 'akashi-bot',
    host: redisURL.hostname,
    port: redisURL.port,
    auth_pass: redisURL.auth.split(":")[1]
});

var controller = Botkit.slackbot({
    debug: true,
    storage: redisStorage
});

var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();

var morningGreeting = function(){
  bot.say({
    text:"おはようございます！",
    channel:"#room"
  });
};

var weather = function(){
  request('http://weather.livedoor.com/forecast/webservice/json/v1?city=130010', function (error, response, body){
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      var today = json.forecasts[0];
      bot.say({
        text:""+today.telop+" "+today.temperature.max+"/"+today.temperature.min,
        channel: "#room"
      });
    }
  });
};

controller.hears(['今日の天気は？'],'direct_message,direct_mention,mention',function(bot, message) {
  weather();
});

new CronJob('0 0 10 * * 1-5', function(){
  morningGreeting();
}, null, true, 'Asia/Tokyo');

// To keep Heroku's free dyno awake
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Ok, dyno is awake.');
}).listen(process.env.PORT || 5000);
