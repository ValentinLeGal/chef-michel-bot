const fetch = require('node-fetch');
const Parser = require('rss-parser');

const parser = new Parser();

module.exports = async (client, message) => {
  let cachedVideoId = null;
  let doOnce = false;

  /**
   * Permet de changer le statut aléatoirement chaque heure.
   */
  const changeStatus = async () => {
    let mins = new Date().getMinutes();
    if (mins == '00') {
      if (!doOnce) {
        // On récupère une activité aléatoire
        const { activity } = await fetch(
          `${process.env.API_URL}/activities/random?statsToken=${process.env.STATS_TOKEN}`
        ).then((res) => res.json());

        // On met à jour l'activité du bot
        client.user.setPresence({
          activity: {
            name: activity,
          },
        });
      }

      // On exécute la fonction qu'une fois dans la minute
      doOnce = true;
    } else {
      doOnce = false;
    }
  };

  /**
   * Permet d'envoyer un message à tous les serveurs utilisant le bot
   * @param {String} msg Le message à envoyer.
   */
  const sendMessageAllGuilds = (msg) => {
    const guilds = client.guilds.cache;

    guilds.forEach((guild) => {
      const channel = guild.channels.cache.find(
        (c) =>
          c.type === 'text' && c.permissionsFor(guild.me).has('SEND_MESSAGES')
      );

      if (channel) {
        channel.send(msg);
      }
    });
  };

  /**
   * Permet de vérifier si une nouvelle vidéo est sortie.
   */
  const checkNewVideo = async () => {
    const { items: videos } = await parser.parseURL(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UCSLyEx8ISkp567AjOAHYN5Q'
    );

    // On récupère l'ID de la dernière vidéo
    const lastFeedVideo = videos[0];

    // On raccourci le lien pour avoir un "youtu.be"
    const shortLink = `https://youtu.be/${lastFeedVideo.link.split('=')[1]}`;

    if (null === cachedVideoId) {
      // Si le cache est à null, on met à jour le cache et on ne notifie pas
      cachedVideoId = lastFeedVideo.id;
    } else if (lastFeedVideo.id !== cachedVideoId) {
      // Si l'ID de la dernière vidéo récupérée est différente de celui en cache, on met à jour et on notifie
      cachedVideoId = lastFeedVideo;
      sendMessageAllGuilds(
        `Nouvelle vidéo @everyone, comme ça !\n\n🎥 ${shortLink}`
      );
    }
  };

  // Le bot envoie un message quand il est ajouté sur un serveur
  client.on('guildCreate', (guild) => {
    const channel = guild.channels.cache.find(
      (c) =>
        c.type === 'text' && c.permissionsFor(guild.me).has('SEND_MESSAGES')
    );

    if (channel) {
      channel.send(
        "Salut mes amis et bienvenue à la maison !\nN'hésitez pas à faire un `!chef`, comme ça !"
      );
    }
  });

  // On définit un statut par défaut pour le bot au démarrage
  client.user.setPresence({
    activity: {
      name: 'tourner et retourner',
    },
  });

  // On exécute la fonction pour changer le statut toutes les secondes
  setInterval(changeStatus, 1000);

  // On exécute la fonction pour vérifier si une nouvelle vidéo est sortie toutes les 10 minutes
  setInterval(checkNewVideo, 600000);

  // On affiche un message dans la console quand le bot est prêt
  console.log('Super nickel !');
};
