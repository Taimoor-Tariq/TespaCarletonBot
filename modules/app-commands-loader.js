const
    fs = require('fs'),
    { REST } = require('@discordjs/rest'),
    { Routes } = require('discord-api-types/v9'),
    { BOT_TOKEN } = require('../config'),
    rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

module.exports = (client) => {
    return new Promise(async (resolve) => {
        let data = [];

        fs.readdirSync('./app-commands/').filter(file => file.endsWith('.js')).forEach(file => {
            const command = require(`../app-commands/${file}`);
            client.appCommands.set(command.data.name, command);
            data.push(command.data);
        });

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: data },
        );

        console.log('Successfully reloaded application (/) commands.');

        resolve();
    });
};