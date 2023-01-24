module.exports = {
	name: "interactionCreate",
	async execute(client, interaction) {
		if (!interaction.isCommand()) return;

		const slashCmds = client.slashCommands.get(interaction.commandName);

		if (!slashCmds) return;

		try {
			await slashCmds.execute(client, interaction);
		} catch (error) {
			console.log(error);
		}
	},
};
