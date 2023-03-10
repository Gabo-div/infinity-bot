const Discord = require("discord.js");
const User = require("../schema/User");

module.exports = {
	name: "slots",
	description: "Juega a la maquina tragamonedas con el bot",
	alias: [],
	type: "casino",
	async execute({ message, embed, args }) {
		const amount = args[0] && parseInt(args[0]);

		if (!amount) {
			embed.setColor("#dc3545");
			embed.setDescription("Debes introducir una cantidad");
			return message.channel.send({ embeds: [embed] });
		}

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

		let slots = [
			{
				name: "banana",
				emoji: ":banana:",
				points: 2,
			},
			{
				name: "lemon",
				emoji: ":lemon:",
				points: 3,
			},
			{
				name: "blueberries",
				emoji: ":blueberries:",
				points: 4,
			},
			{
				name: "mango",
				emoji: ":mango:",
				points: 5,
			},
			{
				name: "grapes",
				emoji: ":grapes:",
				points: 6,
			},
			{
				name: "tangerine",
				emoji: ":tangerine:",
				points: 7,
			},
			{
				name: "peach",
				emoji: ":peach:",
				points: 8,
			},
			{
				name: "bell",
				emoji: ":bell:",
				points: 9,
			},
			{
				name: "seven",
				emoji: ":seven:",
				points: 10,
			},
		];

		try {
			const user = await User.findOne({
				discordId: message.author.id,
			});

			if (user.coins >= amount) {
				await User.findOneAndUpdate(
					{ discordId: message.author.id },
					{
						$inc: {
							coins: -amount,
						},
					}
				);

				const random = (min, max) => {
					return Math.floor(Math.random() * (max - min + 1) + min);
				};

				const slotsResult = [
					slots[random(0, slots.length - 1)],
					slots[random(0, slots.length - 1)],
					slots[random(0, slots.length - 1)],
				];

				embed.setTitle("Tragamonedas ????");
				embed.setFooter(`Jugador: ${message.author.username}`);

				let reward;

				if (
					slotsResult[0].name === slotsResult[1].name &&
					slotsResult[1].name === slotsResult[2].name
				) {
					//3 SLOTS
					reward = amount * slotsResult[1].points;

					embed.setColor("#28a745");
					embed.setDescription(
						`El resultado es:  \n\n${slotsResult[0].emoji} |  ${slotsResult[1].emoji} |  ${slotsResult[2].emoji}  \n\nHaz ganado **${reward}**`
					);

					message.channel.send({ embeds: [embed] });
				} else if (
					slotsResult[0].name === slotsResult[1].name ||
					slotsResult[1].name === slotsResult[2].name
				) {
					//2 SLOTS
					reward = amount * (slotsResult[1].points / 2);

					embed.setColor("#28a745");
					embed.setDescription(
						`El resultado es: \n\n${slotsResult[0].emoji} |  ${slotsResult[1].emoji} |  ${slotsResult[2].emoji}  \n\nHaz ganado **${reward}**`
					);

					message.channel.send({ embeds: [embed] });
				} else {
					//1 SLOTS
					embed.setColor("#dc3545");
					embed.setDescription(
						`El resultado es: \n\n${slotsResult[0].emoji} |  ${slotsResult[1].emoji} |  ${slotsResult[2].emoji}  \n\nHaz perdido`
					);
					message.channel.send({ embeds: [embed] });
				}

				if (reward) {
					await User.findOneAndUpdate(
						{
							discordId: message.author.id,
						},
						{
							$inc: {
								coins: reward,
							},
						}
					);
				}
			} else {
				embed.setColor("#dc3545");
				embed.setDescription("No tienes suficientes coins");
				return message.channel.send({ embeds: [embed] });
			}
		} catch (error) {
			console.log(error);
		}
	},
};
