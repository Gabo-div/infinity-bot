const Discord = require("discord.js");

module.exports = {
	name: "ban",
	description: "Banea a un usuario mencionado por un tiempo especifico",
	alias: [],
	execute({ message, embed, args }) {
		const member = message.mentions.members.first();
		const reason = args.slice(2).join(" ") || null;
		const days = parseInt(args[1]) || null;

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.BAN_MEMBERS
			)
		) {
			if (!member) {
				embed.setColor("#dc3545");
				embed.setDescription("Necesitas mencionar a un usuario");
				return message.channel.send({ embeds: [embed] });
			}

			if (!member.bannable) {
				embed.setColor("#dc3545");
				embed.setDescription("No se puede banear a este usuario");
				return message.channel.send({ embeds: [embed] });
			}

			member.ban({ days, reason });
			embed.setColor("#28a745");
			embed.setDescription(
				`El usuario ${member.user.username} ha sido baneado por ${days} dia(s)`
			);
			return message.channel.send({ embeds: [embed] });
		} else {
			embed.setColor("#dc3545");
			embed.setDescription(
				"No tienes permisos para realizar esta acción"
			);
			return message.channel.send({ embeds: [embed] });
		}
	},
};
