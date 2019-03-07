const request = require('request');
const botSettings = require('../botSettings.json');

exports.run = (client, message, args) => {
    let movieName = args.join(' ');
    request('http://www.omdbapi.com/?t=' + movieName + '&apikey=' + botSettings.omdbpApiKey, { json: true }, (error, response, body) => {
        if (typeof body.Title !== 'undefined') {
            let title = body.Title;
            let releaseDate = body.Released;
            let runTime = body.Runtime;
            let rating = body.imdbRating;
            let genre = body.Genre;
            let synopsis = body.Plot;
            let imageUrl = body.Poster;
            message.channel.send('**Title:** ' + title + '\n'
                + '**Release Date:** ' + releaseDate + '\n'
                + '**Runtime:** ' + runTime + '\n'
                + '**Rating:** ' + rating + '\n'
                + '**Genre:** ' + genre + '\n'
                + '**Synopsis:** ' + synopsis + '\n'
                + '**Image:**',
                { file: imageUrl })
        } else {
            message.channel.send('No entries found');
        }
});
}