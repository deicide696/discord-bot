// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '$reportediario') {

	var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']

	var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']  	
  	
	msg.reply('---------- \n----------')

	setTimeout(function(){
		msg.reply('-')
  	}, 3000);

  	setTimeout(function(){
		msg.reply('---------- INICIO BOT ----------\n---------- INICIO BOT ----------')
  	}, 6000);

  	setTimeout(function(){
		msg.reply('-')
  	}, 9000);

  	setTimeout(function(){
		msg.reply('Estamos a ' + days[new Date().getDay()] + ' ' + new Date().getDate() + ' de ' + months[new Date().getMonth()] + ' del ' + new Date().getFullYear())
  	}, 12000);

  	setTimeout(function(){
		msg.reply('-')
  	}, 15000);

  	setTimeout(function(){
		msg.reply('Hola. Gracias por contactarme. ¡Estoy a tus ordenes! Voy a ayudarte a hacer rápidamente el informe diario para tu líder de equipo y las gerencias.')
  	}, 18000);

  	setTimeout(function(){
		msg.reply('-')
  	}, 21000);

  	setTimeout(function(){
		msg.reply('---------- AYER ----------\n---------- AYER ----------')
  	}, 24000);

  	setTimeout(function(){
		msg.reply('-')
  	}, 27000);

  	setTimeout(function(){
		msg.reply('Empecemos por AYER')
  	}, 30000);

  	setTimeout(function(){
		msg.reply('Quedaron listas o completadas las siguientes tareas, que estaban programas para hacer AYER? responde SI o NO:')
  	}, 33000);
  }
});

client.login(process.env.DISCORD_TOKEN);