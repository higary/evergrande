var Twitter = require('twitter');
var config = require('./config.json');

var client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
});

//twurl "/1.1/search/tweets.json?q=from%3ANasa%20OR%20%23nasa"
var params = {
    q: config.train_line_name + ' Trainfo',
    locale: 'ja',
    count: 10
}

client.get('search/tweets', params, function (error, tweets, response) {
    if (!error) {
        var news = [];
        tweets.statuses.forEach(tweetStatus => {
            // Exclude retweets
            if (!tweetStatus.text.includes("RT @")) {

                var tweetDate = new Date(tweetStatus.created_at);
                var currentDate = new Date();
                if (isSameDay(tweetDate, currentDate)) {
                    // does the test strings contains this terms? run the tests agains every element in the array
                    var includeResult = config.search_keywords.some(el => tweetStatus.text.includes(el));
                    if (includeResult)
                        news.push(tweetStatus);
                }
            }
        });
        console.log(news);
        if (news.length > 0) {
            // There is delay information for XXX line
            sendNotification(config.train_line_name + "の遅延情報があります。");
        }
    } else {
        console.log(error);
    }
});

function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

// Send notification request to GoogleHomeMini
function sendNotification(text) {
    //test
    var request = require('request');

    // Set the headers
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    // Configure the request
    var options = {
        url: 'http://192.168.1.63:8091/google-home-mini/notify',
        method: 'POST',
        headers: headers,
        form: {
            'text': text,
            'lang': 'ja'
        }
    };

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body);
        }
    });
}