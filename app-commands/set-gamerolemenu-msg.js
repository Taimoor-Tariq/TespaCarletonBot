const { MessageButton, MessageActionRow } = require('discord.js');

async function main(interaction) {
	const
        channelID = interaction.channelId,
        messageID = interaction.targetId,
        wsUsers = [
            '220161488516546561', // Me
        ];

    if (wsUsers.includes(interaction.member.id)) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`UPDATE_GameRoleMenuMessage_${channelID}_${messageID}`)
                    .setLabel('Yes')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('CLOSE')
                    .setLabel('No')
                    .setStyle('DANGER')
            );

        return interaction.reply({ content: `Are you sure?`, components: [row], ephemeral: true });
    }
    else return interaction.reply({ content: `You are not allowed to use that command.`, ephemeral: true });
}

module.exports = {
    data: {
        name: 'Set as Game Role Message',
        type: 3
    },
	execute: main
};