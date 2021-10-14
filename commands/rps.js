module.exports = {
	name: "rps",
	description: "Juega piedra, papel y tijeras",
	alias: [],
	execute({ message, embed, args }) {
		const choices = ["Piedra", "Papel", "Tijeras"];
		let result;

		const random = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		const userChoice =
			args.join("").charAt(0).toUpperCase() + args.join("").slice(1);
		const botChoice = choices[random(0, choices.length - 1)];

		if (!choices.includes(userChoice)) {
			embed.setColor("#dc3545");
			embed.setDescription("Haz una elección valida");
			return message.channel.send({ embeds: [embed] });
		}

		if (
			(userChoice === "Piedra" && botChoice === "Tijeras") ||
			(userChoice === "Papel" && botChoice === "Piedra") ||
			(userChoice === "Tijeras" && botChoice === "Papel")
		) {
			result = "WIN";
		}

		if (
			(userChoice === "Tijeras" && botChoice === "Piedra") ||
			(userChoice === "Piedra" && botChoice === "Papel") ||
			(userChoice === "Papel" && botChoice === "Tijeras")
		) {
			result = "LOOSE";
		}

		embed.setColor(result === "WIN" ? "#28a745" : "#dc3545");
		embed.setTitle("Resultado");
		embed.setDescription(
			`Tu elección: **${userChoice}** | Mi elección: **${botChoice}** \n \n ${
				result === "WIN" ? "**Tu ganas**" : "**Tu pierdes**"
			}`
		);
		return message.channel.send({ embeds: [embed] });
	},
};
