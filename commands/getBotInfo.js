const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let botInfo = new Discord.RichEmbed()
        .setTitle('Bot Information')
        .setColor('#4dff4d')
        .setThumbnail(client.user.displayAvatarUrl)
        .addField('Bot name', client.user.username)
        .addField('Created at', client.user.createdAt);
    
    message.channel.send(botInfo);
}