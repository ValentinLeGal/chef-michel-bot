const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  let command = message.content.split(' ')[1];
  
  if (/^(minecraft|mc|fanta)$/.test(command)) {
    message.react('🎮');
    message.channel.send('https://youtu.be/2P1PHiFBQT0');
  } else if (/^(remix|dj)$/.test(command)) {
    message.react('🎧');
    message.channel.send('https://youtu.be/O1a7RhkMxPU');
  }
};

module.exports.help = {
  name: ['minecraft', 'mc', 'remix', 'dj'],
};
