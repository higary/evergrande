var express = require('express');
var googlehome = require('google-home-notifier');
//ngrok secure introspectable tunnels to localhost webhohook development tool and debugging tool
//localhostのポートをngrok.comとトンネリングして外部へ公開するツール
//接続するにはhttpsでないといけない場合、Herokuにデプロイなどhttps化しないといけないので
var ngrok = require('ngrok');
var bodyParser = require('body-parser');
var app = express();
const serverPort = 8091; // default port

var deviceName = 'Basement speaker';
var ip = '192.168.1.152'; // default IP      //ここにIPを記載


var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/google-home-mini/notify', urlencodedParser, function (req, res) {

  if (!req.body) return res.sendStatus(400)
  console.log(req.body);

  var text = req.body.text;
  var language = req.body.lang;

  if (req.query.ip) {
     ip = req.query.ip;
  }

  googlehome.ip(ip, language);
  googlehome.device(deviceName,language)　　　　　　　//ここに命令文を追加

  if (text){
    try {
      if (text.startsWith('http')){
        var mp3_url = text;
        googlehome.play(mp3_url, function(notifyRes) {
          console.log(notifyRes);
          res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
        });
      } else {
        googlehome.notify(text, function(notifyRes) {
          console.log(notifyRes);
          res.send(deviceName + ' will say: ' + text + '\n');
        });
      }
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
      res.send(err);
    }
  }else{
    res.send('Please GET "text=Hello Google Home"');
  }
})

app.get('/google-home-mini/notify', function (req, res) {

  console.log(req.query);

  var text = req.query.text;
  var language = req.query.lang;

  if (req.query.ip) {
     ip = req.query.ip;
  }

  googlehome.ip(ip, language);
  googlehome.device(deviceName,language)　　　　　　　　//ここに命令文を追加

  if (text) {
    try {
      if (text.startsWith('http')){
        var mp3_url = text;
        googlehome.play(mp3_url, function(notifyRes) {
          console.log(notifyRes);
          res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
        });
      } else {
        googlehome.notify(text, function(notifyRes) {
          console.log(notifyRes);
          res.send(deviceName + ' will say: ' + text + '\n');
        });
      }
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
      res.send(err);
    }
  }else{
    res.send('Please GET "text=Hello+Google+Home"');
  }
})

app.listen(serverPort, function () {
  ngrok.connect(serverPort, function (err, url) {
    console.log('Endpoints:');
    console.log('    http://' + ip + ':' + serverPort + '/google-home-mini/notify');
    console.log('    ' + url + '//google-home-mini/notify');
    console.log('GET example:');
    console.log('curl -X GET ' + url + '/google-home-mini/notify?text=Hello+Google+Home');
        console.log('POST example:');
        console.log('curl -X POST -d "text=Hello Google Home" ' + url + '/google-home-mini/notify');
  });
})