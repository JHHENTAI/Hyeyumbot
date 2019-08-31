const Discord = require('discord.js');
const bot = new Discord.Client();
const { CommandHandler } = require('djs-commands')
const CH =new CommandHandler({
  folder: __dirname + "/Commands/",
  prefix: ['/']
});

bot.on('ready', () => {
  bot.user.setPresence({game: { name: '혜윰 서버 Supporter'}, status: 'dnd'})
  console.log('=== 혜윰봇 실행 ===');
  console.log('봇 이름 : ' + bot.user.username);
  console.log('봇 아이디 : ' + bot.user.id);
  console.log('===================');
});

bot.on('message', message => {
  if (message.channel.type === 'dm') return;
  if (message.author.type === 'bot') return;
  let args = message.content.split(" ");
  let command = args[0];
  let cmd = CH.getCommand(command);
  if(!cmd) return;

  try {
    cmd.run(bot, message, args);
  } catch(e) {
    console.log(e)
  }
})

bot.login(process.env.BOT_TOKEN)
