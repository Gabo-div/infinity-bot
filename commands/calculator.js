const Discord = require("discord.js");
const math = require("mathjs");

module.exports = {
	name: "calculator",
	description: "Habilita una calculadora",
	alias: ["calc"],
	type: "utility",
	async execute({ message, embed, args }) {
		const time = 1000 * 60 * 5;
		let button = new Array([], [], [], [], []);
		let row = [];
		let text = [
			"C",
			"(",
			")",
			"/",
			"7",
			"8",
			"9",
			"*",
			"4",
			"5",
			"6",
			"-",
			"1",
			"2",
			"3",
			"+",
			".",
			"0",
			"00",
			"=",
		];
		let current = 0;

		const addRows = (btns) => {
			let row1 = new Discord.MessageActionRow();

			for (const btn of btns) {
				row1.addComponents(btn);
			}

			return row1;
		};

		const createButton = (label, style = "SECONDARY") => {
			if (label === "C") style = "DANGER";
			else if (label === ".") style = "SECONDARY";
			else if (label === "=") style = "SUCCESS";
			else if (isNaN(label)) style = "PRIMARY";

			const btn = new Discord.MessageButton()
				.setLabel(label)
				.setStyle(style)
				.setCustomId("calc" + label);

			return btn;
		};

		const mathEval = (input) => {
			try {
				const ev = math.evaluate(input);
				return ev;
			} catch (error) {
				return error;
			}
		};

		for (let i = 0; i < text.length; i++) {
			if (button[current].length === 4) current++;
			button[current].push(createButton(text[i]));
			if (i === text.length - 1) {
				for (let btn of button) row.push(addRows(btn));
			}
		}

		embed.setColor("#28a745");
		embed.setAuthor(
			message.author.username,
			message.author.displayAvatarURL()
		);
		embed.setDescription("```0```");

		message.channel
			.send({ embeds: [embed], components: row })
			.then((msg) => {
				let isWrong = false;
				let value = "";
				const embed1 = new Discord.MessageEmbed()
					.setAuthor(
						message.author.username,
						message.author.displayAvatarURL()
					)
					.setColor("#28a745");

				const createCollector = (val, result = false) => {
					const filter = (x) =>
						x.user.id === message.author.id &&
						x.customId === "calc" + val;
					const collect = msg.createMessageComponentCollector({
						filter,
						time,
					});

					collect.on("collect", async (x) => {
						x.deferUpdate();

						if (result === "new") value = "0";
						else if (isWrong) {
							value = val;
							isWrong = false;
						} else if (value === "0") value = val;
						else if (result) {
							isWrong = true;
							value = mathEval(value);
						} else value += val;

						embed.setDescription("```" + value + "```");
						msg.edit({ embeds: [embed], components: row });
					});
				};

				for (let txt of text) {
					let result;
					if (txt === "C") result = "new";
					else if (txt === "=") result = true;
					else result = false;

					createCollector(txt, result);

					setTimeout(() => {
						embed1
							.setDescription(
								"Tu tiempo para usar la calculadora ha acabado"
							)
							.setColor("#dc3545");
						msg.edit({ embeds: [embed1] });
					}, time);
				}
			});
	},
};
