const request = require('request');

const url = 'https://some-random-api.ml/dogfact';

exports.run = (client, message, args) => {
    request(url, { json: true }, (error, response, body) => {
        message.channel.send(body.fact);
    });
}