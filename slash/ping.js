const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
	async execute(client, interaction) {
		interaction.reply({ content: `Ping: ${client.ws.ping}` });
	},
};
