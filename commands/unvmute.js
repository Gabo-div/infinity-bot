const Discord = require("discord.js");
const moment = require("moment");
moment.locale("es");

module.exports = {
	name: "unvmute",
	description: "Quita el silencio de un usuario en los canales de voz",
	alias: [],
	type: "mod",
	async execute({ message, embed, args }) {
		const member = message.mentions.members.first();

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.MUTE_MEMBERS
			)
		) {
			if (!member) {
				embed.setColor("#dc3545");
				embed.setDescription("Necesitas mencionar a un usuario");
				return message.channel.send({ embeds: [embed] });
			}

			const muted = member.voice.serverMute;

			if (!muted) {
				embed.setColor("#dc3545");
				embed.setDescription("El usuario no está muteado");
				return message.channel.send({ embeds: [embed] });
			}

			member.voice.setMute(false);
			embed.setColor("#28a745");
			embed.setDescription(
				`El usuario ${member.user.username} ha sido desmuteado`
			);
			message.channel.send({ embeds: [embed] });
		} else {
			embed.setColor("#dc3545");
			embed.setDescription(
				"No tienes permisos para realizar esta acción"
			);
			return message.channel.send({ embeds: [embed] });
		}
	},
};
