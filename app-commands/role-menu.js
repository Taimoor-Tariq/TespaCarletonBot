const
    database = require('../modules/db'),
    DB = new database;

async function main(interaction, client) {
    const
        SUB_COMMAND = interaction.options.getSubcommand(),
        ROLE = interaction.options.get('role').role,
        ICON = interaction.options.get('icon')?.value?.replace("<", "").replace(">", "").split(":");

    if (SUB_COMMAND == "add") DB.GAME_ROLE_MENU.addRole(ROLE.id, ROLE.name, ICON?ICON[2]:null, ICON?ICON[1]:null);
    else DB.GAME_ROLE_MENU.removeRole(ROLE.id);

    require('../modules/game-role-menu')(client);

	return interaction.reply({ content: `Updated!`, ephemeral: true });
}

module.exports = {
	data: {
		name: 'gamerolemenu',
		description: 'Add or remove roles from the select menu.',
		options: [
            {
                name: "add",
                description: "Add role to menu",
                type: 1,
                options: [
                    {
                        name: "role",
                        description: "The role to add",
                        type: 8,
                        required: true
                    },
                    {
                        name: "icon",
                        description: "Emoji to use as icon",
                        type: 3,
                        required: true
                    }
                ]
            },
            {
                name: "remove",
                description: "Remove role to menu",
                type: 1,
                options: [
                    {
                        "name": "role",
                        "description": "The role to remove",
                        "type": 8,
                        "required": true
                    }
                ]
            },
        ],
		default_permission: false
	},
	execute: main
};