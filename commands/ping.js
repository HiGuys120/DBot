exports.run = (client, message, args) => {
    message.channel.send("Pong! Yes, I am alive").catch(console.error);
}