const Discord = require("discord.js");
const User = require("../schema/User");

module.exports = {
	name: "coins",
	description: "Muestra tu cantidad de coins y los puedes enviar a alguien",
	alias: [],
	type: "economy",
	async execute({ message, embed, args }) {
		const member = message.mentions.members.first();
		const amount = args.slice(1).join(" ")
			? parseInt(args.slice(1).join(" "))
			: null;

		if (isNaN(amount)) {
			embed.setColor("#dc3545");
			embed.setDescription("La cantidad debe ser valida");
			return message.channel.send({ embeds: [embed] });
		}

		if (amount && amount < 0) {
			embed.setColor("#dc3545");
			embed.setDescription("La cantidad no puede ser negativa");
			return message.channel.send({ embeds: [embed] });
		} else if (amount === 0) {
			embed.setColor("#dc3545");
			embed.setDescription("La cantidad no puede ser 0");
			return message.channel.send({ embeds: [embed] });
		}

		let id;
		let username;

		if (member) {
			id = member.user.id;
			username = member.user.username;
		} else {
			id = message.author.id;
			username = message.author.username;
		}

		try {
			if (member && amount) {
				if (member.user.id === message.author.id) {
					embed.setColor("#dc3545");
					embed.setDescription("No te puedes transferir a ti mismo");
					return message.channel.send({ embeds: [embed] });
				}

				const userTrans = await User.findOne({
					discordId: message.author.id,
				});

				const userRec = await User.findOne({
					discordId: member.user.id,
				});

				if (!userRec) {
					embed.setColor("#dc3545");
					embed.setDescription("No se ha encontrado a este usuario");
					return message.channel.send({ embeds: [embed] });
				}

				if (userTrans.coins >= amount) {
					await User.findOneAndUpdate(
						{ discordId: message.author.id },
						{
							$inc: {
								coins: -amount,
							},
							$push: {
								transactions: {
									from: message.author.id,
									to: member.user.id,
									amount: -amount,
								},
							},
						}
					);

					await User.findOneAndUpdate(
						{ discordId: member.user.id },
						{
							$inc: {
								coins: amount,
							},
							$push: {
								transactions: {
									from: message.author.id,
									to: member.user.id,
									amount: amount,
								},
							},
						}
					);

					embed.setColor("#28a745");
					embed.setDescription(
						`${message.author} Le ha transferido ${amount} coins a ${member}`
					);
					return message.channel.send({ embeds: [embed] });
				} else {
					embed.setColor("#dc3545");
					embed.setDescription("No tienes suficientes coins");
					return message.channel.send({ embeds: [embed] });
				}
			} else {
				const user = await User.findOne({
					discordId: id,
				});

				if (!user) {
					embed.setColor("#dc3545");
					embed.setDescription("No se ha encontrado a este usuario");
					return message.channel.send({ embeds: [embed] });
				}

				const { coins } = user;

				embed.setColor("#28a745");
				embed.setDescription(`${username} tiene ${coins} coins`);
				return message.channel.send({ embeds: [embed] });
			}
		} catch (error) {
			console.log(error);
		}
	},
};
