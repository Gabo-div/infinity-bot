const Discord = require("discord.js");
const moment = require("moment");
moment.locale("es");

module.exports = {
	name: "mute",
	description: "Silencia a un usuario en los canales de texto",
	alias: [],
	type: "mod",
	async execute({ message, embed, args }) {
		const member = message.mentions.members.first();
		const time = args[1] || "10m";
		const timeN = parseInt(time.slice(0, -1));
		const timeKey = time.slice(-1);
		const timeFinish = parseInt(moment().add(timeN, timeKey).format("x"));

		const timeMS = timeFinish - parseInt(moment().format("x"));

		let muteRole = message.guild.roles.cache.find(
			(r) => r.name === "Muted"
		);

		if (!muteRole) {
			await message.guild.roles.create({
				name: "Muted",
			});

			muteRole = message.guild.roles.cache.find(
				(r) => r.name === "Muted"
			);
		}

		message.guild.channels.cache.map((ch) =>
			ch.permissionOverwrites.edit(muteRole, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false,
				CREATE_PUBLIC_THREADS: false,
				CREATE_PRIVATE_THREADS: false,
				SEND_MESSAGES_IN_THREADS: false,
				SPEAK: false,
				STREAM: false,
			})
		);

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.MANAGE_CHANNELS
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

			const muted = member.roles.cache.find((r) => r.name === "Muted");

			if (muted) {
				embed.setColor("#dc3545");
				embed.setDescription("El usuario ya está muteado");
				return message.channel.send({ embeds: [embed] });
			}

			member.roles.add(muteRole);
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
				const muted = member.roles.cache.find(
					(r) => r.name === "Muted"
				);
				if (!muted) return;

				member.roles.remove(muteRole);
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
