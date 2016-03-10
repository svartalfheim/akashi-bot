'use strict'

const config = require('../config');
const http = require('http');
const https = require('https');
const qs = require('queryString');

function getAccessToken(callback) {
    var body = '';
    var req = https.request({
        host: 'datamarket.accesscontrol.windows.net',
        path: '/v2/OAuth2-13',
        method: 'POST'
    }, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        }).on('end', function () {
            var resData = JSON.parse(body);
            callback(resData.access_token);
        });
    }).on('error', function (err) {
        console.log(err);
    });
    var data = {
        'client_id': process.env.MS_TRANSLATE_CLIENT_ID,
        'client_secret': process.env.MS_TRANSLATE_CLIENT_SECRET,
        'scope': 'http://api.microsofttranslator.com',
        'grant_type': 'client_credentials'
    };

    req.write(qs.stringify(data));
    req.end();
}

function translate(token, text, callback) {
    var options = 'appId=Bearer ' + token + '&to=en&text=' + text +
            '&oncomplete=translated';
    var body = '';
    var req = http.request({
        host: 'api.microsofttranslator.com',
        path: '/V2/Ajax.svc/Translate?' + qs.escape(options),
        method: 'GET'
    }, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        }).on('end', function () {
            eval(body);
        });
    }).on('error', function (err) {
        console.log(err);
    });

    req.end();

    function translated(text) {
        callback(text);
    }
}

module.exports = function(controller,bot){
  controller.hears(['([0-9\u0430-\u044F\u0410-\u042F ]+)'],['direct_message','direct_mention','mention'],function(bot,message){
    var matches = message.text.match(/([0-9\u0430-\u044F\u0410-\u042F ]+)/i);
    var str = matches[1];
    getAccessToken(function (token) {
      translate(token, str, function (translated) {
        bot.reply(message,'「'+translated+'」って言ってるみたいですよ？');
      });
    });
  });
};
