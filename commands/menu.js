const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  // On récupère une présentation de menu aléatoire
  const { menu, url } = await fetch(
    `${process.env.API_URL}/menus/random?statsToken=${process.env.STATS_TOKEN}`
  ).then((res) => res.json());

  // Le bot répond avec la présentation du menu
  message.react('🍽️');
  message.channel.send(`${menu}\n\n🎥 ${url}`);
};

module.exports.help = {
  name: ['menu', 'video'],
};
