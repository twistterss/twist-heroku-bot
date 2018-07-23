const commando = require('discord.js-commando');
const Discord = require("discord.js");
const oneLine = require('common-tags').oneLine;

module.exports = class ChangestatusCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'changestatus',
      aliases: ['setstatus', 'ss'],
      group: 'owner',
      memberName: 'changestatus',
      description: 'Change the status of Slicehutt.',
      details: oneLine`
            Change the status of Phantom.
            `,
      ownerOnly: true,
      examples: ['inf!setstatus online'],
      args: [{
        key: 'status',
        label: 'status',
        prompt: 'What status would like to set Slicehutt to?',
        type: 'string',
        default: 'Online'
      }
      ]
    });
  }
  async run(msg, { status }) {
    if (msg.author.bot) return;
    msg.delete(1);
    let stat = status.toLowerCase();
    let minusonemembers = this.client.users.size - 1
    if (stat === 'online' || stat === 'idle' || stat === 'dnd' || stat === 'invisible') {
      this.client.user.setStatus(stat).then(console.log).catch(console.error);
      let doneembed = new Discord.RichEmbed()
        .setTitle(`:white_check_mark: Successfully changed!`)
        .setDescription(`Successfully set Slicehutt's Status to ${stat}\nMay take a few seconds to appear.`)
        .setColor('RANDOM')
        .setFooter("Powered by © Slicehutt Development Team")
        .setTimestamp(new Date());
      msg.channel.send(doneembed);
    } else {
      let invalidembed = new Discord.RichEmbed()
        .setTitle(`:warning: Error :warning:`)
        .setDescription('Please input a valid status.')
        .setColor(0xff0000)
        .setFooter("Powered by © Slicehutt Development Team")///Leave this, this command is gifted to Phantom from Infinity :D
        .setTimestamp(new Date());
      return msg.channel.send(invalidembed);
    }
  }
}