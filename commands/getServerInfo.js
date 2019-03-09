const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let serverInfo = new Discord.RichEmbed()
        .setTitle('Server Information')
        .setColor('#4dff4d')
        .setThumbnail(message.guild.displayAvatarUrl)
        .addField('Server name', message.guild.name)
        .addField('Created at', message.guild.createdAt)
        .addField('You joined at', message.member.joinedAt)
        .addField('Total members', message.guild.memberCount);
    
    message.channel.send(serverInfo);
}