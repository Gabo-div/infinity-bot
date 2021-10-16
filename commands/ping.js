module.exports = {
	name: "ping",
	description: "Muetra la latencia",
	alias: [],
	type: "utility",
	execute({ message, client, embed }) {
		embed.setColor("#28a745");
		embed.setTitle("Latencia");
		embed.setDescription("Calculando...");

		message.channel.send({ embeds: [embed] }).then((m) => {
			embed.setDescription(
				`Tu latencia: \`${
					m.createdTimestamp - message.createdTimestamp
				}ms\` \n Latencia del bot: \`${Math.round(client.ws.ping)}ms\``
			);
			m.edit({ embeds: [embed] });
		});
	},
};
