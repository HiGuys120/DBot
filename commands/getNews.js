const request = require('request');
const botSettings = require('../botSettings.json');
const { objectPropertiesToMessageString } = require('../utils/print.js');

const url = 'https://newsapi.org/v2/top-headlines?sources=';
const propertiesToMessageString = [
    'author',
    'title',
    'publishedAt',
    'description',
    'url'
];

exports.run = (client, message, args) => {
    let newsSource = args.join(' ');
    request(url + newsSource + '&apiKey=' + botSettings.newsOrgApiKey, { json: true }, (error, response, body) => {
        if (error) {
            message.channel.send('Sorry I am unable to search news at the moment');
            return;
        }

        if (body.status == 'ok') {
            var length = Math.min(3, body.articles.length)
            var i;
            for (i = 0; i < length; i++) {
                message.channel.send(
                    objectPropertiesToMessageString(body.articles[i], propertiesToMessageString)
                );
            }
        } else {
            message.channel.send('Unable to find news');
        }
    });
}