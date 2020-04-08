// Run dotenv (.env)
require('dotenv').config();

const Discord = require('discord.js');
const Sequelize = require('sequelize');

const client = new Discord.Client();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  logging: true,
  storage: process.env.DB_STORAGE,
});

// TODO: Pendiente de remover createdAt y updatedAt
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  }
});

const Team = sequelize.define('team', {
  name: {
    type: Sequelize.STRING
  }
});

const Task = sequelize.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pendiente',
    allowNull: false,
  },
  deadline: Sequelize.DATE
});

User.belongsTo(Team)
Task.belongsTo(Team)
Task.belongsTo(User)

client.on('ready', () => {
  
  console.log(`Logged in as ${client.user.tag}!`)

  User.sync()
  Task.sync()

  // DROP TABLE IF EXISTS `teams` (force: true)
  Team.sync({force: true}).then(function () {
    
    // Crea los equipos al iniciar la creación de la tabla
    Team.create({
      name: 'Gerencia'
    });

    Team.create({
      name: 'Ventas/Mercadeo'
    });

    Team.create({
      name: 'Integral/RRHH'
    });

    Team.create({
      name: 'Diseño'
    });

    Team.create({
      name: 'Proyectos/Presupuestos'
    });

    Team.create({
      name: 'Mantenimiento'
    });

    Team.create({
      name: 'Compras'
    });

    Team.create({
      name: 'Contabilidad'
    });

    Team.create({
      name: 'Backoffice'
    });
  });
});

client.on('message', async message => {

  try {
        // equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
        const tag = await Tags.create({
          name: 'prueba',
          description: 'tagDescription',
          username: message.author.username,
        });
        return message.reply(`Tag ${tag.name} added.`);
      } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
          return message.reply('That tag already exists.');
        }
        return message.reply('Something went wrong with adding a tag.');
      }





  if (message.content === '$reportediario') {

  	var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']

  	var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']  	
    	
  	message.reply('---------- \n----------')

  	setTimeout(function(){
  		message.reply('-')
    }, 1000);

    setTimeout(function(){
  		message.reply('---------- INICIO BOT ----------\n---------- INICIO BOT ----------')
    }, 1500);

    setTimeout(function(){
  		message.reply('-')
    }, 3500);

    setTimeout(function(){
  		message.reply('Estamos a ' + days[new Date().getDay()] + ' ' + new Date().getDate() + ' de ' + months[new Date().getMonth()] + ' del ' + new Date().getFullYear())
    }, 4000);

    setTimeout(function(){
  		message.reply('-')
    }, 8000);

    setTimeout(function(){
  		message.reply(`Hola ${message.author.username}. Gracias por contactarme. ¡Estoy a tus ordenes! Voy a ayudarte a hacer rápidamente el informe diario para tu líder de equipo y las gerencias.`)
    }, 8500);

    setTimeout(function(){
  		message.reply('-')
    }, 17000);

    setTimeout(function(){
  		message.reply('---------- AYER ----------\n---------- AYER ----------')
    }, 17500);

    setTimeout(function(){
  		message.reply('-')
    }, 19500);

    setTimeout(function(){
  		message.reply('Empecemos por AYER')
    }, 20000);

    setTimeout(function(){
  		message.reply('Quedaron listas o completadas las siguientes tareas, que estaban programas para hacer AYER? responde SI o NO:')
    }, 22000);
  }
});

client.login(process.env.DISCORD_TOKEN);