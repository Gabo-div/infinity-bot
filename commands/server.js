const Discord = require("discord.js");
const moment = require("moment");
moment.locale("es");

module.exports = {
	name: "server",
	description: "Muestra la información del servidor",
	alias: [],
	execute({ message, embed, args }) {

		const createdDate = moment(message.guild.createdTimestamp).fromNow();

		embed.setColor("#28a745");
		embed.setTitle(message.guild.name);
		embed.addField("ID", message.guild.id, true);
		embed.addField("Dueño", `<@${message.guild.ownerId}>`, true);
		embed.addField("Miembros", message.guild.memberCount.toString(), true);
		embed.addField("Creación", createdDate, true);
		embed.addField(
			"Canales",
			message.guild.channels.cache.size.toString(),
			true
		);
		embed.addField(
			"Roles",
			message.guild.roles.cache.size.toString(),
			true
		);

		embed.setThumbnail(message.guild.iconURL());

		message.channel.send({ embeds: [embed] });
	},
};
