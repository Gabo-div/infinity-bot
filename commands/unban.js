const Discord = require("discord.js");

module.exports = {
	name: "unban",
	description: "Desbanea a un usuario por su id",
	alias: [],
	async execute({ message, embed, args }) {
		const memberId = args[0];
		const reason = args.slice(1).join(" ");
		let baned;

		await message.guild.bans
			.fetch()
			.then(
				(bans) => (baned = bans.find((ban) => ban.user.id === memberId))
			);

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.BAN_MEMBERS
			)
		) {
			if (!baned) {
				embed.setDescription("El usuario no está baneado");
				return message.channel.send({ embeds: [embed] });
			}

			message.guild.members.unban(memberId, reason);
			embed.setColor("#28a745");
			embed.setDescription(
				`El usuario <@${memberId}> ha sido desbaneado`
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
