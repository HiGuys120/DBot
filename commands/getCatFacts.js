const request = require('request');

const url = 'https://catfact.ninja/fact';

exports.run = (client, message, args) => {
    request(url, { json: true }, (error, response, body) => {
        message.channel.send(body.fact);
    });
}