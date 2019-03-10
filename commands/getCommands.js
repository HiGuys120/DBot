var listOfCommands = [
    '!getAnime <Anime Name> -> Shows anime info',
    '!getMovie <Movie Name> -> Shows movie info',
    '!getNews <News source> -> Shows current news',
    '!getWeather <Place> -> Shows weather info',
    '!getBotInfo -> Shows bot info',
    '!getServerInfo -> Shows server info',
    '!getInfoAboutNumber <Number> -> Shows facts about the number',
    '!makeMeLaugh -> Shows cool jokes',
    '!coinFlip -> Does a coin flip',
    '!ping -> returns pong'
];

exports.run = (client, message, args) => {
    message.channel.send(
        'Commands you can use: ' + '\n' +
        listOfCommands.join('\r\n') + '\n' +
        '!reload <Command Name> -> Reloads command code'
    );
}