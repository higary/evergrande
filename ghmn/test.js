var request = require('request');

request.post(
    {
        url: 'https://f5d9dfd4.ngrok.io/google-home-mini/notify',
        body: { 
            text: 'Hello Google Home',
            lang: 'en'
        } 
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);