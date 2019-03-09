const request = require('request');
const botSettings = require('../botSettings.json');
const { strToBold } = require('../utils/print.js');

const url = 'http://api.wunderground.com/api/';

exports.run = (client, message, args) => {
    let place = args.join(' ');
    request(url + botSettings.wundergroundApiKey + '/conditions/q/ES/' + place + '.json', { json: true }, (error, response, body) => {
        if (error) {
            message.channel.send('Sorry I am unable to search weather info at the moment');
            return;
        }

        if (typeof body.current_observation !== 'undefined') {
            let location = body.current_observation.display_location.full;
            let weather = body.current_observation.weather;
            let temp = body.current_observation.temp_c;
            let wind = body.current_observation.wind_kph;
            let humidity = body.current_observation.relative_humidity;
            message.channel.send(
                strToBold('Location') + ': ' + location + '\n' +
                strToBold('Weather') + ': ' + weather + '\n' +
                strToBold('Temperature') + ': ' + temp + 'C\n' +
                strToBold('Wind') + ': ' + wind + 'kph\n' +
                strToBold('Humidity') + ': ' + humidity + '\n'
            );
        } else {
            message.channel.send('No weather info');
        }
    });
}