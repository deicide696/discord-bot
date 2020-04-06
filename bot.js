// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '$reportediario') {

  	var date = new Date().toLocaleString("es-CO")  	

  	msg.reply('ESTAMOS A ' + date)
  	
	msg.reply('----------')

  	setTimeout(function(){
		msg.reply('----------')
  	}, 6000);

  	setTimeout(function(){
		msg.reply('-')
  	}, 9000);

  	setTimeout(function(){
		msg.reply('---------- INICIO BOT ----------')
  	}, 12000);

  	setTimeout(function(){
		msg.reply('---------- INICIO BOT ----------')
  	}, 15000);

  	setTimeout(function(){
		msg.reply('-')
  	}, 15000);

  	setTimeout(function(){
		msg.reply('ESTAMOS A ' + new Date())
  	}, 15000);
   
  }
});

client.login(process.env.DISCORD_TOKEN);