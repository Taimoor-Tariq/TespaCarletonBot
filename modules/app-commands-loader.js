const
    fs = require('fs'),
    { REST } = require('@discordjs/rest'),
    { Routes } = require('discord-api-types/v9'),
    { BOT_TOKEN, SERVER_ID, DEV_SERVER_ID } = require('../config'),
    rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

module.exports = (client) => {
    return new Promise(async (resolve) => {
        let data = [];

        fs.readdirSync('./app-commands/').filter(file => file.endsWith('.js')).forEach(file => {
            const command = require(`../app-commands/${file}`);
            client.appCommands.set(command.data.name, command);
            data.push(command.data);
        });

        await rest.put( Routes.applicationGuildCommands(client.user.id, SERVER_ID), { body: data } );
        await rest.put( Routes.applicationGuildCommands(client.user.id, DEV_SERVER_ID), { body: data } );

        await rest.put( Routes.applicationCommandPermissions(client.user.id, SERVER_ID, (await rest.get(Routes.applicationGuildCommands(client.user.id, SERVER_ID))).filter(c => (c.name == "gamerolemenu" && c.type == 1))[0].id), { body: {
            permissions: [
                {
                    id: "220161488516546561",
                    type: 2,
                    permission: true
                },
                {
                    id: "241764721814929408",
                    type: 2,
                    permission: true
                }
            ] 
        }});
        await rest.put( Routes.applicationCommandPermissions(client.user.id, DEV_SERVER_ID, (await rest.get(Routes.applicationGuildCommands(client.user.id, DEV_SERVER_ID))).filter(c => (c.name == "gamerolemenu" && c.type == 1))[0].id), { body: {
            permissions: [
                {
                    id: "220161488516546561",
                    type: 2,
                    permission: true
                }
            ] 
        }});

        console.log('Successfully reloaded application (/) commands.');

        resolve();
    });
};