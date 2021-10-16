const Discord = require("discord.js");
const moment = require("moment");
moment.locale("es");

module.exports = {
	name: "unmute",
	description: "Quita el silencio de un usuario en los canales de texto",
	alias: [],
	type: "mod",
	async execute({ message, embed, args }) {
		const member = message.mentions.members.first();

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

			const muted = member.roles.cache.find((r) => r.name === "Muted");

			if (!muted) {
				embed.setColor("#dc3545");
				embed.setDescription("El usuario no está muteado");
				return message.channel.send({ embeds: [embed] });
			}

			member.roles.remove(muteRole);
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
