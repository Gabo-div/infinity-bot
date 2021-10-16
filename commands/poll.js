module.exports = {
	name: "poll",
	description: "Realiza una encuesta",
	alias: [],
	type: "fun",
	execute({ message, embed, args }) {
		const messageAnn = args.join(" ").split(" | ");

		const [question, ...options] = messageAnn;

		const reacts = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];

		if (!question) {
			embed.setColor("#dc3545");
			embed.setDescription("Debes ingresar una pregunta");
			return message.channel.send({ embeds: [embed] });
		}

		if (options.length < 2) {
			embed.setColor("#dc3545");
			embed.setDescription("Debes ingresar minimo dos opciones");
			return message.channel.send({ embeds: [embed] });
		}

		if (options.length > 4) {
			embed.setColor("#dc3545");
			embed.setDescription("El maximo de opciones son 4");
			return message.channel.send({ embeds: [embed] });
		}

		embed.setColor("#28a745");
		embed.setTitle(question);
		embed.setDescription(
			options
				.map(
					(choice, index) =>
						`**${(index + 1).toString()}** - ${choice}`
				)
				.join("\n\n")
		);
		embed.setFooter(`Encuetra creada por: ${message.author.tag}`);
		message.channel.send({ embeds: [embed] }).then(async (msg) => {
			for (let i = 0; i < options.length; i++) {
				await msg.react(reacts[i]);
			}
		});
	},
};
