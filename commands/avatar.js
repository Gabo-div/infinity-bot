const Discord = require("discord.js");

module.exports = {
	name: "avatar",
	description: "Muestra el avatar de un usuario",
	alias: [],
	execute({ message, embed, args }) {
		const member = message.mentions.members.first();

		if (member) {
			embed.setColor("#28a745");
			embed.setAuthor(
				member.nickname || member.user.username,
				member.displayAvatarURL()
			);
			embed.setImage(member.displayAvatarURL());

			message.channel.send({ embeds: [embed] });
		} else {
			embed.setColor("#28a745");
			embed.setAuthor(
				message.member.nickname,
				message.author.displayAvatarURL()
			);
			embed.setImage(message.author.displayAvatarURL());
			message.channel.send({ embeds: [embed] });
		}
	},
};
