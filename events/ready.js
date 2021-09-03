async function main(client) {
    await require('../modules/app-commands-loader')(client);
    require('../modules/game-role-menu')(client);
    
    console.log(`\nReady! Logged in as ${client.user.tag}`);
}

module.exports = {
    name: 'ready',
    once: true,
    execute: main
};