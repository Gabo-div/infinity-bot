const Discord = require("discord.js");
const moment = require("moment");
moment.locale("es");

module.exports = {
	name: "roles",
	description: "Muestra los roles del servidor",
	alias: [],
	execute({ message, embed, args }) {
		embed.setColor("#28a745");
		embed.setTitle("Roles");

		embed.setDescription(
			message.guild.roles.cache
				.map((r) => `${r.name} - ${r.members.size} miembro(s)`)
				.join("\n")
		);

		message.channel.send({ embeds: [embed] });
	},
};
