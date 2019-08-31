const Discord = require('discord.js');
const type = require("../manager.json");

module.exports = class Clear {
  constructor() {
    this.name = 'Clear',
    this.alias = ['청소']
    this.usage = '/청소'
  }

  run(bot, message, args) {
    const fetchedMessages = message.channel.fetchMessages();
    if (message.channel.type === 'dm') return;
    if (message.author.type === 'bot') return;
    let amount = args[1];
    let timeacount = amount;
    var totalcount;
    let icon = bot.users.get('551109031180238878').displayAvatarURL;
    message.delete()
    type.MANAGER.some(uuid => {
      if (message.author.id == uuid) {
        if ( 1 <= amount && 1000 >= amount ) {
          for(var count = 1; 0 < timeacount; count++) {
            if (timeacount > 100) {
              message.channel.bulkDelete(100).catch(err => {
                return console.log(err);
              })
              timeacount -= 100;
            } else {
              message.channel.bulkDelete(timeacount).then( messages => {
                let clearembed = new Discord.RichEmbed()
                .setTitle('청소 관리자')
                .setThumbnail(message.author.displayAvatarURL)
                .addField("**청소요원**", '**<@' + message.author.id + '>**', false)
                .addField("**청소 신청갯수**", '**' + amount + '**', false)
                .setColor('#33a1ee')
                .setAuthor("혜윰 도우미", message.author.displayAvatarURL)
                .setFooter("Copyright 2019. 오리 All right Reserved.", icon);
                message.channel.send(clearembed).then(msg => { msg.delete(15000) });
              }).catch(err => {
                return console.log(err);
              })
              timeacount -= timeacount;
            }
          }
        } else {
          let clearembed = new Discord.RichEmbed()
          .setTitle('청소 실패')
          .addField("**사용법**", '**/청소 <청소할 갯수> [ 1 ~ 1000개 까지만 가능 ]**', false)
          .setColor('#33a1ee')
          .setAuthor("혜윰 도우미", message.author.displayAvatarURL)
          .setFooter("Copyright 2019. 오리 All right Reserved.", icon);
          return message.channel.send(clearembed).then(msg => { msg.delete(5000) });
        }
      } else {
        return
      }
    })
  }
}
