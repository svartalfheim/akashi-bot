'use strict'
const Botkit = require('botkit');
const redis = require('botkit/lib/storage/redis_storage');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

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

function loadAssets(dirnames){
  for (const dir of dirnames){
    const dirPath = path.resolve(__dirname, dir);
    fs.readdir(dirPath, (err, list) => {
        for (const file of list) {
            const assetsPath = path.resolve(path, file);
            require(assetsPath)(controller,bot);
        }
    });
  }
}

loadAssets(['plugins','crons']);

// To keep Heroku's free dyno awake
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Ok, dyno is awake.');
}).listen(process.env.PORT || 5000);
