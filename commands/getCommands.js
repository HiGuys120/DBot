var listOfCommands = [
    '!getAnime <Anime Name> -> Shows anime info',
    '!getMovie <Movie Name> -> Shows movie info',
    '!getNews <News source> -> Shows current news',
    '!getWeather <Place> -> Shows weather info',
    '!makeMeLaugh -> Shows cool jokes',
    '!getBotInfo -> Shows bot info',
    '!getServerInfo -> Shows server info'
];

exports.run = (client, message, args) => {
    message.channel.send(
        'Commands you can use: ' + '\n' +
        listOfCommands.join('\r\n') + '\n' +
        '!reload <Command Name> -> Reloads command code'
    );
}