const Discord = require("discord.js");

module.exports = {
	name: "unlock",
	description: "Desbloquea un canal para el rol @everyone",
	alias: [],
	type: "mod",
	execute({ message, embed, args }) {
		const channel = message.mentions.channels.first();

		const everyone = message.guild.roles.cache.find(
			(r) => r.name === "@everyone"
		);

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.MANAGE_CHANNELS
			)
		) {
			if (channel) {
				channel.permissionOverwrites.edit(everyone, {
					SEND_MESSAGES: true,
				});
				embed.setColor("#28a745");
				embed.setDescription(
					`El canal ${channel} ha dessido bloqueado`
				);
				return message.channel.send({ embeds: [embed] });
			} else {
				message.channel.permissionOverwrites.edit(everyone, {
					SEND_MESSAGES: true,
				});
				embed.setColor("#28a745");
				embed.setDescription(
					`El canal ${message.channel} ha sido desbloqueado`
				);
				return message.channel.send({ embeds: [embed] });
			}
		} else {
			embed.setColor("#dc3545");
			embed.setDescription(
				"No tienes permisos para realizar esta acción"
			);
			return message.channel.send({ embeds: [embed] });
		}
	},
};
