async function main(interaction) {
	return interaction.reply('Pong!');
}

module.exports = {
	data: {
		name: 'ping',
		description: 'Replies with Pong!'
	},
	execute: main
};