const
    database = require('../modules/db'),
    DB = new database;

async function main(interaction, client) {
    switch (interaction.type) {
        case "APPLICATION_COMMAND":
            if (!client.appCommands.has(interaction.commandName)) return;
            client.appCommands.get(interaction.commandName).execute(interaction, client);
            break;

        case "MESSAGE_COMPONENT":
            switch (interaction.customId) {
                case "GAME_ROLE_SELECT_0":
                case "GAME_ROLE_SELECT_1":
                case "GAME_ROLE_SELECT_2":
                case "GAME_ROLE_SELECT_3":
                    DB.GAME_ROLE_MENU.getAll().then(async roles => {
                        await roles.map(async r => { await interaction.member.roles.remove(r.ID) });
                        await interaction.values.map(async r => { await interaction.member.roles.add(r) });

                        interaction.deferUpdate();
                    })
                    return;

                case "REMOVE_ALL_GAME_ROLES":
                    DB.GAME_ROLE_MENU.getAll().then(async roles => {
                        roles.map(async r => { await interaction.member.roles.remove(r.ID) });
                        
                        interaction.deferUpdate();
                    })

                    return;
            }

            if (interaction.customId.startsWith('UPDATE_GameRoleMenuMessage')) {
                DB.IMPORTANT_IDs.add('GameRoleMessage', 4, interaction.customId.split("_")[3]);
                DB.IMPORTANT_IDs.add('GameRoleMessageChannel', 3, interaction.customId.split("_")[2]);
                await interaction.reply({ content: `Updated!`, ephemeral: true });
            }
            break;
    }
}

module.exports = {
    name: 'interactionCreate',
    execute: main
};