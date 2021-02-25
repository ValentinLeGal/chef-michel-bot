const prefix = '!chef';

module.exports = async (client, message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix) && message.channel.type === 'dm') {
    channel = client.channels.cache.get(message.channel.id);
    message.react('👨🏻‍🍳');
    channel.send("C'est moi le Chef Michel !");

    const cmd = client.commands.get('');

    if (!cmd) return;

    cmd.run(client, message, []);

    return;
  }

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commande = args.shift();

  const cmd = client.commands.get(commande);

  if (!cmd) return;

  cmd.run(client, message, args);
};
