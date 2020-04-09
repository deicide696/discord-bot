// Run dotenv (.env)
require('dotenv').config();

const Discord = require('discord.js');
const Sequelize = require('sequelize');
const addSubtractDate = require("add-subtract-date");

const client = new Discord.Client();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  logging: false,
  storage: process.env.DB_STORAGE,
});

// TODO: Pendiente de remover createdAt y updatedAt
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  discordId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
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

client.on('ready', async () => {
  
  console.log(`Logged in as ${client.user.tag}!`)

  User.sync()
  // Task.sync({force: true}).then(function () {

  //   Task.create({
  //     name: 'Prueba',
  //     description: 'Descripción de prueba',
  //     status: 'pendiente',
  //     deadline: new Date().toISOString().slice(0,10),
  //     teamId: 1,
  //     userId: 1
  //   })  
  // });

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

  var indexTaskYesterday = 1;
  var findAllTaskYesterday;

  if (message.content === '$reportediario') {

    // Busca el usuario en la base de datos, sino lo agrega
    var currentUser = await User.findOne({ where: { discordId: message.author.id } });

    if (currentUser === null) {

      try {
        currentUser = await User.create({
          name: message.author.username,
          discordId: message.author.id,
          teamId: 1,
        });

        return message.reply(`User ${user.name} added.`)
      }

      catch (e) {

        if (e.name === 'SequelizeUniqueConstraintError') {
          console.log('That user already exists.')
        }

        console.log('Something went wrong with adding a user.');
      }
    }

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

    var yesterday = addSubtractDate.subtract(new Date(), 1, "days")

    // Busca las tareas del día de ayer del usuario en la base de datos
    findAllTaskYesterday = await Task.findAll({ where: { deadline: yesterday.toISOString().slice(0,10) + 'T00:00:00.000Z', userId: currentUser.id } });

    if(findAllTaskYesterday) {

      setTimeout(function(){
        message.reply('Quedaron listas o completadas las siguientes tareas, que estaban programas para hacer AYER? responde SI o NO:')

        message.reply('- La tarea ' + findAllTaskYesterday[0].name + ' fue completada?');

      }, 22000);
    }

    else {

      setTimeout(function(){
        message.reply('No tienes ninguna tarea')
      }, 22000);
    }    
  }

  else if(message.content === '$si'){
    
    message.reply('Felicitaciones por haber completado la tarea!')

    for (var i = indexTaskYesterday; i < findAllTaskYesterday.length; i++) {
      
      setTimeout(function(){

        message.reply('- La tarea ' + findAllTaskYesterday[i].name + ' fue completada?');

      }, 2000);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);