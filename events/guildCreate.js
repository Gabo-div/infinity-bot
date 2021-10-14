const server = require("../features/server");

module.exports = {
	name: "guildCreate",
	async execute(client, guild) {
		await server(guild);
	},
};
