const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  // On récupère une citation aléatoire
  const { quote } = await fetch(
    `${process.env.API_URL}/quotes/random?statsToken=${process.env.STATS_TOKEN}`
  ).then((res) => res.json());

  // Le bot répond avec la citation
  message.react('👨🏻‍🍳');
  message.channel.send(quote);
};

module.exports.help = {
  name: ['citation', 'chef', 'michel', 'dumas', 'avis', 'message', 'msg'],
};
