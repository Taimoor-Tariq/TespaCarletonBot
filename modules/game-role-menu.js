const
    { MessageSelectMenu, MessageButton, MessageActionRow } = require('discord.js'),
    database = require('./db'),
    DB = new database;

module.exports = async (client) => {
    const
        channelID = await DB.IMPORTANT_IDs.get("GameRoleMessageChannel"),
        messageID = await DB.IMPORTANT_IDs.get("GameRoleMessage");

    if (!(!channelID || !messageID)) {
        const message = await client.channels.cache.get(channelID.ELEMENT_ID).messages.fetch(messageID.ELEMENT_ID);
    
        let ROLES = await DB.GAME_ROLE_MENU.getAll(), COMPONENTS = [];
    
        ROLES = await ROLES.map(r => { return {
            label: r.NAME,
            value: r.ID,
            emoji: {
                name: r.E_NAME,
                id: r.E_ID
            }
        }});
        ROLES = ROLES.reduce((acc, val, i) => {
            let idx = Math.floor(i / 25)
            let page = acc[idx] || (acc[idx] = [])
            page.push(val)
        
            return acc
        }, []);
    
    
        await ROLES.map(roles => {
            COMPONENTS.push(new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('GAME_ROLE_SELECT')
                        .setPlaceholder('None')
                        .setMinValues(0)
                        .setMaxValues(roles.length)
                        .addOptions(roles)
                )
            )
        });
    
        COMPONENTS.push(new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(`REMOVE_ALL_GAME_ROLES`)
                .setLabel('Remove all game Roles')
                .setStyle('DANGER')
        ));
    
        message.edit({
            content: `­\nSelect what game roles you would like to get.`,
            components: COMPONENTS
        });
    }
}