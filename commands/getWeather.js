const request = require('request');
const botSettings = require('../botSettings.json');

exports.run = (client, message, args) => {
    let place = args.join(' ');
    request('http://api.wunderground.com/api/' + botSettings.wundergroundApiKey + '/conditions/q/ES/' + place + '.json', { json: true }, (error, response, body) => {
        if (typeof body.current_observation !== 'undefined') {
            let location = body.current_observation.display_location.full;
            let weather = body.current_observation.weather;
            let temp = body.current_observation.temp_c;
            let wind = body.current_observation.wind_kph;
            let humidity = body.current_observation.relative_humidity;
            message.channel.send('**Location:** ' + location + '\n'
                + '**Weather:** ' + weather + '\n'
                + '**Temperature:** ' + temp + 'C\n'
                + '**Wind:** ' + wind + 'kph\n'
                + '**Humidity:** ' + humidity + '\n');
        } else {
            message.channel.send('No weather info');
        }
    });
}