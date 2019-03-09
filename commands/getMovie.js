const request = require('request');
const botSettings = require('../botSettings.json');
const { strToBold, objectPropertiesToMessageString } = require('../utils/print.js');

const url = 'http://www.omdbapi.com/?t=';
const propertiesToMessageString = [
    'Title',
    'Released',
    'Runtime',
    'imdbRating',
    'Genre',
    'Plot'
];

exports.run = (client, message, args) => {
    let movieName = args.join(' ');
    request(url + movieName + '&apikey=' + botSettings.omdbpApiKey, { json: true }, (error, response, body) => {
        if (error) {
            message.channel.send('Sorry I am unable to search movies at the moment');
            return;
        }

        if (typeof body.Title !== 'undefined') {
            let imageUrl = body.Poster;
            message.channel.send(
                objectPropertiesToMessageString(body, propertiesToMessageString) + '\n' +
                strToBold('Image') + ':', { file: imageUrl }
            )
        } else {
            message.channel.send('No entries found');
        }
    });
}