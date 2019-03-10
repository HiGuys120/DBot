const request = require('request');
const url = 'http://numbersapi.com/';

exports.run = (client, message, args) => {
    if (args.length==0){
        message.channel.send('Please input a number');
        return;
    }
    let number = args[0];
    request(url+number, {}, (error, response, body) => {
        let numberInfo = body;
        message.channel.send(numberInfo);
    });
}