const { BOT_PREFIX } = require('../config');

async function main(message, client) {
    if (message.author.bot) return;

    if (message.content.indexOf(BOT_PREFIX) !== 0) return;

    let args = message.content
        .slice(BOT_PREFIX.length)
        .trim()
        .split(/ +/g);
    
    const command = args.shift().toLocaleLowerCase();

    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(client, message, args);
}

module.exports = {
    name: 'messageCreate',
    execute: main
};