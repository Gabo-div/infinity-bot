const Discord = require("discord.js");

module.exports = {
	name: "roll",
	description: "Responde con un número aleatorio",
	alias: [],
	execute({ message, embed, args }) {
		const number = isNaN(parseInt(args[0])) ? 100 : parseInt(args[0]);

		const random = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		return message.reply(random(1, number).toString());
	},
};
