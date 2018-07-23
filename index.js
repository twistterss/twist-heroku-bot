const Discord = require('discord.js'); // requiring discord.js
const Commando = require('discord.js-commando');
const path = require('path'); //requiring path
const oneLine = require('common-tags').oneLine;
const client = new Commando.CommandoClient({
    owner: ['315960765112647690'], // making the owner (in that order)
    commandPrefix: '-' // makes prefix
}); //creating the client
module.exports = client; // telling every other file that when they require this one, they get client not everything else in the file.

module.exports.credits = {
    "Twistters": "Owner"
}

client.registry
  .registerGroups([
    ['admin', 'Admin'],
    ['mod', 'Moderation'],
    ['owner', ':no_entry: Bot Owner :no_entry:'],
    ['conf', 'Config commands'],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'));

  client.on('message', (msg) => {
    if (msg.content.includes('-fakejoinevent')) {
      client.emit('guildMemberAdd', msg.member);
    } else if (msg.content.includes('-fakeleaveevent')) {
      client.emit('guildMemberRemove', msg.member);
    }
  });

  client.on('ready', () => {
    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    
    setInterval(() => {
      client.user.setActivity(`${client.users.size} users from ${client.guilds.size} servers`, { type: 'WATCHING' });
      setTimeout(() => {
        client.user.setActivity(`| -help | ✨🎉`, { type: 'WATCHING' });
      }, 30000);
    }, 60000);
    /*client.user.setActivity(`Twistters for updates`, { type: 'WATCHING' });*/
  });

  client.login("NDcwNTAzNzUyMDU5ODQ2NjY3.DjXO7Q.78nX2r60GGvtCMngG2TS2xscA3s");