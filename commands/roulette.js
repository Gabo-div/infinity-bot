const Discord = require("discord.js");
const User = require("../schema/User");

module.exports = {
	name: "roulette",
	description: "Juega a la ruleta con el bot",
	alias: [],
	async execute({ message, embed, args }) {
		const color = args[0] && args[0].toLowerCase();

		const amount = args[1] && parseInt(args[1]);

		if (!color) {
			embed.setColor("#dc3545");
			embed.setDescription("Debes elegir un color");
			return message.channel.send({ embeds: [embed] });
		}

		if (color !== "black" && color !== "red" && color !== "green") {
			embed.setColor("#dc3545");
			embed.setDescription(
				"Los colores solo pueden ser negro, rojo o verde"
			);
			return message.channel.send({ embeds: [embed] });
		}

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

		let roulette = [];

		roulette.push({
			color: "green",
			emoji: ":green_square:",
		});

		for (let i = 0; i < 16; i++) {
			roulette.push({
				color: "red",
				emoji: ":red_square:",
			});
			roulette.push({
				color: "black",
				emoji: ":black_large_square:",
			});
		}

		roulette.push({
			color: "green",
			emoji: ":green_square:",
		});

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

				const result = roulette[random(0, roulette.length - 1)];

				if (result.color === color) {
					const reward = color === "green" ? amount * 4 : amount * 2;

					await User.findOneAndUpdate(
						{ discordId: message.author.id },
						{
							$inc: {
								coins: reward,
							},
						}
					);

					embed.setColor("#28a745");
					embed.setTitle("Ruleta");
					embed.setDescription(`
                        El resultado es ${result.emoji}\nHaz ganado ${reward}
                    `);
					embed.setFooter(`Jugador: ${message.author.username}`);
					return message.channel.send({ embeds: [embed] });
				} else {
					embed.setColor("#28a745");
					embed.setTitle("Ruleta");
					embed.setDescription(`
                        El resultado es ${result.emoji}\nHaz perdido
                    `);
					embed.setFooter(`Jugador: ${message.author.username}`);
					return message.channel.send({ embeds: [embed] });
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
