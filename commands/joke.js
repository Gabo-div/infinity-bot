module.exports = {
	name: "joke",
	description: "Dice un chiste aleatorio (Nunca son buenos)",
	alias: [],
	execute({ message, embed, args }) {
		const joke = ["* racismo *"];

		const random = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		embed.setColor("#28a745");
		embed.setTitle("Chiste");
		embed.setDescription(joke[random(0, joke.length - 1)]);
		return message.channel.send({ embeds: [embed] });
	},
};
