var express     = require('express');
var googlehome  = require('google-home-notifier');
var os          = require('os');
var bodyParser  = require('body-parser');

//Express
const serverPort = 8091;
//GoogleHomeMini Information
const deviceName                = 'Basement speaker';
const googleHomeMiniIpAddress   = '192.168.1.152';

// Returns Servers Ip address
function getLocalIpAddress() {
    var ifaces = os.networkInterfaces();
    var serverIp = "";
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                serverIp = iface.address;
            } else {
                // this interface has only one ipv4 adress
                serverIp = iface.address;
            }
            ++alias;
        });
    });

    return serverIp;
}

// Configure Express
var app = express();
var serverIpAddress = getLocalIpAddress();

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

// POST Request Process for serverIp:port/google-home-mini/notify
app.post('/google-home-mini/notify', urlencodedParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    //Get Parameters
    var text = req.body.text;
    var language = req.body.lang;

    googlehome.ip(googleHomeMiniIpAddress, language);
    googlehome.device(deviceName, language);

    if (text) {
        try {
            if (text.startsWith('http')) {
                var mp3_url = text;
                googlehome.play(mp3_url, function (notifyRes) {
                    console.log(Date(), notifyRes);
                    res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
                });
            } else {
                googlehome.notify(text, function (notifyRes) {
                    console.log(Date(), notifyRes);
                    res.send(deviceName + ' will say: ' + text + '\n');
                });
            }
        } catch (err) {
            console.log(Date(), err);
            res.sendStatus(500);
            res.send(err);
        }
    } else {
        res.send('Please GET "text=Hello Google Home"');
    }
});

app.listen(serverPort, function () {
    console.log("Listening on port 8091");
    console.log('curl -X POST -d "text=Hello Google Home&lang=en" ' + '    http://' + serverIpAddress + ':' + serverPort + '/google-home-mini/notify');
    console.log('curl -X POST -d "text=こんにちは&lang=ja" ' + 'http://' + serverIpAddress + ':' + serverPort + '/google-home-mini/notify');
});