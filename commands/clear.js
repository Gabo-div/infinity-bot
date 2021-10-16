const Discord = require("discord.js");

module.exports = {
	name: "clear",
	description: "Elimina una cantidad de mensajes especificada",
	alias: [],
	type: "mod",
	execute({ message, embed, args }) {
		const member = message.mentions.members.first();

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.MANAGE_MESSAGES
			)
		) {
			if (!args[0]) {
				embed.setColor("#dc3545");
				embed.setDescription(
					"Especifica una cantidad de mensajes a elminar"
				);
				return message.channel.send({ embeds: [embed] });
			}

			if (args[0] === "bots") {
				const number = parseInt(args[1]);

				if (isNaN(number)) {
					embed.setColor("#dc3545");
					embed.setDescription("La cantidad debe ser un número");
					return message.channel.send({ embeds: [embed] });
				}

				if (number > 100) {
					embed.setColor("#dc3545");
					embed.setDescription(
						"No puedes eliminar más de 100 mensajes a la vez"
					);
					return message.channel.send({ embeds: [embed] });
				}

				return message.channel.messages
					.fetch({ limit: number })
					.then(async (e) => {
						const mensajes = e.filter((msg) => msg.author.bot);

						message.channel.bulkDelete(mensajes);
					});
			}

			if (member && args[0].slice(3, -1) === member.user.id) {
				const number = parseInt(args[1]);

				if (isNaN(number)) {
					embed.setColor("#dc3545");
					embed.setDescription("La cantidad debe ser un número");
					return message.channel.send({ embeds: [embed] });
				}

				if (number > 100) {
					embed.setColor("#dc3545");
					embed.setDescription(
						"No puedes eliminar más de 100 mensajes a la vez"
					);
					return message.channel.send({ embeds: [embed] });
				}

				return message.channel.messages
					.fetch({ limit: number })
					.then(async (e) => {
						const mensajes = e.filter(
							(msg) => msg.author.id == member.user.id
						);

						message.channel.bulkDelete(mensajes);
					});
			}

			const number = parseInt(args[0]);

			if (isNaN(number)) {
				embed.setColor("#dc3545");
				embed.setDescription("La cantidad debe ser un número");
				return message.channel.send({ embeds: [embed] });
			}

			if (number > 100) {
				embed.setColor("#dc3545");
				embed.setDescription(
					"No puedes eliminar más de 100 mensajes a la vez"
				);
				return message.channel.send({ embeds: [embed] });
			}
			message.channel.bulkDelete(number);
		} else {
			embed.setColor("#dc3545");
			embed.setDescription(
				"No tienes permisos para realizar esta acción"
			);
			return message.channel.send({ embeds: [embed] });
		}
	},
};
