const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  let command = message.content.split(' ')[1];
  
  if (/^(minecraft|mc|fanta)$/.test(command)) {
    message.react('🎮');
    message.channel.send('https://www.youtube.com/watch?v=2P1PHiFBQT0');
  } else if (/^(remix|dj)$/.test(command)) {
    message.react('🎧');
    message.channel.send('https://www.youtube.com/watch?v=O1a7RhkMxPU');
  }
};

module.exports.help = {
  name: ['minecraft', 'mc', 'remix', 'dj'],
};
