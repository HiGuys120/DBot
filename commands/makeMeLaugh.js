const request = require('request');

const url = 'https://icanhazdadjoke.com/';

exports.run = (client, message, args) => {
    request('https://icanhazdadjoke.com/', { json: true }, (error, response, body) => {
        if (error) {
            message.channel.send('Sorry I am unable to make jokes at the moment');
            return;
        }

        if (typeof body.id !== 'undefined') {
            console.log(body['joke']);
            let joke = body.joke;
            message.channel.send(joke);
        } else {
            message.channel.send('Unable to make a joke');
        }
    });
}