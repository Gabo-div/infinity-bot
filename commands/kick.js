const Discord = require("discord.js");

module.exports = {
	name: "kick",
	description: "Le da kick a un usuario mencionado",
	alias: [],
	type: "mod",
	execute({ message, embed, args }) {
		const member = message.mentions.members.first();
		const reason = args.slice(1).join(" ") || null;

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.KICK_MEMBERS
			)
		) {
			if (!member) {
				embed.setColor("#dc3545");
				embed.setDescription("Necesitas mencionar a un usuario");
				return message.channel.send({ embeds: [embed] });
			}

			if (!member.kickable) {
				embed.setColor("#dc3545");
				embed.setDescription("No se puede kickear a este usuario");
				return message.channel.send({ embeds: [embed] });
			}

			member.kick(reason);
			embed.setColor("#28a745");
			embed.setDescription(
				`El usuario ${member.user.username} ha sido kickeado`
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
