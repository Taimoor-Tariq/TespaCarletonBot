async function main(interaction) {
	const target = await interaction.guild.members.fetch(interaction.targetId);

    console.log(target.user)

	return interaction.reply({ content: `
Username: **${target.user.username}**
Id: **${target.user.id}**
Avatar: https://cdn.discordapp.com/avatars/${target.user.id}/${target.user.avatar}.png?size=4096
    `, ephemeral: true });
}

module.exports = {
    data: {
        name: 'About User',
        type: 2
    },
	execute: main
};