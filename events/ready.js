const server = require("../features/server");

module.exports = {
	name: "ready",
	async execute(client) {
		client.user.setPresence({
			activities: [
				{
					name: "Programandome",
					type: "PLAYING",
				},
			],
		});

		console.log(
			`Listo y conectado a ${client.guilds.cache.size} servidores`
		);
	},
};
