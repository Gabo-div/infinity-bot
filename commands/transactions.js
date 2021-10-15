const Discord = require("discord.js");
const User = require("../schema/User");

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
			embed.setDescription(
				transactions.map(
					(trans) =>
						`De: <@${trans.from}> \n Para: <@${trans.to}> \n Cantidad: ${trans.amount} \n Fecha: ${trans.date}\n\n `
				)
			);
		} catch (error) {
			console.log(error);
		}
	},
};
