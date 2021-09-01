async function main(interaction, client) {
    switch (interaction.type) {
        case "APPLICATION_COMMAND":
            if (!client.appCommands.has(interaction.commandName)) return;
            client.appCommands.get(interaction.commandName).execute(interaction, client);
            break;

        case "MESSAGE_COMPONENT":
            switch (interaction.customId) {
                case "BUTTON_ID":
    
                    break;

                case "SELECT_ID":

                    break;
            }

            interaction.deferUpdate();
            break;
    }
}

module.exports = {
    name: 'interactionCreate',
    execute: main
};