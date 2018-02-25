// var Twitter = require('twitter');
// const serverPort = 8091; // default port

// var deviceName = 'Basement speaker';
// var ip = '192.168.1.152'; // default IP      //ここにIPを記載


 
// var client = new Twitter({
//   consumer_key: 'xcnKknoUkpBpOghbD7GKeI0E2',
//   consumer_secret: 'PX8HJPx7qsHhqiyf3xZunVQnx1cLsTJ8Kg48x17dHkOkWGUZ3q',
//   access_token_key: '3032725065-S5NF84VNRqEws7FwWXDiPbXi17GyKCmrEviv6OH',
//   access_token_secret: 'ttl6KRQhpDP37HHvHu0S6oEn78c0P15bNpQdgR0vWa2nR'
// });
 
// var params = {screen_name: 'nodejs'};
// //twurl "/1.1/search/tweets.json?q=from%3ANasa%20OR%20%23nasa"
// var params = {
//     q: '東武東上線 Trainfo',
//     locale: 'ja',
//     count: 10    
// }

// client.get('search/tweets', params, function(error, tweets, response) {
//   if (!error) {    
//     tweets.statuses.forEach(tweetStatus => {
//         if (!tweetStatus.text.includes("RT @")){

//             var tweetDate = new Date(tweetStatus.created_at);
//             var currentDate = new Date("Wed Feb 19 02:17:31 +0000 2018");
//             if(sameDay(tweetDate, currentDate)){
//                 console.log(tweetStatus.text);
//             }
//         }        
//     });
//   }
//   else{
//       console.log(error);
//   }
// });

// function sameDay(d1, d2) {
//     return d1.getFullYear() === d2.getFullYear() &&
//       d1.getMonth() === d2.getMonth() &&
//       d1.getDate() === d2.getDate();
// }

// function sendNotification() {
//     var options = {
//         host: 'www.google.com',
//         port: 80,
//         path: '/upload',
//         method: 'POST'
//       };
      
//       var req = http.request(options, function(res) {
//         console.log('STATUS: ' + res.statusCode);
//         console.log('HEADERS: ' + JSON.stringify(res.headers));
//         res.setEncoding('utf8');
//         res.on('data', function (chunk) {
//           console.log('BODY: ' + chunk);
//         });
//       });
      
//       req.on('error', function(e) {
//         console.log('problem with request: ' + e.message);
//       });
      
//       // write data to request body
//       req.write('data\n');
//       req.write('data\n');
//       req.end();
// }



//test
var request = require('request');

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};

// Configure the request
var options = {
    url: 'http://192.168.1.75:8091/google-home-mini/notify',
    method: 'POST',
    headers: headers,
    form: {'text': 'Nice to meet you', 'lang': 'en'}
};

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body);
    }
});