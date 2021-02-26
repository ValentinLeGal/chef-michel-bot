const fetch = require('node-fetch');

const { version } = require('../package.json');

module.exports.run = async (client, message, args) => {
  const icon =
    'https://yt3.ggpht.com/ytc/AAUvwnj64CnkSLwwoOmDVJM83qvGg-QW0DY9YMClH2dI=s900-c-k-c0x00ffffff-no-rj';

  // On récupère les commandes du bot
  const commands = await fetch(`${process.env.API_URL}/commands`).then((res) =>
    res.json()
  );

  // On formate les commandes
  const fields = [];
  commands.forEach((c) => {
    let name = '';
    c.commands.forEach((n, i) => {
      name += `\`!chef${n ? ' ' + n : ''}\` ${
        i !== c.commands.length - 1 ? '/ ' : ''
      }`;
    });

    fields.push({
      name: name,
      value: c.description,
    });
  });

  const helpEmbed = {
    title: 'Chef Michel Bot',
    url: 'https://github.com/ValentinLeGal/chef-michel-bot',
    description: '**Toutes les commandes du bot :**',
    thumbnail: {
      url: icon,
    },
    fields: fields,
    footer: {
      text: 'Chef Michel Bot — Version ' + version,
      icon_url: icon,
    },
  };

  message.react('👨🏻‍🍳');
  message.channel.send({ embed: helpEmbed });
};

module.exports.help = {
  name: ['', 'aide', 'help'],
};
