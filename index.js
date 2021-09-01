const
    fs = require('fs'),
    { Client, Intents, Collection } = require('discord.js'),
    { BOT_TOKEN, BOT_PREFIX } = require('./config'),
    client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();
client.appCommands = new Collection();

console.log(` \nLoading Commands and events:\n `);

console.log('• Commands:');
fs.readdirSync('./commands/').filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(` - Loaded → ${BOT_PREFIX}${command.name}`);
});
console.log(' ');

console.log('• Events:');
fs.readdirSync('./events/').filter(file => file.endsWith('.js')).forEach(file => {
    const event = require(`./events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
    else client.on(event.name, (...args) => event.execute(...args, client));
    console.log(` - Loaded → ${event.name}`);
});
console.log(' ');

client.login(BOT_TOKEN);