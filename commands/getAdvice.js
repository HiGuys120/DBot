const request = require('request');

const url = 'https://api.adviceslip.com/advice';

exports.run = (client, message, args) => {
    request(url, { json: true }, (error, response, body) => {
        message.channel.send(body.slip.advice);
    });
}