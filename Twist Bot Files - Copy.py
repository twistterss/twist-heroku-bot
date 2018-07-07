import discord
from discord.ext import commands
import asyncio
from itertools import cycle

TOKEN = 'NDY1MjM1NTk1MTkxNjQ4MjU2.DiKkkA.bptk_5ejvUUxtq2lfovuvqa1ETU'

client = commands.Bot(command_prefix = ';')
client.remove_command('help')
status = ['Twist Bot', ';help']

async def change_status():
          await client.wait_until_ready()
          msgs = cycle(status)

          while not client.is_closed:
              current_status = next(msgs)
              await client.change_presence(game=discord.Game(name=current_status))
              await asyncio.sleep(10)

@client.event
async def on_ready():
    print("Bot Online.")

@client.event
async def on_message(message):
    author = message.author
    content = message.content
    print('{}: {}'.format(author, content))
    await client.process_commands(message)
    
@client.event
async def on_member_join(member):
    role = discord.utils.get(member.server.roles, name='Member')
    await client.add_roles(member, role)

@client.command()
async def ping():
    await client.say('Pong!')

@client.command()
async def echo(*args):
    output = ''
    for word in args:
        output += word
        output += ' '
    await client.say(output)

@client.command(pass_context=True)
async def clear(ctx, amount=100):
    channel = ctx.message.channel
    messages = []
    async for message in client.logs_from(channel, limit=int(amount)):
        messages.append(message)
    await client.delete_messages(messages)
    await client.say('Messages deleted.')

@client.command(pass_context=True)
async def help(ctx):
    author = ctx.message.author
    
    embed = discord.Embed(
        colour = discord.Colour.orange()
    )

    embed.set_author(name='Help')
    embed.add_field(name=';help', value='Shows you a List of Bot Commands!', inline=False)
    embed.add_field(name=';ping', value='Returns Pong!', inline=False)
    embed.add_field(name=';echo', value='The Bot copys your Message.', inline=False)

    await client.send_message(author, embed=embed)

client.loop.create_task(change_status())
client.run(TOKEN)
