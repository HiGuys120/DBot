const request = require('request');
const { strToBold, objectPropertiesToMessageString } = require('../utils/print.js');

const url = 'https://kitsu.io/api/edge/anime?filter[text]=';
const propertiesToMessageString = [
    'episodeCount',
    'startDate',
    'endDate',
    'synopsis'
];
const headers = {
    'Accept': 'application/vnd.api+json',
    'Content-type': 'application/vnd.api+json'
};

exports.run = (client, message, args) => {
    let animeName = args.join(' ');
    request(url + animeName, { json: true, headers: headers }, (error, response, body) => {
        if (error) {
            message.channel.send('Sorry I am unable to search anime at the moment');
            return;
        }

        if (typeof body.data !== 'undefined' && typeof body.data[0] !== 'undefined') {
            let title = body.data[0].attributes.titles.en;
            let imageUrl = body.data[0].attributes.posterImage.medium;
            let fixedImageUrl = imageUrl.substr(0, imageUrl.indexOf('?'));
            message.channel.send(
                strToBold('Title:') + ' ' + title + '\n' +
                objectPropertiesToMessageString(body.data[0].attributes, propertiesToMessageString) + '\n' +
                strToBold('Image') + ':', { file: fixedImageUrl }
            );
        } else {
            message.channel.send('No entries found');
        }
    });
}