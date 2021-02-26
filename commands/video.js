const fetch = require('node-fetch');
const Parser = require('rss-parser');

const parser = new Parser();

module.exports.run = async (client, message, args) => {
  const { items: videos } = await parser.parseURL(
    'https://www.youtube.com/feeds/videos.xml?channel_id=UCSLyEx8ISkp567AjOAHYN5Q'
  );

  // On récupère la dernière vidéo
  const lastFeedVideo = videos[0];

  // On raccourci le lien pour avoir un "youtu.be"
  const shortLink = `https://youtu.be/${lastFeedVideo.link.split('=')[1]}`;

  // Le bot répond avec la présentation du menu
  message.react('🎥');
  message.channel.send(`Ma dernière vidéo, comme ça !\n\n🎥 ${shortLink}`);
};

module.exports.help = {
  name: ['video'],
};
