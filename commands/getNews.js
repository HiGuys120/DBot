const request = require('request');
const botSettings = require('../botSettings.json');

exports.run = (client, message, args) => {
    let newsSource = args.join(' ');
    request('https://newsapi.org/v2/top-headlines?sources=' + newsSource + '&apiKey=' + botSettings.newsOrgApiKey, { json: true }, (error, response, body) => {
        if (body.status == 'ok') {
            var length = Math.min(3, body.articles.length)
            var i;
            for (i = 0; i < length; i++) {
                let author = body.articles[i].author;
                let title = body.articles[i].title;
                let description = body.articles[i].description;
                let url = body.articles[i].url;
                let publishedAt = body.articles[i].publishedAt;
                message.channel.send('**Author:** ' + author + '\n'
                    + '**Title:** ' + title + '\n'
                    + '**Published at:** ' + publishedAt + '\n'
                    + '**Description:** ' + description + '\n'
                    + '**Find out more:** ' + url);
            }
        } else {
            message.channel.send('Unable to find news');
        }
    });
}