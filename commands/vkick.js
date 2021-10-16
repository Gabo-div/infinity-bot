const Discord = require("discord.js");

module.exports = {
	name: "vkick",
	description: "Desconecta a un usuario del canal de voz donde esté",
	alias: [],
	type: "mod",
	execute({ message, embed, args }) {
		const member = message.mentions.members.first();

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

			member.voice.disconnect();
			embed.setColor("#28a745");
			embed.setDescription(
				`El usuario ${member.user.username} ha sido desconectado del canal de voz`
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
