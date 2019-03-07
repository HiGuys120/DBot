exports.run = (client, message, args) => {
    message.channel.send('Commands you can use: ' + '\n'
        + '!getAnime <Anime Name> -> Shows anime info' + '\n'
        + '!getMovie <Movie Name> -> Shows movie info' + '\n'
        + '!getNews <News source> -> Shows current news' + '\n'
        + '!getWeather <Place> -> Shows weather info' + '\n'
        + '!makeMeLaugh -> Shows cool jokes');
}