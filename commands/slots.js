const Discord = require("discord.js");
const User = require("../schema/User");

module.exports = {
	name: "slots",
	description: "Juega a la maquina tragamonedas con el bot",
	alias: [],
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
				name: "lemon",
				emoji: ":lemon:",
				points: 1,
			},
			{
				name: "banana",
				emoji: ":banana:",
				points: 2,
			},
			{
				name: "blueberries",
				emoji: ":blueberries:",
				points: 3,
			},
			{
				name: "mango",
				emoji: ":mango:",
				points: 5,
			},
			{
				name: "grapes",
				emoji: ":grapes:",
				points: 10,
			},
			{
				name: "tangerine",
				emoji: ":tangerine:",
				points: 20,
			},
			{
				name: "peach",
				emoji: ":peach:",
				points: 100,
			},
			{
				name: "bell",
				emoji: ":bell:",
				points: 300,
			},
			{
				name: "seven",
				emoji: ":seven:",
				points: 500,
			},
		];

		try {
			const user = await User.findOne({
				discordId: message.author.id,
			});

			if (user.coins >= amount) {
				const random = (min, max) => {
					return Math.floor(Math.random() * (max - min + 1) + min);
				};

				const slotsResult = [
					slots[random(0, slots.length - 1)],
					slots[random(0, slots.length - 1)],
					slots[random(0, slots.length - 1)],
				];

				embed.setTitle("Tragamonedas 🎰");
				embed.setDescription(`El resultado es: \n \n
                    ${slotsResult[0]} |  ${slotsResult[1]} |  ${slotsResult[2]}
                `);
				embed.setFooter(`Jugador: ${(message.author.userna, e)}`);
				return message.channel.send({ embeds: [embed] });
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
