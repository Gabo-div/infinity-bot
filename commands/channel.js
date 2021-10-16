const Discord = require("discord.js");
const Server = require("../schema/Server");

module.exports = {
	name: "channel",
	description:
		"Agrega un canal como predeterminado para niveles/comandos/casino",
	alias: [],
	async execute({ message, embed, args }) {
		const channel = message.mentions.channels.first();
		const type = args.slice(1).join("");

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.MANAGE_CHANNELS
			)
		) {
			if (!channel) {
				embed.setColor("#dc3545");
				embed.setDescription("Menciona un canal");
				return message.channel.send({ embeds: [embed] });
			}

			if (!type) {
				embed.setColor("#dc3545");
				embed.setDescription("Especifica que tipo de canal será");
				return message.channel.send({ embeds: [embed] });
			}

			if (type !== "level" && type !== "cmd" && type !== "casino") {
				embed.setColor("#dc3545");
				embed.setDescription(
					"Los tipos permitidos son level/cmd/casino"
				);
				return message.channel.send({ embeds: [embed] });
			}

			await Server.findOneAndUpdate(
				{
					serverdId: message.guild.id,
				},
				{
					[`channels.${type}`]: channel.id,
				}
			);

			embed.setColor("#28a745");
			embed.setDescription(
				`El canal ${channel} ha sido configurado como canal de ${type}`
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
