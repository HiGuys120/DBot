const request = require('request');

exports.run = (client, message, args) => {
    request('https://icanhazdadjoke.com/', { json: true }, (error, response, body) => {
        if (typeof body.id !== 'undefined') {
            let joke = body.joke;
            message.channel.send(joke);
        } else {
            message.channel.send('Unable to make a joke');
        }
    });
}