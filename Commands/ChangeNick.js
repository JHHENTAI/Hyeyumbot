const Discord = require('discord.js');
const type = require("../manager.json");

module.exports = class ChangeNick {
  constructor() {
    this.name = 'ChangeNick',
    this.alias = ['닉변']
    this.usage = '/닉변'
  }

  run(bot, message, args) {
    if (message.channel.type === 'dm') return;
    if (message.author.type === 'bot') return;
    let nickchannel = message.guild.channels.find(x => x.name === "🔖개명신청소");
    if(!nickchannel) return message.channel.send("🔖개명신청소 채널이 없습니다. 관리자에게 문의해주세요!");
    let tempname = message.member.displayName;
    let subname = tempname.split(' : ');
    let name = message.content.split('/닉변 ');
    let fullname = name[1] + " : " + subname[1];
    let icon = bot.users.get('551109031180238878').displayAvatarURL;
    if (message.channel.id == nickchannel.id) {
      if (name.length > 1) {
        if (message.member.id != message.guild.ownerID) {
          if (fullname.length <= 32 && fullname.length >= 2) {
            let nickembed = new Discord.RichEmbed()
            .setTitle('닉네임변경 신청')
            .setThumbnail(message.author.displayAvatarURL)
            .addField("**사용중인 닉네임**", '**' + tempname + '**', false)
            .addField("**신청 할 닉네임**", '**' + name[1] + '**', false)
            .addField("**변경 후 닉네임**", '**' + fullname + '**', false)
            .setColor('#33a1ee')
            .setAuthor("혜윰 도우미", message.author.displayAvatarURL)
            .setFooter("Copyright 2019. 오리 All right Reserved.", icon);

            message.delete();
            message.channel.send(nickembed).then(msg => {
              msg.react('✅').then( r => {
                msg.react('❌')
              });

              const okfilter = (reaction, user) => type.MANAGER.some(uuid => reaction.emoji.name === '✅' && user.id === uuid);
              const nofilter = (reaction, user) => type.MANAGER.some(uuid => reaction.emoji.name === '❌' && user.id === uuid);
              const ok = msg.createReactionCollector(okfilter, { time: 86400000 });
              const no = msg.createReactionCollector(nofilter, { time: 86400000 });

              ok.on('collect', (reaction, user) => {
                type.MANAGER.some(uuid => {
                  if(reaction.users.has(uuid)) {
                    message.guild.members.get(message.author.id).setNickname(fullname)
                    let okembed = new Discord.RichEmbed()
                    .setTitle('닉네임변경 완료')
                    .setThumbnail(message.author.displayAvatarURL)
                    .addField("**변경 전 닉네임**", '**' + tempname + '**', false)
                    .addField("**변경 후 닉네임**", '**' + fullname + '**', false)
                    .addField("**처리대상**", '**<@' + message.author.id + '>**', false)
                    .addField("**처리자**", '**<@' + message.guild.members.get(uuid).id + '>**', false)
                    .setColor('#00FF00')
                    .setAuthor("혜윰 도우미", bot.users.get(uuid).displayAvatarURL)
                    .setFooter("Copyright 2019. 오리 All right Reserved.", icon);
                    msg.delete();
                    return message.channel.send(okembed);
                  }
                })
              })

              no.on('collect', (reaction, user) => {
                type.MANAGER.some(uuid => {
                  if(reaction.users.has(uuid)) {
                    let noembed = new Discord.RichEmbed()
                    .setTitle('닉네임변경 실패')
                    .setThumbnail(message.author.displayAvatarURL)
                    .addField("**변경 전 닉네임**", '**' + tempname + '**', false)
                    .addField("**변경실패 사유**", '**사용할 수 없는 닉네임 입니다.**', false)
                    .addField("**처리대상**", '**<@' + message.author.id + '>**', false)
                    .addField("**처리자**", '**<@' + message.guild.members.get(uuid).id + '>**', false)
                    .setColor('#FF4500')
                    .setAuthor("혜윰 도우미", bot.users.get(uuid).displayAvatarURL)
                    .setFooter("Copyright 2019. 오리 All right Reserved.", icon);
                    msg.delete();
                    return message.channel.send(noembed);
                  }
                })
              })
            });
          } else {
            let noembed = new Discord.RichEmbed()
            .setTitle('닉네임변경 거부')
            .addField("**사유**", '**32자리가 초과되어 닉네임을 변경할 수 없습니다.**', true)
            .setColor('#FF4500')
            .setAuthor("혜윰 도우미", message.member.displayAvatarURL)
            .setFooter("Copyright 2019. 오리 All right Reserved.", icon);
            message.delete();
            message.channel.send(noembed).then(d_msg => {d_msg.delete(10000);});
          }
        } else {
          let noembed = new Discord.RichEmbed()
          .setTitle('닉네임변경 거부')
          .addField("**사유**", '**서버 개설자의 닉네임은 변경할 수 없습니다.**', true)
          .setColor('#FF4500')
          .setAuthor("혜윰 도우미", message.member.displayAvatarURL)
          .setFooter("Copyright 2019. 오리 All right Reserved.", icon);
          message.delete();
          message.channel.send(noembed).then(d_msg => {d_msg.delete(10000);});
        }
      } else {
        let noembed = new Discord.RichEmbed()
        .setTitle('닉네임변경 거부')
        .addField("**사유**", '**최소 1자리 이상 입력 하셔야 닉네임을 변경할 수 있습니다.**', true)
        .setColor('#FF4500')
        .setAuthor("혜윰 도우미", message.member.displayAvatarURL)
        .setFooter("Copyright 2019. 오리 All right Reserved.", icon);
        message.delete();
        message.channel.send(noembed).then(d_msg => {d_msg.delete(10000);});
      }
    } else {
      message.delete();
      message.channel.send("이 명령어는 " + nickchannel + " 에서만 사용 가능합니다.").then(d_msg => {d_msg.delete(10000);});
    }
  }
}
