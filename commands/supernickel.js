const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  // On récupère un GIF "Super nickel !" aléatoire
  const { url } = await fetch(
    `${process.env.API_URL}/gifs/random?command=supernickel&statsToken=${process.env.STATS_TOKEN}`
  ).then((res) => res.json());

  // Le bot répond avec le GIF
  message.react('🔪');
  message.channel.send(url);
};

module.exports.help = {
  name: ['supernickel', 'super', 'nickel'],
};
