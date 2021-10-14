const Discord = require("discord.js");

module.exports = {
	name: "user",
	description: "Muestra información de un usuario",
	alias: [],
	execute({ message, embed, args }) {
		const member = message.mentions.members.first();

		if (member) {
			embed.setColor("#28a745");
			embed.setAuthor(
				member.nickname || member.user.username,
				member.displayAvatarURL()
			);
			embed.setThumbnail(member.displayAvatarURL());
			embed.setTimestamp();
			embed.addField("Bot", member.user.bot ? `Si` : `No`, true);
			embed.addField("ID", member.id, true);
			embed.addField(
				"Tagname",
				`${member.user.username}#${member.user.discriminator}`,
				true
			);
			embed.addField(
				"Roles",
				member._roles.map((r) => `<@&${r}>`).join(", "),
				true
			);
			message.channel.send({ embeds: [embed] });
		} else {
			embed.setColor("#28a745");
			embed.setAuthor(
				message.member.nickname,
				message.author.displayAvatarURL()
			);
			embed.setThumbnail(message.author.displayAvatarURL());
			embed.setTimestamp();
			embed.addField("Bot", message.author.bot ? `Si` : `No`, true);
			embed.addField("ID", message.author.id, true);
			embed.addField(
				"Tagname",
				`${message.author.username}#${message.author.discriminator}`,
				true
			);
			embed.addField(
				"Roles",
				message.member._roles.map((r) => `<@&${r}>`).join(", "),
				true
			);
			message.channel.send({ embeds: [embed] });
		}
	},
};
