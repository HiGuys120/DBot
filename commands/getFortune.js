const request = require('request');
const { getRandomInt } = require('../utils/random.js');

const url = 'http://fortunecookieapi.herokuapp.com/v1/fortunes';

exports.run = (client, message, args) => {
    request(url, { json: true }, (error, response, body) => {
        let numberOfFortunes = body.length;
        let index = getRandomInt(0,numberOfFortunes);
        message.channel.send(body[index].message);
    });
}