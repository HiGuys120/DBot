const request = require('request');

const url = 'https://some-random-api.ml/catimg';

exports.run = (client, message, args) => {
    request(url, { json: true }, (error, response, body) => {
        message.channel.send(body.link);
    });
}