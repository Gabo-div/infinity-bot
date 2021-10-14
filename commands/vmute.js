const Discord = require("discord.js");
const moment = require("moment");
moment.locale("es");

module.exports = {
	name: "vmute",
	description: "Silencia a un usuario en los canales de voz",
	alias: [],
	async execute({ message, embed, args }) {
		const member = message.mentions.members.first();
		const time = args[1] || "10m";
		const timeN = parseInt(time.slice(0, -1));
		const timeKey = time.slice(-1);
		const timeFinish = parseInt(moment().add(timeN, timeKey).format("x"));

		const timeMS = timeFinish - parseInt(moment().format("x"));

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

			if (!member.manageable) {
				embed.setColor("#dc3545");
				embed.setDescription("No puedes mutear a este usuario");
				return message.channel.send({ embeds: [embed] });
			}

			const muted = member.voice.serverMute;

			if (muted) {
				embed.setColor("#dc3545");
				embed.setDescription("El usuario ya está muteado");
				return message.channel.send({ embeds: [embed] });
			}

			const inVoice = member.voice.channel;

			if (!inVoice) {
				embed.setColor("#dc3545");
				embed.setDescription("El usuario no está en un canal de voz");
				return message.channel.send({ embeds: [embed] });
			}

			member.voice.setMute();
			embed.setColor("#28a745");
			embed.setDescription(
				`El usuario ${
					member.user.username
				} ha sido muteado hasta dentro de ${moment(
					timeFinish
				).fromNow()}`
			);
			message.channel.send({ embeds: [embed] });

			setTimeout(() => {
				const muted = member.voice.serverMute;

				if (!muted) return;

				member.voice.setMute(false);
				embed.setColor("#28a745");
				embed.setDescription(
					`El usuario ${member.user.username} ha sido desmuteado`
				);
				message.channel.send({ embeds: [embed] });
			}, timeMS);
		} else {
			embed.setColor("#dc3545");
			embed.setDescription(
				"No tienes permisos para realizar esta acción"
			);
			return message.channel.send({ embeds: [embed] });
		}
	},
};
