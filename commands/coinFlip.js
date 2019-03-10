exports.run = (client, message, args) => {
    let randomNumber = Math.random();
    let coinFlipResult = randomNumber > 0.5 ? "Heads" : "Tails";
    let userTag = message.member.user.tag;
    let userName = userTag.split("#")[0];
    message.channel.send(userName + " did a coin flip and the result is: " + coinFlipResult);
}