const Discord = require("discord.js");
const User = require("../schema/User");

const moment = require("moment");

moment.locale("es");

module.exports = {
	name: "transactions",
	description: "Mira tus ultimas transacciones",
	alias: [],
	async execute({ message, embed, args }) {
		try {
			const user = await User.findOne({
				discordId: message.author.id,
			});

			const transactions = user.transactions.slice(0, 4);

			embed.setTitle(
				`Ultimas transaciones de ${message.author.username}`
			);
			embed.setColor("#28a745");
			embed.setDescription(
				transactions
					.map(
						(trans) =>
							`De: <@${trans.from}> \n Para: <@${
								trans.to
							}> \n Cantidad: ${trans.amount} \n Fecha: ${moment(
								trans.date
							)
								.utc()
								.fromNow()}\n\n `
					)
					.join("")
			);
			return message.channel.send({ embeds: [embed] });
		} catch (error) {
			console.log(error);
		}
	},
};
