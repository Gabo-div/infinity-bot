const Discord = require("discord.js");

module.exports = {
	name: "nick",
	description: "Cambia el apodo de un usuario",
	alias: [],
	type: "utility",
	execute({ message, embed, args }) {
		const member = message.mentions.members.first();
		const nick = args.slice(1).join(" ");

		try {
		} catch (error) {
			embed.setTitle("Error");
			embed.setDescription(
				"Ha ocurrido un error, asegurate de que el bot tiene los permisos suficientes para ejercutar esta acción, Darle un rol más alto podria solucionar el problema."
			);
			return message.channel.send({ embeds: [embed] });
		}

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.MANAGE_NICKNAMES
			)
		) {
			if (!member) {
				embed.setColor("#dc3545");
				embed.setDescription("Necesitas mencionar a un usuario");
				return message.channel.send({ embeds: [embed] });
			}

			if (!nick) {
				embed.setColor("#dc3545");
				embed.setDescription("Necesitas escribir el nuevo apodo");
				return message.channel.send({ embeds: [embed] });
			}

			if (!member.manageable) {
				embed.setColor("#dc3545");
				embed.setDescription("Este usuario no puede ser cambiado");
				return message.channel.send({ embeds: [embed] });
			}

			member.setNickname(nick);
			embed.setColor("#28a745");
			embed.setDescription(
				`El apodo del usuario ${member.user.username} ha sido cambiado a ${nick}`
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
