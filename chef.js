const dotenv = require('dotenv');
const Discord = require('discord.js');
const fs = require('fs');

dotenv.config();

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);
client.commands = new Discord.Collection();

// On initialise toutes les commandes du bot
fs.readdir('./commands/', (error, f) => {
  if (error) console.log(error);

  let commandes = f.filter((f) => f.split('.').pop() === 'js');

  commandes.forEach((f) => {
    let commande = require(`./commands/${f}`);

    if (Array.isArray(commande.help.name)) {
      commande.help.name.forEach((name) => {
        client.commands.set(name, commande);
      });
    } else {
      client.commands.set(commande.help.name, commande);
    }
  });
});

// On initialise tous les événements du bot
fs.readdir('./events/', (error, f) => {
  if (error) console.log(error);

  f.forEach((f) => {
    const events = require(`./events/${f}`);
    const event = f.split('.')[0];

    client.on(event, events.bind(null, client));
  });
});
