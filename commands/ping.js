async function main(client, message, args) {
	message.channel.send({ content: "Pong!", ephemeral: true });
}

module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	execute: main
};