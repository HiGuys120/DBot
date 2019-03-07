const request = require('request');

exports.run = (client, message, args) => {
    let animeName = args[0];
    request('https://kitsu.io/api/edge/anime?filter[text]=' + animeName, { json: true, headers: { 'Accept': 'application/vnd.api+json', 'Content-type': 'application/vnd.api+json' } }, (error, response, body) => {
        if (typeof body.data[0] !== 'undefined') {
            let title = body.data[0].attributes.titles.en;
            let episodeCount = body.data[0].attributes.episodeCount;
            let startDate = body.data[0].attributes.startDate;
            let endDate = body.data[0].attributes.endDate;
            let synopsis = body.data[0].attributes.synopsis;
            let imageUrl = body.data[0].attributes.posterImage.medium;
            let fixedImageUrl = imageUrl.substr(0, imageUrl.indexOf('?'));
            message.channel.send('**Title:** ' + title + '\n'
                + '**Episode Count:** ' + episodeCount + '\n'
                + '**Start Date:** ' + startDate + '\n'
                + '**End Date:** ' + endDate + '\n'
                + '**Synopsis:**\n' + synopsis + '\n'
                + '**Image:**',
                { file: fixedImageUrl });
        } else {
            message.channel.send('No entries found');
        }
    });
}